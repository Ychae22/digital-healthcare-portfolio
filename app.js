// Global Image Error Fallback Handler
function handleImgError(img) {
  if (img.dataset.retriedCount) {
    const count = parseInt(img.dataset.retriedCount);
    if (count >= 3) return;
    img.dataset.retriedCount = count + 1;
  } else {
    img.dataset.retriedCount = 1;
  }

  const currentSrc = img.getAttribute('src') || '';
  const filename = currentSrc.split('/').pop();

  if (img.dataset.retriedCount === '1') {
    // Try lowercase image
    if (filename.startsWith('Image')) {
      img.src = filename.replace(/^Image/, 'image');
    } else if (filename.startsWith('image')) {
      img.src = filename.replace(/^image/, 'Image');
    } else {
      img.src = 'assets/' + filename;
    }
  } else if (img.dataset.retriedCount === '2') {
    img.src = 'assets/' + filename;
  } else if (img.dataset.retriedCount === '3') {
    img.src = 'assets/images/' + filename;
  }
}

// Initialize Lucide Icons & Handlers
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }
  initSlideDeck();
  initNavigation();
});

// Toast notification helper
function copyToClipboard(text, message = '복사되었습니다!') {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(message);
    }).catch(() => {
      fallbackCopyText(text, message);
    });
  } else {
    fallbackCopyText(text, message);
  }
}

function fallbackCopyText(text, message) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(message);
  } catch (err) {
    alert('복사 실패: ' + text);
  }
  document.body.removeChild(textArea);
}

function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const msgEl = document.getElementById('toastMessage');
  if (toast && msgEl) {
    msgEl.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }
}

// Lightbox Modal
function openLightbox(src, title = '') {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const titleEl = document.getElementById('lightboxTitle');
  if (modal && img) {
    img.removeAttribute('data-retried-count');
    // Ensure lowercase image reference
    const fixedSrc = src.replace(/^Image(\d+\.png)$/, 'image$1');
    img.src = fixedSrc;
    if (titleEl) titleEl.textContent = title || '이미지 확대보기';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox(event) {
  if (event && event.target && event.target.id !== 'lightboxModal' && !event.target.closest('button')) {
    return;
  }
  const modal = document.getElementById('lightboxModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Presentation Slide Deck State & Controller
let currentSlide = 1;
const totalSlides = 10;

function initSlideDeck() {
  const toggleBtn = document.getElementById('toggleSlideDeckBtn');
  const exitBtn = document.getElementById('exitSlideDeckBtn');
  const prevTop = document.getElementById('prevSlideTopBtn');
  const nextTop = document.getElementById('nextSlideTopBtn');
  const prevBottom = document.getElementById('prevSlideBottomBtn');
  const nextBottom = document.getElementById('nextSlideBottomBtn');
  const dotsContainer = document.getElementById('slideDots');

  if (toggleBtn) toggleBtn.addEventListener('click', enterSlideDeck);
  if (exitBtn) exitBtn.addEventListener('click', exitSlideDeck);
  if (prevTop) prevTop.addEventListener('click', () => changeSlide(currentSlide - 1));
  if (nextTop) nextTop.addEventListener('click', () => changeSlide(currentSlide + 1));
  if (prevBottom) prevBottom.addEventListener('click', () => changeSlide(currentSlide - 1));
  if (nextBottom) nextBottom.addEventListener('click', () => changeSlide(currentSlide + 1));

  // Generate slide dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    for (let i = 1; i <= totalSlides; i++) {
      const dot = document.createElement('button');
      dot.className = `w-2.5 h-2.5 rounded-full transition-all ${i === 1 ? 'bg-brand-gold w-6' : 'bg-slate-700 hover:bg-slate-500'}`;
      dot.setAttribute('aria-label', `Slide ${i}`);
      dot.addEventListener('click', () => changeSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    const slideDeck = document.getElementById('slideDeckView');
    const isSlideMode = slideDeck && slideDeck.classList.contains('active');
    const isLightbox = document.getElementById('lightboxModal')?.classList.contains('active');

    if (isLightbox && e.key === 'Escape') {
      closeLightbox();
      return;
    }

    if (isSlideMode) {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        changeSlide(currentSlide + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        changeSlide(currentSlide - 1);
      } else if (e.key === 'Escape') {
        exitSlideDeck();
      }
    }
  });
}

function enterSlideDeck() {
  const slideDeck = document.getElementById('slideDeckView');
  if (slideDeck) {
    slideDeck.classList.add('active');
    document.body.style.overflow = 'hidden';
    changeSlide(1);
    if (window.lucide) lucide.createIcons();
  }
}

function exitSlideDeck() {
  const slideDeck = document.getElementById('slideDeckView');
  if (slideDeck) {
    slideDeck.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function changeSlide(slideNum) {
  if (slideNum < 1) slideNum = totalSlides;
  if (slideNum > totalSlides) slideNum = 1;
  currentSlide = slideNum;

  // Update slide items
  const slides = document.querySelectorAll('.slide-item');
  slides.forEach((slide) => {
    if (parseInt(slide.getAttribute('data-slide')) === currentSlide) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });

  // Update indicator
  const indicator = document.getElementById('slideIndicator');
  if (indicator) {
    indicator.textContent = `Slide ${currentSlide} / ${totalSlides}`;
  }

  // Update dots
  const dots = document.querySelectorAll('#slideDots button');
  dots.forEach((dot, idx) => {
    if (idx + 1 === currentSlide) {
      dot.className = 'w-6 h-2.5 rounded-full bg-brand-gold transition-all';
    } else {
      dot.className = 'w-2.5 h-2.5 rounded-full bg-slate-700 hover:bg-slate-500 transition-all';
    }
  });
}

// Navigation & Mobile Menu
function initNavigation() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Glass nav shadow on scroll
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('shadow-lg');
    } else {
      header?.classList.remove('shadow-lg');
    }
  });
}