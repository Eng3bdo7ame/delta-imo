document.addEventListener("DOMContentLoaded", () => {
  /* =========================
       GLOBAL FILTERING (Products, Services, Projects)
    ========================= */
  const filterBtns = document.querySelectorAll(".filter-btn");

  // Select all potential filterable items across different pages
  // We use a broad selector to ensure we catch everything even if classes vary
  const filterItems = document.querySelectorAll(
    ".product-item, .project-box, .filter-item, .card[data-category]",
  );

  if (filterBtns.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active class from all buttons in the same group
        const siblings = btn.parentElement.querySelectorAll(".filter-btn");
        siblings.forEach((b) => b.classList.remove("active"));

        // Add active class to clicked button
        btn.classList.add("active");

        const filterValue = btn.getAttribute("data-filter");

        filterItems.forEach((item) => {
          const category = item.getAttribute("data-category");

          // Skip items that don't have a category (e.g. non-filterable cards)
          if (!category) return;

          if (filterValue === "all" || category === filterValue) {
            item.style.display = "block";
            // Small delay to allow display:block to apply before opacity transition
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "scale(1)";
            }, 50);
          } else {
            item.style.opacity = "0";
            item.style.transform = "scale(0.8)";
            setTimeout(() => {
              item.style.display = "none";
            }, 300);
          }
        });
      });
    });
  }

  /* =========================
       HERO SLIDER
    ========================= */
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.getElementById("sliderPrev");
  const nextBtn = document.getElementById("sliderNext");
  let currentSlide = 0;
  let sliderInterval = null;

  function goToSlide(index) {
    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }
  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function startAutoPlay() {
    sliderInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoPlay() {
    clearInterval(sliderInterval);
  }

  if (slides.length > 0) {
    startAutoPlay();

    nextBtn?.addEventListener("click", () => {
      stopAutoPlay();
      nextSlide();
      startAutoPlay();
    });
    prevBtn?.addEventListener("click", () => {
      stopAutoPlay();
      prevSlide();
      startAutoPlay();
    });

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        stopAutoPlay();
        goToSlide(i);
        startAutoPlay();
      });
    });

    // Pause on hover
    const heroSection = document.getElementById("home");
    heroSection?.addEventListener("mouseenter", stopAutoPlay);
    heroSection?.addEventListener("mouseleave", startAutoPlay);

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        stopAutoPlay();
        nextSlide();
        startAutoPlay();
      }
      if (e.key === "ArrowRight") {
        stopAutoPlay();
        prevSlide();
        startAutoPlay();
      }
    });
  }

  /* =========================
       Nababvbar Scroll Effect & Back to Top
    ========================= */
  const navbar = document.querySelector(".navbar");
  const backToTopBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    // Navbar
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Back to top button
    if (window.scrollY > 500) {
      backToTopBtn.classList.add("active");
    } else {
      backToTopBtn.classList.remove("active");
    }
  });

  // Back to top click handler
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* =========================
       Mobile Menu Toggle
    ========================= */
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeMenuBtn = document.querySelector(".close-menu-btn");
  const mobileLinks = document.querySelectorAll(".mobile-links a");

  function toggleMenu() {
    mobileMenu.classList.toggle("active");
    mobileMenuOverlay.classList.toggle("active");

    // Prevent body scroll when menu is open
    if (mobileMenu.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  mobileMenuBtn?.addEventListener("click", toggleMenu);
  closeMenuBtn?.addEventListener("click", toggleMenu);
  mobileMenuOverlay?.addEventListener("click", toggleMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileMenu.classList.contains("active")) {
        toggleMenu();
      }
    });
  });

  /* =========================
       Scroll Reveal Animation
    ========================= */
  const revealElements = document.querySelectorAll(".reveal");

  function checkReveal() {
    // Use 90% of viewport height to trigger slightly earlier for a better user experience
    const triggerBottom = window.innerHeight * 0.9;

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;

      if (elementTop < triggerBottom) {
        element.classList.add("active");
      }
    });
  }

  // Initial check
  setTimeout(checkReveal, 100);

  // Check on scroll
  window.addEventListener("scroll", checkReveal);

  /* =========================
       Number Counter Animation
    ========================= */
  const counters = document.querySelectorAll(".counter");
  let counted = false;

  function countUp() {
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      const duration = 2500; // 2.5 seconds
      const increment = target / (duration / 16); // 60fps roughly

      let current = 0;

      const updateCounter = () => {
        current += increment;

        if (current < target) {
          counter.innerText = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = target;
        }
      };

      updateCounter();
    });
  }

  // Trigger counter when in view
  const statsContainer = document.querySelector(".stats-container");

  if (statsContainer) {
    window.addEventListener("scroll", () => {
      if (counted) return;

      const sectionTop = statsContainer.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight * 0.8) {
        countUp();
        counted = true;
      }
    });
  }

  /* =========================
       Active Link Highlighting
    ========================= */
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-links a:not(.nav-btn)");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      // Adjust offset to trigger slightly before the section reaches the top
      if (window.scrollY >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      // add active class if the href ends with the current section id
      if (current && item.getAttribute("href").endsWith(current)) {
        item.classList.add("active");
      }
    });
  });

  // Smooth scrolling for anchor links (fallback for browsers not supporting scroll-behavior: smooth)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const id = this.getAttribute("href");
      if (id === "#") return;

      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});
