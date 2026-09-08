/**
 * Template ATS / Print pour Philippe Vienne
 * Génère un document HTML 100% optimisé pour les Applicant Tracking Systems (ATS)
 * avec CSS directement inliné pour une compatibilité absolue en local et en CI.
 */

export function renderAtsPage({ data, lang = 'fr', inlinedCss = '' }) {
  const isEn = lang === 'en';

  const t = {
    titleSummary: isEn ? 'PROFESSIONAL SUMMARY' : 'PROFIL PROFESSIONNEL',
    titleCerts: isEn ? 'CERTIFICATIONS & ACCREDITATIONS' : 'CERTIFICATIONS & ACCRÉDITATIONS',
    titleExp: isEn ? 'PROFESSIONAL EXPERIENCE' : 'EXPÉRIENCES PROFESSIONNELLES',
    titleSkills: isEn ? 'TECHNICAL & ARCHITECTURAL SKILLS' : 'COMPÉTENCES CLÉS & SAVOIR-FAIRE',
    titleEdu: isEn ? 'EDUCATION' : 'FORMATION & DIPLÔMES',
    titleLang: isEn ? 'LANGUAGES' : 'LANGUES',
    expires: isEn ? 'Exp.' : 'Exp.',
    obtained: isEn ? 'Obt.' : 'Obt.',
  };

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <title>${data.name} — CV ${isEn ? 'English' : 'Français'} (ATS Compatible)</title>
  <meta name="robots" content="noindex, nofollow">
  ${inlinedCss ? `<style>${inlinedCss}</style>` : `<link rel="stylesheet" href="ats.css">`}
</head>
<body>

  <!-- Header ATS -->
  <header class="ats-header">
    <h1 class="ats-name">${data.name}</h1>
    <div class="ats-title">${data.title}</div>
    <div class="ats-contact-bar">
      <span>${data.location}</span>
      <span>•</span>
      <span><a href="mailto:${data.email}">${data.email}</a></span>
      <span>•</span>
      <span><a href="${data.website}">${data.website.replace('https://', '')}</a></span>
      <span>•</span>
      <span><a href="${data.linkedin}">linkedin.com/in/pvienne</a></span>
      <span>•</span>
      <span><a href="${data.github}">github.com/PhilippeVienne</a></span>
    </div>
  </header>

  <!-- Summary -->
  <section class="ats-section">
    <h2 class="ats-section-title">${t.titleSummary}</h2>
    <p class="ats-summary">
      ${isEn
        ? 'Accomplished Cloud & DevOps Solutions Architect and former Startup Technical Co-Founder (CTO) with <strong>15 years of software engineering and cloud infrastructure expertise</strong> (M.Sc. in Engineering, INSA Lyon). Specialist in high-availability, fault-tolerant multi-cloud environments (AWS, GCP, Azure, OpenShift, Kubernetes, Terraform). Proven track record delivering mission-critical platforms across heavily regulated industries (Nuclear at EDF, Aviation at Air France, Banking/FinTech at ActiveViam Singapore, and French Sovereign Cloud S3NS). Multi-certified AWS (Solutions Architect Professional, Developer, CloudOps, AI Practitioner), Google Cloud (Associate Cloud Engineer), and HashiCorp (Terraform Associate).'
        : 'Architecte Cloud & DevOps chevronné et ancien co-fondateur technique (CTO) de startup, fort de <strong>15 ans d\'expérience en ingénierie logicielle et infrastructure cloud</strong> (Diplômé Ingénieur INSA Lyon). Spécialiste de la résilience, de la haute disponibilité et de l\'automatisation multi-cloud (AWS, GCP, Azure, OpenShift, Kubernetes, Terraform). Track-record confirmé dans des secteurs hautement critiques et réglementés : nucléaire (EDF), secteur aérien (Air France), FinTech bancaire (ActiveViam à Singapour) et cloud souverain (S3NS). Multi-certifié AWS (Solutions Architect Professional, Developer, CloudOps, AI Practitioner), Google Cloud (Associate Cloud Engineer) et HashiCorp (Terraform Associate).'}
    </p>
  </section>

  <!-- Certifications -->
  <section class="ats-section">
    <h2 class="ats-section-title">${t.titleCerts}</h2>
    <div class="ats-certs-grid">
      ${(data.certifications || []).map(c => `
        <div class="ats-cert-item">
          • <strong>${c.name}</strong> — ${c.issuer} (${c.date}${c.expires ? ` · ${t.expires} ${c.expires}` : ''})
        </div>
      `).join('')}
    </div>
  </section>

  <!-- Experiences -->
  <section class="ats-section">
    <h2 class="ats-section-title">${t.titleExp}</h2>

    <!-- Devoteam -->
    <div class="ats-item">
      <div class="ats-item-header">
        <span class="ats-item-title">${isEn ? 'Most Valuable Cloud & DevOps Architect' : 'Most Valuable Cloud & DevOps Architect'} — Devoteam (AWS Premier Partner)</span>
        <span class="ats-item-date">${isEn ? 'Sept. 2025 – Present' : 'Sept. 2025 – Présent'}</span>
      </div>
      <div class="ats-item-subtitle">
        <span>${isEn ? 'Lead Cloud & DevOps Consultant — Strategic Enterprise Engagements' : 'Consultant architecte référent Cloud & DevOps sur missions stratégiques'}</span>
        <span class="ats-item-location">Lyon, France (Hybride)</span>
      </div>
      <ul class="ats-list">
        <li>
          <strong>${isEn ? 'EDF — DIVNUM / PAT Software (Developer Tooling Platform)' : 'EDF — DIVNUM / PAT Software (Plateau Outils de Développement)'} (${isEn ? 'Since May 2026 – Present' : 'Depuis Mai 2026 – Présent'}) :</strong> 
          ${isEn 
            ? 'Integrated Generative AI solutions within the software development lifecycle (SDLC); modernized developer tooling and accelerated DevSecOps engineering practices across EDF Group.'
            : 'Intégration de solutions d\'IA générative au sein du cycle de développement logiciel (SDLC) ; modernisation de l\'outillage développeurs et accélération des pratiques DevSecOps du groupe EDF.'}
        </li>
        <li>
          <strong>${isEn ? 'Vapérail (April 2026)' : 'Vapérail (Avril 2026)'} :</strong> 
          ${isEn
            ? 'Architected high-precision rail geotracking platform using PostGIS, MapLibre, OpenStreetMap, OpenRailMap, and SNCF open data. Deployed and hardened on Microsoft Azure. Concurrently delivered Kiro platform for Devoteam Lyon.'
            : 'Conception d\'un outil de géotracking ferroviaire haute précision (PostGIS, MapLibre, OpenStreetMap, OpenRailMap, open data SNCF) et déploiement sécurisé sur Microsoft Azure ; réalisation conjointe de la plateforme de gestion Kiro pour Devoteam Lyon.'}
        </li>
        <li>
          <strong>${isEn ? 'EDF — IT Expert OpenShift (Oct. 2025 – March 2026)' : 'EDF — Expert SI OpenShift (Oct. 2025 – Mars 2026)'} :</strong> 
          ${isEn
            ? 'Strategic migration of the corporate "Starter Kit WebApp" from AWS public cloud to Red Hat OpenShift (internal EDF CaaS) in a regulated nuclear environment. Implemented Security by Design, network segregation, and multi-cloud governance uniting AWS and Google Cloud Platform via S3NS (French Sovereign Cloud).'
            : 'Migration du « Starter Kit WebApp » d\'AWS vers Red Hat OpenShift (CaaS interne EDF) en environnement nucléaire régulé. Sécurité by Design, isolation réseau et gouvernance multi-cloud unifiant AWS et GCP via S3NS (Cloud souverain français).'}
        </li>
      </ul>
      <div class="ats-tech-line">
        <strong>Technologies :</strong> Red Hat OpenShift, Kubernetes, AWS, Google Cloud (S3NS), Microsoft Azure, PostGIS, MapLibre, GenAI, CI/CD, DevSecOps.
      </div>
    </div>

    <!-- Skyloud -->
    <div class="ats-item">
      <div class="ats-item-header">
        <span class="ats-item-title">${isEn ? 'Cloud & Kubernetes Architect' : 'Architecte Cloud & Kubernetes'} — Skyloud</span>
        <span class="ats-item-date">${isEn ? 'Nov. 2023 – Sept. 2025 (1 yr 11 mos)' : 'Nov. 2023 – Sept. 2025 (1 an 11 mois)'}</span>
      </div>
      <div class="ats-item-subtitle">
        <span>${isEn ? 'Cloud Architecture, Production Operations & FinOps Advisory' : 'Conseil en architecture cloud, infogérance & FinOps'}</span>
        <span class="ats-item-location">Lyon, France</span>
      </div>
      <ul class="ats-list">
        <li>
          ${isEn
            ? 'Architected fault-tolerant, resilient Kubernetes systems across multi-zone and multi-cloud topologies to guarantee enterprise SLAs.'
            : 'Conception et déploiement d\'architectures Kubernetes résilientes multi-zones et multi-cloud garantissant une disponibilité maximale.'}
        </li>
        <li>
          ${isEn
            ? 'Fully automated cloud infrastructure using <strong>HashiCorp Terraform (IaC)</strong> for automated configuration management and disaster recovery.'
            : 'Industrialisation complète via <strong>HashiCorp Terraform (IaC)</strong> pour automatiser le disaster recovery et supprimer les dérives de configuration.'}
        </li>
        <li>
          ${isEn
            ? 'Reduced client operational cloud costs by <strong>15%</strong> through FinOps optimizations and rightsizing; multiplied application throughput and performance by <strong>4x (+300%)</strong>.'
            : 'Réduction des coûts d\'infrastructure de <strong>15%</strong> par optimisation FinOps ; multiplication par 4 (<strong>+300%</strong>) des performances applicatives.'}
        </li>
        <li>
          ${isEn
            ? 'Deployed, orchestrated, and operated <strong>100+ Kubernetes clusters</strong> in production across 30 enterprise clients (€330k infrastructure budget).'
            : 'Gestion et infogérance de <strong>plus de 100 clusters Kubernetes</strong> en production pour un portefeuille de 30 clients cloud (budget 330 k€).'}
        </li>
      </ul>
      <div class="ats-tech-line">
        <strong>Technologies :</strong> AWS (EKS, RDS, CloudFront, EC2), Microsoft Azure, Scaleway, HashiCorp Terraform, Kubernetes, Helm, FinOps.
      </div>
    </div>

    <!-- Smartfire -->
    <div class="ats-item">
      <div class="ats-item-header">
        <span class="ats-item-title">${isEn ? 'Technical Co-Founder & CTO (Startup)' : 'Co-fondateur Technique & CTO (Startup)'} — Smartfire</span>
        <span class="ats-item-date">${isEn ? 'Feb. 2019 – Aug. 2023 (4 yrs 7 mos)' : 'Févr. 2019 – Août 2023 (4 ans 7 mois)'}</span>
      </div>
      <div class="ats-item-subtitle">
        <span>${isEn ? 'Technical pillar in a 2-person founding team • SaaS Product & R&D' : 'Pilier technique au sein d\'une startup de 2 co-fondateurs • Conception produit & R&D'}</span>
        <span class="ats-item-location">Lyon, France</span>
      </div>
      <ul class="ats-list">
        <li>
          ${isEn
            ? 'Architected and developed a cloud-native SaaS product orchestrating ephemeral development environments (Java, Kubernetes, OpenStack, TypeScript).'
            : 'Conception de bout en bout d\'une plateforme SaaS de gestion d\'environnements de développement cloud éphémères (Java, Kubernetes, OpenStack, TypeScript).'}
        </li>
        <li>
          ${isEn
            ? 'Advanced R&D: repackaged Microsoft Visual Studio Code for high-performance web distribution in the browser (containerized cloud IDE).'
            : 'R&D : Repackaging complet de Microsoft Visual Studio Code pour distribution et exécution dans un navigateur web (Cloud IDE conteneurisé).'}
        </li>
        <li>
          ${isEn
            ? 'Developed high-performance JavaScript libraries for WordPress ecosystems with full-stack React.js frontends.'
            : 'Développement de librairies JavaScript modernes pour WordPress avec refonte et développement complet sous React.js.'}
        </li>
        <li>
          ${isEn
            ? 'Designed and operated resilient cloud infrastructure handling high-traffic e-commerce operations (AWS, OVHcloud).'
            : 'Architecture et hébergement haute performance d\'infrastructures e-commerce à très fort trafic (AWS, OVHcloud).'}
        </li>
      </ul>
      <div class="ats-tech-line">
        <strong>Technologies :</strong> Kubernetes, Java, OpenStack, TypeScript, React.js, VSCode Web, AWS, OVHcloud, Docker, CI/CD.
      </div>
    </div>

    <!-- Atos & Air France -->
    <div class="ats-item">
      <div class="ats-item-header">
        <span class="ats-item-title">${isEn ? 'DevOps Engineer — Aerospace Datacenter Modernization' : 'Ingénieur DevOps — Secteur Aérien'} — Atos / Air France</span>
        <span class="ats-item-date">${isEn ? 'Oct. 2018 – Jan. 2019 (4 mos)' : 'Oct. 2018 – Janv. 2019 (4 mois)'}</span>
      </div>
      <div class="ats-item-subtitle">
        <span>${isEn ? 'Air France Private Datacenter Kubernetes Infrastructure' : 'Infrastructure Kubernetes en datacenter vSphere pour Air France'}</span>
        <span class="ats-item-location">Sophia Antipolis, France</span>
      </div>
      <ul class="ats-list">
        <li>
          ${isEn
            ? 'Deployed containerized Kubernetes clusters within Air France enterprise datacenters using RKE (Rancher Kubernetes Engine) and Rancher platform.'
            : 'Déploiement et orchestration de clusters Kubernetes conteneurisés au sein des datacenters vSphere privés d\'Air France via RKE et Rancher.'}
        </li>
      </ul>
      <div class="ats-tech-line">
        <strong>Technologies :</strong> Kubernetes, Rancher, RKE, VMware vSphere, Datacenter Privé, Docker.
      </div>
    </div>

    <!-- ActiveViam -->
    <div class="ats-item">
      <div class="ats-item-header">
        <span class="ats-item-title">${isEn ? 'Java Software Engineer & CI/CD (FinTech)' : 'Ingénieur Développeur Java & CI/CD (FinTech)'} — ActiveViam</span>
        <span class="ats-item-date">${isEn ? 'Feb. 2018 – Aug. 2018 (7 mos)' : 'Févr. 2018 – Août 2018 (7 mois)'}</span>
      </div>
      <div class="ats-item-subtitle">
        <span>${isEn ? 'High-Performance In-Memory OLAP Database for Tier-1 Banks' : 'Moteur de base de données OLAP in-memory pour institutions bancaires'}</span>
        <span class="ats-item-location">Singapour (Singapore)</span>
      </div>
      <ul class="ats-list">
        <li>
          ${isEn
            ? 'Designed and automated the CI/CD pipeline model for global institutional clients running ActivePivot (distributed in-memory OLAP database engine).'
            : 'Mise en œuvre du modèle CI/CD pour les institutions bancaires et financières clientes d\'ActivePivot (moteur OLAP in-memory distribué) ; tests d\'intégration automatisés.'}
        </li>
      </ul>
      <div class="ats-tech-line">
        <strong>Technologies :</strong> Java, ActivePivot, OLAP in-memory, CI/CD, Jenkins, Marchés Financiers.
      </div>
    </div>

    <!-- Early foundations -->
    <div class="ats-item">
      <div class="ats-item-header">
        <span class="ats-item-title">${isEn ? 'Early Career Engagements (Virtualization, Mobile, Scientific)' : 'Premières Expériences (Virtualisation, Mobile, Données Scientifiques)'}</span>
        <span class="ats-item-date">2013 – 2017</span>
      </div>
      <ul class="ats-list">
        <li><strong>Moonkey (2017) :</strong> ${isEn ? 'Virtualization infrastructure with Docker and Rancher; video streaming API.' : 'Infrastructure de virtualisation conteneurisée Docker/Rancher et API de streaming vidéo.'}</li>
        <li><strong>Freelance (2015 – 2016) :</strong> ${isEn ? 'Hybrid mobile apps (Ionic, HTML5/JS) and Ruby on Rails backends.' : 'Applications mobiles hybrides (Ionic, HTML5/JS) et architectures back-end Ruby on Rails.'}</li>
        <li><strong>Fédération Française de Spéléologie (2013) :</strong> ${isEn ? 'Scientific data exploitation software with JavaFX for cave sensors data visualization.' : 'Logiciel d\'exploitation et de visualisation graphique de capteurs scientifiques sous JavaFX.'}</li>
      </ul>
    </div>
  </section>

  <!-- Skills -->
  <section class="ats-section">
    <h2 class="ats-section-title">${t.titleSkills}</h2>
    ${(data.skills_categories || []).map(cat => `
      <div class="ats-skill-group">
        <strong>${cat.category} :</strong> ${(cat.skills || []).join(', ')}
      </div>
    `).join('')}
  </section>

  <!-- Education -->
  <section class="ats-section">
    <h2 class="ats-section-title">${t.titleEdu}</h2>
    ${(data.education || []).map(edu => `
      <div class="ats-item" style="margin-bottom: 4pt;">
        <div class="ats-item-header">
          <span class="ats-item-title">${edu.degree} — ${edu.institution}</span>
          <span class="ats-item-date">${edu.period}</span>
        </div>
        <div class="ats-item-subtitle">
          <span>${edu.details}</span>
          <span class="ats-item-location">${edu.location}</span>
        </div>
      </div>
    `).join('')}
  </section>

  <!-- Languages -->
  <section class="ats-section" style="margin-bottom: 0;">
    <h2 class="ats-section-title">${t.titleLang}</h2>
    <p class="ats-summary">
      ${(data.languages || []).map(l => `<strong>${l.name} :</strong> ${l.level}${l.detail ? ` (${l.detail})` : ''}`).join(' &nbsp;•&nbsp; ')}
    </p>
  </section>

</body>
</html>`;
}
