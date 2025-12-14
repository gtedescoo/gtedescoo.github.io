
document.addEventListener("DOMContentLoaded", () => {

  // ==========================
  // 1. MOBILE NAVBAR – close menu on link click
  // ==========================
  const navbarCollapse = document.getElementById("mainNavbar");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (
        navbarCollapse &&
        navbarCollapse.classList.contains("show") &&
        window.bootstrap
      ) {
        new bootstrap.Collapse(navbarCollapse, { toggle: true });
      }
    });
  });

  // ==========================
  // 2. NAVBAR – style change on scroll
  // ==========================
  const navbar = document.querySelector(".rt-navbar");

  function updateNavbarOnScroll() {
    if (!navbar) return;

    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  // ==========================
  // 3. NAVIGATION – highlight active section on scroll
  // ==========================
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".navbar-nav .nav-link");

  function highlightNavOnScroll() {
    let currentSectionId = null;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const offset = rect.top;

      if (offset <= 120 && offset > -rect.height + 120) {
        currentSectionId = section.getAttribute("id");
      }
    });

    if (currentSectionId) {
      navItems.forEach(link => {
        const hrefId = link.getAttribute("href").replace("#", "");

        if (hrefId === currentSectionId) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }
  }

  // Single scroll listener calling both functions
  function onScroll() {
    updateNavbarOnScroll();
    highlightNavOnScroll();
  }

  window.addEventListener("scroll", onScroll);

  // Initial state
  updateNavbarOnScroll();
  highlightNavOnScroll();

  // ==========================
  // 4. COOKIE BANNER
  // ==========================
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("cookie-accept");
  const declineBtn = document.getElementById("cookie-decline");

  if (banner && acceptBtn && declineBtn) {

    // If the user has already made a choice, hide the banner
    if (localStorage.getItem("cookieConsent")) {
      banner.style.display = "none";
    }

    acceptBtn.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "accepted");
      banner.style.display = "none";
    });

    declineBtn.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "declined");
      banner.style.display = "none";
    });
  }

});
