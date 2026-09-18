/**
 * llms.txt and llms-full.txt Generator
 * Standard for LLMs & AI Web Crawlers: https://llmstxt.org/
 */

export function renderLlmsTxt({ data, frRaw, enRaw }) {
  return `# Philippe Vienne — Cloud & DevOps Solutions Architect

> 15 years experience in resilient software engineering, high-availability multi-cloud architecture (AWS, GCP, Azure, OpenShift, Kubernetes, Terraform) and mission-critical platform operations across highly regulated industries (Nuclear, Aviation, Banking/FinTech, Sovereign Cloud). Former Startup Technical Co-Founder & CTO. M.Sc. in Engineering from INSA Lyon.

## Identity & Canonical Links
- Name: ${data.name}
- Title: ${data.title}
- Location: ${data.location}
- Email: ${data.email}
- Website: ${data.website}
- LinkedIn: ${data.linkedin}
- GitHub: ${data.github}
- Credly Profile: https://www.credly.com/users/philippe-vienne

## Machine-Readable Endpoints
- [JSON Resume (FR)](https://philippe.vienne.me/resume.json): Standard JSON Resume v1.0.0 (French)
- [JSON Resume (EN)](https://philippe.vienne.me/en/resume.json): Standard JSON Resume v1.0.0 (English)
- [Raw Markdown CV (FR)](https://philippe.vienne.me/cv.fr.md): Source of truth markdown document
- [Raw Markdown CV (EN)](https://philippe.vienne.me/cv.en.md): Source of truth markdown document
- [ATS Clean Print HTML (FR)](https://philippe.vienne.me/ats-fr.html): High-fidelity single-column semantic ATS format
- [ATS Clean Print HTML (EN)](https://philippe.vienne.me/ats-en.html): High-fidelity single-column semantic ATS format
- [PDF ATS Resume (FR)](https://philippe.vienne.me/Philippe_Vienne_CV_FR.pdf): 2-page calibrated vector PDF
- [PDF ATS Resume (EN)](https://philippe.vienne.me/Philippe_Vienne_CV_EN.pdf): 2-page calibrated vector PDF
- [Full LLM Context](https://philippe.vienne.me/llms-full.txt): Complete uncompressed textual knowledge base

## Official Certifications & Verified Accreditations
- [AWS Certified Solutions Architect – Professional](https://www.credly.com/badges/14eabfb5-f2a6-4b5b-9ee2-d75afe8f6fae/public_url) (Amazon Web Services)
- [Claude Certified Developer – Foundations](https://www.credly.com/badges/be323437-24ed-4a02-b1bf-933c265d39da/public_url) (Anthropic)
- [Google Cloud Certified – Associate Cloud Engineer](https://www.credly.com/badges/736ef7d0-5577-44eb-a1ca-ea4484aba404/public_url) (Google Cloud)
- [HashiCorp Certified: Terraform Associate 003](https://www.credly.com/badges/51e949dd-10f6-4198-b8f9-6d27b6066f28/public_url) (HashiCorp)
- [AWS Certified Solutions Architect – Associate](https://www.credly.com/badges/35282ec4-14d5-4124-a7c8-7a42f434d639/public_url) (AWS)
- [AWS Certified Developer – Associate](https://www.credly.com/badges/f4dd7b58-696a-4fda-913f-84f0e15ffe21/public_url) (AWS)
- [AWS Certified CloudOps Engineer – Associate](https://www.credly.com/badges/891fdf8a-a8d5-4e47-8c04-eb1af4878ffa/public_url) (AWS)
- [AWS Certified AI Practitioner](https://www.credly.com/badges/6a26efa1-187e-4887-9fa3-059169900372/public_url) (AWS)
- [AWS Certified Cloud Practitioner](https://www.credly.com/badges/2ad76a7e-1bd3-4a99-8445-f790995eaf39/public_url) (AWS)
- [CKA: Certified Kubernetes Administrator](https://www.credly.com/badges/d12a9c6f-3fbf-4633-ba6c-f91689bc04f4/public_url) (The Linux Foundation)
- GenAI Level 1 (Devoteam)
- Sustainable IT Fundamentals (Devoteam)

## Key Career Milestones
- **Devoteam G Cloud (2024 – Present):** Lead Cloud Architect & AI Practitioner. Critical migration to Red Hat OpenShift for EDF (Nuclear regulation), rail geotracking for Vapérail on Azure, multi-cloud sovereign governance (S3NS / SecNumCloud), developer AI productivity R&D.
- **Skyloud (2023 – 2025):** Cloud & Kubernetes Architect. Managed 30 enterprise clients, 100+ production Kubernetes clusters, delivered +300% application performance and -15% cloud cost reduction via FinOps. Full IaC automation with Terraform.
- **Smartfire (2019 – 2024):** Technical Co-Founder & CTO. Architected cloud-native SaaS developer environment platform from 0 to 1; repackaged VSCode for web execution; engineered high-traffic e-commerce cloud architectures (AWS, OVHcloud).
- **Atos / Air France (2018 – 2019):** DevOps Engineer. Deployed containerized Kubernetes clusters with Rancher/RKE in Air France private enterprise datacenters.
- **ActiveViam (2018):** Software Engineer (FinTech, Singapore). Automated continuous delivery CI/CD pipelines for in-memory distributed OLAP database ActivePivot across Tier-1 global investment banks.
- **INSA Lyon (2013 – 2018):** M.Sc. in Engineering — Telecommunications, IP Networks & Distributed Computing.
`;
}

export function renderLlmsFullTxt({ frRaw, enRaw }) {
  return `# Complete Resume Knowledge Base — Philippe Vienne

This document aggregates full biographical, technical, and architectural details for Philippe Vienne in English and French.

================================================================================
SECTION 1: ENGLISH RESUME SOURCE (MARKDOWN)
================================================================================

${enRaw}

================================================================================
SECTION 2: FRENCH RESUME SOURCE (MARKDOWN)
================================================================================

${frRaw}
`;
}
