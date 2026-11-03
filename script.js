// ==========================================================================
// FITRI OKTAVIA MANIK — INTERACTION SCRIPT
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Footer Year
  const yearEl = document.getElementById('footerYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const siteNav = document.getElementById('siteNav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && siteNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('open');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Scroll Indicator Bar & Header Shadow
  const scrollBar = document.getElementById('scrollBar');
  const siteHeader = document.querySelector('.site-header');

  const onScroll = () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    if (scrollBar) {
      scrollBar.style.width = `${progress}%`;
    }

    if (siteHeader) {
      siteHeader.classList.toggle('scrolled', scrollY > 30);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 4. Copy to Clipboard
  const copyButtons = document.querySelectorAll('.btn-copy-sm');
  const toast = document.getElementById('toast');
  let toastTimer;

  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  };

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const val = btn.getAttribute('data-copy');
      if (!val) return;

      try {
        await navigator.clipboard.writeText(val);
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        showToast(`Copied: ${val}`);
        setTimeout(() => {
          btn.textContent = originalText;
        }, 1800);
      } catch {
        showToast('Failed to copy automatically.');
      }
    });
  });

  // 5. Contact Form WhatsApp Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (document.getElementById('yourName')?.value || '').trim();
      const purpose = (document.getElementById('purpose')?.value || 'General Inquiry').trim();
      const message = (document.getElementById('message')?.value || '').trim();

      if (!name || !message) {
        showToast('Please fill in your name and message.');
        return;
      }

      const text = [
        `Hello Fitri Oktavia,`,
        `My name is *${name}* and I visited your CV website.`,
        ``,
        `*Purpose:* ${purpose}`,
        `*Message:* ${message}`
      ].join('\n');

      const waUrl = `https://wa.me/6282173746233?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      showToast('Opening WhatsApp...');
    });
  }

  // 6. Scroll Reveal Observer
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }
});
