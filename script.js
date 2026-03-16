// ===== Amazon Clone – Main JavaScript =====

document.addEventListener('DOMContentLoaded', () => {
  initHeroCarousel();
  initAddToCart();
  initSearch();
  initSubNav();
  initBackToTop();
  initScrollAnimations();
});

// ===== Cart State =====
let cartCount = 0;
const cartCountEl = document.getElementById('cart-count');

function updateCartCount() {
  cartCount++;
  cartCountEl.textContent = cartCount;
  cartCountEl.style.animation = 'pulse 0.3s ease';
  setTimeout(() => cartCountEl.style.animation = '', 300);
}

// ===== Hero Carousel =====
function initHeroCarousel() {
  const slides = document.querySelectorAll('.hero-slide');
  const prevBtn = document.querySelector('.hero-nav-btn.prev');
  const nextBtn = document.querySelector('.hero-nav-btn.next');
  let current = 0;
  let autoplayInterval;

  if (slides.length === 0) return;

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
  }

  function nextSlide() {
    showSlide(current + 1);
  }

  function prevSlide() {
    showSlide(current - 1);
  }

  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });
  }

  startAutoplay();
}

// ===== Add to Cart with Toast (event delegation) =====
function initAddToCart() {
  document.body.addEventListener('click', function(e) {
    const btn = e.target.closest('.add-to-cart-btn');
    if (!btn) return;
    e.stopPropagation();

    const card = btn.closest('.product-card');
    const productName = card ? card.querySelector('.product-title')?.textContent : 'Item';

    const originalText = btn.textContent;
    btn.textContent = '✓ Added';
    btn.classList.add('added');
    btn.style.transform = 'scale(0.95)';

    setTimeout(() => { btn.style.transform = ''; }, 150);
    setTimeout(() => {
      btn.textContent = originalText;
      btn.classList.remove('added');
    }, 1800);

    updateCartCount();
    showToast(productName);
  });
}

// ===== Sub-Nav Category Links =====
function initSubNav() {
  const subNavLinks = document.querySelectorAll('.sub-nav a');
  const searchInput = document.getElementById('search-input');

  subNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      // If it links to a section on the page
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const sectionId = href.substring(1);
        // Put the section name in the search box and trigger search
        const sectionName = this.textContent.trim();
        if (searchInput) {
          searchInput.value = sectionName;
          searchInput.dispatchEvent(new Event('input'));
        }
      }
    });
  });
}

// ===== Toast Notification =====
function showToast(productName) {
  // Remove existing toast
  const existingToast = document.querySelector('.toast');
  if (existingToast) existingToast.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="toast-icon">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
      </svg>
    </div>
    <span><strong>${productName}</strong> added to your cart</span>
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 2500);
}

// ===== Search Functionality =====
function initSearch() {
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.querySelector('.search-btn');
  const categorySelect = document.querySelector('.search-category');

  if (!searchInput) return;

  // Map of category/section keywords to their section IDs
  const sectionKeywords = {
    'electronics': 'electronics',
    'electronic': 'electronics',
    'watch': 'electronics',
    'audio': 'electronics',
    'pods': 'electronics',
    'charger': 'electronics',
    'charging': 'electronics',
    'clothing': 'clothing',
    'clothes': 'clothing',
    'shirt': 'clothing',
    'tee': 'clothing',
    'parka': 'clothing',
    'jacket': 'clothing',
    'hoodie': 'clothing',
    'trousers': 'clothing',
    'pants': 'clothing',
    'essentials': 'daily-needs',
    'daily': 'daily-needs',
    'candle': 'daily-needs',
    'flask': 'daily-needs',
    'bottle': 'daily-needs',
    'bag': 'daily-needs',
    'journal': 'daily-needs',
    'hardware': 'hardware',
    'tool': 'hardware',
    'tools': 'hardware',
    'case': 'hardware',
    'driver': 'hardware',
    'vault': 'hardware',
    'deals': 'deal-section',
    'deal': 'deal-section',
    'sale': 'deal-section',
    'discount': 'deal-section',
  };

  // All searchable sections
  const sectionIds = ['deal-section', 'electronics', 'clothing', 'daily-needs', 'hardware'];
  const otherElements = ['.category-grid', '.promo-banner', '.hero-section'];

  function performSearch() {
    const selectedCategory = categorySelect ? categorySelect.value.toLowerCase() : 'all';
    const query = searchInput.value.toLowerCase().trim();

    // If empty search, restore everything
    if (query === '' && selectedCategory === 'all') {
      resetAll();
      return;
    }

    // Determine effective query — combine category dropdown with text
    let effectiveQuery = query;
    if (selectedCategory !== 'all' && query === '') {
      effectiveQuery = selectedCategory;
    }

    // Check if the query matches a whole section/category
    const matchedSectionId = sectionKeywords[effectiveQuery];

    if (matchedSectionId) {
      // Show only the matched section, hide others
      sectionIds.forEach(id => {
        const section = document.getElementById(id);
        if (!section) return;
        if (id === matchedSectionId) {
          section.style.display = '';
          section.style.opacity = '1';
          // Show all cards in this section
          section.querySelectorAll('.product-card').forEach(card => {
            card.style.display = '';
            card.style.opacity = '1';
            card.style.transform = '';
          });
        } else {
          section.style.display = 'none';
        }
      });
      // Hide category grid and promo when filtering
      otherElements.forEach(sel => {
        const el = document.querySelector(sel);
        if (el) el.style.display = 'none';
      });
      // Scroll to matched section
      const target = document.getElementById(matchedSectionId);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    // Otherwise, do a text match on individual product cards across all sections
    let anyMatch = false;

    sectionIds.forEach(id => {
      const section = document.getElementById(id);
      if (!section) return;

      const cards = section.querySelectorAll('.product-card');
      let sectionHasMatch = false;

      cards.forEach(card => {
        const title = card.querySelector('.product-title')?.textContent.toLowerCase() || '';
        const subtitle = card.querySelector('.product-subtitle')?.textContent.toLowerCase() || '';
        const badge = card.querySelector('.product-badge')?.textContent.toLowerCase() || '';

        if (title.includes(effectiveQuery) || subtitle.includes(effectiveQuery) || badge.includes(effectiveQuery)) {
          card.style.display = '';
          card.style.opacity = '1';
          card.style.transform = '';
          sectionHasMatch = true;
          anyMatch = true;
        } else {
          card.style.display = 'none';
        }
      });

      section.style.display = sectionHasMatch ? '' : 'none';
    });

    // Hide extras when searching
    otherElements.forEach(sel => {
      const el = document.querySelector(sel);
      if (el) el.style.display = effectiveQuery ? 'none' : '';
    });

    // If no product matched, try partial section keyword match
    if (!anyMatch && effectiveQuery.length >= 2) {
      const partialMatch = Object.keys(sectionKeywords).find(k => k.includes(effectiveQuery) || effectiveQuery.includes(k));
      if (partialMatch) {
        const secId = sectionKeywords[partialMatch];
        const section = document.getElementById(secId);
        if (section) {
          section.style.display = '';
          section.style.opacity = '1';
          section.querySelectorAll('.product-card').forEach(card => {
            card.style.display = '';
            card.style.opacity = '1';
            card.style.transform = '';
          });
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  }

  function resetAll() {
    sectionIds.forEach(id => {
      const section = document.getElementById(id);
      if (!section) return;
      section.style.display = '';
      section.style.opacity = '1';
      section.querySelectorAll('.product-card').forEach(card => {
        card.style.display = '';
        card.style.opacity = '1';
        card.style.transform = '';
      });
    });
    otherElements.forEach(sel => {
      const el = document.querySelector(sel);
      if (el) el.style.display = '';
    });
  }

  // Debounced input search
  let debounceTimer;
  searchInput.addEventListener('input', function() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(performSearch, 250);
  });

  // Search button click
  if (searchBtn) {
    searchBtn.addEventListener('click', performSearch);
  }

  // Enter key
  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      performSearch();
    }
  });

  // Category dropdown change
  if (categorySelect) {
    categorySelect.addEventListener('change', performSearch);
  }
}

// ===== Back to Top =====
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== Scroll-in Animations =====
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.product-card, .category-card, .promo-banner, .product-scroll-section, .product-grid-section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    observer.observe(el);
  });
}

// ===== Deal Timer (Countdown) =====
function initDealTimer() {
  const hoursEl = document.getElementById('timer-hours');
  const minsEl = document.getElementById('timer-mins');
  const secsEl = document.getElementById('timer-secs');

  if (!hoursEl || !minsEl || !secsEl) return;

  // 8 hours from now
  let totalSeconds = 8 * 3600 + 45 * 60 + 30;

  function tick() {
    if (totalSeconds <= 0) return;
    totalSeconds--;

    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    hoursEl.textContent = String(h).padStart(2, '0');
    minsEl.textContent = String(m).padStart(2, '0');
    secsEl.textContent = String(s).padStart(2, '0');
  }

  setInterval(tick, 1000);
}

// Start deal timer
initDealTimer();
