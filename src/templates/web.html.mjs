import { ICONS } from './icons.mjs';

/**
 * Template Web Showcase pour Philippe Vienne
 * Génère un site moderne, responsive, logos vectoriels officiels, mode sombre, filtres interactifs
 */

export function renderWebPage({ data, rawMarkdown, lang = 'fr', basePath = '' }) {
  const isEn = lang === 'en';
  const t = {
    navAbout: isEn ? 'About' : 'Profil',
    navTargets: isEn ? 'Sectors' : 'Secteurs Cibles',
    navCerts: isEn ? 'Certifications' : 'Certifications',
    navExp: isEn ? 'Experience' : 'Expériences',
    navSkills: isEn ? 'Skills' : 'Compétences',
    navEdu: isEn ? 'Education' : 'Formation',
    downloadPdf: isEn ? 'Download CV (PDF)' : 'Télécharger CV (PDF)',
    copyMarkdown: isEn ? 'Copy Markdown for AI' : 'Copier Markdown pour IA',
    targetsTag: isEn ? 'Operational Contexts' : 'Domaines d\'Intervention',
    targetsTitle: isEn ? 'Core Practice Areas & Architectures' : 'Environnements d\'Intervention & Architectures',
    targetsSub: isEn 
      ? 'Architectural authority, pragmatic technical co-founder agility, and hands-on multi-cloud engineering for critical systems.'
      : 'Autorité architecturale, agilité de co-fondateur tech et ingénierie multi-cloud de pointe pour systèmes critiques.',
    certsTag: isEn ? 'Verified Credentials' : 'Certifications Validées',
    certsTitle: isEn ? 'Cloud & Architecture Certifications' : 'Certifications Officielles Cloud & DevOps',
    certsSub: isEn
      ? 'Recognized multi-cloud expertise across AWS, Google Cloud, and HashiCorp.'
      : 'Expertise multi-cloud reconnue et certifiée par les éditeurs de référence (AWS, Google Cloud, HashiCorp).',
    filterAll: isEn ? 'All Experiences' : 'Toutes les expériences',
    filterCloud: isEn ? 'Cloud & Platforms' : 'Cloud & Plateformes',
    filterCto: isEn ? 'Startup & Co-Founder' : 'Startup & Co-fondateur',
    filterRegulated: isEn ? 'Regulated & Banking' : 'Secteurs Réglementés & Banques',
    skillsTag: isEn ? 'Technical Expertise' : 'Savoir-Faire Technique',
    skillsTitle: isEn ? 'Technical & Architectural Skills' : 'Compétences Techniques & Méthodologiques',
    eduTag: isEn ? 'Background' : 'Cursus',
    eduTitle: isEn ? 'Education & Languages' : 'Formation & Langues',
    languages: isEn ? 'Languages' : 'Langues',
    modalTitle: isEn ? 'Markdown Source (AI & ATS Ready)' : 'Source Markdown brute (Prête pour IA & ATS)',
    modalDesc: isEn 
      ? 'This structured Markdown can be copied directly into Claude, ChatGPT, Gemini, or ATS platforms.'
      : 'Ce fichier Markdown structuré est la source de vérité. Copiez-le directement pour vos assistants IA ou outils ATS.',
    copyBtn: isEn ? 'Copy Markdown to Clipboard' : 'Copier le Markdown',
    closeBtn: isEn ? 'Close' : 'Fermer',
    footerNote: isEn ? 'Single source of truth in Markdown • Hosted on GitHub Pages' : 'Source unique en Markdown • Hébergé sur GitHub Pages',
    footerLicense: isEn 
      ? 'Generator: AGPLv3 • Content: CC BY-SA 4.0 (excl. photo & third-party logos)' 
      : 'Générateur : AGPLv3 • Contenu : CC BY-SA 4.0 (hors photo & logos tiers)',
    pdfFile: isEn ? 'Philippe_Vienne_CV_EN.pdf' : 'Philippe_Vienne_CV_FR.pdf',
    pdfAltFile: isEn ? 'Philippe_Vienne_CV_FR.pdf' : 'Philippe_Vienne_CV_EN.pdf',
    pdfAltLabel: isEn ? 'French PDF' : 'English PDF',
    expires: isEn ? 'Expires' : 'Expire',
    obtained: isEn ? 'Obtained' : 'Obtenu',
    permanent: isEn ? 'Permanent contract (CDI)' : 'CDI',
    verifyCredly: isEn ? 'Verify on Credly' : 'Vérifier sur Credly',
    validStatus: isEn ? 'Valid' : 'Valide',
  };

  const relBase = isEn ? '..' : '.';
  const frUrl = isEn ? '../' : './';
  const enUrl = isEn ? './' : './en/';

  const allSkills = (data.skills_categories || []).flatMap(c => c.skills || []);

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": data.name,
    "jobTitle": data.title,
    "description": data.subtitle,
    "url": data.website,
    "image": `${data.website}/avatar.png`,
    "email": `mailto:${data.email}`,
    "sameAs": [
      data.linkedin,
      data.github,
      "https://www.credly.com/users/philippe-vienne"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lyon",
      "addressCountry": "France"
    },
    "alumniOf": (data.education || []).map(edu => ({
      "@type": "EducationalOrganization",
      "name": edu.institution,
      ...(edu.location ? { "address": edu.location } : {})
    })),
    "hasOccupation": {
      "@type": "Occupation",
      "name": data.title,
      "skills": allSkills.slice(0, 25).join(', ')
    },
    "hasCredential": (data.certifications || []).map(cert => ({
      "@type": "EducationalOccupationalCredential",
      "name": cert.name,
      "credentialCategory": "certification",
      "recognizedBy": {
        "@type": "Organization",
        "name": cert.issuer
      },
      ...(cert.credly_url ? { "url": cert.credly_url } : {}),
      ...(cert.credential_id ? { "identifier": cert.credential_id } : {})
    })),
    "knowsAbout": allSkills
  };

  return `<!DOCTYPE html>
<html lang="${lang}" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} — ${data.title}</title>
  <meta name="description" content="${data.subtitle}">
  <meta name="author" content="${data.name}">
  
  <!-- Open Graph / Social -->
  <meta property="og:type" content="profile">
  <meta property="og:title" content="${data.name} — ${data.title}">
  <meta property="og:description" content="${data.subtitle}">
  <meta property="og:url" content="${data.website}">
  <meta property="og:image" content="${data.website}/avatar.png">
  
  <!-- Machine-Readable Standards -->
  <link rel="alternate" type="application/json" href="${relBase}/resume.json" title="JSON Resume (v1.0.0)">
  <link rel="alternate" type="text/markdown" href="${relBase}/cv.${lang}.md" title="Markdown Source">
  <link rel="help" type="text/plain" href="${relBase}/llms.txt" title="LLMs AI Context">

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="${relBase}/favicon.svg">
  
  <!-- Stylesheet -->
  <link rel="stylesheet" href="${relBase}/style.css">
  
  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
${JSON.stringify(jsonLdData, null, 2)}
  </script>

  <!-- Theme anti-flicker inline script -->
  <script>
    (function() {
      try {
        const stored = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = stored || (prefersDark ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', theme);
      } catch (e) {}
    })();
  </script>
</head>
<body>

  <!-- ====================================================================
       NAVBAR
       ==================================================================== -->
  <header class="navbar">
    <div class="container navbar-inner">
      <a href="#hero" class="nav-brand">
        <img src="${relBase}/favicon.svg" alt="PV Monogram" class="brand-icon">
        <div class="brand-title">
          <span class="brand-name">${data.name}</span>
          <span class="brand-role">${isEn ? 'Cloud & DevOps Architect' : 'Architecte Cloud & DevOps'}</span>
        </div>
      </a>

      <nav>
        <ul class="nav-links">
          <li><a href="#hero" class="nav-link">${t.navAbout}</a></li>
          <li><a href="#targets" class="nav-link">${t.navTargets}</a></li>
          <li><a href="#certifications" class="nav-link">${t.navCerts}</a></li>
          <li><a href="#experience" class="nav-link">${t.navExp}</a></li>
          <li><a href="#skills" class="nav-link">${t.navSkills}</a></li>
          <li><a href="#education" class="nav-link">${t.navEdu}</a></li>
        </ul>
      </nav>

      <div class="nav-actions">
        <!-- Language Switcher -->
        <div class="lang-switch" title="Changer de langue / Switch language">
          <a href="${frUrl}" class="lang-btn ${!isEn ? 'active' : ''}">FR</a>
          <a href="${enUrl}" class="lang-btn ${isEn ? 'active' : ''}">EN</a>
        </div>

        <!-- Dark/Light Theme Toggle -->
        <button id="theme-toggle" class="btn-icon" aria-label="Basculer thème sombre / clair" title="Basculer thème">
          <span id="theme-icon">🌙</span>
        </button>

        <!-- PDF CTA -->
        <a href="${relBase}/${t.pdfFile}" download class="btn btn-primary nav-pdf-btn" title="${t.downloadPdf}">
          <span>📄</span>
          <span class="btn-text-pdf">PDF</span>
        </a>
      </div>
    </div>
  </header>

  <!-- ====================================================================
       HERO SECTION
       ==================================================================== -->
  <section id="hero" class="hero-section">
    <div class="container hero-grid">
      <div class="hero-avatar-wrapper">
        <img src="${relBase}/avatar.png" alt="Photo de ${data.name}" class="hero-avatar">
      </div>

      <div class="hero-content">
        <div class="hero-badge-row">
          <span class="pill-badge pill-badge-gold">
            <span class="badge-mini-logo">${ICONS.aws}</span> AWS Solutions Architect Pro
          </span>
          <span class="pill-badge pill-badge-claude">
            <span class="badge-mini-logo">${ICONS.claude}</span> Claude Certified Developer
          </span>
          <span class="pill-badge">
            <span class="badge-mini-logo">${ICONS.gcp}</span> Google Cloud Associate
          </span>
          <span class="pill-badge">
            <span class="badge-mini-logo">${ICONS.terraform}</span> Terraform Associate
          </span>
          <span class="pill-badge">
            <span class="badge-mini-logo badge-insa-logo">${ICONS.insa}</span> INSA Lyon Ingénieur
          </span>
        </div>

        <h1 class="hero-name">${data.name}</h1>
        <div class="hero-title">${data.title}</div>
        <p class="hero-desc">${data.subtitle}</p>

        <div class="hero-contact-row">
          <span class="contact-item">
            <span>📍</span> ${data.location}
          </span>
          <a href="mailto:${data.email}" class="contact-item">
            <span>✉️</span> ${data.email}
          </a>
          <a href="${data.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-item">
            <span>🔗</span> LinkedIn
          </a>
          <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="contact-item">
            <span>🐙</span> GitHub
          </a>
        </div>

        <div class="hero-cta-row">
          <a href="${relBase}/${t.pdfFile}" download class="btn btn-primary">
            <span>📄</span>
            <span>${t.downloadPdf}</span>
          </a>
          <button type="button" class="btn btn-secondary" data-open-modal="markdown">
            <span>🤖</span>
            <span>${t.copyMarkdown}</span>
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- ====================================================================
       TARGET SECTORS / ALIGNEMENT MARCHÉ
       ==================================================================== -->
  <section id="targets" class="section">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">${t.targetsTag}</span>
        <h2 class="section-title">${t.targetsTitle}</h2>
        <p class="section-subtitle">${t.targetsSub}</p>
      </div>

      <div class="targets-grid">
        ${(data.targets || []).map(target => {
          const targetIcon = target.id === 'cloud-providers' ? `
            <svg class="sector-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
            </svg>
          ` : target.id === 'consulting-msp' ? `
            <svg class="sector-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              <rect width="20" height="14" x="2" y="6" rx="2"/>
            </svg>
          ` : `
            <svg class="sector-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          `;

          const serviceChips = target.id === 'cloud-providers' ? `
            <div class="target-service-logos">
              <span class="target-service-chip">${ICONS.aws} <span>AWS</span></span>
              <span class="target-service-chip">${ICONS.gcp} <span>Google Cloud</span></span>
              <span class="target-service-chip">${ICONS.azure} <span>Azure</span></span>
            </div>
          ` : target.id === 'consulting-msp' ? `
            <div class="target-service-logos">
              <span class="target-service-chip">${ICONS.devoteam} <span>Devoteam</span></span>
              <span class="target-service-chip">${ICONS.skyloud} <span>Skyloud</span></span>
            </div>
          ` : `
            <div class="target-service-logos">
              <span class="target-service-chip">${ICONS.edf} <span>EDF</span></span>
              <span class="target-service-chip">${ICONS.airfrance} <span>Air France</span></span>
            </div>
          `;

          return `
            <div class="target-card">
              <div class="target-header">
                <div class="target-icon">
                  ${targetIcon}
                </div>
                <h3 class="target-title">${target.title}</h3>
              </div>
              <p class="target-desc">${target.desc}</p>
              ${serviceChips}
              <div class="target-tags">
                ${(target.tags || []).map(tag => `<span class="target-tag">${tag}</span>`).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  </section>

  <!-- ====================================================================
       CERTIFICATIONS SHOWCASE
       ==================================================================== -->
  <section id="certifications" class="section" style="background-color: var(--bg-primary);">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">${t.certsTag}</span>
        <h2 class="section-title">${t.certsTitle}</h2>
        <p class="section-subtitle">${t.certsSub}</p>
      </div>

      <div class="certs-grid">
        ${(data.certifications || []).filter(c => c.badge !== 'devoteam').map(cert => {
          const isClaude = cert.badge === 'anthropic' || cert.badge === 'claude';
          const badgeClass = cert.badge === 'aws-pro' ? 'cert-badge-aws-pro'
            : cert.badge === 'aws' ? 'cert-badge-aws'
            : cert.badge === 'gcp' ? 'cert-badge-gcp'
            : cert.badge === 'hashicorp' ? 'cert-badge-hashicorp'
            : isClaude ? 'cert-badge-anthropic'
            : 'cert-badge-devoteam';

          const certLogo = (cert.badge === 'aws-pro' || cert.badge === 'aws') ? ICONS.aws
            : cert.badge === 'gcp' ? ICONS.gcp
            : cert.badge === 'hashicorp' ? ICONS.terraform
            : isClaude ? ICONS.claude
            : ICONS.devoteam;

          const badgeVisual = cert.badge_image
            ? `<div class="cert-badge-img-wrapper" title="${cert.name}">
                <img src="${relBase}/badges/${cert.badge_image}" alt="${cert.name}" class="cert-badge-img" loading="lazy">
              </div>`
            : `<div class="cert-badge-icon ${badgeClass}" title="${cert.issuer}">
                ${certLogo}
              </div>`;

          const cardClasses = [
            'cert-card',
            cert.highlight ? 'featured' : '',
            isClaude ? 'featured-claude' : ''
          ].filter(Boolean).join(' ');

          const highDemandTag = isClaude
            ? `<span class="cert-badge-tag-claude">🔥 ${isEn ? 'High Demand • GenAI' : 'Forte Demande • GenAI'}</span>`
            : '';

          return `
            <div class="${cardClasses}">
              <div class="cert-header">
                ${badgeVisual}
                <div class="cert-info">
                  <div class="cert-info-top">
                    <h3 class="cert-name">${cert.name}</h3>
                    ${highDemandTag}
                  </div>
                  <div class="cert-issuer">${cert.issuer}</div>
                </div>
              </div>
              <div class="cert-footer">
                <div class="cert-dates">
                  <span>${t.obtained}: <strong>${cert.date}</strong></span>
                  ${cert.expires ? `<span>${t.expires}: <strong>${cert.expires}</strong></span>` : `<span class="cert-status">✓ ${t.validStatus}</span>`}
                </div>
                ${cert.credly_url ? `
                  <a href="${cert.credly_url}" target="_blank" rel="noopener noreferrer" class="cert-credly-btn" title="${t.verifyCredly}">
                    <span>Credly</span>
                    <span class="credly-arrow">↗</span>
                  </a>
                ` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="certs-internal-wrapper">
        <div class="certs-internal-title">
          ${isEn ? 'Continuous Learning & Internal Accreditations' : 'Accréditations & Engagements Internes (Devoteam)'}
        </div>
        <div class="certs-internal-grid">
          ${(data.certifications || []).filter(c => c.badge === 'devoteam').map(cert => `
            <div class="cert-card cert-card-internal">
              <div class="cert-header">
                <div class="cert-badge-icon cert-badge-devoteam" title="${cert.issuer}">
                  ${ICONS.devoteam}
                </div>
                <div class="cert-info">
                  <h3 class="cert-name">${cert.name}</h3>
                  <div class="cert-issuer">${cert.issuer}</div>
                </div>
              </div>
              <div class="cert-footer">
                <div class="cert-dates">
                  <span>${t.obtained}: <strong>${cert.date}</strong></span>
                  <span class="cert-status">✓ ${t.validStatus}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  </section>

  <!-- ====================================================================
       PROFESSIONAL EXPERIENCE TIMELINE
       ==================================================================== -->
  <section id="experience" class="section">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">${isEn ? 'Career Trajectory' : 'Parcours & Réalisations'}</span>
        <h2 class="section-title">${isEn ? 'Professional Experience' : 'Expériences Professionnelles'}</h2>
        <p class="section-subtitle">
          ${isEn 
            ? '15 years of technical leadership, cloud architecture, and critical platform engineering.'
            : '15 ans d\'expérience dans l\'architecture cloud, le conseil à haute valeur ajoutée et la direction technique.'}
        </p>
      </div>

      <!-- Filters -->
      <div class="filter-tabs">
        <button class="filter-btn active" data-filter="all">${t.filterAll}</button>
        <button class="filter-btn" data-filter="cloud">${t.filterCloud}</button>
        <button class="filter-btn" data-filter="cto">${t.filterCto}</button>
        <button class="filter-btn" data-filter="regulated">${t.filterRegulated}</button>
      </div>

      <div class="timeline">

        <!-- DEVOTEAM -->
        <article class="exp-card" data-category="cloud regulated">
          <div class="exp-header">
            <div class="exp-role-group">
              <h3 class="exp-role">${isEn ? 'Most Valuable Cloud & DevOps Architect' : 'Most Valuable Cloud & DevOps Architect'}</h3>
              <div class="exp-company-row">
                <span class="company-logo" title="Devoteam">${ICONS.devoteam}</span>
                <span class="exp-company">Devoteam</span>
                <span class="partner-badge"><span class="partner-logo">${ICONS.aws}</span> AWS Premier Partner</span>
              </div>
            </div>
            <div class="exp-meta">
              <span class="exp-period">${isEn ? 'Sept. 2025 – Present' : 'Septembre 2025 – Présent'} (${t.permanent})</span>
              <span>📍 Lyon, France (Hybride)</span>
            </div>
          </div>

          <p style="color: var(--text-secondary); margin-bottom: 1rem;">
            ${isEn 
              ? 'Lead Cloud & DevOps Consultant intervening on strategic, highly regulated client engagements:'
              : 'Consultant architecte référent Cloud & DevOps intervenant sur des missions stratégiques à haute technicité :'}
          </p>

          <div class="exp-missions">
            <!-- Mission EDF IA -->
            <div class="mission-block">
              <div class="mission-title">
                <span class="mission-logo" title="EDF">${ICONS.edf}</span>
                <span>EDF — DIVNUM / PAT Software (Plateau Outils de Développement)</span>
              </div>
              <div class="mission-meta">
                ${isEn ? 'Since May 2026 – Present' : 'Depuis Mai 2026 – Présent'} • ${isEn ? 'AI in SDLC & DevSecOps' : 'IA dans le cycle logiciel & DevSecOps'}
              </div>
              <ul class="exp-bullets">
                <li class="exp-bullet">
                  ${isEn 
                    ? 'Integrated <strong>Generative AI solutions</strong> directly within the software development lifecycle (SDLC).'
                    : 'Intégration de solutions d\'<strong>Intelligence Artificielle générative</strong> au sein de la chaîne d\'outillage de développement logiciel.'}
                </li>
                <li class="exp-bullet">
                  ${isEn
                    ? 'Accelerated developer workflows and modernized DevSecOps tooling for maximum engineering throughput.'
                    : 'Accélération des pratiques d\'ingénierie logicielle et outillage des développeurs pour maximiser la productivité et la qualité de code.'}
                </li>
              </ul>
              <div class="exp-tech-row" style="margin-top: 0.5rem; padding-top: 0.5rem;">
                ${['GenAI', 'DevSecOps', 'Developer Tooling', 'Python', 'CI/CD'].map(tech => `
                  <span class="tech-tag">${tech}</span>
                `).join('')}
              </div>
            </div>

            <!-- Mission Vapérail -->
            <div class="mission-block">
              <div class="mission-title">
                <span>Vapérail & Devoteam Lyon — Géotracking Ferroviaire & Plateforme Kiro</span>
              </div>
              <div class="mission-meta">
                ${isEn ? 'April 2026' : 'Avril 2026'} • ${isEn ? 'GIS & Cloud Azure Architecture' : 'SIG & Déploiement Cloud Azure'}
              </div>
              <ul class="exp-bullets">
                <li class="exp-bullet">
                  ${isEn
                    ? 'Designed a high-precision railway geotracking tool using <strong>PostGIS, MapLibre, OpenStreetMap, OpenRailMap</strong> and SNCF open data.'
                    : 'Conception d\'un outil de géotracking ferroviaire haute précision (<strong>PostGIS, MapLibre</strong>, OpenStreetMap, OpenRailMap et open data SNCF).'}
                </li>
                <li class="exp-bullet">
                  ${isEn
                    ? 'Architected cloud deployment and security hardening on <strong>Microsoft Azure</strong>; delivered the Kiro platform for Devoteam Lyon.'
                    : 'Déploiement et sécurisation sur <strong>Microsoft Azure</strong> ; réalisation en parallèle de la plateforme de gestion Kiro pour Devoteam Lyon.'}
                </li>
              </ul>
              <div class="exp-tech-row" style="margin-top: 0.5rem; padding-top: 0.5rem;">
                ${['Microsoft Azure', 'PostGIS', 'MapLibre', 'OpenRailMap', 'API REST'].map(tech => `
                  <span class="tech-tag">${tech}</span>
                `).join('')}
              </div>
            </div>

            <!-- Mission EDF OpenShift -->
            <div class="mission-block">
              <div class="mission-title">
                <span class="mission-logo" title="Red Hat OpenShift">${ICONS.openshift}</span>
                <span class="mission-logo" title="EDF">${ICONS.edf}</span>
                <span>EDF — Expert SI OpenShift (Environnement Nucléaire Régulé)</span>
              </div>
              <div class="mission-meta">
                ${isEn ? 'Oct. 2025 – March 2026 (6 mos)' : 'Octobre 2025 – Mars 2026 (6 mois)'} • ${isEn ? 'Regulated Nuclear CaaS Migration & Sovereign Multi-Cloud' : 'Migration CaaS Nucléaire Régulé & Multi-Cloud Souverain'}
              </div>
              <ul class="exp-bullets">
                <li class="exp-bullet">
                  ${isEn
                    ? 'Strategic migration of the corporate "Starter Kit WebApp" from public AWS to <strong>Red Hat OpenShift (EDF internal CaaS)</strong>.'
                    : 'Migration stratégique du « Starter Kit WebApp » d\'AWS public vers <strong>Red Hat OpenShift</strong> (CaaS interne EDF).'}
                </li>
                <li class="exp-bullet">
                  ${isEn
                    ? 'Engineered cloud-native architectures compliant with stringent <strong>nuclear safety regulations</strong> and Security by Design.'
                    : 'Architecture cloud-native respectant les exigences strictes de <strong>sûreté nucléaire</strong> et Sécurité by Design.'}
                </li>
                <li class="exp-bullet">
                  ${isEn
                    ? 'Established multi-cloud governance uniting AWS and Google Cloud Platform via <strong>S3NS (French Sovereign Cloud)</strong>.'
                    : 'Mise en œuvre d\'une gouvernance multi-cloud unifiant AWS et GCP via <strong>S3NS (Cloud souverain français)</strong>.'}
                </li>
              </ul>
              <div class="exp-tech-row" style="margin-top: 0.5rem; padding-top: 0.5rem;">
                ${['Red Hat OpenShift', 'Kubernetes', 'AWS', 'GCP / S3NS', 'Nucléaire Régulé', 'Sécurité by Design'].map(tech => `
                  <span class="tech-tag">${tech}</span>
                `).join('')}
              </div>
            </div>
          </div>
        </article>

        <!-- SKYLOUD -->
        <article class="exp-card" data-category="cloud">
          <div class="exp-header">
            <div class="exp-role-group">
              <h3 class="exp-role">${isEn ? 'Cloud & Kubernetes Solutions Architect' : 'Architecte Cloud & Kubernetes'}</h3>
              <div class="exp-company-row">
                <span class="company-logo" title="Skyloud">${ICONS.skyloud}</span>
                <span class="exp-company">Skyloud</span>
                <span class="partner-badge"><span class="partner-logo">${ICONS.aws}</span> <span class="partner-logo">${ICONS.gcp}</span> Cloud Partner</span>
              </div>
            </div>
            <div class="exp-meta">
              <span class="exp-period">${isEn ? 'Nov. 2023 – Sept. 2025 (1 yr 11 mos)' : 'Novembre 2023 – Septembre 2025 (1 an 11 mois)'}</span>
              <span>📍 Lyon, France</span>
            </div>
          </div>

          <p style="color: var(--text-secondary); margin-bottom: 0.75rem;">
            ${isEn
              ? 'Managed cloud infrastructure portfolio across 30 clients representing an annual budget of €330k.'
              : 'Pilotage technique et infogérance d\'un portefeuille de 30 clients cloud pour un budget annuel de 330 k€.'}
          </p>

          <ul class="exp-bullets">
            <li class="exp-bullet">
              ${isEn
                ? '<strong>Resilience & Disaster Recovery:</strong> Architected fault-tolerant, multi-zone Kubernetes setups with Terraform IaC.'
                : '<strong>Résilience & Haute Disponibilité :</strong> Conception d\'architectures Kubernetes tolérantes aux pannes et disaster recovery via Terraform IaC.'}
            </li>
            <li class="exp-bullet">
              ${isEn
                ? '<strong>FinOps & Performance:</strong> Reduced client operating costs by <strong>15%</strong> while boosting application performance by <strong>4x (+300%)</strong>.'
                : '<strong>FinOps & Performance :</strong> Réduction des coûts d\'exploitation cloud de <strong>15%</strong> et multiplication par 4 (<strong>+300%</strong>) des performances applicatives.'}
            </li>
            <li class="exp-bullet">
              ${isEn
                ? '<strong>Production Scale:</strong> Deployed, secured, and operated <strong>100+ Kubernetes clusters</strong> in live multi-cloud environments.'
                : '<strong>Scale opérationnel :</strong> Déploiement et supervision de <strong>plus de 100 clusters Kubernetes</strong> en production multi-cloud.'}
            </li>
          </ul>

          <div class="exp-tech-row">
            ${['AWS (EKS, RDS, CloudFront, EC2)', 'Microsoft Azure', 'Scaleway', 'Terraform', 'Kubernetes', 'Helm', 'FinOps'].map(tech => `
              <span class="tech-tag">${tech}</span>
            `).join('')}
          </div>
        </article>

        <!-- SMARTFIRE -->
        <article class="exp-card" data-category="cto">
          <div class="exp-header">
            <div class="exp-role-group">
              <h3 class="exp-role">${isEn ? 'Technical Co-Founder & CTO (Startup)' : 'Co-fondateur Technique & CTO (Startup)'}</h3>
              <div class="exp-company-row">
                <span class="exp-company">Smartfire</span>
                <span class="partner-badge">Startup SaaS & R&D</span>
              </div>
            </div>
            <div class="exp-meta">
              <span class="exp-period">${isEn ? 'Feb. 2019 – Aug. 2023 (4 yrs 7 mos)' : 'Février 2019 – Août 2023 (4 ans 7 mois)'}</span>
              <span>📍 Lyon, France</span>
            </div>
          </div>

          <p style="color: var(--text-secondary); margin-bottom: 0.75rem;">
            ${isEn
              ? 'Technical pillar of a 2-person founding team: end-to-end cloud-native SaaS engineering, developer tools R&D, full-stack dev, and cloud hosting.'
              : 'Pilier technique au sein d\'une équipe de deux co-fondateurs : conception intégrale du produit SaaS, R&D outillage dev, développement full-stack et hébergement cloud.'}
          </p>

          <ul class="exp-bullets">
            <li class="exp-bullet">
              ${isEn
                ? '<strong>Cloud-Native SaaS:</strong> Architected and built an ephemeral cloud development environment orchestration platform.'
                : '<strong>SaaS Cloud-Native :</strong> Architecture et développement complet d\'une plateforme SaaS de gestion d\'environnements de développement cloud.'}
            </li>
            <li class="exp-bullet">
              ${isEn
                ? '<strong>Advanced R&D:</strong> Repackaged <strong>Microsoft Visual Studio Code</strong> for seamless browser execution (Web Cloud IDE).'
                : '<strong>R&D Avancée :</strong> Repackaging complet de <strong>VSCode</strong> pour distribution et exécution dans un navigateur web.'}
            </li>
            <li class="exp-bullet">
              ${isEn
                ? '<strong>Web Engineering:</strong> Authored custom JavaScript libraries for WordPress with complete React.js frontend architecture.'
                : '<strong>Ingénierie Frontend :</strong> Développement de librairies JavaScript modernes pour WordPress et applications complètes sous React.js.'}
            </li>
            <li class="exp-bullet">
              ${isEn
                ? '<strong>High-Traffic Hosting:</strong> Engineered robust cloud infrastructure handling heavy-load e-commerce operations (AWS, OVHcloud).'
                : '<strong>Hébergement Haute Charge :</strong> Architecture et exploitation d\'infrastructures e-commerce à très fort trafic (AWS, OVHcloud).'}
            </li>
          </ul>

          <div class="exp-tech-row">
            ${['Kubernetes', 'Java', 'OpenStack', 'TypeScript', 'React.js', 'VSCode Web', 'AWS', 'OVHcloud'].map(tech => `
              <span class="tech-tag">${tech}</span>
            `).join('')}
          </div>
        </article>

        <!-- ATOS / AIR FRANCE -->
        <article class="exp-card" data-category="cloud regulated">
          <div class="exp-header">
            <div class="exp-role-group">
              <h3 class="exp-role">${isEn ? 'DevOps Engineer — Aerospace Datacenter Modernization' : 'Ingénieur DevOps — Secteur Aérien'}</h3>
              <div class="exp-company-row">
                <span class="company-logo" title="Atos">${ICONS.atos}</span>
                <span class="exp-company">Atos</span>
                <span style="color: var(--text-muted); font-size: 0.8rem;">•</span>
                <span class="company-logo" title="Air France">${ICONS.airfrance}</span>
                <span class="exp-company">Air France</span>
              </div>
            </div>
            <div class="exp-meta">
              <span class="exp-period">${isEn ? 'Oct. 2018 – Jan. 2019 (4 mos)' : 'Octobre 2018 – Janvier 2019 (4 mois)'}</span>
              <span>📍 Sophia Antipolis, France</span>
            </div>
          </div>

          <ul class="exp-bullets">
            <li class="exp-bullet">
              ${isEn
                ? 'Supported <strong>Air France</strong> in deploying containerized Kubernetes platforms across private vSphere enterprise datacenters.'
                : 'Accompagnement d\'<strong>Air France</strong> pour le déploiement d\'infrastructure Kubernetes conteneurisée dans ses datacenters vSphere privés.'}
            </li>
            <li class="exp-bullet">
              ${isEn
                ? 'Automated cluster provisioning and lifecycle via <strong>RKE (Rancher Kubernetes Engine)</strong> and Rancher management console.'
                : 'Déploiement automatisé via <strong>RKE (Rancher Kubernetes Engine)</strong> et supervision centralisée avec Rancher.'}
            </li>
          </ul>

          <div class="exp-tech-row">
            ${['Kubernetes', 'RKE', 'Rancher', 'VMware vSphere', 'Datacenter Privé', 'Docker'].map(tech => `
              <span class="tech-tag">${tech}</span>
            `).join('')}
          </div>
        </article>

        <!-- ACTIVEVIAM -->
        <article class="exp-card" data-category="regulated">
          <div class="exp-header">
            <div class="exp-role-group">
              <h3 class="exp-role">${isEn ? 'Java Software Engineer & CI/CD (FinTech)' : 'Ingénieur Développeur Java & CI/CD (FinTech)'}</h3>
              <div class="exp-company-row">
                <span class="exp-company">ActiveViam</span>
                <span class="partner-badge">FinTech Singapour</span>
              </div>
            </div>
            <div class="exp-meta">
              <span class="exp-period">${isEn ? 'Feb. 2018 – Aug. 2018 (7 mos)' : 'Février 2018 – Août 2018 (7 mois)'}</span>
              <span>📍 Singapour (Singapore)</span>
            </div>
          </div>

          <ul class="exp-bullets">
            <li class="exp-bullet">
              ${isEn
                ? 'Implemented enterprise CI/CD models for institutional banking clients running <strong>ActivePivot</strong> (in-memory distributed OLAP database).'
                : 'Mise en œuvre du modèle d\'intégration et de déploiement continu (CI/CD) pour les banques clientes d\'<strong>ActivePivot</strong> (moteur OLAP in-memory).'}
            </li>
            <li class="exp-bullet">
              ${isEn
                ? 'Developed automated high-throughput integration test suites and hardened client build pipelines.'
                : 'Conception de tests d\'intégration automatisés à haute fiabilité pour architectures financières temps réel.'}
            </li>
          </ul>

          <div class="exp-tech-row">
            ${['Java', 'ActivePivot', 'Base de données OLAP', 'CI/CD', 'Jenkins', 'Marchés Financiers'].map(tech => `
              <span class="tech-tag">${tech}</span>
            `).join('')}
          </div>
        </article>

        <!-- EARLY EXPERIENCES SUMMARY ACCORDION / CARD -->
        <article class="exp-card" data-category="cloud">
          <div class="exp-header">
            <div class="exp-role-group">
              <h3 class="exp-role">${isEn ? 'Early Career Engineering Engagements' : 'Premières Expériences & Fondations Ingénieur'}</h3>
              <div class="exp-company-row">
                <span class="exp-company">Moonkey • Freelance • Fédération Française de Spéléologie</span>
              </div>
            </div>
            <div class="exp-meta">
              <span class="exp-period">2013 – 2017</span>
              <span>📍 Lyon & Sophia Antipolis</span>
            </div>
          </div>

          <ul class="exp-bullets">
            <li class="exp-bullet">
              <strong>Moonkey (2017, Lyon) :</strong> ${isEn ? 'Virtualization infrastructure with Docker and Rancher; video streaming and transcoding REST API.' : 'Infrastructure de virtualisation conteneurisée Docker/Rancher ; API de conversion et streaming vidéo.'}
            </li>
            <li class="exp-bullet">
              <strong>Freelance (2015 – 2016, Lyon) :</strong> ${isEn ? 'Cross-platform mobile apps (Ionic, HTML5/JS) and backend API development (Ruby on Rails).' : 'Applications mobiles hybrides (Ionic, HTML5/JS) et architectures back-end (Ruby on Rails).'}
            </li>
            <li class="exp-bullet">
              <strong>Fédération Française de Spéléologie (2013, Sophia) :</strong> ${isEn ? 'Scientific data exploitation software with JavaFX for cave sensors data visualization.' : 'Logiciel scientifique en JavaFX pour le traitement et la visualisation graphique de capteurs en cavités.'}
            </li>
          </ul>

          <div class="exp-tech-row">
            ${['Docker', 'Rancher', 'Ruby on Rails', 'Ionic', 'JavaFX'].map(tech => `
              <span class="tech-tag">${tech}</span>
            `).join('')}
          </div>
        </article>

      </div>
    </div>
  </section>

  <!-- ====================================================================
       SKILLS MATRIX
       ==================================================================== -->
  <section id="skills" class="section" style="background-color: var(--bg-primary);">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">${t.skillsTag}</span>
        <h2 class="section-title">${t.skillsTitle}</h2>
      </div>

      <div class="skills-grid-primary">
        ${(data.skills_categories || []).slice(0, 3).map(cat => `
          <div class="skill-category-card">
            <h3 class="skill-category-title">
              <span>●</span>
              <span>${cat.category}</span>
            </h3>
            <div class="skill-pills">
              ${(cat.skills || []).map(s => {
                return `<span class="skill-pill">${s}</span>`;
              }).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <div class="skills-grid-secondary">
        ${(data.skills_categories || []).slice(3).map(cat => `
          <div class="skill-category-card">
            <h3 class="skill-category-title">
              <span>●</span>
              <span>${cat.category}</span>
            </h3>
            <div class="skill-pills">
              ${(cat.skills || []).map(s => {
                return `<span class="skill-pill">${s}</span>`;
              }).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- ====================================================================
       EDUCATION & LANGUAGES
       ==================================================================== -->
  <section id="education" class="section">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">${t.eduTag}</span>
        <h2 class="section-title">${t.eduTitle}</h2>
      </div>

      <div class="dual-grid">
        <!-- Education -->
        <div class="edu-card">
          ${(data.education || []).map(edu => `
            <div class="edu-item">
              <div class="edu-degree">${edu.degree}</div>
              <div class="edu-school">
                ${edu.institution === 'INSA Lyon' ? `<span class="edu-logo" title="INSA Lyon">${ICONS.insa}</span>` : ''}
                <strong>${edu.institution}</strong> • ${edu.location}
              </div>
              <div class="edu-period">${edu.period}</div>
              <div class="edu-detail">${edu.details}</div>
            </div>
          `).join('')}
        </div>

        <!-- Languages -->
        <div class="edu-card">
          <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">
            ${t.languages}
          </h3>
          <ul class="lang-list">
            ${(data.languages || []).map(l => `
              <li class="lang-item">
                <div class="lang-header">
                  <span class="lang-name">${l.name}</span>
                  <span class="lang-badge">${l.level}</span>
                </div>
                ${l.detail ? `<div class="lang-detail">${l.detail}</div>` : ''}
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- ====================================================================
       MODAL MARKDOWN (POUR IA & ATS)
       ==================================================================== -->
  <div id="markdown-modal" class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <div class="modal-content">
      <div class="modal-header">
        <h3 id="modal-title" class="modal-title">${t.modalTitle}</h3>
        <button type="button" class="btn-icon" data-close-modal="markdown" aria-label="${t.closeBtn}">✕</button>
      </div>
      <div class="modal-body">
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem;">
          ${t.modalDesc}
        </p>
        <pre class="markdown-preview"><code id="markdown-code-block">${escapeHtml(rawMarkdown)}</code></pre>
      </div>
      <div class="modal-footer" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
        <div style="display: flex; gap: 0.75rem; align-items: center; font-size: 0.85rem;">
          <a href="${relBase}/resume.json" target="_blank" style="color: var(--eu-blue); text-decoration: underline; font-weight: 600;">
            ⚡ resume.json (JSON Resume standard)
          </a>
          <span>•</span>
          <a href="${relBase}/llms.txt" target="_blank" style="color: var(--eu-blue); text-decoration: underline;">
            🤖 llms.txt (AI Context)
          </a>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button type="button" class="btn btn-secondary" data-close-modal="markdown">${t.closeBtn}</button>
          <button type="button" id="copy-markdown-btn" class="btn btn-primary">
            <span>📋</span>
            <span>${t.copyBtn}</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- ====================================================================
       FOOTER
       ==================================================================== -->
  <footer class="footer">
    <div class="container footer-inner">
      <div>
        <strong>${data.name}</strong> — ${data.title}
        <div class="footer-source-note">${t.footerNote}</div>
        <div class="footer-source-note" style="margin-top: 0.25rem;">
          <a href="${relBase}/LICENSE.md" target="_blank" style="color: inherit; text-decoration: underline;">${t.footerLicense}</a>
        </div>
      </div>
      <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
        <a href="${relBase}/resume.json" target="_blank" style="color: var(--eu-blue); font-weight: 600;" title="JSON Resume Schema v1.0.0">
          ⚡ resume.json
        </a>
        <span>•</span>
        <a href="${relBase}/cv.${lang}.md" target="_blank" style="color: var(--eu-blue);" title="Markdown source de vérité">
          📄 cv.${lang}.md
        </a>
        <span>•</span>
        <a href="${relBase}/llms.txt" target="_blank" style="color: var(--eu-blue);" title="Fichier standard pour agents d'IA">
          🤖 llms.txt
        </a>
        <span>•</span>
        <a href="${data.github}/whoami" target="_blank" rel="noopener noreferrer" style="color: var(--text-muted);">
          GitHub Repo
        </a>
      </div>
    </div>
  </footer>

  <!-- Scripts -->
  <script src="${relBase}/app.js"></script>
</body>
</html>`;
}

function escapeHtml(string) {
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
