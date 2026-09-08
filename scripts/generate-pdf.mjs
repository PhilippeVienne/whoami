import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

function findChromeExecutable() {
  const candidates = [
    process.env.CHROME_BIN,
    'google-chrome',
    'google-chrome-stable',
    'chromium',
    'chromium-browser',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ].filter(Boolean);

  for (const cmd of candidates) {
    try {
      execSync(`which "${cmd}"`, { stdio: 'ignore' });
      return cmd;
    } catch {
      // Ignorer si introuvable
    }
  }
  return null;
}

export function generatePdfs() {
  console.log('🖨️  Génération des PDF ATS avec Google Chrome Headless...');

  const chrome = findChromeExecutable();
  if (!chrome) {
    console.warn('⚠️  Aucun binaire Chrome/Chromium trouvé. Les PDF ne seront pas générés en local.');
    return;
  }

  const frHtmlPath = path.join(distDir, 'ats-fr.html');
  const enHtmlPath = path.join(distDir, 'ats-en.html');
  const frPdfPath = path.join(distDir, 'Philippe_Vienne_CV_FR.pdf');
  const enPdfPath = path.join(distDir, 'Philippe_Vienne_CV_EN.pdf');

  try {
    // PDF Français
    console.log(' -> Génération de Philippe_Vienne_CV_FR.pdf...');
    execSync(`"${chrome}" --headless --no-sandbox --disable-gpu --no-pdf-header-footer --print-to-pdf="${frPdfPath}" "file://${frHtmlPath}"`, {
      stdio: 'inherit'
    });

    // PDF Anglais
    console.log(' -> Génération de Philippe_Vienne_CV_EN.pdf...');
    execSync(`"${chrome}" --headless --no-sandbox --disable-gpu --no-pdf-header-footer --print-to-pdf="${enPdfPath}" "file://${enHtmlPath}"`, {
      stdio: 'inherit'
    });

    if (fs.existsSync(frPdfPath) && fs.existsSync(enPdfPath)) {
      const frSize = (fs.statSync(frPdfPath).size / 1024).toFixed(1);
      const enSize = (fs.statSync(enPdfPath).size / 1024).toFixed(1);
      console.log(`✅ PDFs générés avec succès : FR (${frSize} KB), EN (${enSize} KB)`);
    }
  } catch (err) {
    console.error('❌ Erreur lors de la génération PDF :', err);
    throw err;
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generatePdfs();
}
