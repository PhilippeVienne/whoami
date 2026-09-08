import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from './build.mjs';
import { generatePdfs } from './generate-pdf.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const PORT = parseInt(process.env.PORT || '3000', 10);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.md': 'text/markdown; charset=utf-8',
};

async function initialBuild() {
  await build();
  try {
    generatePdfs();
  } catch (e) {
    console.warn('PDF warning:', e.message);
  }
}

// Simple static file handler
const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  let pathname = parsedUrl.pathname;

  if (pathname.endsWith('/')) {
    pathname += 'index.html';
  }

  let filePath = path.join(distDir, pathname);

  // If path has no extension and is a dir
  if (!path.extname(filePath) && fs.existsSync(path.join(filePath, 'index.html'))) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(filePath).pipe(res);
});

// Watcher
function watchFiles() {
  const watchDirs = [
    path.join(rootDir, 'content'),
    path.join(rootDir, 'src'),
    path.join(rootDir, 'public'),
  ];

  let timeout = null;
  const triggerRebuild = (filename) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(async () => {
      console.log(`\n🔄 Modification détectée (${filename}), reconstruction...`);
      try {
        await build();
        console.log('⚡ Site reconstruit avec succès !');
      } catch (err) {
        console.error('Erreur rebuild:', err);
      }
    }, 150);
  };

  watchDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      fs.watch(dir, { recursive: true }, (eventType, filename) => {
        triggerRebuild(filename);
      });
    }
  });
}

initialBuild().then(() => {
  server.listen(PORT, () => {
    console.log(`\n🌟 Serveur de développement Whoami prêt :`);
    console.log(`   ➜ Local:    http://localhost:${PORT}/`);
    console.log(`   ➜ Anglais:  http://localhost:${PORT}/en/`);
    console.log(`   ➜ ATS FR:   http://localhost:${PORT}/ats-fr.html`);
    console.log(`   ➜ ATS EN:   http://localhost:${PORT}/ats-en.html\n`);
  });
  watchFiles();
});
