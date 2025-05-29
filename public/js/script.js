document.addEventListener("DOMContentLoaded", () => {
  // Ensure the hero section fills the viewport
  function adjustHeroHeight() {
    const header = document.querySelector("header");
    const hero = document.querySelector(".hero");

    if (header && hero) {
      const headerHeight = header.offsetHeight;
      const windowHeight = window.innerHeight;
      hero.style.minHeight = `${windowHeight - headerHeight}px`;
    }
  }

  // Call on load and resize
  adjustHeroHeight();
  window.addEventListener("resize", adjustHeroHeight);

  // Date picker initialization
  const startDateInput = document.getElementById("start-date");
  const endDateInput = document.getElementById("end-date");

  if (startDateInput && endDateInput) {
    // Simple date picker functionality
    startDateInput.addEventListener("focus", function () {
      this.type = "date";
    });

    startDateInput.addEventListener("blur", function () {
      if (!this.value) {
        this.type = "text";
      }
    });

    endDateInput.addEventListener("focus", function () {
      this.type = "date";
    });

    endDateInput.addEventListener("blur", function () {
      if (!this.value) {
        this.type = "text";
      }
    });
  }

  // Search form submission
  // const searchForm = document.querySelector(".search-form");
  // if (searchForm) {
  //   const searchButton = searchForm.querySelector(".btn-search");

  //   searchButton.addEventListener("click", (e) => {
  //     e.preventDefault();

  //     const addressInput = searchForm.querySelector(
  //       'input[placeholder="Adresse précise, gare, métro..."]'
  //     );
  //     const startDate = startDateInput ? startDateInput.value : "";
  //     const endDate = endDateInput ? endDateInput.value : "";

  //     if (!addressInput.value) {
  //       alert("Veuillez entrer une adresse");
  //       return;
  //     }

  //     if (!startDate) {
  //       alert("Veuillez sélectionner une date de début");
  //       return;
  //     }

  //     if (!endDate) {
  //       alert("Veuillez sélectionner une date de fin");
  //       return;
  //     }

  //     // Here you would normally send the search request to the server
  //     console.log("Searching for cars at:", addressInput.value);
  //     console.log("From:", startDate, "To:", endDate);

  //     // For demo purposes, just show an alert
  //     alert(
  //       `Recherche de voitures à ${addressInput.value} du ${startDate} au ${endDate}`
  //     );
  //   });
  // }

  // Mobile menu toggle (for responsive design)
  function createMobileMenu() {
    const header = document.querySelector("header");
    if (!header || document.querySelector(".mobile-menu-btn")) return;

    const mobileMenuBtn = document.createElement("button");
    mobileMenuBtn.classList.add("mobile-menu-btn");
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';

    const nav = document.querySelector("nav");
    if (nav) {
      header.querySelector(".container").insertBefore(mobileMenuBtn, nav);

      mobileMenuBtn.addEventListener("click", () => {
        nav.querySelector("ul").classList.toggle("show");
      });
    }
  }

  // Only create mobile menu if screen width is below 768px
  if (window.innerWidth < 768) {
    createMobileMenu();
  }

  // Window resize event
  window.addEventListener("resize", () => {
    if (window.innerWidth < 768) {
      if (!document.querySelector(".mobile-menu-btn")) {
        createMobileMenu();
      }
    }
  });

  // User Menu Functionality
  const userMenu = document.getElementById("userMenu");
  if (userMenu) {
    const userMenuBtn = userMenu.querySelector(".user-menu-btn");

    userMenuBtn.addEventListener("click", () => {
      userMenu.classList.toggle("active");
    });

    // Fermer le menu si on clique ailleurs
    document.addEventListener("click", (event) => {
      if (userMenu && !userMenu.contains(event.target)) {
        userMenu.classList.remove("active");
      }
    });
  }


  // Fonction pour mettre à jour l'interface utilisateur
  function updateUserInterface() {

    // Éléments à afficher/masquer
    const userMenuContainer = document.getElementById("user-menu-container");
    const loginButton = document.getElementById("login-button");
    const louerVoitureLink = document.getElementById("louer-voiture-link");
    const mesReservationsLink = document.getElementById(
      "mes-reservations-link"
    );
    const dashboardProprietaire = document.getElementById(
      "dashboardProprietaire"
    );
    const dashboardLocataire = document.getElementById("dashboardLocataire");

    // Utilisateur connecté
    if (userMenuContainer) userMenuContainer.style.display = "block";
    if (loginButton) loginButton.style.display = "none";

    // Mettre à jour les informations utilisateur
    const userName = document.getElementById("userName");
    const userInitial = document.getElementById("userInitial");

 
  }

  // Vérifier le statut de l'utilisateur au chargement de la page
  updateUserInterface();
});
