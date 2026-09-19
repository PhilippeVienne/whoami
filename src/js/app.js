/**
 * PHILIPPE VIENNE — PORTFOLIO & CV INTERACTIF
 * Gestion des filtres, mode sombre, modal Markdown, et interactions utilisateur
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initExperienceFilters();
  initMarkdownModal();
  initScrollSpy();
  initTerminalEasterEgg();
});

/* ==========================================================================
   GESTION DU THÈME (CLAIR / SOMBRE)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  updateThemeIcon(currentTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const active = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = active === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      updateThemeIcon(newTheme);
      try {
        localStorage.setItem('theme', newTheme);
      } catch (e) {}
    });
  }
}

function updateThemeIcon(theme) {
  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

/* ==========================================================================
   FILTRES D'EXPÉRIENCES
   ========================================================================== */
function initExperienceFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const expCards = document.querySelectorAll('.exp-card');

  if (!filterBtns.length || !expCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      expCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.split(' ').includes(filter)) {
          card.style.display = 'block';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/* ==========================================================================
   MODAL MARKDOWN & COPIE DANS LE PRESSE-PAPIER
   ========================================================================== */
function initMarkdownModal() {
  const openBtns = document.querySelectorAll('[data-open-modal="markdown"]');
  const modal = document.getElementById('markdown-modal');
  const closeBtns = document.querySelectorAll('[data-close-modal="markdown"]');
  const copyBtn = document.getElementById('copy-markdown-btn');
  const preview = document.getElementById('markdown-code-block');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  closeBtns.forEach(btn => btn.addEventListener('click', closeModal));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  if (copyBtn && preview) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(preview.textContent || '');
        showToast('✓ Markdown copié dans le presse-papier !');
        copyBtn.textContent = '✓ Copié !';
        setTimeout(() => {
          copyBtn.textContent = 'Copier le Markdown';
        }, 2000);
      } catch (err) {
        console.error('Erreur copie:', err);
        showToast('Erreur lors de la copie');
      }
    });
  }
}

/* ==========================================================================
   NOTIFICATIONS TOAST
   ========================================================================== */
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.2s ease';
    setTimeout(() => toast.remove(), 200);
  }, 2800);
}

/* ==========================================================================
   SCROLL SPY & NAVIGATION ACTIVE
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   EASTER EGG : KONAMI CODE & TERMINAL INTERACTIF
   ========================================================================== */
function initTerminalEasterEgg() {
  const modal = document.getElementById('terminal-modal');
  const output = document.getElementById('terminal-output');
  const input = document.getElementById('terminal-input');
  const closeBtn = document.getElementById('term-close-btn');
  const avatar = document.querySelector('.hero-avatar') || document.querySelector('[data-easter-egg="terminal"]');

  if (!modal || !output || !input) return;

  // Log DevTools
  console.log(
    `%c🚀 Philippe Vienne — Cloud & DevOps Solutions Architect\n` +
    `%cSite léger & sans tracking (JS vanilla, Lighthouse 100/100).\n` +
    `%c💡 Astuce Easter Egg : Essaie le Konami Code : %c ↑ ↑ ↓ ↓ ← → ← → B A %c ou clique 5x sur la photo de profil !`,
    'color: #003399; font-size: 15px; font-weight: bold;',
    'color: #64748b; font-size: 12px;',
    'color: #64748b; font-size: 12px;',
    'color: #d97757; font-weight: bold; background: #fff1ed; padding: 2px 6px; border-radius: 4px;',
    'color: #64748b;'
  );

  // Konami Code sequence: Up Up Down Down Left Right Left Right B A
  const konamiSequence = [
    'arrowup', 'arrowup',
    'arrowdown', 'arrowdown',
    'arrowleft', 'arrowright',
    'arrowleft', 'arrowright',
    'b', 'a'
  ];
  let konamiIndex = 0;

  window.addEventListener('keydown', (e) => {
    // Ne pas intercepter si le terminal ou une modale est déjà ouverte
    if (modal.classList.contains('open')) return;

    const key = (e.key || '').toLowerCase();
    const code = (e.code || '').toLowerCase();
    const expected = konamiSequence[konamiIndex];

    // Correspondance par touche (AZERTY/QWERTY) ou par code
    const isMatch = (key === expected) ||
                    (expected === 'arrowup' && code === 'arrowup') ||
                    (expected === 'arrowdown' && code === 'arrowdown') ||
                    (expected === 'arrowleft' && code === 'arrowleft') ||
                    (expected === 'arrowright' && code === 'arrowright') ||
                    (expected === 'b' && code === 'keyb') ||
                    (expected === 'a' && (code === 'keya' || code === 'keyq'));

    if (isMatch) {
      konamiIndex++;
      if (konamiIndex === konamiSequence.length) {
        konamiIndex = 0;
        openTerminal();
      }
    } else {
      const isFirstKey = (key === konamiSequence[0]) || (code === 'arrowup');
      konamiIndex = isFirstKey ? 1 : 0;
    }
  });

  // Déclencheur tactile / souris : 5 clics rapides sur la photo de profil
  let clickCount = 0;
  let clickTimer = null;
  if (avatar) {
    avatar.style.cursor = 'pointer';
    avatar.addEventListener('click', (e) => {
      clickCount++;
      clearTimeout(clickTimer);

      // Micro-animation tactile au clic
      avatar.style.transform = 'scale(0.95)';
      setTimeout(() => { avatar.style.transform = ''; }, 120);

      if (clickCount >= 5) {
        clickCount = 0;
        e.preventDefault();
        openTerminal();
      } else {
        clickTimer = setTimeout(() => { clickCount = 0; }, 2000);
      }
    });
  }

  // Ouverture directe via hash #terminal
  if (window.location.hash === '#terminal') {
    openTerminal();
  }

  // Gestion de l'historique des commandes
  const history = [];
  let historyIdx = -1;

  function openTerminal() {
    modal.classList.add('open');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    if (window.visualViewport && window.innerWidth <= 640) {
      modal.style.height = `${window.visualViewport.height}px`;
      modal.style.top = `${window.visualViewport.offsetTop}px`;
    }

    if (!output.innerHTML.trim()) {
      printWelcome();
    }

    // Auto-focus uniquement sur grand écran pour éviter l'ouverture brutale du clavier mobile
    if (window.innerWidth > 640) {
      input.focus();
    }
    output.scrollTop = output.scrollHeight;
  }

  function closeTerminal() {
    modal.classList.remove('open');
    modal.style.display = 'none';
    modal.style.height = '';
    modal.style.top = '';
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeTerminal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeTerminal();
  });

  // Focus automatique du champ au clic dans la fenêtre terminal
  modal.querySelector('.terminal-window')?.addEventListener('click', (e) => {
    if (!e.target.closest('.term-quick-btn') && !e.target.closest('.terminal-header')) {
      input.focus();
    }
  });

  // Gestion intelligente du clavier virtuel mobile via Visual Viewport API
  if (window.visualViewport) {
    const onViewportChange = () => {
      if (!modal.classList.contains('open') || window.innerWidth > 640) return;
      const vv = window.visualViewport;
      modal.style.height = `${vv.height}px`;
      modal.style.top = `${vv.offsetTop}px`;
      output.scrollTop = output.scrollHeight;
    };
    window.visualViewport.addEventListener('resize', onViewportChange);
    window.visualViewport.addEventListener('scroll', onViewportChange);
  }

  // Clic sur les boutons de commandes rapides (particulièrement pratique sur mobile)
  modal.querySelectorAll('.term-quick-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) {
        executeCommand(cmd);
        if (window.innerWidth > 640) {
          input.focus();
        }
      }
    });
  });

  function executeCommand(raw) {
    raw = (raw || '').trim();
    if (!raw) return;

    history.push(raw);
    historyIdx = -1;

    // Echo de la commande
    appendOutput(`<div><span class="term-prompt">pv@cloud-node-01:~$</span> <span class="term-bold">${escapeHtml(raw)}</span></div>`);

    const parts = raw.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (cmd === 'kubectl') {
      appendOutput(commands.kubectl(args));
    } else if (commands[cmd]) {
      const res = commands[cmd](args);
      if (res) appendOutput(res);
    } else {
      appendOutput(`<span class="term-red">zsh: command not found: ${escapeHtml(cmd)}</span>. Tapez <span class="term-gold">help</span> pour la liste des commandes.`);
    }

    output.scrollTop = output.scrollHeight;
  }

  function printWelcome() {
    const banner = `
<div class="term-ascii">
<span class="term-blue">   ___ _     _ _ _                   __   ___                            </span>
<span class="term-blue">  / _ \\ |__ (_) (_)___  _ __   ___   \\ \\ / (_) ___ _ __  _ __   ___ </span>
<span class="term-blue"> / /_)/ '_ \\| | | | '_ \\| '_ \\ / _ \\   \\ V /| |/ _ \\ '_ \\| '_ \\ / _ \\</span>
<span class="term-blue">/ ___/| | | | | | | |_) | |_) |  __/    \\_/ | |  __/ | | | | | |  __/</span>
<span class="term-blue">\\/    |_| |_|_|_|_| .__/| .__/ \\___|        |_|\\___|_| |_|_| |_|\\___|</span>
<span class="term-blue">                  |_|   |_|                                          </span>
</div>

<span class="term-bold term-gold">⚡ Philippe Vienne</span> — <span class="term-muted">Cloud & DevOps Solutions Architect | Ex-Tech Co-Founder</span>
<span class="term-muted">Cluster:</span> <span class="term-green">k8s-prod-lyon-01</span> <span class="term-muted">•</span> <span class="term-muted">Context:</span> <span class="term-purple">multi-cloud-regulated</span>
<span class="term-muted">10x Certifié (AWS SA Pro, Claude Developer, GCP, Terraform) • 100+ Clusters K8s</span>

Tapez <span class="term-gold">help</span> pour afficher les commandes disponibles.
Commandes suggérées : <span class="term-blue">whoami</span>, <span class="term-blue">kubectl get pods</span>, <span class="term-blue">terraform apply</span>, <span class="term-claude">claude</span>, <span class="term-blue">certs</span>
`;
    output.innerHTML = banner;
  }

  function appendOutput(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
  }

  const commands = {
    help: () => `
<span class="term-bold term-gold">Commandes disponibles :</span>
  <span class="term-blue">whoami</span>              Profil synthétique et autorité technique
  <span class="term-blue">kubectl get pods</span>    Statut des pods de production en temps réel
  <span class="term-blue">terraform apply</span>     Provisioning de carrière sans downtime
  <span class="term-claude">claude [question]</span>   Avis de l'IA Claude sur le profil
  <span class="term-blue">certs</span>               Liste des 10 certifications officielles
  <span class="term-blue">skills</span>              Matrice des compétences clés
  <span class="term-blue">contact</span>             Coordonnées directes (Email, LinkedIn, GitHub)
  <span class="term-blue">theme [light|dark|matrix]</span> Basculer le thème (essayez <span class="term-green">theme matrix</span>)
  <span class="term-blue">clear</span>               Effacer l'écran
  <span class="term-blue">exit</span>                Fermer le terminal
`,

    whoami: () => `
<span class="term-bold term-green">Philippe Vienne</span>
<span class="term-muted">Titre :</span> Architecte Cloud & DevOps | Ex-Co-fondateur Tech & CTO Startup
<span class="term-muted">Expérience :</span> 15 ans en ingénierie logicielle et exploitation d'infrastructures critiques
<span class="term-muted">Diplôme :</span> Diplôme d'Ingénieur INSA Lyon (Télécommunications & Systèmes Distribués)
<span class="term-muted">Secteurs :</span> Nucléaire régulé (EDF), Aérien (Air France), FinTech OLAP (Singapour), Cloud Souverain (S3NS)
<span class="term-muted">Chiffres clés :</span> 100+ clusters K8s, 30 clients MSP (budget 330 k€), -15% FinOps, +300% performance
<span class="term-muted">Statut actuel :</span> <span class="term-green">✓ Disponible pour rôles Senior / Lead / Staff Cloud Architect</span>
`,

    kubectl: (args) => {
      const sub = (args || []).join(' ').trim();
      if (sub === 'describe pod impostor-syndrome-daemon') {
        return `
<span class="term-bold term-purple">Pod : impostor-syndrome-daemon</span>
<span class="term-muted">Namespace :</span> psychology
<span class="term-muted">Status :</span>    <span class="term-green">Terminated (ExitCode: 0)</span>
<span class="term-muted">Message :</span>   Overwritten by 10x Certifications, 15 years track record and zero critical outages.
`;
      }

      return `
<span class="term-muted">NAMESPACE       NAME                              READY   STATUS             RESTARTS   AGE</span>
<span class="term-blue">production</span>      philippe-brain-master-0           1/1     <span class="term-green">Running</span>            0          15y
<span class="term-blue">infra-aws</span>       aws-solutions-architect-pro-0     1/1     <span class="term-green">Running</span>            0          2y
<span class="term-blue">genai-claude</span>    claude-certified-developer-84b    1/1     <span class="term-claude">Running (Hot 🔥)</span>   0          1d
<span class="term-blue">finops</span>          cost-reducer-330k-eur             1/1     <span class="term-green">Running</span>            0          3y
<span class="term-blue">beverage</span>        espresso-machine-crx7             1/1     <span class="term-green">Running</span>            1420       15y
<span class="term-blue">psychology</span>      impostor-syndrome-daemon          0/1     <span class="term-red">CrashLoopBackOff</span>   42         15y
<span class="term-blue">compliance</span>      secnumcloud-s3ns-guard-99z        1/1     <span class="term-green">Running</span>            0          1y
<span class="term-muted">Astuce: Essayez 'kubectl describe pod impostor-syndrome-daemon'</span>
`;
    },

    terraform: (args) => `
<span class="term-purple">aws_iam_role.senior_cloud_architect: Refreshing state...</span>
<span class="term-claude">anthropic_claude_agent.accelerator: Refreshing state...</span>
<span class="term-blue">kubernetes_cluster.production_clusters: Refreshing state... [100+ clusters]</span>

<span class="term-bold">Terraform Plan:</span> 1 to add, 0 to change, 0 to destroy.

<span class="term-green">aws_career_step.philippe: Creating...</span>
<span class="term-green">aws_career_step.philippe: Creation complete after 1.2s [id=HIRED]</span>

<span class="term-bold term-green">Apply complete! Resources: 1 added, 0 changed, 0 destroyed.</span>
<span class="term-gold">Outputs:</span>
<span class="term-blue">status</span> = "Philippe Vienne successfully onboarded. SLA: 99.999%. Incident rate: 0%."
`,

    claude: (args) => {
      const q = (args || []).join(' ');
      return `
<span class="term-claude term-bold">🤖 Claude 3.5 Sonnet (Anthropic Certified Evaluation) :</span>
<span class="term-muted">Analyse de la requête : "${q || 'Que penses-tu du profil de Philippe Vienne ?'}"</span>

"Philippe possède un profil particulièrement rare sur le marché :
1. <span class="term-bold">Fondations ultra-solides :</span> 15 ans d'expérience, AWS Solutions Architect Pro, 100+ clusters Kubernetes en production dans des environnements très stricts (EDF Nucléaire, Air France, Banque).
2. <span class="term-bold">Pionnier GenAI :</span> Récemment certifié <span class="term-claude">Claude Certified Developer</span> par Anthropic. Il sait combiner infrastructure cloud robuste et outillage IA moderne.
3. <span class="term-bold">Esprit d'entreprise :</span> Ex-co-fondateur tech & CTO, il maîtrise le ROI et le FinOps (-15% de coûts cloud).

<span class="term-green term-bold">Conclusion :</span> Candidat de très haut niveau, recommandation d'entretien immédiate."
`;
    },

    certs: () => `
<span class="term-bold term-gold">🏆 Certifications Officielles (10x) :</span>
  <span class="term-gold">1. AWS Solutions Architect – Professional</span>        [03/2024 - 03/2027]  (Amazon Web Services)
  <span class="term-claude">2. Claude Certified Developer – Foundations</span>     [09/2026 - 09/2027]  <span class="term-claude">🔥 GenAI</span> (Anthropic)
  <span class="term-blue">3. Google Cloud Certified – Associate Cloud Eng.</span>  [08/2026 - 08/2029]  (Google Cloud)
  <span class="term-purple">4. HashiCorp Certified : Terraform Associate</span>      [10/2025 - 10/2027]  (HashiCorp)
  <span class="term-blue">5. AWS Certified Developer – Associate</span>           [12/2025 - 12/2028]  (AWS)
  <span class="term-blue">6. AWS Certified CloudOps Engineer – Associate</span>     [11/2025 - 11/2028]  (AWS)
  <span class="term-blue">7. AWS Certified AI Practitioner</span>                  [11/2025 - 11/2028]  (AWS)
  <span class="term-blue">8. AWS Certified Solutions Architect – Associate</span>   [03/2024 - 03/2027]  (AWS)
  <span class="term-blue">9. AWS Certified Cloud Practitioner</span>               [01/2024 - 11/2028]  (AWS)
  <span class="term-muted">10. Devoteam Accreditations : GenAI Level 1 & Sustainable IT Fundamentals</span>
`,

    skills: () => `
<span class="term-bold term-gold">🛠️ Matrice de Compétences :</span>
  <span class="term-blue">Cloud :</span>         AWS, Google Cloud (GCP), Microsoft Azure, Scaleway, S3NS (SecNumCloud)
  <span class="term-green">Conteneurs :</span>    Kubernetes (EKS, GKE, RKE), Red Hat OpenShift (CaaS), Docker, Helm, Rancher
  <span class="term-purple">IaC & CI/CD :</span>   Terraform, GitLab CI, GitHub Actions, Jenkins, ArgoCD, Ansible
  <span class="term-claude">IA & Dev :</span>      Anthropic Claude API, GenAI, Bedrock, TypeScript, Java, React, Python
  <span class="term-gold">Méthodes :</span>      FinOps (-15%), Sécurité By Design, Architecture Grande Échelle, Co-fondateur
`,

    contact: () => `
<span class="term-bold term-gold">📬 Coordonnées Directes :</span>
  <span class="term-blue">Email :</span>     <a href="mailto:Philippe@Vienne.me" style="color: #79c0ff; text-decoration: underline;">Philippe@Vienne.me</a>
  <span class="term-blue">LinkedIn :</span>  <a href="https://linkedin.com/in/philippevienne" target="_blank" style="color: #79c0ff; text-decoration: underline;">linkedin.com/in/philippevienne</a>
  <span class="term-blue">GitHub :</span>    <a href="https://github.com/PhilippeVienne" target="_blank" style="color: #79c0ff; text-decoration: underline;">github.com/PhilippeVienne</a>
  <span class="term-blue">Site Web :</span>  <a href="https://philippe.vienne.me" target="_blank" style="color: #79c0ff; text-decoration: underline;">https://philippe.vienne.me</a>
`,

    theme: (args) => {
      const mode = (args[0] || '').toLowerCase();
      if (['light', 'dark', 'matrix'].includes(mode)) {
        document.documentElement.setAttribute('data-theme', mode);
        try { localStorage.setItem('theme', mode); } catch (e) {}
        updateThemeIcon(mode === 'matrix' ? 'dark' : mode);
        return `<span class="term-green">✓ Thème basculé vers : <strong>${mode}</strong></span>`;
      }
      return `<span class="term-red">Usage : theme [light | dark | matrix]</span>`;
    },

    sudo: () => `<span class="term-red">Permission denied: Philippe détient déjà les accès root sur l'infrastructure.</span>`,
    exit: () => { closeTerminal(); return ''; },
    quit: () => { closeTerminal(); return ''; },
    clear: () => { output.innerHTML = ''; return ''; },
    cls: () => { output.innerHTML = ''; return ''; }
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeTerminal();
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length && historyIdx < history.length - 1) {
        historyIdx++;
        input.value = history[history.length - 1 - historyIdx];
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        historyIdx--;
        input.value = history[history.length - 1 - historyIdx];
      } else if (historyIdx === 0) {
        historyIdx = -1;
        input.value = '';
      }
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const current = input.value.trim().toLowerCase();
      if (!current) return;
      const match = Object.keys(commands).find(c => c.startsWith(current));
      if (match) input.value = match;
      return;
    }

    if (e.key === 'Enter') {
      const raw = input.value.trim();
      input.value = '';
      if (raw) {
        executeCommand(raw);
      }
    }
  });
}

function escapeHtml(string) {
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
