// Variables globales
let currentReservationId = null;
const modal = document.getElementById("reservationModal");
const closeBtn = document.getElementById("closeModal");
const acceptBtn = document.getElementById("acceptBtn");
const rejectBtn = document.getElementById("rejectBtn");
const toast = document.getElementById("toast");
const modalActions = document.getElementById("modalActions");

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
  initializeModal();
});

// Initialisation de la modal
function initializeModal() {
  // Fermer la modal
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Boutons d'action
  if (acceptBtn) acceptBtn.addEventListener("click", acceptReservation);
  if (rejectBtn) rejectBtn.addEventListener("click", rejectReservation);

  // Fermer avec Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

// Remplir la modal avec les données
function populateModalData(data) {
  // Informations de base
  document.getElementById("reservationId").textContent = data.id;
  const statusElement = document.getElementById("reservationStatus");
  statusElement.textContent = getStatusText(data.status);
  statusElement.className = `status ${data.status}`;

  // Informations client
  document.getElementById("clientName").textContent = data.client.name;
  document.getElementById("clientEmail").textContent = data.client.email;
  document.getElementById("clientPhone").textContent = data.client.phone;
  document.querySelector(".client-avatar").textContent = data.client.avatar;

  // Rating du client
  updateClientRating(data.client.rating);

  // Informations véhicule
  document.getElementById("vehicleName").textContent = data.vehicle.name;
  document.getElementById("vehicleImage").src = data.vehicle.image;
  document.getElementById("vehicleImage").alt = data.vehicle.name;
  document.getElementById("vehiclePlate").textContent = data.vehicle.plate;

  // Spécifications du véhicule
  const specsContainer = document.querySelector(".vehicle-specs");
  specsContainer.innerHTML = data.vehicle.specs
    .map(
      (spec) =>
        `<span><i class="fas fa-${getSpecIcon(spec)}"></i> ${spec}</span>`
    )
    .join("");

  // Détails de réservation
  document.getElementById("bookingPeriod").textContent = data.booking.period;
  document.getElementById("bookingDuration").textContent =
    data.booking.duration;
  document.getElementById("pickupTime").textContent = data.booking.pickupTime;
  document.getElementById("returnTime").textContent = data.booking.returnTime;
  document.getElementById("pickupLocation").textContent = data.booking.location;

  // Informations de paiement
  document.getElementById(
    "dailyPrice"
  ).textContent = `${data.payment.dailyPrice} €`;
  document.getElementById("numberOfDays").textContent = data.payment.days;
  document.getElementById("subtotal").textContent = `${
    data.payment.dailyPrice * data.payment.days
  } €`;
  document.getElementById(
    "serviceFees"
  ).textContent = `${data.payment.serviceFees} €`;
  document.getElementById(
    "totalAmount"
  ).textContent = `${data.payment.total} €`;

  // Notes
  document.getElementById("additionalNotes").textContent = data.notes;
}

// Mettre à jour le rating du client
function updateClientRating(rating) {
  const starsContainer = document.querySelector(".stars");
  const ratingText = document.querySelector(".rating-text");

  starsContainer.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("i");
    star.className = i <= Math.floor(rating) ? "fas fa-star" : "far fa-star";
    starsContainer.appendChild(star);
  }

  ratingText.textContent = `${rating}/5`;
}

// Obtenir l'icône pour les spécifications
function getSpecIcon(spec) {
  const icons = {
    Essence: "gas-pump",
    Diesel: "gas-pump",
    Électrique: "bolt",
    Manuelle: "cog",
    Automatique: "cog",
    "5 places": "users",
    "4 places": "users",
    "7 places": "users",
  };
  return icons[spec] || "info-circle";
}

// Obtenir le texte du statut
function getStatusText(status) {
  const statusTexts = {
    upcoming: "À venir",
    ongoing: "En cours",
    completed: "Terminée",
    cancelled: "Annulée",
  };
  return statusTexts[status] || status;
}

// Fermer la modal
function closeModal() {
  window.location.href = "/reservations";
}

// Accepter la réservation
async function acceptReservation(e) {
  try {
    const reservationIdATT = e.target.getAttribute("data-reservationId");
    const res = await fetch("/api/reservationResponse", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reservationId: reservationIdATT,
        status: "confirmée",
      }),
    });
    if (res.ok) {
      window.location.href = "/reservations";
    }
  } catch (error) {
    console.log(error);
  }
}

// Refuser la réservation
async function rejectReservation(e) {
  try {
    const reservationIdATT = e.target.getAttribute("data-reservationId");
    const res = await fetch("/api/reservationResponse", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reservationId: reservationIdATT,
        status: "refusée",
      }),
    });
    if (res.ok) {
      window.location.href = "/reservations";
    }
  } catch (error) {
    console.log(error);
  }
}

// Afficher l'état de chargement
function showLoadingState(button, text) {
  button.disabled = true;
  button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${text}`;
}

// Masquer l'état de chargement
function hideLoadingState(button, originalHTML) {
  button.disabled = false;
  button.innerHTML = originalHTML;
}

// Afficher une notification toast
function showToast(message, type = "success") {
  const toastMessage = document.getElementById("toastMessage");
  toastMessage.textContent = message;

  toast.className = `toast ${type}`;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
