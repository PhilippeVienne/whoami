import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const badgesDir = path.join(rootDir, 'public', 'badges');

const BADGE_FILENAME_MAP = {
  'be323437-24ed-4a02-b1bf-933c265d39da': 'claude-certified-developer-foundations.png',
  '14eabfb5-f2a6-4b5b-9ee2-d75afe8f6fae': 'aws-solutions-architect-professional.png',
  '736ef7d0-5577-44eb-a1ca-ea4484aba404': 'gcp-associate-cloud-engineer.png',
  '51e949dd-10f6-4198-b8f9-6d27b6066f28': 'hashicorp-terraform-associate.png',
  '35282ec4-14d5-4124-a7c8-7a42f434d639': 'aws-solutions-architect-associate.png',
  'f4dd7b58-696a-4fda-913f-84f0e15ffe21': 'aws-developer-associate.png',
  '891fdf8a-a8d5-4e47-8c04-eb1af4878ffa': 'aws-cloudops-engineer-associate.png',
  '6a26efa1-187e-4887-9fa3-059169900372': 'aws-ai-practitioner.png',
  '2ad76a7e-1bd3-4a99-8445-f790995eaf39': 'aws-cloud-practitioner.png',
  'd12a9c6f-3fbf-4633-ba6c-f91689bc04f4': 'cka-certified-kubernetes-administrator.png',
  'c7d69452-8cbb-4a60-b9be-f9cbba933fa5': 'aws-partner-sales.png',
  'cb25cb45-ef00-466a-894b-3d4fb0e68d3f': 'aws-partner-technical.png',
};

async function downloadBadges() {
  if (!fs.existsSync(badgesDir)) {
    fs.mkdirSync(badgesDir, { recursive: true });
  }

  console.log('Fetching Credly badges for user philippe-vienne...');
  const res = await fetch('https://www.credly.com/users/philippe-vienne/badges.json');
  if (!res.ok) {
    throw new Error(`Failed to fetch Credly badges: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  const badges = json.data || [];
  console.log(`Found ${badges.length} badges on Credly.`);

  for (const badge of badges) {
    const filename = BADGE_FILENAME_MAP[badge.id] || `badge-${badge.id}.png`;
    const destPath = path.join(badgesDir, filename);

    const imageUrl = badge.image?.url || badge.badge_template?.image?.url || badge.badge_template?.image_url;
    if (!imageUrl) {
      console.warn(`No image URL for badge ${badge.id}`);
      continue;
    }

    console.log(`Downloading ${badge.badge_template?.name} -> ${filename}...`);
    const imgRes = await fetch(imageUrl);
    if (!imgRes.ok) {
      console.error(`Failed to download image ${imageUrl}: ${imgRes.status}`);
      continue;
    }

    const buffer = Buffer.from(await imgRes.arrayBuffer());
    fs.writeFileSync(destPath, buffer);
    console.log(`  ✓ Saved ${filename} (${buffer.length} bytes)`);
  }

  console.log('\nAll Credly badges downloaded successfully into public/badges/!');
}

downloadBadges().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
