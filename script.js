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
  // PREMIUM DYNAMIC THEATRE PLAYER & AUDIO SYNCHRONIZATION
  // ==========================================
  const theatreVideo = document.getElementById('theatre-video');
  const playlistItems = document.querySelectorAll('.playlist-item');
  const activeNum = document.getElementById('active-video-num');
  const activeTitle = document.getElementById('active-video-title');
  const activePurpose = document.getElementById('active-video-purpose');
  const activeUse = document.getElementById('active-video-use');
  const unmuteBtn = document.getElementById('theatre-unmute-btn');
  const videoFallback = document.getElementById('theatre-video-fallback');

  let userMutedState = true; // By default, browser autoplay requires muted state.

  // Handle Unmute Button click
  if (unmuteBtn && theatreVideo) {
    unmuteBtn.addEventListener('click', () => {
      // Toggle muted status
      userMutedState = !userMutedState;
      theatreVideo.muted = userMutedState;
      
      // Update UI button representation
      updateUnmuteButtonUI();
    });
  }

  function updateUnmuteButtonUI() {
    if (!unmuteBtn) return;
    if (userMutedState) {
      unmuteBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M11 5L6 9H2v6h4l5 4V5z"/>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
        </svg>
        Tap to Unmute
      `;
      unmuteBtn.classList.remove('unmuted');
    } else {
      unmuteBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M11 5L6 9H2v6h4l5 4V5z"/>
          <line x1="23" y1="9" x2="17" y2="15" stroke-width="2"/>
          <line x1="17" y1="9" x2="23" y2="15" stroke-width="2"/>
        </svg>
        Mute Audio
      `;
      unmuteBtn.classList.add('unmuted');
    }
  }

  // Handle click on playlist items
  playlistItems.forEach(item => {
    item.addEventListener('click', () => {
      // Remove active class from all tabs
      playlistItems.forEach(tab => tab.classList.remove('active'));
      
      // Add active class to clicked tab
      item.classList.add('active');
      
      // Fetch details from data attributes
      const videoSrc = item.getAttribute('data-video-src');
      const title = item.getAttribute('data-title');
      const purpose = item.getAttribute('data-purpose');
      const use = item.getAttribute('data-use');
      const index = item.getAttribute('data-video-index');

      // Update main detail panel info
      if (activeNum) activeNum.textContent = index.padStart(2, '0');
      if (activeTitle) activeTitle.textContent = title;
      if (activePurpose) activePurpose.textContent = purpose;
      if (activeUse) activeUse.textContent = use;

      // Update video player source & play it
      if (theatreVideo) {
        // Reset any load error fallback styling
        const phoneScreen = theatreVideo.parentElement;
        if (phoneScreen) phoneScreen.classList.remove('video-load-error');
        if (videoFallback) videoFallback.style.display = 'none';

        theatreVideo.src = videoSrc;
        theatreVideo.muted = userMutedState; // Maintain current user muted state
        theatreVideo.load();
        
        theatreVideo.play().catch(error => {
          console.log('Play initiated but deferred by browser settings:', error);
        });
      }
    });
  });

  // viewport aware play/pause control on the main single theatre video player
  if ('IntersectionObserver' in window && theatreVideo) {
    const theatreObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          theatreVideo.play().catch(err => {
            console.log('Play deferred until user action:', err);
          });
        } else {
          theatreVideo.pause();
        }
      });
    }, { threshold: 0.3 }); // Play when at least 30% of the player is visible
    
    theatreObserver.observe(theatreVideo.parentElement.parentElement); // Observe phone mockup
  }

  // Graceful video load error indicator inside phone mockup screen
  if (theatreVideo) {
    theatreVideo.addEventListener('error', () => {
      const phoneScreen = theatreVideo.parentElement;
      if (phoneScreen) phoneScreen.classList.add('video-load-error');
      if (videoFallback) {
        // Update error message dynamically depending on file path
        const currentSrc = theatreVideo.getAttribute('src');
        const fallbackTitle = videoFallback.querySelector('.video-fallback-title');
        const fallbackDesc = videoFallback.querySelector('.video-fallback-desc');
        
        if (fallbackTitle) fallbackTitle.textContent = `Video Load Failure`;
        if (fallbackDesc) fallbackDesc.textContent = `File "${currentSrc}" could not be streamed. Please double check that you placed compressed files inside the videos/ folder.`;
        
        videoFallback.style.display = 'flex';
      }
    });
    
    // Fallback error timeout
    let checkMetadataTimeout;
    theatreVideo.addEventListener('loadstart', () => {
      clearTimeout(checkMetadataTimeout);
      checkMetadataTimeout = setTimeout(() => {
        if (theatreVideo.readyState === 0) { // HAVE_NOTHING
          const phoneScreen = theatreVideo.parentElement;
          if (phoneScreen) phoneScreen.classList.add('video-load-error');
          if (videoFallback) videoFallback.style.display = 'flex';
        }
      }, 6000);
    });

    theatreVideo.addEventListener('loadedmetadata', () => {
      clearTimeout(checkMetadataTimeout);
    });
  }

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
