/**
 * Lazy loading utility functions
 */

// Initialize intersection observer for lazy loading
export function initLazyLoading() {
  // Check if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img.lazy-load');

    // Skip if no lazy-load images found
    if (lazyImages.length === 0) return;

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;

          // Skip images that are part of a view transition
          if (lazyImage.hasAttribute('transition:name') || lazyImage.hasAttribute('transition:animate')) {
            observer.unobserve(lazyImage);
            return;
          }

          // Set src from data-src attribute
          if (lazyImage.dataset.src) {
            lazyImage.src = lazyImage.dataset.src;
          }

          // Set srcset from data-srcset attribute
          if (lazyImage.dataset.srcset) {
            lazyImage.srcset = lazyImage.dataset.srcset;
          }

          // Remove lazy-load class to avoid re-observing
          lazyImage.classList.remove('lazy-load');

          // Stop observing image
          imageObserver.unobserve(lazyImage);
        }
      });
    }, {
      rootMargin: '200px 0px', // Load images when they're 200px from viewport
      threshold: 0.01 // Trigger when at least 1% of the element is visible
    });

    // Observe each image
    lazyImages.forEach(image => {
      imageObserver.observe(image);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    const lazyLoad = () => {
      const lazyImages = document.querySelectorAll('img.lazy-load');

      lazyImages.forEach(img => {
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
        }
        img.classList.remove('lazy-load');
      });
    };

    // Load all images immediately for unsupported browsers
    document.addEventListener('DOMContentLoaded', lazyLoad);
  }
}

// Initialize when module is imported and on each page transition
if (typeof document !== 'undefined') {
  document.addEventListener('astro:page-load', initLazyLoading);
}
