/**
 * Card Carousel
 * Handles interactive card carousel with horizontal navigation
 */
export function initCardCarousel(options = {}) {
  const cards = document.querySelectorAll('.carousel-card');
  const totalCards = cards.length;
  const progressIndicator = document.querySelector('.progress-indicator');

  let currentIndex = 0;
  let targetIndex = 0;
  let touchStartX = 0;
  let lastScrollTime = 0;
  const scrollCooldown = options.scrollCooldown || 800; // ms
  let prevButton;
  let nextButton;

  function updateCardPositions() {
    // Update progress indicator if it exists
    if (progressIndicator) {
      const progress = (targetIndex / (totalCards - 1)) * 100;
      progressIndicator.style.width = `${progress}%`;
    }

    // Update navigation button visibility
    if (prevButton && nextButton) {
      prevButton.style.visibility = targetIndex === 0 ? 'hidden' : 'visible';
      nextButton.style.visibility = targetIndex === totalCards - 1 ? 'hidden' : 'visible';
    }

    cards.forEach((card, index) => {
      const distance = index - targetIndex;
      const cardElement = card;

      if (Math.abs(distance) > 2) {
        // Cards too far from the active one are hidden
        card.classList.remove('active');
        cardElement.style.transform = `translate(-50%, -50%) scale(0.6) translateX(${distance * 100}%)`;
        return;
      }

      // Calculate z-index
      const zIndex = 5 - Math.abs(distance);
      cardElement.style.zIndex = zIndex;

      // Calculate opacity
      let opacity = 1 - (Math.abs(distance) * 0.3);
      opacity = Math.max(0, Math.min(1, opacity));

      // Calculate scale
      let scale = 1 - (Math.abs(distance) * 0.2);
      scale = Math.max(0.6, Math.min(1, scale));

      // Calculate X position
      const translateX = distance * 100;

      // Apply transformations
      card.classList.add('active');
      cardElement.style.transform = `translate(-50%, -50%) scale(${scale}) translateX(${translateX}%)`;
      cardElement.style.opacity = opacity;
    });
  }

  function navigateToCard(index) {
    const now = Date.now();
    if (now - lastScrollTime < scrollCooldown) return;

    lastScrollTime = now;
    targetIndex = Math.max(0, Math.min(totalCards - 1, index));
    updateCardPositions();
  }

  // Mouse wheel event
  window.addEventListener('wheel', (e) => {
    if (e.deltaX > 0 || e.deltaY > 0) {
      navigateToCard(targetIndex + 1);
    } else {
      navigateToCard(targetIndex - 1);
    }
  });

  // Touch events for mobile
  window.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });

  window.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX - touchEndX;

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        navigateToCard(targetIndex + 1);
      } else {
        navigateToCard(targetIndex - 1);
      }
    }
  });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      navigateToCard(targetIndex + 1);
    } else if (e.key === 'ArrowLeft') {
      navigateToCard(targetIndex - 1);
    }
  });

  // Add navigation buttons
  const gallery = document.querySelector('.card-carousel');
  if (gallery) {
    prevButton = document.createElement('button');
    prevButton.className = 'nav-button prev-button';
    prevButton.innerHTML = '&lt;';
    prevButton.onclick = () => navigateToCard(targetIndex - 1);

    nextButton = document.createElement('button');
    nextButton.className = 'nav-button next-button';
    nextButton.innerHTML = '&gt;';
    nextButton.onclick = () => navigateToCard(targetIndex + 1);

    gallery.appendChild(prevButton);
    gallery.appendChild(nextButton);

    // Initialize button visibility
    prevButton.style.visibility = 'hidden'; // Hide left arrow at start
  }

  // Initialize
  updateCardPositions();
  navigateToCard(0);

  // Add nav button styles if not already present
  if (!document.getElementById('carousel-nav-styles')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'carousel-nav-styles';
    styleElement.textContent = `
      .nav-button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
        background: rgba(0,0,0,0.5);
        color: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 18px;
        cursor: pointer;
        transition: background 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .nav-button:hover {
        background: rgba(0,0,0,0.8);
      }

      .prev-button {
        left: 10px;
      }

      .next-button {
        right: 10px;
      }

      @media (max-width: 640px) {
        .nav-button {
          width: 32px;
          height: 32px;
          font-size: 14px;
        }
      }
    `;
    document.head.appendChild(styleElement);
  }
}
