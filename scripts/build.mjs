import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';
import { renderWebPage } from '../src/templates/web.html.mjs';
import { renderAtsPage } from '../src/templates/ats.html.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

function parseMarkdownWithFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    throw new Error(`Invalid frontmatter in ${filePath}`);
  }
  const frontmatterRaw = match[1];
  const markdownBody = match[2];
  const data = YAML.parse(frontmatterRaw);
  return { data, markdownBody, rawContent: content };
}

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

export async function build() {
  console.log('🚀 Démarrage du build Whoami — Philippe Vienne...');

  // Nettoyage et création de dist
  if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
  }
  fs.mkdirSync(distDir, { recursive: true });
  fs.mkdirSync(path.join(distDir, 'en'), { recursive: true });

  // Lecture des sources Markdown
  const frSource = parseMarkdownWithFrontmatter(path.join(rootDir, 'content', 'cv.fr.md'));
  const enSource = parseMarkdownWithFrontmatter(path.join(rootDir, 'content', 'cv.en.md'));

  // Copie des assets statiques (CSS, JS, public)
  fs.copyFileSync(path.join(rootDir, 'src', 'css', 'style.css'), path.join(distDir, 'style.css'));
  fs.copyFileSync(path.join(rootDir, 'src', 'css', 'ats.css'), path.join(distDir, 'ats.css'));
  fs.copyFileSync(path.join(rootDir, 'src', 'js', 'app.js'), path.join(distDir, 'app.js'));
  copyDirRecursive(path.join(rootDir, 'public'), distDir);

  // Copie des fichiers Markdown sources et de la licence vers dist pour téléchargement / consultation directe
  fs.copyFileSync(path.join(rootDir, 'content', 'cv.fr.md'), path.join(distDir, 'cv.fr.md'));
  fs.copyFileSync(path.join(rootDir, 'content', 'cv.en.md'), path.join(distDir, 'cv.en.md'));
  if (fs.existsSync(path.join(rootDir, 'LICENSE.md'))) {
    fs.copyFileSync(path.join(rootDir, 'LICENSE.md'), path.join(distDir, 'LICENSE.md'));
  }

  // CNAME et .nojekyll pour GitHub Pages
  fs.writeFileSync(path.join(distDir, 'CNAME'), 'philippe.vienne.me\n', 'utf-8');
  fs.writeFileSync(path.join(distDir, '.nojekyll'), '', 'utf-8');

  // Génération des pages Web
  // 1. Version Française (Racine)
  const htmlFr = renderWebPage({
    data: frSource.data,
    rawMarkdown: frSource.rawContent,
    lang: 'fr',
    basePath: ''
  });
  fs.writeFileSync(path.join(distDir, 'index.html'), htmlFr, 'utf-8');

  // 2. Version Anglaise (/en/)
  const htmlEn = renderWebPage({
    data: enSource.data,
    rawMarkdown: enSource.rawContent,
    lang: 'en',
    basePath: '..'
  });
  fs.writeFileSync(path.join(distDir, 'en', 'index.html'), htmlEn, 'utf-8');

  // Lecture du CSS ATS pour inlining garanti
  const atsCssContent = fs.readFileSync(path.join(rootDir, 'src', 'css', 'ats.css'), 'utf-8');

  // Génération des documents ATS
  // 3. Document ATS Français
  const atsFr = renderAtsPage({
    data: frSource.data,
    lang: 'fr',
    inlinedCss: atsCssContent
  });
  fs.writeFileSync(path.join(distDir, 'ats-fr.html'), atsFr, 'utf-8');

  // 4. Document ATS Anglais
  const atsEn = renderAtsPage({
    data: enSource.data,
    lang: 'en',
    inlinedCss: atsCssContent
  });
  fs.writeFileSync(path.join(distDir, 'ats-en.html'), atsEn, 'utf-8');

  console.log('✅ Pages HTML & assets générés avec succès dans dist/');
}

// Exécution directe si invoqué via CLI
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  build().catch(err => {
    console.error('❌ Erreur de build:', err);
    process.exit(1);
  });
}
