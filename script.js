/* 
 * script.js
 * OfferFlow AI - Interactive Functions
 * Creator: Cyrus Alcala
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // CONFIGURATION CONSTANTS
  // ==========================================
  // Edit these variables to update links, email, or targets globally.
  const CONTACT_CONFIG = {
    email: 'cyrusalcala.agency@gmail.com',
    emailSubject: 'OfferFlow AI Demo Pack Inquiry',
    linkedinUrl: 'https://www.linkedin.com/in/cyrusalcala/'
  };

  // ==========================================
  // MOBILE NAVIGATION DRAWER
  // ==========================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('active');
      
      // Accessibility attributes
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ==========================================
  // STICKY HEADER SCROLL EFFECT
  // ==========================================
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ==========================================
  // FAQ ACCORDION COLLAPSE/EXPAND
  // ==========================================
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close all other FAQ items for a clean accordion experience
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.toggle-icon').textContent = '+';
      });
      
      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
        question.querySelector('.toggle-icon').textContent = '×';
      } else {
        item.classList.remove('active');
        question.querySelector('.toggle-icon').textContent = '+';
      }
    });
  });

  // ==========================================
  // INTERSECTION OBSERVER FOR ACTIVE NAV LINKS
  // ==========================================
  const sections = document.querySelectorAll('section');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // Trigger when section occupies the active focus area
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    if (section.getAttribute('id')) {
      navObserver.observe(section);
    }
  });

  // ==========================================
  // SMART VIEWPORT VIDEO AUTOPLAY/PAUSE
  // ==========================================
  const videos = document.querySelectorAll('.video-card video');
  
  if ('IntersectionObserver' in window) {
    const videoObserverOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 // Trigger play when 50% of the video card is visible
    };

    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        
        if (entry.isIntersecting) {
          // Play the video when in view
          video.play().catch(error => {
            // Muted video autoplay is allowed in almost all browsers,
            // but we catch and log failures to prevent console noise.
            console.log('Autoplay deferred until user interaction:', error);
          });
        } else {
          // Pause the video when out of view to preserve resources
          video.pause();
        }
      });
    }, videoObserverOptions);

    videos.forEach(video => {
      videoObserver.observe(video);
    });
  } else {
    // Fallback for older browsers: Keep controls visible and don't autoplay
    videos.forEach(video => {
      video.removeAttribute('autoplay');
    });
  }

  // ==========================================
  // GRACEFUL VIDEO FILE FALLBACK
  // ==========================================
  // Detects if local video files fail to load (e.g. missing files, 404, format issues)
  // and turns on the fallback poster visualization in CSS.
  videos.forEach(video => {
    const wrapper = video.parentElement;
    
    // Triggered if the video src fails to load or 404s
    video.addEventListener('error', () => {
      wrapper.classList.add('video-load-error');
      console.warn(`Video file failed to load: ${video.getAttribute('src')}`);
    });
    
    // Optional timeout fallback: if video metadata doesn't load within 5 seconds,
    // show the fallback to ensure the site looks premium.
    const checkTimeout = setTimeout(() => {
      if (video.readyState === 0) { // HAVE_NOTHING
        wrapper.classList.add('video-load-error');
      }
    }, 5000);
    
    video.addEventListener('loadedmetadata', () => {
      clearTimeout(checkTimeout);
    });
  });

  // ==========================================
  // INQUIRY PRE-FILLING UTILITY
  // ==========================================
  const emailInquiryBtn = document.getElementById('btn-email-inquiry');
  if (emailInquiryBtn) {
    emailInquiryBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const subject = encodeURIComponent(CONTACT_CONFIG.emailSubject);
      const body = encodeURIComponent(
        "Hi Cyrus,\n\n" +
        "I'm interested in the OfferFlow AI UGC Demo Pack.\n\n" +
        "Here are some details about my business:\n" +
        "- My Brand/Service Offer:\n" +
        "- My Target Audience:\n\n" +
        "Looking forward to hearing from you!"
      );
      
      window.location.href = `mailto:${CONTACT_CONFIG.email}?subject=${subject}&body=${body}`;
    });
  }

  // ==========================================
  // FUTURE INTEGRATION / MODULARITY NOTE
  // ==========================================
  /*
    If you decide to replace mailto/LinkedIn links with GoHighLevel, Tally, or Calendly:
    Simply change the trigger event here or swap the CTA button HTML elements for:
    
    // Example GHL Inline Form Popup:
    const openGhlForm = () => {
      // code to trigger GHL popup widget
    };
    
    // Example Calendly Widget:
    const openCalendly = () => {
      Calendly.initPopupWidget({ url: 'https://calendly.com/your-username' });
    };
  */

});
