// ==========================================================================
// FITRI OKTAVIA MANIK — EDITORIAL WORKSPACE INTERACTION
// Segmented Tabs, WhatsApp Formatter, Instant Clipboard, PDF Exporter
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // 1. Segmented Magazine Tab Switching
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      if (!targetId) return;

      // Update Tab Buttons Active State
      tabButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      // Update Panels
      tabPanels.forEach((panel) => {
        if (panel.id === targetId) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });

      // Scroll smoothly to top of content stage on mobile
      if (window.innerWidth <= 1024) {
        const stage = document.querySelector('.content-stage');
        if (stage) {
          stage.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // 2. Toast Notification Helper
  const toast = document.getElementById('toast');
  let toastTimer;

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2600);
  };

  // 3. Quick Copy Buttons (Phone & Email Chips)
  const copyButtons = document.querySelectorAll('.btn-copy-chip');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const copyVal = btn.getAttribute('data-copy');
      if (!copyVal) return;

      try {
        await navigator.clipboard.writeText(copyVal);
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        showToast(`Disalin: ${copyVal}`);
        setTimeout(() => {
          btn.textContent = originalText;
        }, 1600);
      } catch (err) {
        showToast('Gagal menyalin otomatis, silakan salin manual.');
      }
    });
  });

  // 4. Print / PDF Export
  const printBtn = document.getElementById('printCvBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      // Temporarily show all tab panels for a complete printout
      tabPanels.forEach((p) => p.classList.add('active'));
      window.print();
      // Restore active tab after print window closes
      setTimeout(() => {
        const activeBtn = document.querySelector('.tab-btn.active');
        const activeId = activeBtn ? activeBtn.getAttribute('data-target') : 'overview';
        tabPanels.forEach((p) => {
          if (p.id !== activeId) p.classList.remove('active');
        });
      }, 500);
    });
  }

  // 5. Contact Form WhatsApp Dispatcher
  const contactForm = document.getElementById('contactForm');
  const sendEmailFallbackBtn = document.getElementById('sendEmailFallbackBtn');

  const getFormDetails = () => {
    const name = (document.getElementById('yourName')?.value || '').trim();
    const purpose = (document.getElementById('purpose')?.value || 'Design Collaboration').trim();
    const message = (document.getElementById('message')?.value || '').trim();
    return { name, purpose, message };
  };

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const { name, purpose, message } = getFormDetails();

      if (!name || !message) {
        showToast('Please fill in your name and message details.');
        return;
      }

      const waText = [
        `Hello Fitri Oktavia (Ocaa),`,
        `My name is *${name}* contacting you through your CV & Portfolio website.`,
        ``,
        `*Topic:* ${purpose}`,
        `*Message:* ${message}`,
        ``,
        `Looking forward to collaborating with you!`
      ].join('\n');

      const waUrl = `https://wa.me/6282173746233?text=${encodeURIComponent(waText)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      showToast('Opening WhatsApp with your message...');
    });
  }

  if (sendEmailFallbackBtn) {
    sendEmailFallbackBtn.addEventListener('click', () => {
      const { name, purpose, message } = getFormDetails();
      const subject = `${purpose} — from ${name || 'Portfolio Visitor'}`;
      const body = [
        `Dear Fitri Oktavia Manik (Ocaa),`,
        ``,
        `Sender / Company: ${name || '-'}`,
        `Classification: ${purpose}`,
        ``,
        `Message:`,
        message || '(Insert message here)'
      ].join('\n');

      window.location.href = `mailto:octaapiaaa3@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

});
