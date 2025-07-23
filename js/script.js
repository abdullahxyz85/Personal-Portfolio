// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Typed.js initialization for typing effect - if using on a different element
  if (document.querySelector(".typing-text")) {
    const typed = new Typed(".typing-text", {
      strings: ["Web Developer", "UI/UX Designer", "Student", "Programmer"],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
    });
  }

  // Sticky header
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    header.classList.toggle("sticky", window.scrollY > 100);
  });

  // Mobile menu toggle
  const menuBtn = document.querySelector(".menu-btn");
  const navbar = document.querySelector(".navbar");
  menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("active");
    menuBtn.classList.toggle("fa-times");
  });

  // Close mobile menu when clicking on a nav link
  document.querySelectorAll(".navbar a").forEach((link) => {
    link.addEventListener("click", () => {
      navbar.classList.remove("active");
      menuBtn.classList.remove("fa-times");
    });
  });

  // Highlight active menu item based on scroll position
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });

  // Portfolio filter
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      portfolioItems.forEach((item) => {
        if (
          filterValue === "all" ||
          item.getAttribute("data-category") === filterValue
        ) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 200);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.8)";
          setTimeout(() => {
            item.style.display = "none";
          }, 500);
        }
      });
    });
  });

  // Form submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Here you would typically send the form data to a server
      // For demonstration purposes, we'll just log it and show an alert
      console.log({ name, email, subject, message });

      // Show success message
      alert("Message sent successfully!");

      // Reset the form
      contactForm.reset();
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Add animation when elements come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".education-item, .achievement-card, .experience-item, .portfolio-item, " +
        ".about-text, .coding-profiles, .skills-container, .contact-info, .contact-form, " +
        ".certificate-card"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.classList.add("animate");
      }
    });

    // Animate skill bars when in view
    const skillSection = document.querySelector(".skills-section");
    if (skillSection) {
      const sectionPosition = skillSection.getBoundingClientRect().top;
      if (sectionPosition < window.innerHeight - 50) {
        const skillBars = document.querySelectorAll(".progress");
        skillBars.forEach((bar, index) => {
          setTimeout(() => {
            const width = bar.style.width;
            bar.style.width = "0";
            setTimeout(() => {
              bar.style.width = width;
            }, 100);
          }, index * 100); // Stagger the animations
        });
      }
    }
  };

  // Call animation function on load and scroll
  window.addEventListener("load", animateOnScroll);
  window.addEventListener("scroll", debounce(animateOnScroll, 50));

  // Debounce function to limit how often a function is called
  function debounce(func, wait) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
  }

  // Apply staggered animation to achievement cards
  const achievementCards = document.querySelectorAll(".achievement-card");
  achievementCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });

  // Apply staggered animation to education items
  const educationItems = document.querySelectorAll(".education-item");
  educationItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });
});
