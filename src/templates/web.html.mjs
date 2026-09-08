/**
 * Template Web Showcase pour Philippe Vienne
 * Génère un site moderne, responsive, avec Bleu Europe, mode sombre, filtres interactifs
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
    downloadPdf: isEn ? 'Download ATS CV (PDF)' : 'Télécharger CV ATS (PDF)',
    copyMarkdown: isEn ? 'Copy Markdown for AI' : 'Copier Markdown pour IA',
    availableBadge: isEn ? 'Open for strategic opportunities' : 'À l\'écoute d\'opportunités stratégiques',
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
    pdfFile: isEn ? 'Philippe_Vienne_CV_EN.pdf' : 'Philippe_Vienne_CV_FR.pdf',
    pdfAltFile: isEn ? 'Philippe_Vienne_CV_FR.pdf' : 'Philippe_Vienne_CV_EN.pdf',
    pdfAltLabel: isEn ? 'French PDF' : 'English PDF',
    expires: isEn ? 'Expires' : 'Expire',
    obtained: isEn ? 'Obtained' : 'Obtenu',
    permanent: isEn ? 'Permanent contract (CDI)' : 'CDI',
  };

  const relBase = isEn ? '..' : '.';
  const frUrl = isEn ? '../' : './';
  const enUrl = isEn ? './' : './en/';

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
  
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="${relBase}/favicon.svg">
  
  <!-- Stylesheet -->
  <link rel="stylesheet" href="${relBase}/style.css">
  
  <!-- Schema.org JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "${data.name}",
    "jobTitle": "${data.title}",
    "url": "${data.website}",
    "sameAs": [
      "${data.linkedin}",
      "${data.github}"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lyon",
      "addressCountry": "France"
    },
    "knowsAbout": ["Kubernetes", "AWS", "Google Cloud", "DevOps", "OpenShift", "Terraform", "FinOps", "Cloud Architecture"]
  }
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

        <!-- ATS PDF CTA -->
        <a href="${relBase}/${t.pdfFile}" download class="btn btn-primary" title="${t.downloadPdf}">
          <span>📄</span>
          <span>PDF ATS</span>
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
        <div class="hero-status-badge" title="${t.availableBadge}">
          <span style="font-size: 14px;">✓</span>
        </div>
      </div>

      <div class="hero-content">
        <div class="hero-badge-row">
          <span class="pill-badge pill-badge-gold">
            ★ AWS Solutions Architect Pro
          </span>
          <span class="pill-badge">
            ☁ Google Cloud Associate
          </span>
          <span class="pill-badge">
            ⚙ Terraform Associate
          </span>
          <span class="pill-badge">
            🎓 INSA Lyon Ingénieur
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
        ${(data.targets || []).map(target => `
          <div class="target-card">
            <div class="target-header">
              <div class="target-icon">
                ${target.id === 'cloud-providers' ? '☁️' : target.id === 'consulting-msp' ? '💼' : '🏦'}
              </div>
              <h3 class="target-title">${target.title}</h3>
            </div>
            <p class="target-desc">${target.desc}</p>
            <div class="target-tags">
              ${(target.tags || []).map(tag => `<span class="target-tag">${tag}</span>`).join('')}
            </div>
          </div>
        `).join('')}
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
          const badgeClass = cert.badge === 'aws-pro' ? 'cert-badge-aws-pro'
            : cert.badge === 'aws' ? 'cert-badge-aws'
            : cert.badge === 'gcp' ? 'cert-badge-gcp'
            : cert.badge === 'hashicorp' ? 'cert-badge-hashicorp'
            : 'cert-badge-devoteam';

          const badgeText = cert.badge === 'aws-pro' ? 'AWS PRO'
            : cert.badge === 'aws' ? 'AWS'
            : cert.badge === 'gcp' ? 'GCP'
            : cert.badge === 'hashicorp' ? 'TERRA'
            : 'DEV';

          return `
            <div class="cert-card ${cert.highlight ? 'featured' : ''}">
              <div class="cert-header">
                <div class="cert-badge-icon ${badgeClass}">${badgeText}</div>
                <div class="cert-info">
                  <h3 class="cert-name">${cert.name}</h3>
                  <div class="cert-issuer">${cert.issuer}</div>
                </div>
              </div>
              <div class="cert-footer">
                <span>${t.obtained}: <strong>${cert.date}</strong></span>
                ${cert.expires ? `<span>${t.expires}: <strong>${cert.expires}</strong></span>` : '<span class="cert-status">✓ Valide</span>'}
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
                <div class="cert-badge-icon cert-badge-devoteam">DEV</div>
                <div class="cert-info">
                  <h3 class="cert-name">${cert.name}</h3>
                  <div class="cert-issuer">${cert.issuer}</div>
                </div>
              </div>
              <div class="cert-footer">
                <span>${t.obtained}: <strong>${cert.date}</strong></span>
                <span class="cert-status">✓ Valide</span>
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
              <div class="exp-company">Devoteam | AWS Premier Partner</div>
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
                ⚡ EDF — DIVNUM / PAT Software (Plateau Outils de Développement)
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
                <span class="tech-tag">GenAI</span>
                <span class="tech-tag">DevSecOps</span>
                <span class="tech-tag">Developer Tooling</span>
                <span class="tech-tag">Python</span>
                <span class="tech-tag">CI/CD</span>
              </div>
            </div>

            <!-- Mission Vapérail -->
            <div class="mission-block">
              <div class="mission-title">
                🚂 Vapérail & Devoteam Lyon — Géotracking Ferroviaire & Plateforme Kiro
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
                <span class="tech-tag">Microsoft Azure</span>
                <span class="tech-tag">PostGIS</span>
                <span class="tech-tag">MapLibre</span>
                <span class="tech-tag">OpenRailMap</span>
                <span class="tech-tag">API REST</span>
              </div>
            </div>

            <!-- Mission EDF OpenShift -->
            <div class="mission-block">
              <div class="mission-title">
                ⚛️ EDF — Expert SI OpenShift (Environnement Nucléaire Régulé)
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
                <span class="tech-tag">Red Hat OpenShift</span>
                <span class="tech-tag">Kubernetes</span>
                <span class="tech-tag">AWS</span>
                <span class="tech-tag">GCP / S3NS</span>
                <span class="tech-tag">Nucléaire Régulé</span>
                <span class="tech-tag">Sécurité by Design</span>
              </div>
            </div>
          </div>
        </article>

        <!-- SKYLOUD -->
        <article class="exp-card" data-category="cloud">
          <div class="exp-header">
            <div class="exp-role-group">
              <h3 class="exp-role">${isEn ? 'Cloud & Kubernetes Architect' : 'Architecte Cloud & Kubernetes'}</h3>
              <div class="exp-company">Skyloud</div>
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
            <span class="tech-tag">AWS (EKS, RDS, CloudFront, EC2)</span>
            <span class="tech-tag">Microsoft Azure</span>
            <span class="tech-tag">Scaleway</span>
            <span class="tech-tag">Terraform</span>
            <span class="tech-tag">Kubernetes</span>
            <span class="tech-tag">Helm</span>
            <span class="tech-tag">FinOps</span>
          </div>
        </article>

        <!-- SMARTFIRE -->
        <article class="exp-card" data-category="cto">
          <div class="exp-header">
            <div class="exp-role-group">
              <h3 class="exp-role">${isEn ? 'Technical Co-Founder & CTO (Startup)' : 'Co-fondateur Technique & CTO (Startup)'}</h3>
              <div class="exp-company">Smartfire</div>
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
            <span class="tech-tag">Kubernetes</span>
            <span class="tech-tag">Java</span>
            <span class="tech-tag">OpenStack</span>
            <span class="tech-tag">TypeScript</span>
            <span class="tech-tag">React.js</span>
            <span class="tech-tag">VSCode Web</span>
            <span class="tech-tag">AWS</span>
            <span class="tech-tag">OVHcloud</span>
          </div>
        </article>

        <!-- ATOS / AIR FRANCE -->
        <article class="exp-card" data-category="cloud regulated">
          <div class="exp-header">
            <div class="exp-role-group">
              <h3 class="exp-role">${isEn ? 'DevOps Engineer — Aerospace Datacenter Modernization' : 'Ingénieur DevOps — Secteur Aérien'}</h3>
              <div class="exp-company">Atos / Air France</div>
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
            <span class="tech-tag">Kubernetes</span>
            <span class="tech-tag">RKE</span>
            <span class="tech-tag">Rancher</span>
            <span class="tech-tag">VMware vSphere</span>
            <span class="tech-tag">Datacenter Privé</span>
            <span class="tech-tag">Docker</span>
          </div>
        </article>

        <!-- ACTIVEVIAM -->
        <article class="exp-card" data-category="regulated">
          <div class="exp-header">
            <div class="exp-role-group">
              <h3 class="exp-role">${isEn ? 'Java Software Engineer & CI/CD (FinTech)' : 'Ingénieur Développeur Java & CI/CD (FinTech)'}</h3>
              <div class="exp-company">ActiveViam</div>
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
            <span class="tech-tag">Java</span>
            <span class="tech-tag">ActivePivot</span>
            <span class="tech-tag">Base de données OLAP</span>
            <span class="tech-tag">CI/CD</span>
            <span class="tech-tag">Jenkins</span>
            <span class="tech-tag">Marchés Financiers</span>
          </div>
        </article>

        <!-- EARLY EXPERIENCES SUMMARY ACCORDION / CARD -->
        <article class="exp-card" data-category="cloud">
          <div class="exp-header">
            <div class="exp-role-group">
              <h3 class="exp-role">${isEn ? 'Early Career Engineering Engagements' : 'Premières Expériences & Fondations Ingénieur'}</h3>
              <div class="exp-company">Moonkey • Freelance • Fédération Française de Spéléologie</div>
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
            <span class="tech-tag">Docker</span>
            <span class="tech-tag">Rancher</span>
            <span class="tech-tag">Ruby on Rails</span>
            <span class="tech-tag">Ionic</span>
            <span class="tech-tag">JavaFX</span>
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
              ${(cat.skills || []).map(s => `<span class="skill-pill">${s}</span>`).join('')}
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
              ${(cat.skills || []).map(s => `<span class="skill-pill">${s}</span>`).join('')}
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
              <div class="edu-school">${edu.institution} • ${edu.location}</div>
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
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-close-modal="markdown">${t.closeBtn}</button>
        <button type="button" id="copy-markdown-btn" class="btn btn-primary">
          <span>📋</span>
          <span>${t.copyBtn}</span>
        </button>
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
      </div>
      <div style="display: flex; gap: 1rem; align-items: center;">
        <a href="${relBase}/cv.${lang}.md" target="_blank" style="color: var(--eu-blue);">
          📄 raw cv.${lang}.md
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
