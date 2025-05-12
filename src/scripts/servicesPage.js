// src/scripts/servicesPage.js

// Function to adjust padding-bottom of the services container
function adjustServicesContainerPadding() {
  const servicesContainer = document.querySelector(".services-container");
  if (!servicesContainer) return;
  const sections = servicesContainer.querySelectorAll(
    ".service-sticky-wrapper",
  );
  if (sections.length === 0) {
    servicesContainer.style.paddingBottom = "0px";
    return;
  }
  const lastSection = sections[sections.length - 1];
  const lastSectionHeight = lastSection.offsetHeight;
  const viewportHeight = window.innerHeight;
  let calculatedPadding = viewportHeight - lastSectionHeight;
  calculatedPadding = Math.max(0, calculatedPadding);
  servicesContainer.style.paddingBottom = `${calculatedPadding}px`;
}

document.addEventListener("DOMContentLoaded", () => {
  const tocHeader = document.getElementById("services-toc-header");
  const tocLinks = document.querySelectorAll(".toc-link");
  const serviceSections = document.querySelectorAll(
    ".service-sticky-wrapper[id]",
  );

  let tocHeaderHeight = 0; // Initial value

  const updateLayoutDependentValues = () => {
    if (tocHeader) {
        const currentTocHeight = tocHeader.offsetHeight;
        if (currentTocHeight !== tocHeaderHeight) {
            tocHeaderHeight = currentTocHeight;
        }
        document.documentElement.style.scrollPaddingTop = `${tocHeaderHeight + 16}px`;
    }
    adjustServicesContainerPadding();
  };

  tocLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const currentTocHeaderHeight = tocHeader ? tocHeader.offsetHeight : 0;
        const targetElementRect = targetElement.getBoundingClientRect();
        const targetPositionAbsolute = targetElementRect.top + window.scrollY;
        const offsetPosition = targetPositionAbsolute - currentTocHeaderHeight - 16;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  let currentlyActiveTocId = null;
  let fallbackCheckTimeout = null;

  const highlightTocLink = (entries, observer) => {
    let entryThatIsIntersecting = null;
    for (const entry of entries) {
      if (entry.isIntersecting) {
        if (!entryThatIsIntersecting || entry.boundingClientRect.top < entryThatIsIntersecting.boundingClientRect.top) {
          entryThatIsIntersecting = entry;
        }
      }
    }

    if (entryThatIsIntersecting) {
      clearTimeout(fallbackCheckTimeout);
      const targetId = entryThatIsIntersecting.target.getAttribute("id");
      if (targetId !== currentlyActiveTocId) {
        tocLinks.forEach((link) => link.classList.remove("active"));
        const correspondingLink = document.querySelector(
          `.toc-link[data-target-id="${targetId}"]`,
        );
        if (correspondingLink) {
          correspondingLink.classList.add("active");
        }
        currentlyActiveTocId = targetId;
      }
      return;
    }

    clearTimeout(fallbackCheckTimeout);
    fallbackCheckTimeout = setTimeout(() => {
      requestAnimationFrame(() => {
        let bestCandidateSection = null;
        const idealActivationLine = tocHeaderHeight + 5;
        let smallestDistanceToIdealLine = Infinity;

        for (const section of serviceSections) {
          const rect = section.getBoundingClientRect();
          if (rect.bottom < tocHeaderHeight || rect.top > window.innerHeight) {
            continue;
          }
          const distance = rect.top - idealActivationLine;
          if (Math.abs(distance) < Math.abs(smallestDistanceToIdealLine)) {
            smallestDistanceToIdealLine = distance;
            bestCandidateSection = section;
          } else if (
            Math.abs(distance) === Math.abs(smallestDistanceToIdealLine)
          ) {
            if (
              bestCandidateSection &&
              rect.top < bestCandidateSection.getBoundingClientRect().top
            ) {
              bestCandidateSection = section;
            }
          }
        }

        if (bestCandidateSection) {
          const targetId = bestCandidateSection.getAttribute("id");
          if (targetId !== currentlyActiveTocId) {
            tocLinks.forEach((link) => link.classList.remove("active"));
            const correspondingLink = document.querySelector(
              `.toc-link[data-target-id="${targetId}"]`,
            );
            if (correspondingLink) {
              correspondingLink.classList.add("active");
            }
            currentlyActiveTocId = targetId;
          }
        }
      });
    }, 75);
  };

  let tocHighlightObserver = null; // Initialize as null

  const initializeTocObserver = () => {
    if (tocHighlightObserver) {
        tocHighlightObserver.disconnect();
    }
    const currentRootMargin = `-${tocHeaderHeight + 10}px 0px -${window.innerHeight - tocHeaderHeight - 50}px 0px`;
    tocHighlightObserver = new IntersectionObserver(highlightTocLink, {
        root: null, // Ensure all options are spread or explicitly set
        rootMargin: currentRootMargin,
        threshold: 0
    });
    serviceSections.forEach((section) => {
      if (section) tocHighlightObserver.observe(section); // Add a check for section existence
    });
  };

  const revealSections = document.querySelectorAll(".service-sticky-wrapper");
  revealSections.forEach((section, index) => {
    section.style.setProperty("--index", String(index));
  });
  const revealOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.25,
  };
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const targetElement = entry.target;
      const index = parseInt(targetElement.getAttribute("data-index") || "0");
      if (entry.isIntersecting) {
        targetElement.classList.add("active");
        revealSections.forEach((section, i) => {
          if (i <= index) {
            section.classList.add("sticky");
          } else {
            section.classList.remove("sticky");
          }
        });
      } else {
        if (
          entry.boundingClientRect.top > window.innerHeight ||
          entry.boundingClientRect.bottom < 0
        ) {
          targetElement.classList.remove("sticky");
        }
      }
    });
  }, revealOptions);
  revealSections.forEach((section) => {
    revealObserver.observe(section);
  });

  let resizeTimeout;
  const fullLayoutUpdate = () => {
      updateLayoutDependentValues();
      initializeTocObserver();
  };

  fullLayoutUpdate();

  window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(fullLayoutUpdate, 250);
  });

  const servicesContainerElement = document.querySelector(".services-container");
  if (servicesContainerElement) {
      const images = servicesContainerElement.querySelectorAll("img");
      let loadedImages = 0;
      const totalImages = images.length;
      const runFullLayoutUpdateAfterMedia = () => {
        // console.log("Media loaded/ready, performing full layout update");
        fullLayoutUpdate();
      };

      if (totalImages > 0) {
        images.forEach((img) => {
          const checkImage = () => {
            loadedImages++;
            if (loadedImages === totalImages) {
              runFullLayoutUpdateAfterMedia();
            }
          };
          if (img.complete) {
            // If image is already complete but its dimensions might not have been accounted for
            // schedule a microtask to ensure layout has settled after initial render potentially.
            Promise.resolve().then(checkImage);
          } else {
            img.addEventListener("load", checkImage, { once: true });
            img.addEventListener("error", checkImage, { once: true });
          }
        });
      }

      // If there are no images, but fonts might affect layout
      if (totalImages === 0 && document.fonts) {
         document.fonts.ready.then(runFullLayoutUpdateAfterMedia);
      } else if (totalImages === 0 && !document.fonts) {
        // No images, no custom fonts to wait for, layout might be stable enough after initial fullLayoutUpdate
      }
      // If both images and fonts, fonts.ready will ensure fonts are done,
      // image loading will also trigger. The last one to finish will run the update.
      // To avoid double calls in this specific scenario, you might need a flag,
      // but often it's fine as updateLayoutDependentValues has internal checks.
      if (totalImages > 0 && document.fonts) {
         document.fonts.ready.then(runFullLayoutUpdateAfterMedia); // One call for fonts
         // The image loading logic will also call it. This might lead to an extra call.
         // For simplicity, we'll allow it. More complex scenarios might use a flag.
      }
  }
});
