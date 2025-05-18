/**
 * LazyAnimation - Handles animations for lazy loaded elements
 */

function initLazyAnimations() {
  const lazyElements = document.querySelectorAll('.lazy-fade, .card-lazy');

  if (lazyElements.length === 0) return;

  // Use Intersection Observer for modern browsers
  if ('IntersectionObserver' in window) {
    const lazyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;

          // For images, wait until they're loaded
          if (element.tagName === 'IMG') {
            if (element.complete) {
              // Image already loaded
              element.classList.add('is-loaded');
            } else {
              // Wait for image to load
              element.onload = () => element.classList.add('is-loaded');
            }
          } else {
            // For non-image elements, add class immediately
            element.classList.add('is-loaded');
          }

          // Stop observing this element
          lazyObserver.unobserve(element);
        }
      });
    }, {
      rootMargin: '50px 0px', // Start animation slightly before element is in view
      threshold: 0.1 // Trigger when at least 10% of the element is visible
    });

    // Start observing
    lazyElements.forEach(element => {
      lazyObserver.observe(element);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    // Just add the is-loaded class to all elements
    lazyElements.forEach(element => {
      element.classList.add('is-loaded');
    });
  }
}

// Initialize on page load and after view transitions
function initOnLoad() {
  if (typeof document === 'undefined') return;

  // Wait a bit for the DOM to be fully ready
  setTimeout(initLazyAnimations, 10);
}

// Initialize on both events
document.addEventListener('DOMContentLoaded', initOnLoad);
document.addEventListener('astro:page-load', initOnLoad);

export { initLazyAnimations };
