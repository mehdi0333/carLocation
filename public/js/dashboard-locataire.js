document.addEventListener("DOMContentLoaded", () => {
  // Éléments du modal
  const ratingModal = document.getElementById("ratingModal");
  const openRatingBtn = document.querySelectorAll(".openRatingModal");
  const closeModalBtn = document.querySelector(".close-modal");
  const cancelRatingBtn = document.getElementById("cancelRating");
  const submitRatingBtn = document.getElementById("submitRating");
  const stars = document.querySelectorAll(".star-rating i");
  const commentTextarea = document.getElementById("comment");

  // Variables pour stocker la note
  let currentRating = 0;
    // Ouvrir le modal d'évaluation
  openRatingBtn.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      const carId = e.target.getAttribute("data-carId");
      window.location.href = "/dashboard-locataire/" + carId;
    });
  });

  // Fermer le modal
  function closeModal() {
    window.location.href = "/dashboard-locataire";
  }
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (cancelRatingBtn) cancelRatingBtn.addEventListener("click", closeModal);

  // Fermer le modal en cliquant en dehors
  if (ratingModal)
    ratingModal.addEventListener("click", (e) => {
      if (e.target === ratingModal) {
        closeModal();
      }
    });

  // Gestion des étoiles
  stars.forEach((star) => {
    // Survol des étoiles
    star.addEventListener("mouseover", function () {
      const rating = Number.parseInt(this.dataset.rating);
      highlightStars(rating);
    });

    // Sortie du survol
    star.addEventListener("mouseout", () => {
      highlightStars(currentRating);
    });

    // Clic sur une étoile
    star.addEventListener("click", function () {
      currentRating = Number.parseInt(this.dataset.rating);
      highlightStars(currentRating);
    });
  });

  // Fonction pour mettre en surbrillance les étoiles
  function highlightStars(rating) {
    stars.forEach((star) => {
      const starRating = Number.parseInt(star.dataset.rating);
      if (starRating <= rating) {
        star.classList.remove("fa-regular");
        star.classList.add("fa-solid");
      } else {
        star.classList.remove("fa-solid");
        star.classList.add("fa-regular");
      }
    });
  }

  // Réinitialiser le formulaire d'évaluation
  function resetRating() {
    currentRating = 0;
    highlightStars(0);
    commentTextarea.value = "";
  }

  // Soumettre l'évaluation
  if (submitRatingBtn)
    submitRatingBtn.addEventListener("click", async (e) => {
      const carId = e.target.getAttribute("data-carId");
      if (currentRating === 0) {
        alert("Veuillez sélectionner une note avant de soumettre.");
        return;
      }

      // Ici, vous enverriez normalement les données au serveur
      const comment = commentTextarea.value.trim();
      const res = await fetch("/api/createRating", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: currentRating,
          comment,
          carId,
        }),
      });
      if (res.ok) {
        alert(
          `Évaluation soumise avec succès!\nNote: ${currentRating}/5\nCommentaire: ${
            comment || "Aucun commentaire"
          }`
        );
        window.location.href = "/dashboard-locataire";
      }
      // Mettre à jour l'interface utilisateur
    });
});
