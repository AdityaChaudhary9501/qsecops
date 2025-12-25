/**
 * QSecOps.org - Main JavaScript
 * Quantum Security Operations Blog
 */

// ==========================================
// Navbar Scroll Effect
// ==========================================
const navbar = document.querySelector('.navbar');

function handleScroll() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleScroll);

// ==========================================
// Mobile Menu Toggle
// ==========================================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
  });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
  });
});

// ==========================================
// Category Filter (Blog Page)
// ==========================================
const filterTabs = document.querySelectorAll('.filter-tab');
const articleCards = document.querySelectorAll('.article-card[data-category]');

filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Update active tab
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    const category = tab.dataset.category;
    
    // Filter articles
    articleCards.forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
        card.style.display = 'flex';
        card.style.animation = 'fadeInUp 0.4s ease';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ==========================================
// Smooth Scroll for Anchor Links
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ==========================================
// Intersection Observer for Animations
// ==========================================
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      animateOnScroll.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements with animation classes
document.querySelectorAll('.card, .section-header, .contributor-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  animateOnScroll.observe(el);
});

// Add animate-in styles
document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
});

// ==========================================
// Newsletter Form Handling
// ==========================================
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    
    // Show success message (in real app, this would submit to backend)
    const btn = newsletterForm.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = 'Subscribed! ✓';
    btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      newsletterForm.reset();
    }, 3000);
  });
}

// ==========================================
// Active Nav Link Highlighting
// ==========================================
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (currentPath.includes(href) && href !== 'index.html') {
    link.classList.add('active');
  } else if (currentPath.endsWith('/') && href === 'index.html') {
    link.classList.add('active');
  }
});

// ==========================================
// Particle Animation Enhancement
// ==========================================
function createParticles() {
  const particlesContainer = document.querySelector('.particles');
  if (!particlesContainer) return;
  
  // Add more dynamic particles
  for (let i = 0; i < 5; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 15}s`;
    particle.style.animationDuration = `${15 + Math.random() * 10}s`;
    particlesContainer.appendChild(particle);
  }
}

createParticles();

// ==========================================
// Reading Time Calculator (for articles)
// ==========================================
function calculateReadingTime() {
  const articleContent = document.querySelector('.article-content');
  if (!articleContent) return;
  
  const text = articleContent.textContent;
  const wordCount = text.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200); // Average reading speed
  
  const readingTimeEl = document.querySelector('.reading-time');
  if (readingTimeEl) {
    readingTimeEl.textContent = `${readingTime} min read`;
  }
}

calculateReadingTime();

// ==========================================
// Copy Code Block Functionality
// ==========================================
document.querySelectorAll('.article-content pre').forEach(pre => {
  const copyBtn = document.createElement('button');
  copyBtn.className = 'copy-code-btn';
  copyBtn.textContent = 'Copy';
  copyBtn.style.cssText = `
    position: absolute;
    top: 8px;
    right: 8px;
    padding: 4px 12px;
    background: rgba(0, 212, 255, 0.2);
    border: 1px solid rgba(0, 212, 255, 0.3);
    border-radius: 4px;
    color: #00d4ff;
    font-size: 12px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s;
  `;
  
  pre.style.position = 'relative';
  pre.appendChild(copyBtn);
  
  pre.addEventListener('mouseenter', () => copyBtn.style.opacity = '1');
  pre.addEventListener('mouseleave', () => copyBtn.style.opacity = '0');
  
  copyBtn.addEventListener('click', () => {
    const code = pre.querySelector('code').textContent;
    navigator.clipboard.writeText(code);
    copyBtn.textContent = 'Copied!';
    setTimeout(() => copyBtn.textContent = 'Copy', 2000);
  });
});
