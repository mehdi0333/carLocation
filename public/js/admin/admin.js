/**
 * CarShare Admin Dashboard - JavaScript principal
 * Ce fichier contient toutes les fonctionnalités JavaScript pour l'ensemble du dashboard administratif
 */

// Fonction pour détecter la page actuelle
function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.split("/").pop();
  const second = path.split("/");
  if (second.length === 3 && second[1] === "listings") {
    return "listings";
  }
  if (second.length === 3 && second[1] === "complaints") {
    return "complaints";
  }
  return page || "/"; // Par défaut, on considère qu'on est sur dashboard.html
}

// Fonction pour afficher une notification
function showNotification(message) {
  // Créer l'élément de notification
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;

  // Ajouter la notification au DOM
  document.body.appendChild(notification);

  // Ajouter des styles à la notification
  notification.style.position = "fixed";
  notification.style.bottom = "20px";
  notification.style.right = "20px";
  notification.style.backgroundColor = "var(--primary)";
  notification.style.color = "white";
  notification.style.padding = "12px 20px";
  notification.style.borderRadius = "var(--radius)";
  notification.style.boxShadow = "var(--shadow-md)";
  notification.style.zIndex = "1000";
  notification.style.opacity = "0";
  notification.style.transform = "translateY(20px)";
  notification.style.transition = "opacity 0.3s, transform 0.3s";

  // Afficher la notification avec une animation
  setTimeout(() => {
    notification.style.opacity = "1";
    notification.style.transform = "translateY(0)";
  }, 10);

  // Supprimer la notification après 3 secondes
  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform = "translateY(20px)";

    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Fonctions pour la page Dashboard
function initDashboard() {
  console.log("Initialisation du tableau de bord");

  // Vérifier si Chart est défini
  if (typeof Chart === "undefined") {
    console.error(
      "Chart.js n'est pas chargé. Chargement de la bibliothèque..."
    );
    // Charger Chart.js dynamiquement
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/chart.js";
    script.onload = function () {
      console.log("Chart.js chargé avec succès");
      initCharts();
    };
    document.head.appendChild(script);
  } else {
    initCharts();
  }

  // Fonction pour initialiser tous les graphiques
  function initCharts() {
    // Graphique des statistiques générales
    const statsCtx = document.getElementById("statsChart");
    if (statsCtx) {
      console.log("Initialisation du graphique des statistiques");
      try {
        new Chart(statsCtx, {
          type: "line",
          data: {
            labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
            datasets: [
              {
                label: "Utilisateurs",
                data: [650, 750, 820, 900, 950, 1050],
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                tension: 0.3,
                fill: true,
              },
              {
                label: "Annonces",
                data: [120, 150, 180, 220, 280, 320],
                borderColor: "#10b981",
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                tension: 0.3,
                fill: true,
              },
              {
                label: "Réservations",
                data: [80, 120, 160, 200, 240, 300],
                borderColor: "#f59e0b",
                backgroundColor: "rgba(245, 158, 11, 0.1)",
                tension: 0.3,
                fill: true,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  usePointStyle: true,
                  padding: 20,
                },
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
              y: {
                beginAtZero: true,
              },
            },
          },
        });
        console.log("Graphique des statistiques initialisé");
      } catch (error) {
        console.error(
          "Erreur lors de l'initialisation du graphique des statistiques:",
          error
        );
      }
    } else {
      console.warn("Élément statsChart non trouvé");
    }

    // Graphique des revenus
    const revenueCtx = document.getElementById("revenueChart");
    if (revenueCtx) {
      console.log("Initialisation du graphique des revenus");
      try {
        new Chart(revenueCtx, {
          type: "bar",
          data: {
            labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
            datasets: [
              {
                label: "Revenus",
                data: [3250, 3850, 4120, 3980, 4350, 4800],
                backgroundColor: "#9333ea",
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
              y: {
                beginAtZero: true,
                ticks: {
                  callback: function (value) {
                    return "€" + value;
                  },
                },
              },
            },
          },
        });
        console.log("Graphique des revenus initialisé");
      } catch (error) {
        console.error(
          "Erreur lors de l'initialisation du graphique des revenus:",
          error
        );
      }
    } else {
      console.warn("Élément revenueChart non trouvé");
    }

    // Graphique d'activité de la plateforme
    const activityCtx = document.getElementById("activityChart");
    if (activityCtx) {
      console.log("Initialisation du graphique d'activité de la plateforme");
      try {
        new Chart(activityCtx, {
          type: "line",
          data: {
            labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
            datasets: [
              {
                label: "Connexions",
                data: [450, 520, 480, 630, 750, 820, 580],
                borderColor: "#06b6d4",
                backgroundColor: "rgba(6, 182, 212, 0.1)",
                tension: 0.3,
                fill: true,
              },
              {
                label: "Recherches",
                data: [780, 850, 760, 910, 1050, 1200, 880],
                borderColor: "#ec4899",
                backgroundColor: "rgba(236, 72, 153, 0.1)",
                tension: 0.3,
                fill: true,
              },
              {
                label: "Transactions",
                data: [120, 150, 140, 180, 220, 250, 190],
                borderColor: "#f97316",
                backgroundColor: "rgba(249, 115, 22, 0.1)",
                tension: 0.3,
                fill: true,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  usePointStyle: true,
                  padding: 20,
                },
              },
              tooltip: {
                mode: "index",
                intersect: false,
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
              y: {
                beginAtZero: true,
              },
            },
          },
        });
        console.log("Graphique d'activité de la plateforme initialisé");
      } catch (error) {
        console.error(
          "Erreur lors de l'initialisation du graphique d'activité de la plateforme:",
          error
        );
      }
    } else {
      console.warn("Élément activityChart non trouvé");
    }
  }

  // Gestion des actions rapides
  const quickActionButtons = document.querySelectorAll(".quick-action-btn");
  if (quickActionButtons) {
    quickActionButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const action = this.getAttribute("data-action");
        switch (action) {
          case "add-user":
            showNotification("Redirection vers la page d'ajout d'utilisateur");
            setTimeout(() => (window.location.href = "users.html"), 1000);
            break;
          case "add-listing":
            showNotification("Redirection vers la page d'ajout d'annonce");
            setTimeout(() => (window.location.href = "listings.html"), 1000);
            break;
          case "view-reports":
            showNotification("Redirection vers la page des rapports");
            setTimeout(() => (window.location.href = "reports.html"), 1000);
            break;
          default:
            showNotification("Action en cours de développement");
        }
      });
    });
  }
}

// Fonctions pour la page Utilisateurs
function initUsers() {
  console.log("Initialisation de la page utilisateurs");

  // Gestion du modal utilisateur
  const modal = document.getElementById("userModal");
  const closeModal = document.querySelector(".close-modal");
  const cancelButton = document.querySelector(".modal-btn.cancel");

  function closeModalFunction() {
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  }

  // Récupération de la table existante
  const userTable = document.querySelector(".data-table table");
  if (!userTable) return;

  console.log("Table d'utilisateurs trouvée");

  // Sauvegarde de l'ancienne table pour la restaurer si nécessaire
  const oldTable = userTable.cloneNode(true);
  userTable.parentNode.replaceChild(oldTable, userTable);

  // Utilisation de la délégation d'événements pour gérer tous les clics de boutons
  document
    .querySelector(".data-table")
    .addEventListener("click", async function (event) {
      // Trouver le bouton le plus proche du clic
      const button = event.target.closest(".action-btn");
      if (!button) return; // Si ce n'est pas un clic sur un bouton, sortir
      const accountId = button.getAttribute("data-accountId");

      const row = button.closest("tr");
      if (!row) return;

      const userName = row.querySelector("td:nth-child(1)")?.textContent || "";
      const statusCell = row.querySelector("td:nth-child(4)");
      const actionCell = row.querySelector("td:last-child");

      if (!statusCell || !actionCell) return;

      const buttonText = button.textContent.trim().toLowerCase();

      // Gérer seulement les boutons activer/désactiver
      const successfulToggle = () => {
        if (buttonText.includes("désactiver")) {
          console.log("Désactivation de l'utilisateur:", userName);
          statusCell.innerHTML =
            '<span class="status-badge inactive">Inactif</span>';

          // Mettre à jour les boutons d'action - seulement le bouton Activer
          actionCell.innerHTML = `
          <button class="action-btn success"
                  data-accountId="${accountId}"
                  >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          Activer
          </button>
          `;

          showNotification(`L'utilisateur "${userName}" a été désactivé.`);
        } else if (buttonText.includes("activer")) {
          statusCell.innerHTML =
            '<span class="status-badge active">Actif</span>';

          // Mettre à jour les boutons d'action - seulement le bouton Désactiver
          actionCell.innerHTML = `
          <button class="action-btn danger"
                  data-accountId="${accountId}"
          
          >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
          Désactiver
          </button>
            `;

          showNotification(`L'utilisateur "${userName}" a été activé.`);
        }
      };

      await toggleStatus(accountId, successfulToggle);
    });

  // Gestion de la fermeture du modal
  if (closeModal) {
    closeModal.addEventListener("click", closeModalFunction);
  }

  if (cancelButton) {
    cancelButton.addEventListener("click", closeModalFunction);
  }

  if (modal) {
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModalFunction();
      }
    });
  }

  // Filtrage des utilisateurs
  const searchInput = document.querySelector(".filter-input");
  const statusSelect = document.querySelector(".status-select");

  if (searchInput || statusSelect) {
    function filterUsers() {
      const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
      const statusFilter = statusSelect ? statusSelect.value : "all";

      const rows = document.querySelectorAll("tbody tr");

      rows.forEach((row) => {
        const userId =
          row.querySelector("td:first-child")?.textContent.toLowerCase() || "";
        const userName =
          row.querySelector("td:nth-child(2)")?.textContent.toLowerCase() || "";
        const userEmail =
          row.querySelector("td:nth-child(3)")?.textContent.toLowerCase() || "";
        const statusBadge = row.querySelector(".status-badge");
        const statusText = statusBadge
          ? statusBadge.textContent.toLowerCase()
          : "";

        const matchesSearch =
          userId.includes(searchTerm) ||
          userName.includes(searchTerm) ||
          userEmail.includes(searchTerm);

        const matchesStatus =
          statusFilter === "all" ||
          (statusFilter === "active" && statusText === "actif") ||
          (statusFilter === "suspended" &&
            (statusText === "suspendu" || statusText === "désactivé")) ||
          (statusFilter === "pending" && statusText === "en attente");

        if (matchesSearch && matchesStatus) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    }

    if (searchInput) {
      searchInput.removeEventListener("input", filterUsers);
      searchInput.addEventListener("input", filterUsers);
    }

    if (statusSelect) {
      statusSelect.removeEventListener("change", filterUsers);
      statusSelect.addEventListener("change", filterUsers);
    }
  }

  console.log("Initialisation des utilisateurs terminée");
}

// Fonctions pour la page Annonces
function initListings() {
  // Gestion du modal d'annonce
  const modal = document.getElementById("listingModal");
  const closeModal = document.querySelector(".close-modal");
  const cancelButton = document.querySelector(".modal-btn.cancel");
  // Fonction pour ouvrir le modal
  (function () {
    const modalApproveBtn = document.querySelector(".modal-btn.approve");
    const modalRejectBtn = document.querySelector(".modal-btn.reject");
    const modalDisableBtn = document.querySelector(".modal-btn.disable");
    const mainImagePreview = document.getElementById("mainImagePreview");
    const subImagesPreview = document.querySelectorAll(".subImagesPreview");
    if (subImagesPreview) {
      subImagesPreview.forEach((preview) => {
        preview.addEventListener("click", function (e) {
          const src = e.target.getAttribute("src");
          if (!src) return;
          mainImagePreview.setAttribute("src", src);
        });
      });
    }

    if (modalApproveBtn) {
      modalApproveBtn.onclick = async function (e) {
        const carId = e.target.getAttribute("data-carId");
        const functionSuccess = () => {
          showNotification(`L'annonce a été approuvée`);
        };
        try {
          await toggleCarStatus(carId, "approved", functionSuccess);
        } catch (error) {
          console.log(error);
        }
      };
    }

    if (modalRejectBtn) {
      modalRejectBtn.onclick = async function (e) {
        const carId = e.target.getAttribute("data-carId");

        const functionSuccess = () => {
          showNotification(`L'annonce a été rejetée.`);
        };
        try {
          await toggleCarStatus(carId, "rejected", functionSuccess);
        } catch (error) {
          console.log(error);
        }
      };
    }

    if (modalDisableBtn) {
      modalDisableBtn.onclick = async function (e) {
        const carId = e.target.getAttribute("data-carId");

        const functionSuccess = () => {
          showNotification(`L'annonce a été désactivée.`);
        };
        try {
          await toggleCarStatus(carId, "sss", functionSuccess);
        } catch (error) {
          console.log(error);
        }
      };
    }
  })();
  // Fonction pour fermer le modal
  function closeModalFunction() {
    if (modal) {
      window.location.href = "/listings";
    }
  }

  // Gestion des boutons de fermeture du modal
  if (closeModal) {
    closeModal.addEventListener("click", closeModalFunction);
  }
  if (cancelButton) {
    cancelButton.addEventListener("click", closeModalFunction);
  }

  // Fermer le modal en cliquant en dehors

  if (modal) {
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModalFunction();
      }
    });
  }

  // Fonction pour mettre à jour les boutons d'action
  function updateActionButtons(row, status, carId) {
    if (!row) return;

    const actionCell = row.querySelector("td:last-child");
    const carName = row.querySelector(".car-name")?.textContent || "";

    if (!actionCell) return;
    if (status === "active") {
      actionCell.innerHTML = `
                        <div class="action-buttons">
                            <button class="voirButton action-btn view" data-carId = '${carId}'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                Voir
                            </button>
                    <button class="action-btn danger" data-carId = '${carId}'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                        Désactiver
                            </button>
                </div>
            `;
      showNotification(`L'annonce "${carName}" a été approuvée.`);
    } else if (status === "rejected") {
      actionCell.innerHTML = `
                <div class="action-buttons">
                      <button class="voirButton action-btn view" data-carId = '${carId}'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        Voir
                    </button>
                    <button class="action-btn success" data-carId = '${carId}'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        Approuver
                            </button>
                        </div>
                    `;
      showNotification(`L'annonce "${carName}" a été rejetée.`);
    } else if (status === "pending") {
      actionCell.innerHTML = `
                <div class="action-buttons">
                        <button class="voirButton action-btn view" data-carId = '${carId}'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        Voir
                    </button>
                    <button class="action-btn success" data-carId = '${carId}'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        Approuver
                    </button>
                    <button class="action-btn reject" data-carId = '${carId}'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                        Rejeter
                    </button>
                </div>
            `;
      showNotification(`L'annonce "${carName}" a été désactivée.`);
    }

    // Réinitialiser les écouteurs d'événements pour les nouveaux boutons
    initActionButtons();
  }

  // Fonction pour initialiser les boutons d'action
  function initActionButtons() {
    // Boutons "Voir"
    const viewButtons = document.querySelectorAll(".action-btn.view");
    viewButtons.forEach((button) => {
      // Supprimer les anciens écouteurs d'événements
      button.removeEventListener("click", handleViewClick);
      // Ajouter le nouvel écouteur d'événements
      button.addEventListener("click", handleViewClick);
    });
    // Boutons d'action (Approuver, Rejeter, Désactiver)
    const actionButtons = document.querySelectorAll(".action-btn:not(.view)");
    actionButtons.forEach((button) => {
      // Supprimer les anciens écouteurs d'événements
      button.removeEventListener("click", handleActionClick);
      // Ajouter le nouvel écouteur d'événements
      button.addEventListener("click", handleActionClick);
    });
  }
  // Gestionnaire d'événements pour le bouton "Voir"
  function handleViewClick(e) {
    const row = this.closest("tr");

    if (row) {
      const carId = e.target.getAttribute("data-carId");
      if (!carId) return;
      window.location.href = `/listings/${carId}`;
    }
  }

  // Gestionnaire d'événements pour les autres boutons d'action
  async function handleActionClick(e) {
    const row = this.closest("tr");
    if (!row) return;
    const carId = e.target.getAttribute("data-carId");

    const statusCell = row.querySelector("td:nth-child(5)");
    if (!statusCell) return;

    if (this.classList.contains("success")) {
      await toggleCarStatus(carId, "approved", () => {
        statusCell.innerHTML = '<span class="status-badge active">Actif</span>';
        updateActionButtons(row, "active", carId);
      });
    } else if (this.classList.contains("reject")) {
      await toggleCarStatus(carId, "rejected", () => {
        statusCell.innerHTML =
          '<span class="status-badge rejected">Rejeté</span>';
        updateActionButtons(row, "rejected", carId);
      });
    } else if (this.classList.contains("danger")) {
      await toggleCarStatus(carId, "en_attent", () => {
        statusCell.innerHTML =
          '<span class="status-badge pending">En attente</span>';
        updateActionButtons(row, "pending", carId);
      });
    }
  }

  // Initialiser les boutons d'action
  initActionButtons();

  // Filtrage des annonces
  const searchInput = document.querySelector(".filter-input");
  const statusSelect = document.querySelector(".status-select");

  if (searchInput || statusSelect) {
    function filterListings() {
      const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
      const statusFilter = statusSelect ? statusSelect.value : "all";

      const rows = document.querySelectorAll("tbody tr");

      rows.forEach((row) => {
        const carName =
          row.querySelector(".car-name")?.textContent.toLowerCase() || "";
        const carLocation =
          row.querySelector(".car-location")?.textContent.toLowerCase() || "";
        const owner =
          row.querySelector("td:nth-child(2)")?.textContent.toLowerCase() || "";
        const statusBadge = row.querySelector(".status-badge");
        const statusText = statusBadge
          ? statusBadge.textContent.toLowerCase()
          : "";

        const matchesSearch =
          carName.includes(searchTerm) ||
          carLocation.includes(searchTerm) ||
          owner.includes(searchTerm);

        const matchesStatus =
          statusFilter === "all" ||
          (statusFilter === "active" && statusText === "actif") ||
          (statusFilter === "pending" && statusText === "en attente") ||
          (statusFilter === "rejected" && statusText === "rejeté");

        if (matchesSearch && matchesStatus) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    }

    if (searchInput) {
      searchInput.addEventListener("input", filterListings);
    }

    if (statusSelect) {
      statusSelect.addEventListener("change", filterListings);
    }
  }
}

// Fonctions pour la page Litiges
function initDisputes() {
  console.log("Initialisation de la page litiges");

  // Gestion du modal de litige
  const modal = document.getElementById("disputeModal");
  const viewButtons = document.querySelectorAll(".action-btn.view");
  const closeModal = document.querySelector(".close-modal");
  const cancelButton = document.querySelector(".modal-btn.cancel");

  if (modal && viewButtons && closeModal) {
    // Ouvrir le modal
    viewButtons.forEach((button) => {
      button.addEventListener("click", function () {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });

    // Fermer le modal
    function closeModalFunction() {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }

    closeModal.addEventListener("click", closeModalFunction);
    if (cancelButton) {
      cancelButton.addEventListener("click", closeModalFunction);
    }

    // Fermer le modal en cliquant en dehors
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModalFunction();
      }
    });
  }

  // Gestion des boutons d'action dans le modal
  const processButton = document.querySelector(".modal-btn.process");
  const resolveButton = document.querySelector(".modal-btn.resolve");

  if (processButton) {
    processButton.addEventListener("click", function () {
      showNotification("Le litige est maintenant en cours de traitement.");
      if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  if (resolveButton) {
    resolveButton.addEventListener("click", function () {
      showNotification("Le litige a été résolu avec succès.");
      if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  // Gestion des actions de litige
  const actionButtons = document.querySelectorAll(".action-btn:not(.view)");
  if (actionButtons) {
    actionButtons.forEach((button) => {
      button.addEventListener("click",function () {
        const row = this.closest("tr");
        const disputeId = row.querySelector("td:first-child").textContent;

        if (this.classList.contains("process")) {
          // Mettre le litige en cours de traitement
          const statusCell = row.querySelector("td:nth-child(5)");
          statusCell.innerHTML =
            '<span class="status-badge in-progress">En cours</span>';

          // Mettre à jour les boutons d'action
          const actionCell = row.querySelector("td:last-child");
          actionCell.innerHTML = `
                        <div class="action-buttons">
                            <button class="action-btn view">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                Voir
                            </button>
                            <button class="action-btn resolve">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                Résoudre
                            </button>
                        </div>
                    `;

          showNotification(
            `Le litige ${disputeId} est maintenant en cours de traitement.`
          );
        } else if (this.classList.contains("resolve")) {
          // Résoudre le litige
          const statusCell = row.querySelector("td:nth-child(5)");
          statusCell.innerHTML =
            '<span class="status-badge resolved">Résolu</span>';

          // Mettre à jour les boutons d'action
          const actionCell = row.querySelector("td:last-child");
          actionCell.innerHTML = `
                        <div class="action-buttons">
                            <button class="action-btn view">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                Voir
                            </button>
                            <button class="action-btn reopen">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
                                Rouvrir
                            </button>
                        </div>
                    `;

          showNotification(`Le litige ${disputeId} a été résolu avec succès.`);
        } else if (this.classList.contains("reopen")) {
          // Rouvrir le litige
          const statusCell = row.querySelector("td:nth-child(5)");
          statusCell.innerHTML =
            '<span class="status-badge open">Ouvert</span>';

          // Mettre à jour les boutons d'action
          const actionCell = row.querySelector("td:last-child");
          actionCell.innerHTML = `
                        <div class="action-buttons">
                            <button class="action-btn view">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                Voir
                            </button>
                            <button class="action-btn process">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                                Traiter
                            </button>
                        </div>
                    `;

          showNotification(`Le litige ${disputeId} a été rouvert.`);
        }
 
        // Réinitialiser les écouteurs d'événements après modification du DOM
        initDisputes();
      });
    });
  }

  // Filtrage des litiges
  const searchInput = document.querySelector(".filter-input");
  const statusSelect = document.querySelector(".status-select");

  if (searchInput || statusSelect) {
    function filterDisputes() {
      const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
      const statusFilter = statusSelect ? statusSelect.value : "all";

      const rows = document.querySelectorAll("tbody tr");

      rows.forEach((row) => {
        const disputeId = row
          .querySelector("td:first-child")
          .textContent.toLowerCase();
        const subject = row
          .querySelector("td:nth-child(2)")
          .textContent.toLowerCase();
        const parties = row
          .querySelector("td:nth-child(3)")
          .textContent.toLowerCase();
        const statusBadge = row.querySelector(".status-badge");
        const statusText = statusBadge
          ? statusBadge.textContent.toLowerCase()
          : "";

        const matchesSearch =
          disputeId.includes(searchTerm) ||
          subject.includes(searchTerm) ||
          parties.includes(searchTerm);

        const matchesStatus =
          statusFilter === "all" ||
          (statusFilter === "open" && statusText === "ouvert") ||
          (statusFilter === "in-progress" && statusText === "en cours") ||
          (statusFilter === "resolved" && statusText === "résolu");

        if (matchesSearch && matchesStatus) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    }

    if (searchInput) {
      searchInput.addEventListener("input", filterDisputes);
    }

    if (statusSelect) {
      statusSelect.addEventListener("change", filterDisputes);
    }
  }
}

// Fonctions pour la page Rapports
function initReports() {
  console.log("Initialisation de la page rapports");

  // Configuration commune pour les graphiques
  Chart.defaults.font.family = "'Inter', sans-serif";
  Chart.defaults.font.size = 12;
  Chart.defaults.color = "#6b7280";

  // Graphique des revenus
  const revenueCtx = document.getElementById("revenueChart");
  if (revenueCtx) {
    new Chart(revenueCtx, {
      type: "line",
      data: {
        labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
        datasets: [
          {
            label: "Revenus",
            data: [3250, 3850, 4120, 3980, 4350, 4800],
            borderColor: "var(--chart-1)",
            backgroundColor: "rgba(147, 51, 234, 0.1)",
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: "index",
            intersect: false,
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || "";
                if (label) {
                  label += ": ";
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "DZD",
                  }).format(context.parsed.y);
                }
                return label;
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value + " DZD";
              },
            },
          },
        },
      },
    });
  }

  // Graphique des utilisateurs
  const usersCtx = document.getElementById("usersChart");
  if (usersCtx) {
    new Chart(usersCtx, {
      type: "bar",
      data: {
        labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
        datasets: [
          {
            label: "Nouveaux utilisateurs",
            data: [85, 95, 110, 125, 140, 125],
            backgroundColor: "var(--chart-2)",
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  // Graphique des annonces
  const listingsCtx = document.getElementById("listingsChart");
  if (listingsCtx) {
    new Chart(listingsCtx, {
      type: "doughnut",
      data: {
        labels: ["Actives", "En attente", "Rejetées"],
        datasets: [
          {
            data: [285, 42, 15],
            backgroundColor: [
              "var(--chart-3)",
              "var(--chart-4)",
              "var(--chart-5)",
            ],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              usePointStyle: true,
              padding: 20,
            },
          },
        },
        cutout: "70%",
      },
    });
  }

  // Graphique des litiges
  const disputesCtx = document.getElementById("disputesChart");
  if (disputesCtx) {
    new Chart(disputesCtx, {
      type: "bar",
      data: {
        labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
        datasets: [
          {
            label: "Ouverts",
            data: [3, 2, 4, 3, 2, 1],
            backgroundColor: "var(--chart-4)",
            borderRadius: 4,
          },
          {
            label: "Résolus",
            data: [2, 3, 2, 4, 3, 2],
            backgroundColor: "var(--chart-3)",
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              usePointStyle: true,
              padding: 20,
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });
  }

  // Gestion du filtre de période
  const periodSelect = document.querySelector(".period-select");
  if (periodSelect) {
    periodSelect.addEventListener("change", function () {
      const period = this.value;
      showNotification(`Période sélectionnée : ${period}`);

      // Ici, vous pourriez mettre à jour les données des graphiques en fonction de la période sélectionnée
      // Pour cet exemple, nous affichons simplement une notification
    });
  }

  // Gestion des boutons d'exportation
  const exportButtons = document.querySelectorAll(".export-btn");
  if (exportButtons) {
    exportButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const reportType = this.closest(".report-section")
          ? this.closest(".report-section").querySelector("h3").textContent
          : "Tous les rapports";

        showNotification(`Exportation de "${reportType}" en cours...`);

        // Simuler un délai pour l'exportation
        setTimeout(() => {
          showNotification(`"${reportType}" exporté avec succès.`);
        }, 1500);
      });
    });
  }

  // Gestion des actions de rapport
  const reportActions = document.querySelectorAll(".report-action");
  if (reportActions) {
    reportActions.forEach((action) => {
      action.addEventListener("click", function () {
        const reportType =
          this.closest(".report-card").querySelector("h3").textContent;

        // Créer un menu contextuel (simulé)
        const options = [
          "Voir en plein écran",
          "Télécharger",
          "Partager",
          "Paramètres",
        ];
        const optionIndex = Math.floor(Math.random() * options.length);

        showNotification(
          `Action "${options[optionIndex]}" pour le rapport "${reportType}"`
        );
      });
    });
  }
}

// Création d'un objet pour stocker les messages par plainte
let complaintMessages = {};

// Fonctions pour la page Plaintes
function initComplaints() {
  console.log("Initialisation de la page plaintes");

  // Gestion du modal de plainte
  const modal = document.getElementById("complaintModal");
  const viewButtons = document.querySelectorAll(".action-btn.view");
  // const plainId = viewButtons.getAttribute("data-id");
  const closeModal = document.querySelector(".close-modal");
  const cancelButton = document.querySelector(".modal-btn.cancel");

  // Fonction pour fermer le modal
  function closeModalFunction() {
    if (closeModal) window.location.href = "/complaints";
  }

  // Gestion de l'ouverture du modal
  if (viewButtons) {
    viewButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        const complaintId = e.target.getAttribute("data-id");
        window.location.href = `/complaints/${complaintId}`;
      });
    });
  }

  // Gestion de la fermeture du modal
  if (closeModal) {
    console.log("Adding closeModal event listener");
    closeModal.addEventListener("click", closeModalFunction);
  }

  if (cancelButton) {
    cancelButton.addEventListener("click", closeModalFunction);
  }

  // Fermer le modal en cliquant en dehors
  if (modal) {
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModalFunction();
      }
    });
  }

  // Gestion des boutons d'action dans la page principale
  const actionButtons = document.querySelectorAll(".action-btn:not(.view)");
  if (actionButtons) {
    actionButtons.forEach((button) => {
      // Supprimer les anciens écouteurs d'événements
      const newButton = button.cloneNode(true);
      button.parentNode.replaceChild(newButton, button);

      // Ajouter les nouveaux écouteurs d'événements
      
    try{
      newButton.addEventListener("click", async function () {
        const row = this.closest("tr");
        if (!row) return;
        const plaintId = document
          .querySelector(".action-btn.view")
          .getAttribute("data-id");

        const complaintId =
          row.querySelector("td:first-child")?.textContent || "";
        const statusCell = row.querySelector("td:nth-child(5)");
        const actionCell = row.querySelector("td:last-child");

        if (this.classList.contains("process")) {
         await fetch("/api/changePlantStatus", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              plaintId,
              status: "process",
            }),
          })
         
          // Traiter la plainte
          if (statusCell) {
            statusCell.innerHTML =
              '<span class="status-badge in-progress">En cours</span>';
          }

          if (actionCell) {
            actionCell.innerHTML = `
                        <div class="action-buttons">
                            <button class="action-btn view" data-id="${plaintId}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                Voir
                            </button>
                            <button class="action-btn resolve">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                Résoudre
                            </button>
                        </div>
                    `;
          }

        } else if (this.classList.contains("resolve")) {
          // Résoudre la plainte
          await fetch("/api/changePlantStatus", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              plaintId,
              status: "resolve",
            }),
          })
          if (statusCell) {
            statusCell.innerHTML =
              '<span class="status-badge resolved">Résolu</span>';
          }

          if (actionCell) {
            actionCell.innerHTML = `
                        <div class="action-buttons">
                            <button class="action-btn view" data-id="${plaintId}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                Voir
                            </button>
                            <button class="action-btn reopen">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
                                Rouvrir
                            </button>
                        </div>
                    `;
          }

        } else if (this.classList.contains("reopen")) {
          await fetch("/api/changePlantStatus", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              plaintId,
              status: "En attente",
            }),
          })
          // Rouvrir la plainte
          if (statusCell) {
            statusCell.innerHTML =
              '<span class="status-badge open">Ouvert</span>';
          }

          if (actionCell) {
            actionCell.innerHTML = `
                        <div class="action-buttons">
                            <button class="action-btn view" data-id="${plaintId}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                Voir
                            </button>
                            <button class="action-btn process">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                                Traiter
                            </button>
                        </div>
                    `;
          }
        }
      // INSERT_YOUR_CODE
      window.location.reload();
      });
    }catch (error) {
      console.error(error)
    }
    });
  }

  // Empêcher le changement du nom d'utilisateur dans le profil
  const userProfile = document.querySelector(".header .user-profile");
  if (userProfile) {
    const userNameElement = userProfile.querySelector(".user-name");
    if (userNameElement) {
      userNameElement.textContent = "Admin";
    }
  }

  // Filtrage des plaintes
  const searchInput = document.querySelector(".filter-input");
  const statusSelect = document.querySelector(".status-select");

  if (searchInput || statusSelect) {
    function filterComplaints() {
      const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
      const statusFilter = statusSelect ? statusSelect.value : "all";

      const rows = document.querySelectorAll("tbody tr");

      rows.forEach((row) => {
        const complaintId =
          row.querySelector("td:first-child")?.textContent.toLowerCase() || "";
        const subject =
          row.querySelector("td:nth-child(2)")?.textContent.toLowerCase() || "";
        const user =
          row.querySelector("td:nth-child(3)")?.textContent.toLowerCase() || "";
        const date =
          row.querySelector("td:nth-child(4)")?.textContent.toLowerCase() || "";
        const statusBadge = row.querySelector(".status-badge");
        const statusText = statusBadge
          ? statusBadge.textContent.toLowerCase()
          : "";

        const matchesSearch =
          complaintId.includes(searchTerm) ||
          subject.includes(searchTerm) ||
          user.includes(searchTerm) ||
          date.includes(searchTerm);

        const matchesStatus =
          statusFilter === "all" ||
          (statusFilter === "open" && statusText === "ouvert") ||
          (statusFilter === "in-progress" && statusText === "en cours") ||
          (statusFilter === "resolved" && statusText === "résolu");

        if (matchesSearch && matchesStatus) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    }

    if (searchInput) {
      searchInput.addEventListener("input", filterComplaints);
    }

    if (statusSelect) {
      statusSelect.addEventListener("change", filterComplaints);
    }
  }
}

// Initialisation au chargement de la page
document.addEventListener("DOMContentLoaded", function () {
  const currentPage = getCurrentPage();

  switch (currentPage) {
    case "admin":
      initDashboard();
      break;
    case "users":
      initUsers();
      break;
    case "listings":
      initListings();
      break;
    case "disputes":
      initDisputes();
      break;
    case "reports":
      initReports();
      break;
    case "complaints":
      initComplaints();
      break;
    default:
      console.log("Page non reconnue ou page d'accueil");
      // Initialiser les fonctionnalités de base
      break;
  }

  // Initialiser les fonctionnalités communes à toutes les pages
  console.log("Initialisation des fonctionnalités communes");

  // Gestion de la recherche globale
  const searchInput = document.querySelector(".search-input");
  if (searchInput) {
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        showNotification(`Recherche de "${this.value}" en cours...`);
        // Ici, vous pourriez implémenter une recherche globale
      }
    });
  }

  // Gestion des notifications
  const notificationBell = document.querySelector(".notification-bell");
  if (notificationBell) {
    notificationBell.addEventListener("click", function () {
      showNotification("Vous avez 1 nouvelle notification");
      // Ici, vous pourriez afficher un menu déroulant avec les notifications
    });
  }

  // Gestion du profil utilisateur
  const userProfile = document.querySelector(".user-profile");
  if (userProfile) {
    userProfile.addEventListener("click", function () {
      showNotification("Menu du profil utilisateur");
      // Ici, vous pourriez afficher un menu déroulant avec les options du profil
    });
  }
});

// * my code for status toggle :
async function toggleStatus(accountId, successfulToggle) {
  try {
    const body = {
      accountId,
    };
    const res = await fetch("/api/user/accountStatus", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (res.status === 200) {
      successfulToggle();
    }
  } catch (error) {
    console.log(error);
  }
}
async function toggleCarStatus(carId, type, successfulToggle) {
  try {
    const body = {
      carId,
      type,
    };
    const res = await fetch("/api/user/carStatus", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    console.log(res);
    if (res.status === 200) {
      successfulToggle();
    }
  } catch (error) {
    console.log(error);
  }
}
