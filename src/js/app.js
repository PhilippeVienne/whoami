/**
 * PHILIPPE VIENNE — PORTFOLIO & CV INTERACTIF
 * Gestion des filtres, mode sombre, modal Markdown, et interactions utilisateur
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initExperienceFilters();
  initMarkdownModal();
  initScrollSpy();
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
