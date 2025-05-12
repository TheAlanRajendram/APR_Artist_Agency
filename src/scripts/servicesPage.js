// src/scripts/servicesPage.js

// Function to adjust padding-bottom of the services container
function adjustServicesContainerPadding() {
    const servicesContainer = document.querySelector(".services-container");
    if (!servicesContainer) {
      // console.warn(".services-container not found for padding adjustment.");
      return;
    }
    const sections = servicesContainer.querySelectorAll(".service-sticky-wrapper");
    if (sections.length === 0) {
      servicesContainer.style.paddingBottom = "0px";
      return;
    }
    const lastSection = sections[sections.length - 1];
    const lastSectionHeight = lastSection.offsetHeight;
    const viewportHeight = window.innerHeight;
    let calculatedPadding = viewportHeight - lastSectionHeight;
    calculatedPadding = Math.max(0, calculatedPadding); // Ensure non-negative
    servicesContainer.style.paddingBottom = `${calculatedPadding}px`;
    // console.log(`Padding Bottom Set: ${calculatedPadding}px`);
  }

  document.addEventListener("DOMContentLoaded", () => {
    // const tocHeader = document.getElementById("services-toc-header"); // Only needed if you measure its static height for some reason
    const tocLinks = document.querySelectorAll(".toc-link");
    const allStickySections = document.querySelectorAll(".service-sticky-wrapper[id]"); // Sections that will stack

    if (allStickySections.length === 0) {
      // console.warn("No '.service-sticky-wrapper[id]' sections found for interaction.");
      return; // Exit if no sections to observe
    }

    // --- 1. Smooth Scrolling for TOC links (Simplified) ---
    if (tocLinks.length > 0) {
      tocLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
          e.preventDefault();
          const targetId = this.getAttribute("href").substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            // Scroll target top to the viewport top (or start of its block)
            // The browser will handle scrolling to make the element visible.
            // If you had a MAIN fixed/sticky site header (not the TOC), you'd use scroll-padding-top in CSS.
            targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        });
      });
    }

    // --- 2. Intersection Observer for Stacking, Reveal, and TOC Highlighting ---
    let currentlyActiveTocId = null;
    let fallbackCheckTimeout = null; // For debouncing the fallback part of highlighting

    // Set initial --index CSS variable on all sticky sections for z-index
    allStickySections.forEach((section, index) => {
      // Higher index for later sections (higher z-index = appears on top)
      // This makes each subsequent section appear on top of the previous ones
      section.style.setProperty("--index", String(index + 1));
    });

    const observerCallback = (entries, observer) => {
      // Process all entries that are intersecting
      entries.forEach(entry => {
        const targetElement = entry.target;
        const targetIndex = parseInt(targetElement.getAttribute("data-index") || "0", 10);
        const sectionId = targetElement.getAttribute("id");

        // Simple toggle of sticky class based on intersection
        if (entry.isIntersecting) {
          // Make this section and all previous ones sticky
          allStickySections.forEach((section, i) => {
            if (i <= targetIndex) {
              section.classList.add("sticky");

              // Only make the current section active for visual effects
              if (i === targetIndex) {
                section.classList.add("active");
              }
            }
          });

          // Update active TOC link
          if (tocLinks.length > 0 && sectionId) {
            tocLinks.forEach(link => {
              link.classList.remove('active');
              if (link.getAttribute('data-target-id') === sectionId) {
                link.classList.add('active');
              }
            });
          }
        } else {
          // Only remove active class when scrolling away
          // Keep sticky until another section becomes active
          targetElement.classList.remove("active");
        }
      });
    };

    // Observer Options: Defines when a section is considered "active" for highlighting and stacking trigger
    const observerOptions = {
        root: null,
        rootMargin: `-10% 0px -70% 0px`, // Track when a section is in the top 30% of the viewport
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5] // Multiple thresholds for better tracking
    };

    const sectionObserver = new IntersectionObserver(observerCallback, observerOptions);

    if (allStickySections.length > 0) {
      allStickySections.forEach(section => {
        if (section) sectionObserver.observe(section);
      });
    } else {
      // console.warn("No sections to observe for stacking/highlighting.");
    }

    // --- Layout Calculation & Resize/Media Handling ---
    let resizeTimeout;
    const fullLayoutUpdate = () => {
      adjustServicesContainerPadding();
      // The IntersectionObserver's rootMargin is static in this version,
      // so no need to re-initialize it on resize unless its calculation becomes dynamic.
    };

    fullLayoutUpdate(); // Initial calculation

    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(fullLayoutUpdate, 250);
    });

    // Simplified media loading check - just recalculate padding when done
    const servicesContainerElement = document.querySelector(".services-container");
    if (servicesContainerElement) {
      const images = servicesContainerElement.querySelectorAll("img");
      let mediaTasksPending = 0;

      const itemLoaded = () => {
          mediaTasksPending--;
          if (mediaTasksPending === 0) {
              // console.log("All pending media (images/fonts) loaded/ready, running fullLayoutUpdate.");
              fullLayoutUpdate();
          }
      };

      if (images.length > 0) {
          mediaTasksPending += images.length;
          images.forEach((img) => {
            if (img.complete) {
              Promise.resolve().then(itemLoaded); // Process already complete images in microtask
            } else {
              img.addEventListener("load", itemLoaded, { once: true });
              img.addEventListener("error", itemLoaded, { once: true });
            }
          });
      }
      if (document.fonts) {
          mediaTasksPending++;
          document.fonts.ready.then(itemLoaded).catch(itemLoaded); // Call itemLoaded even if fonts.ready rejects
      }

      // If initially no tasks were pending (e.g. no images and fonts loaded instantly or no custom fonts)
      // and mediaTasksPending is still 0. The initial fullLayoutUpdate should have run.
      // This logic handles cases where media loads after initial setup.
      if (mediaTasksPending === 0 && (images.length > 0 || document.fonts)) {
          // This means all media was already ready when checked.
          // A final update after a microtask might be good for stability.
          // console.log("Media was already ready, queueing one final update check (might be redundant).");
          // setTimeout(fullLayoutUpdate, 0); // Often redundant if initial call was robust
      }
    }
  }); // End of DOMContentLoaded
