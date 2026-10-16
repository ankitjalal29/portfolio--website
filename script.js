// Portfolio interactions: scroll reveal, skill filters, mobile menu, progress bar, copy link.
const progress = document.getElementById('scrollProgress');
const nav = document.getElementById('nav');
const menuToggle = document.getElementById('menuToggle');

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = `${percent}%`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// Reveal elements when they enter the viewport.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}

// Filter skills by category.
const filterButtons = document.querySelectorAll('.filter');
const skillCards = document.querySelectorAll('.skill-card');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const category = button.dataset.filter;
    skillCards.forEach(card => {
      const show = category === 'all' || card.dataset.category === category;
      card.classList.toggle('hidden', !show);
    });
  });
});

// Mobile navigation.
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  menuToggle.textContent = isOpen ? '×' : '☰';
});
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    menuToggle.textContent = '☰';
  });
});

// Copy the GitHub profile URL with a fallback for older browsers.
const copyButton = document.getElementById('copyProfile');
const copyStatus = document.getElementById('copyStatus');
copyButton.addEventListener('click', async () => {
  const profileUrl = 'https://github.com/ankitjalal29';
  try {
    await navigator.clipboard.writeText(profileUrl);
    copyStatus.textContent = 'GitHub link copied to clipboard!';
  } catch (error) {
    const temp = document.createElement('textarea');
    temp.value = profileUrl;
    temp.setAttribute('readonly', '');
    temp.style.position = 'absolute';
    temp.style.left = '-9999px';
    document.body.appendChild(temp);
    temp.select();
    const copied = document.execCommand('copy');
    temp.remove();
    copyStatus.textContent = copied ? 'GitHub link copied to clipboard!' : profileUrl;
  }
  copyButton.innerHTML = 'Copied! <span>✓</span>';
  window.setTimeout(() => {
    copyButton.innerHTML = 'Copy GitHub profile link <span>⧉</span>';
    copyStatus.textContent = '';
  }, 2600);
});
