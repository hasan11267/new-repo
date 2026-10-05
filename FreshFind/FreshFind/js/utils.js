/**
 * FreshFind — Advanced Utilities
 * Shared helpers: Toast notifications, Dark Mode, Back-to-Top,
 * Scroll-reveal, Seasonal indicator, and Print support.
 */

/* ─── DARK MODE ───────────────────────────────────────────── */
(function initDarkMode() {
  const saved = localStorage.getItem('ff-dark');
  if (saved === 'true') document.documentElement.classList.add('dark');
})();

function toggleDarkMode() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('ff-dark', isDark);
  // Update all toggle buttons
  document.querySelectorAll('.dark-toggle').forEach(btn => {
    btn.textContent = isDark ? '☀️' : '🌙';
    btn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
  });
}

/* ─── TOAST NOTIFICATIONS ─────────────────────────────────── */
function showToast(message, type = 'success', duration = 3000) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  toast.innerHTML = `<span class="toast-icon">${icons[type] || '💬'}</span><span>${message}</span>`;
  container.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('toast-visible'));
  });

  setTimeout(() => {
    toast.classList.remove('toast-visible');
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

/* ─── BACK TO TOP BUTTON ──────────────────────────────────── */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─── SCROLL REVEAL ───────────────────────────────────────── */
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.market-card, .produce-card, .feature-card, .detail-card, .story-badge-item, .section-heading, .hero-card, .stats > div, .contact-card'
  );
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  targets.forEach((el, i) => {
    el.classList.add('reveal-hidden');
    el.style.transitionDelay = `${(i % 6) * 55}ms`;
    observer.observe(el);
  });
}

/* ─── SEASONAL PRODUCE INDICATOR ─────────────────────────── */
const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

function isInSeasonNow(seasonStr) {
  if (!seasonStr) return false;
  const lower = seasonStr.toLowerCase();
  if (lower.includes('year-round') || lower.includes('year round')) return true;

  const currentMonth = new Date().getMonth(); // 0-based
  const monthAbbr = MONTH_NAMES.map(m => m.slice(0, 3).toLowerCase());

  // Parse ranges like "May - August" or "November - February"
  const parts = lower.replace(/–/g, '-').split('-').map(s => s.trim());
  if (parts.length < 2) return false;

  const startIdx = monthAbbr.findIndex(m => parts[0].startsWith(m));
  const endIdx = monthAbbr.findIndex(m => parts[1].startsWith(m));
  if (startIdx === -1 || endIdx === -1) return false;

  if (startIdx <= endIdx) {
    return currentMonth >= startIdx && currentMonth <= endIdx;
  } else {
    // Wraps around year (e.g., November - February)
    return currentMonth >= startIdx || currentMonth <= endIdx;
  }
}

function markSeasonalCards() {
  document.querySelectorAll('.produce-card').forEach(card => {
    const seasonEl = card.querySelector('.season');
    if (!seasonEl) return;
    const seasonText = seasonEl.textContent;
    if (isInSeasonNow(seasonText)) {
      card.classList.add('in-season');
      // Add badge if not already present
      if (!card.querySelector('.season-now-badge')) {
        const badge = document.createElement('span');
        badge.className = 'season-now-badge';
        badge.textContent = '🌿 In Season Now';
        card.insertBefore(badge, card.querySelector('h3'));
      }
    }
  });
}

/* ─── PRODUCE LIVE SEARCH ─────────────────────────────────── */
function initProduceSearch() {
  const input = document.getElementById('produceSearch');
  if (!input) return;

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    document.querySelectorAll('.produce-card').forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = (!q || text.includes(q)) ? '' : 'none';
    });
  });
}

/* ─── STATS COUNTER ANIMATION ─────────────────────────────── */
function animateCounter(el, target, duration = 1200) {
  if (!el) return;
  const start = performance.now();
  const startVal = 0;

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(startVal + (target - startVal) * eased).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function initCounterAnimations() {
  const statsSection = document.querySelector('.stats');
  if (!statsSection) return;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      const mc = document.getElementById('marketCount');
      const pc = document.getElementById('produceCount');
      const vc = document.getElementById('visitorCount');
      const oc = document.getElementById('openCount');

      if (mc) animateCounter(mc, parseInt(mc.textContent) || 6);
      if (pc) animateCounter(pc, parseInt(pc.textContent) || 8);
      if (vc) animateCounter(vc, parseInt(vc.textContent) || 1250);
      if (oc) animateCounter(oc, parseInt(oc.textContent) || 0);

      observer.disconnect();
    }
  }, { threshold: 0.3 });

  observer.observe(statsSection);
}

/* ─── STAR RATING RENDERER ────────────────────────────────── */
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

/* ─── NEWSLETTER FORM ─────────────────────────────────────── */
function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailEl = form.querySelector('input[type="email"]');
    if (emailEl && emailEl.value) {
      showToast(`🌱 Thanks for subscribing with ${emailEl.value}!`, 'success', 4000);
      form.reset();
    }
  });
}

/* ─── PRINT MARKET ────────────────────────────────────────── */
function printMarketDetail() {
  window.print();
}

/* ─── SHARE MARKET ────────────────────────────────────────── */
function shareMarket(name, url) {
  if (navigator.share) {
    navigator.share({ title: `${name} — FreshFind`, url: url })
      .catch(() => copyToClipboard(url));
  } else {
    copyToClipboard(url);
  }
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => showToast('🔗 Link copied to clipboard!', 'info'))
    .catch(() => showToast('Copy failed — please copy the URL manually.', 'warning'));
}

/* ─── INIT ALL ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Inject dark mode toggle into navbar
  const nav = document.getElementById('mainNav');
  if (nav) {
    const isDark = document.documentElement.classList.contains('dark');
    const dmBtn = document.createElement('button');
    dmBtn.className = 'dark-toggle btn btn-small btn-outline';
    dmBtn.textContent = isDark ? '☀️' : '🌙';
    dmBtn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    dmBtn.addEventListener('click', toggleDarkMode);
    nav.appendChild(dmBtn);
  }

  initBackToTop();
  initScrollReveal();
  initProduceSearch();
  initNewsletterForm();

  // Delay counter animation so numbers are set first
  setTimeout(initCounterAnimations, 100);

  // Seasonal marks triggered after produce renders
  setTimeout(markSeasonalCards, 500);
});
