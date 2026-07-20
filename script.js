document.getElementById('year').textContent = new Date().getFullYear();

  /* Theme toggle (in-memory only) */
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  themeBtn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
  });

  /* Mobile menu */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  /* Active nav link on scroll */
  const sections = document.querySelectorAll('section[id]');
  const navA = document.querySelectorAll('nav.links a');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navA.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });
  sections.forEach(s => navObserver.observe(s));

  /* Scroll reveal */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* Experience accordion */
  document.querySelectorAll('.t-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.t-item');
      const isOpen = item.classList.toggle('open');
      btn.firstChild.textContent = isOpen ? 'Hide responsibilities ' : 'Show responsibilities ';
    });
  });

  /* Toast helper */
  const toast = document.getElementById('toast');
  let toastTimer;
  function showToast(msg){
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  /* Copy buttons */
  document.getElementById('copyEmail').addEventListener('click', () => {
    navigator.clipboard.writeText('nithyadonthu@gmail.com').then(() => showToast('Email copied to clipboard'));
  });
  document.getElementById('copyPhone').addEventListener('click', () => {
    navigator.clipboard.writeText('+91 76719 39970').then(() => showToast('Phone number copied'));
  });

  /* Contact form -> mailto */
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cf-name');
    const email = document.getElementById('cf-email');
    const msg = document.getElementById('cf-msg');
    let valid = true;

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());

    document.getElementById('f-name').classList.toggle('invalid', name.value.trim() === '');
    document.getElementById('f-email').classList.toggle('invalid', !emailOk);
    document.getElementById('f-msg').classList.toggle('invalid', msg.value.trim() === '');

    if (name.value.trim() === '' || !emailOk || msg.value.trim() === '') valid = false;

    if (!valid) return;

    const subject = encodeURIComponent('Portfolio inquiry from ' + name.value.trim());
    const body = encodeURIComponent(msg.value.trim() + '\n\n— ' + name.value.trim() + ' (' + email.value.trim() + ')');
    window.location.href = `mailto:nithyadonthu@gmail.com?subject=${subject}&body=${body}`;
    showToast('Opening your email app…');
  });

  /* Back to top */
  const toTop = document.getElementById('toTop');
  window.addEventListener('scroll', () => {
    toTop.classList.toggle('show', window.scrollY > 500);
  });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
