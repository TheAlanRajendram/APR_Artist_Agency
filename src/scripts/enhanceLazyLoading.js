/**
 * Global script to enhance all existing images with lazy loading
 */

// Apply lazy loading to all images that don't already have loading attribute
function enhanceImagesWithLazyLoading() {
  if (typeof document === 'undefined') return;

  // Target all images except those that already have loading attribute or are in a noscript tag
  const images = document.querySelectorAll('img:not([loading]):not(noscript img)');

  images.forEach(img => {
    // Skip images that are already enhanced
    if (img.classList.contains('lazy-load') || img.hasAttribute('data-src')) {
      return;
    }

    // Skip images that are part of a View Transition
    if (img.hasAttribute('transition:name') || img.hasAttribute('transition:animate')) {
      return;
    }

    // Skip small images that are likely to be icons or logos
    if (img.width < 40 || img.height < 40) {
      return;
    }

    // Skip images in header and footer
    if (isInHeaderOrFooter(img)) {
      img.setAttribute('loading', 'eager'); // Header/footer elements load eagerly
      return;
    }

    // Add loading="lazy" attribute for native lazy loading
    img.setAttribute('loading', 'lazy');

    // Add animation classes if they don't exist
    if (!img.classList.contains('lazy-fade') && !img.classList.contains('card-lazy')) {
      img.classList.add('lazy-fade');
    }

    // For browsers that support IntersectionObserver but don't support native lazy loading
    if (!('loading' in HTMLImageElement.prototype)) {
      // Store original src in data-src
      const originalSrc = img.src;
      if (originalSrc && !img.dataset.src) {
        img.dataset.src = originalSrc;
        // Use a very small transparent placeholder image
        img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
        img.classList.add('lazy-load');
      }

      // Same for srcset if it exists
      const originalSrcset = img.srcset;
      if (originalSrcset && !img.dataset.srcset) {
        img.dataset.srcset = originalSrcset;
        img.srcset = '';
      }
    }
  });
}

// Helper to check if element is in header or footer
function isInHeaderOrFooter(element) {
  let parent = element.parentElement;
  while (parent) {
    if (
      parent.tagName === 'HEADER' ||
      parent.tagName === 'FOOTER' ||
      parent.classList.contains('site-header') ||
      parent.classList.contains('site-footer')
    ) {
      return true;
    }
    parent = parent.parentElement;
  }
  return false;
}

// Function to initialize all lazy loading features
function initAllLazyLoading() {
  enhanceImagesWithLazyLoading();

  // Import and initialize the normal lazy loading script
  import('./lazyLoad.js').then(module => {
    if (module.initLazyLoading) {
      module.initLazyLoading();
    }
  });

  // Initialize the animation system
  import('./lazyAnimations.js').then(module => {
    if (module.initLazyAnimations) {
      module.initLazyAnimations();
    }
  });
}

// Run on page load and after navigation
if (typeof document !== 'undefined') {
  document.addEventListener('astro:page-load', initAllLazyLoading);
}

export { initAllLazyLoading, enhanceImagesWithLazyLoading };
