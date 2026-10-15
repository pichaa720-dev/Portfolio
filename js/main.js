/**
 * Portfolio JavaScript
 * Modern Interactive Functionalities
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initPortfolioFilter();
  initContactForm();
  initBackToTop();
  initModal();
});

/* ==========================================================================
   THEME TOGGLE (Dark / Light)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn) return;
  const icon = toggleBtn.querySelector('i');
  if (icon) {
    if (theme === 'light') {
      icon.className = 'fa-solid fa-moon';
      toggleBtn.setAttribute('title', 'เปลี่ยนเป็นโหมดมืด (Dark Mode)');
    } else {
      icon.className = 'fa-solid fa-sun';
      toggleBtn.setAttribute('title', 'เปลี่ยนเป็นโหมดสว่าง (Light Mode)');
    }
  }
}

/* ==========================================================================
   MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('active')) {
          icon.className = 'fa-solid fa-xmark';
        } else {
          icon.className = 'fa-solid fa-bars';
        }
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      }
    });
  }
}

/* ==========================================================================
   PORTFOLIO FILTER
   ========================================================================== */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-card');

  if (!filterBtns.length || !portfolioItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue || category?.includes(filterValue)) {
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   CONTACT FORM SUBMISSION
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const toastAlert = document.getElementById('toastAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> กำลังส่งข้อความ...';

      // Simulate sending delay
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        if (toastAlert) {
          toastAlert.classList.add('show');
          toastAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });

          // Hide after 5 seconds
          setTimeout(() => {
            toastAlert.classList.remove('show');
          }, 5000);
        }

        contactForm.reset();
      }, 1000);
    });
  }
}

/* ==========================================================================
   BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* ==========================================================================
   PROJECT MODAL POPUP
   ========================================================================== */
function initModal() {
  const modal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const viewDetailBtns = document.querySelectorAll('.btn-view-detail');

  if (!modal) return;

  if (viewDetailBtns.length) {
    viewDetailBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const title = btn.getAttribute('data-title') || 'รายละเอียดผลงาน';
        const desc = btn.getAttribute('data-desc') || 'คำอธิบายผลงานแบบละเอียด';
        const img = btn.getAttribute('data-img') || '';
        const tech = btn.getAttribute('data-tech') || '';
        const link = btn.getAttribute('data-link') || '#';

        const modalTitle = document.getElementById('modalTitle');
        const modalDesc = document.getElementById('modalDesc');
        const modalImg = document.getElementById('modalImg');
        const modalTech = document.getElementById('modalTech');
        const modalLink = document.getElementById('modalLink');

        if (modalTitle) modalTitle.textContent = title;
        if (modalDesc) modalDesc.textContent = desc;
        if (modalImg && img) modalImg.src = img;
        if (modalTech) modalTech.innerHTML = tech;
        if (modalLink) modalLink.href = link;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

