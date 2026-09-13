/**
 * JSON Resume Generator (Schema v1.0.0 standard)
 * Spec: https://jsonresume.org/schema/
 * Generates an interoperable, machine-readable resume in French and English.
 */

export function renderJsonResume({ data, lang = 'fr' }) {
  const isEn = lang === 'en';

  const work = isEn ? [
    {
      name: "Devoteam G Cloud",
      position: "Lead Cloud Architect & AI Practitioner",
      url: "https://devoteam.com",
      startDate: "2024-03-01",
      endDate: null,
      summary: "Leading multi-cloud and sovereign cloud architectures, technical advisory for large accounts, generative AI integration, and developer platforms.",
      highlights: [
        "Architected high-precision rail geotracking platform for Vapérail using PostGIS, MapLibre, and open data, deployed on Microsoft Azure.",
        "Engineered strategic migration of EDF corporate WebApp to Red Hat OpenShift (internal CaaS) under strict nuclear safety regulation.",
        "Implemented multi-cloud governance connecting AWS and Google Cloud Platform via S3NS (French Sovereign Cloud / SecNumCloud).",
        "Developed custom LLM evaluation and GenAI developer productivity tooling."
      ]
    },
    {
      name: "Skyloud",
      position: "Cloud & Kubernetes Architect",
      url: "https://skyloud.com",
      startDate: "2023-11-01",
      endDate: "2025-09-01",
      summary: "Cloud architecture advisory, managed services and FinOps optimization managing 30 clients and 100+ Kubernetes clusters.",
      highlights: [
        "Architected resilient multi-zone and multi-cloud Kubernetes clusters with +300% application performance improvement.",
        "Implemented automated Infrastructure as Code (IaC) with HashiCorp Terraform for automated disaster recovery.",
        "Delivered FinOps cost reduction (-15% operational spend) across 330 k€ cloud infrastructure portfolio."
      ]
    },
    {
      name: "Smartfire",
      position: "Technical Co-Founder & CTO",
      startDate: "2019-05-01",
      endDate: "2024-06-01",
      summary: "Technical co-founder of a 2-person founding team: end-to-end cloud-native SaaS engineering, developer tools R&D, full-stack dev, and high-traffic hosting.",
      highlights: [
        "Architected and built an ephemeral cloud development environment orchestration platform (Cloud-Native SaaS).",
        "Repackaged Microsoft Visual Studio Code for seamless in-browser execution (Web Cloud IDE).",
        "Authored custom JavaScript libraries and full React.js frontend applications.",
        "Operated heavy-load e-commerce cloud infrastructures handling major traffic peaks (AWS, OVHcloud)."
      ]
    },
    {
      name: "Atos / Air France",
      position: "DevOps Engineer — Aerospace Datacenter Modernization",
      startDate: "2018-10-01",
      endDate: "2019-01-01",
      summary: "Deployed containerized Kubernetes clusters on private enterprise datacenters for Air France.",
      highlights: [
        "Orchestrated on-premise Kubernetes platforms with Rancher and RKE on VMware vSphere enterprise datacenters."
      ]
    },
    {
      name: "ActiveViam",
      position: "Java Software Engineer & CI/CD (FinTech)",
      url: "https://activeviam.com",
      startDate: "2018-02-01",
      endDate: "2018-08-01",
      summary: "Automated CI/CD pipelines and high-throughput integration test suites for Tier-1 investment banks in Singapore running ActivePivot (in-memory OLAP database).",
      highlights: [
        "Designed and implemented continuous integration models for global institutional banking clients."
      ]
    },
    {
      name: "Moonkey",
      position: "Infrastructure & Virtualization Intern",
      startDate: "2017-04-01",
      endDate: "2017-08-01",
      summary: "Containerized virtualization architectures using Docker and Rancher; real-time video transcoding and streaming REST APIs.",
      highlights: []
    },
    {
      name: "Freelance",
      position: "Mobile & Web Application Developer",
      startDate: "2015-12-01",
      endDate: "2016-08-01",
      summary: "Built cross-platform hybrid mobile applications (Ionic, HTML5/JS) and Ruby on Rails REST APIs.",
      highlights: []
    },
    {
      name: "Fédération Française de Spéléologie (FFS)",
      position: "Scientific Software Developer",
      startDate: "2013-06-01",
      endDate: "2013-09-01",
      summary: "Developed scientific data visualization software in JavaFX for underground cave sensors.",
      highlights: []
    }
  ] : [
    {
      name: "Devoteam G Cloud",
      position: "Lead Architecte Cloud & Praticien IA",
      url: "https://devoteam.com",
      startDate: "2024-03-01",
      endDate: null,
      summary: "Pilotage d'architectures multi-cloud et souveraines, conseil technique grands comptes, intégration d'IA générative et outillage pour développeurs.",
      highlights: [
        "Architecture d'un outil de géotracking ferroviaire pour Vapérail (PostGIS, MapLibre, OpenStreetMap) déployé sur Microsoft Azure.",
        "Migration stratégique du « Starter Kit WebApp » d'EDF vers Red Hat OpenShift (CaaS interne) en environnement nucléaire régulé.",
        "Gouvernance multi-cloud unifiant AWS et GCP via S3NS (Cloud souverain français / SecNumCloud).",
        "R&D outillage interne : évaluation de LLM et intégration d'assistants IA pour développeurs."
      ]
    },
    {
      name: "Skyloud",
      position: "Architecte Cloud & Kubernetes",
      url: "https://skyloud.com",
      startDate: "2023-11-01",
      endDate: "2025-09-01",
      summary: "Conseil en architecture cloud, infogérance et optimisation FinOps d'un portefeuille de 30 clients (330 k€ de budget cloud).",
      highlights: [
        "Conception d'architectures Kubernetes résilientes multi-cloud et multi-zones avec +300% de gains de performance applicative.",
        "Automatisation intégrale Infrastructure as Code (IaC) via HashiCorp Terraform.",
        "Audit et optimisation FinOps (-15% de coûts d'infrastructure)."
      ]
    },
    {
      name: "Smartfire",
      position: "Co-fondateur Technique & CTO",
      startDate: "2019-05-01",
      endDate: "2024-06-01",
      summary: "Pilier technique d'une équipe de deux co-fondateurs : conception intégrale du produit SaaS, R&D outillage dev, développement full-stack et hébergement cloud.",
      highlights: [
        "Conception et développement complet d'une plateforme SaaS d'environnements de dev éphémères (Cloud-Native).",
        "Repackaging complet de VSCode pour distribution et exécution fluide dans un navigateur web.",
        "Développement de librairies JavaScript modernes et applications web sous React.js.",
        "Exploitation d'infrastructures cloud e-commerce à très fort trafic (AWS, OVHcloud)."
      ]
    },
    {
      name: "Atos / Air France",
      position: "Ingénieur DevOps — Secteur Aérien",
      startDate: "2018-10-01",
      endDate: "2019-01-01",
      summary: "Déploiement d'infrastructure Kubernetes conteneurisée au sein des datacenters privés VMware vSphere d'Air France.",
      highlights: [
        "Orchestration de clusters Kubernetes via Rancher et RKE en environnement d'entreprise privé."
      ]
    },
    {
      name: "ActiveViam",
      position: "Ingénieur Développeur Java & CI/CD (FinTech)",
      url: "https://activeviam.com",
      startDate: "2018-02-01",
      endDate: "2018-08-01",
      summary: "Automatisation CI/CD et suites de tests d'intégration à haut débit pour banques d'investissement clientes à Singapour (moteur OLAP in-memory ActivePivot).",
      highlights: [
        "Mise en œuvre du modèle CI/CD et fiabilisation des builds clients."
      ]
    },
    {
      name: "Moonkey",
      position: "Ingénieur Stagiaire Infrastructure & Virtualisation",
      startDate: "2017-04-01",
      endDate: "2017-08-01",
      summary: "Infrastructures de virtualisation conteneurisées Docker / Rancher et API de streaming vidéo.",
      highlights: []
    },
    {
      name: "Freelance",
      position: "Développeur Applications Web & Mobiles",
      startDate: "2015-12-01",
      endDate: "2016-08-01",
      summary: "Applications mobiles hybrides (Ionic, HTML5/JS) et back-ends Ruby on Rails.",
      highlights: []
    },
    {
      name: "Fédération Française de Spéléologie (FFS)",
      position: "Développeur Logiciel Scientifique",
      startDate: "2013-06-01",
      endDate: "2013-09-01",
      summary: "Logiciel d'acquisition et de visualisation graphique sous JavaFX pour capteurs en cavités souterraines.",
      highlights: []
    }
  ];

  const resume = {
    "$schema": "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
    "basics": {
      "name": data.name,
      "label": data.title,
      "image": `${data.website}/avatar.png`,
      "email": data.email,
      "url": data.website,
      "summary": isEn
        ? "Cloud & DevOps Solutions Architect with 15 years of software engineering and cloud infrastructure expertise (M.Sc. in Engineering, INSA Lyon). Specialist in high-availability, fault-tolerant multi-cloud environments (AWS, GCP, Azure, OpenShift, Kubernetes, Terraform). Mission-critical delivery across nuclear (EDF), aviation (Air France), banking (Singapore), and sovereign cloud (S3NS)."
        : "Architecte Cloud & DevOps chevronné et ancien co-fondateur technique (CTO) de startup, 15 ans d'expérience en ingénierie logicielle et infrastructure cloud (Diplôme Ingénieur INSA Lyon). Spécialiste de la résilience multi-cloud (AWS, GCP, Azure, OpenShift, Kubernetes, Terraform) en environnements critiques et régulés (EDF, Air France, Singapour, S3NS).",
      "location": {
        "address": "Lyon, France",
        "city": "Lyon",
        "countryCode": "FR",
        "region": "Auvergne-Rhône-Alpes"
      },
      "profiles": [
        {
          "network": "LinkedIn",
          "username": "pvienne",
          "url": data.linkedin
        },
        {
          "network": "GitHub",
          "username": "PhilippeVienne",
          "url": data.github
        },
        {
          "network": "Credly",
          "username": "philippe-vienne",
          "url": "https://www.credly.com/users/philippe-vienne"
        }
      ]
    },
    "work": work,
    "education": (data.education || []).map(edu => ({
      "institution": edu.institution,
      "url": edu.institution === 'INSA Lyon' ? 'https://www.insa-lyon.fr' : undefined,
      "area": edu.details,
      "studyType": edu.degree,
      "startDate": edu.period ? edu.period.split('-')[0].trim() : undefined,
      "endDate": edu.period ? edu.period.split('-')[1]?.trim() : undefined
    })),
    "certificates": (data.certifications || []).map(cert => ({
      "name": cert.name,
      "date": cert.date ? formatCertDate(cert.date) : undefined,
      "issuer": cert.issuer,
      "url": cert.credly_url || undefined
    })),
    "skills": (data.skills_categories || []).map(cat => ({
      "name": cat.category,
      "level": "Master",
      "keywords": cat.skills || []
    })),
    "languages": (data.languages || []).map(l => ({
      "language": l.name,
      "fluency": l.level + (l.detail ? ` (${l.detail})` : '')
    })),
    "meta": {
      "canonical": isEn ? `${data.website}/en/resume.json` : `${data.website}/resume.json`,
      "version": "v1.0.0",
      "lastModified": new Date().toISOString()
    }
  };

  return JSON.stringify(resume, null, 2);
}

function formatCertDate(dateStr) {
  if (!dateStr) return undefined;
  const parts = dateStr.split('/');
  if (parts.length === 2) {
    const month = parts[0].padStart(2, '0');
    const year = parts[1];
    return `${year}-${month}-01`;
  }
  return dateStr;
}
