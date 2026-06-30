console.log("Portfolio loaded!");
   // Basic interactivity: menu toggle, smooth reveal, skill bar animation, and contact form handling.

document.addEventListener('DOMContentLoaded', function () {
  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // NAV TOGGLE for small screens
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-navigation');

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  // Smooth scroll behavior (supported natively but ensure links close mobile menu)
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = link.getAttribute('href');
      if (target.startsWith('#')) {
        // close nav on mobile
        navToggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('open');
      }
    });
  });

  // Reveal on scroll and animate skill bars using IntersectionObserver
  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.12 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // animate skill fills when they enter
        entry.target.querySelectorAll('.skill-fill').forEach(fill => {
          const percent = fill.getAttribute('data-percent') || '0';
          fill.style.width = percent + '%';
        });
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal, .skill, .dev-card, .timeline-item').forEach(el => observer.observe(el));

  // CONTACT FORM handling (client-side only)
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  // Set your email address here if you want mailto to prefill a recipient.
  // Leave as an empty string '' to open the email client without recipient (so you don't expose contact info in the code).
  const mailRecipient = ''; // e.g. 'your.email@example.com' (replace with your real email)

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.textContent = '';

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      status.textContent = 'Please fill in all required fields.';
      status.style.color = '#ffbaba';
      return;
    }
    // basic email simple validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      status.textContent = 'Please enter a valid email address.';
      status.style.color = '#ffbaba';
      return;
    }

    const subject = encodeURIComponent(form.subject.value || 'Portfolio contact');
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

    // Build mailto; if mailRecipient is empty, the mail client opens without recipient so you can fill it.
    const mailto = mailRecipient
      ? `mailto:${encodeURIComponent(mailRecipient)}?subject=${subject}&body=${body}`
      : `mailto:?subject=${subject}&body=${body}`;

    // Try to open mail client
    window.location.href = mailto;

    status.textContent = 'Opening your email client...';
    status.style.color = '#bfffc4';
    form.reset();
  });

  // Accessibility: allow Escape to close mobile nav
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      navToggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
    }
  });
});