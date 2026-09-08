import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function fetchUrl(url) {
  try {
    const res = await fetch(url);
    if (res.ok) return await res.text();
  } catch (e) {
    console.error('Error fetching', url, e.message);
  }
  return null;
}

async function main() {
  console.log('Fetching and preparing official vector logos...');
  
  // Devicons
  const awsRaw = await fetchUrl('https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg');
  const gcpRaw = await fetchUrl('https://raw.githubusercontent.com/devicons/devicon/master/icons/googlecloud/googlecloud-original.svg');
  const azureRaw = await fetchUrl('https://raw.githubusercontent.com/devicons/devicon/master/icons/azure/azure-original.svg');
  const terraformRaw = await fetchUrl('https://raw.githubusercontent.com/devicons/devicon/master/icons/terraform/terraform-original.svg');
  const kubernetesRaw = await fetchUrl('https://raw.githubusercontent.com/devicons/devicon/master/icons/kubernetes/kubernetes-plain.svg');
  const dockerRaw = await fetchUrl('https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg');
  const redhatRaw = await fetchUrl('https://raw.githubusercontent.com/devicons/devicon/master/icons/redhat/redhat-original.svg');
  const pythonRaw = await fetchUrl('https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg');
  const typescriptRaw = await fetchUrl('https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg');
  const javaRaw = await fetchUrl('https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg');
  const reactRaw = await fetchUrl('https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg');
  const gitlabRaw = await fetchUrl('https://raw.githubusercontent.com/devicons/devicon/master/icons/gitlab/gitlab-original.svg');
  const githubRaw = await fetchUrl('https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg');
  const ansibleRaw = await fetchUrl('https://raw.githubusercontent.com/devicons/devicon/master/icons/ansible/ansible-original.svg');
  const helmRaw = await fetchUrl('https://raw.githubusercontent.com/devicons/devicon/master/icons/helm/helm-original.svg');
  const jenkinsRaw = await fetchUrl('https://raw.githubusercontent.com/devicons/devicon/master/icons/jenkins/jenkins-original.svg');
  const postgresqlRaw = await fetchUrl('https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg');
  const openstackRaw = await fetchUrl('https://raw.githubusercontent.com/devicons/devicon/master/icons/openstack/openstack-original.svg');
  const linuxRaw = await fetchUrl('https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg');

  // Company and institution logos
  const edfRaw = await fetchUrl('https://upload.wikimedia.org/wikipedia/commons/1/12/%C3%89lectricit%C3%A9_de_France_logo.svg');
  const atosRaw = await fetchUrl('https://upload.wikimedia.org/wikipedia/fr/7/79/Atos_logo.svg');
  const insaRaw = await fetchUrl('https://upload.wikimedia.org/wikipedia/commons/5/5f/INSA_lyon_logo.svg');
  const skyloudRaw = await fetchUrl('https://cdn.prod.website-files.com/633604f2b53d992b9190a890/633ec81b3a6c352bf35a0822_logo%20header.svg');

  console.log('All raw SVGs fetched successfully.');

  // Clean and prepare SVG strings (strip xml headers, standardize viewBox)
  function cleanSvg(raw) {
    if (!raw) return '';
    return raw
      .replace(/<\?xml[^>]*\?>/gi, '')
      .replace(/<!--[\s\S]*?-->/gi, '')
      .replace(/<!DOCTYPE[^>]*>/gi, '')
      .trim();
  }

  // Devoteam official logo
  const devoteamSvg = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="46" fill="#F8485E"/>
  <path d="M 52 23 H 62 V 77 H 52 V 64 C 49 67 44 69 38 69 C 26 69 19 59 19 49 C 19 39 26 29 38 29 C 44 29 49 31 52 34 V 23 Z M 52 49 C 52 41 47 37 41 37 C 34 37 29 42 29 49 C 29 56 34 61 41 61 C 47 61 52 57 52 49 Z" fill="#FFFFFF"/>
  <rect x="52" y="36" width="22" height="10" rx="1" fill="#FFFFFF"/>
</svg>`;

  // Air France mark
  const airFranceSvg = `<svg viewBox="0 0 120 28" xmlns="http://www.w3.org/2000/svg">
  <text x="2" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="19" fill="#002157" letter-spacing="-0.5">AIRFRANCE</text>
  <path d="M 106 20 L 118 4 L 112 4 L 102 20 Z" fill="#ED0000"/>
</svg>`;

  // Smartfire startup logo (fire / flame)
  const smartfireSvg = `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sfGrad" x1="0%" y1="100%" x2="50%" y2="0%">
      <stop offset="0%" stop-color="#FF3D00"/>
      <stop offset="50%" stop-color="#FF9100"/>
      <stop offset="100%" stop-color="#FFD600"/>
    </linearGradient>
  </defs>
  <circle cx="16" cy="16" r="15" fill="#1E293B"/>
  <path d="M16 4C16 4 19 9 19 13C19 14.5 18.2 15.8 17.5 17C16.8 15.5 16 13.5 16 11C14 13.5 11 17.5 11 21C11 24.5 13.5 27 16 27C19.5 27 22 24 22 20C22 15 16 4 16 4Z" fill="url(#sfGrad)"/>
  <path d="M16 26C14.5 26 13.5 24.5 13.5 22.5C13.5 20.5 15 18.5 16 17C17 18.5 18.5 20.5 18.5 22.5C18.5 24.5 17.5 26 16 26Z" fill="#FFF7C2"/>
</svg>`;

  // S3NS Sovereign Cloud (French Cloud Souverain Thales + GCP)
  const s3nsSvg = `<svg viewBox="0 0 36 28" xmlns="http://www.w3.org/2000/svg">
  <rect width="36" height="28" rx="6" fill="#0B1528" stroke="#1E293B"/>
  <!-- French tricolor accent -->
  <rect x="5" y="6" width="3" height="16" rx="1" fill="#002395"/>
  <rect x="8" y="6" width="3" height="16" fill="#FFFFFF"/>
  <rect x="11" y="6" width="3" height="16" rx="1" fill="#ED2939"/>
  <text x="17" y="19" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="900" font-size="12" fill="#38BDF8" letter-spacing="-0.5">S3NS</text>
</svg>`;

  // ActiveViam FinTech logo
  const activeViamSvg = `<svg viewBox="0 0 100 28" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="28" rx="6" fill="#0A192F"/>
  <circle cx="15" cy="14" r="7" fill="#00A887"/>
  <path d="M12 14L15 9L18 14L15 19Z" fill="#FFFFFF"/>
  <text x="28" y="19" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="800" font-size="13" fill="#FFFFFF" letter-spacing="-0.3">Active<tspan fill="#00A887">Viam</tspan></text>
</svg>`;

  // Skyloud official mark
  const skyloudSvg = `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="skyloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4800BF"/>
      <stop offset="100%" stop-color="#7F96FF"/>
    </linearGradient>
  </defs>
  <path fill="url(#skyloudGrad)" d="M331.12,209.65c0,37.24-12.3,71.61-33.06,99.27-17.1,22.8-39.96,41.04-66.41,52.57-10.44,4.56-21.44,8.06-32.87,10.39-10.62,2.16-21.61,3.31-32.86,3.34C74.54,375.41,0,301.04,0,209.65,0,118.21,74.13,44.09,165.56,44.09c.11,0,.22,0,.34,0,7.02,.01,8.92,9.71,2.43,12.39-60.09,24.83-102.38,84.02-102.38,153.08v.1h.29c0,54.76,44.32,99.17,99.04,99.33h.28c25.39,0,48.55-9.53,66.12-25.2,19.43-17.34,32-42.21,33.13-70.02h0c.06-1.36,.08-2.73,.08-4.1s-.03-2.74-.08-4.1h0c2.02-16.4,16-29.09,32.94-29.09,18.33,0,33.19,14.86,33.19,33.19h.19Zm-33.38-165.56c-11.25,0-22.25,1.12-32.87,3.27h0c-11.55,2.33-22.67,5.86-33.22,10.46-26.43,11.52-49.27,29.74-66.38,52.51-20.78,27.67-33.09,62.06-33.09,99.33h.19c0,18.33,14.86,33.19,33.19,33.19,16.96,0,30.94-12.71,32.94-29.12-.06-1.35-.08-2.7-.08-4.06v-.05c0-1.35,.03-2.7,.08-4.04,1.11-27.84,13.68-52.73,33.12-70.09,17.56-15.67,40.73-25.2,66.12-25.2h.25c54.29,.13,98.34,43.81,99.07,97.96,0,.46,0,.91,0,1.37v.05c0,.46,0,.91-.01,1.37-.59,68.34-42.59,126.8-102.13,151.51-6.65,2.76-4.73,12.67,2.47,12.68,.11,0,.23,0,.34,0,91.44,0,165.56-74.13,165.56-165.56S389.18,44.09,297.75,44.09Z"/>
</svg>`;

  const iconsContent = `/**
 * Official Vector Logos for Philippe Vienne Portfolio
 * High-performance, self-contained SVG logos for Cloud Services, Platforms, and Companies
 */

export const ICONS = {
  aws: \`${cleanSvg(awsRaw)}\`,
  gcp: \`${cleanSvg(gcpRaw)}\`,
  azure: \`${cleanSvg(azureRaw)}\`,
  terraform: \`${cleanSvg(terraformRaw)}\`,
  kubernetes: \`${cleanSvg(kubernetesRaw)}\`,
  openshift: \`${cleanSvg(redhatRaw)}\`,
  docker: \`${cleanSvg(dockerRaw)}\`,
  devoteam: \`${devoteamSvg}\`,
  edf: \`${cleanSvg(edfRaw)}\`,
  airfrance: \`${airFranceSvg}\`,
  atos: \`${cleanSvg(atosRaw)}\`,
  skyloud: \`${skyloudSvg}\`,
  smartfire: \`${smartfireSvg}\`,
  activeviam: \`${activeViamSvg}\`,
  insa: \`${cleanSvg(insaRaw)}\`,
  s3ns: \`${s3nsSvg}\`,
  python: \`${cleanSvg(pythonRaw)}\`,
  typescript: \`${cleanSvg(typescriptRaw)}\`,
  java: \`${cleanSvg(javaRaw)}\`,
  react: \`${cleanSvg(reactRaw)}\`,
  gitlab: \`${cleanSvg(gitlabRaw)}\`,
  github: \`${cleanSvg(githubRaw)}\`,
  ansible: \`${cleanSvg(ansibleRaw)}\`,
  helm: \`${cleanSvg(helmRaw)}\`,
  jenkins: \`${cleanSvg(jenkinsRaw)}\`,
  postgresql: \`${cleanSvg(postgresqlRaw)}\`,
  openstack: \`${cleanSvg(openstackRaw)}\`,
  linux: \`${cleanSvg(linuxRaw)}\`,
};

/**
 * Returns a tech logo SVG based on technology/keyword name
 */
export function getTechIcon(name) {
  if (!name) return null;
  const n = name.toLowerCase().trim();

  if (n.includes('aws') || n.includes('amazon') || n.includes('eks') || n.includes('rds') || n.includes('cloudfront') || n.includes('ec2')) {
    return ICONS.aws;
  }
  if (n.includes('gcp') || n.includes('google cloud') || n.includes('gke')) {
    return ICONS.gcp;
  }
  if (n.includes('azure')) {
    return ICONS.azure;
  }
  if (n.includes('terraform') || n.includes('hashicorp')) {
    return ICONS.terraform;
  }
  if (n.includes('openshift')) {
    return ICONS.openshift;
  }
  if (n.includes('kubernetes') || n.includes('k8s') || n.includes('rke')) {
    return ICONS.kubernetes;
  }
  if (n.includes('docker')) {
    return ICONS.docker;
  }
  if (n.includes('helm')) {
    return ICONS.helm;
  }
  if (n.includes('ansible')) {
    return ICONS.ansible;
  }
  if (n.includes('python')) {
    return ICONS.python;
  }
  if (n.includes('typescript')) {
    return ICONS.typescript;
  }
  if (n.includes('java') && !n.includes('javascript')) {
    return ICONS.java;
  }
  if (n.includes('react')) {
    return ICONS.react;
  }
  if (n.includes('gitlab')) {
    return ICONS.gitlab;
  }
  if (n.includes('github')) {
    return ICONS.github;
  }
  if (n.includes('jenkins')) {
    return ICONS.jenkins;
  }
  if (n.includes('openstack')) {
    return ICONS.openstack;
  }
  if (n.includes('linux')) {
    return ICONS.linux;
  }
  if (n.includes('postgis') || n.includes('postgres')) {
    return ICONS.postgresql;
  }
  if (n.includes('edf')) {
    return ICONS.edf;
  }
  if (n.includes('air france')) {
    return ICONS.airfrance;
  }
  if (n.includes('s3ns')) {
    return ICONS.s3ns;
  }
  if (n.includes('activeviam') || n.includes('activepivot')) {
    return ICONS.activeviam;
  }
  if (n.includes('devoteam')) {
    return ICONS.devoteam;
  }
  if (n.includes('skyloud')) {
    return ICONS.skyloud;
  }
  if (n.includes('smartfire')) {
    return ICONS.smartfire;
  }
  if (n.includes('insa')) {
    return ICONS.insa;
  }
  return null;
}
`;

  fs.writeFileSync(path.join(rootDir, 'src', 'templates', 'icons.mjs'), iconsContent, 'utf-8');
  console.log('src/templates/icons.mjs generated successfully!');
}

main();
