document.addEventListener("DOMContentLoaded", () => {
  // Edit buttons functionality
  const editButtons = document.querySelectorAll(".btn-edit");
  const cancelButtons = document.querySelectorAll(".btn-cancel");

  // Function to toggle edit mode for a section
  function toggleEditMode(sectionName, isEdit) {
    const infoSection = document.getElementById(`${sectionName}-info`);
    const editSection = document.getElementById(`${sectionName}-edit`);

    if (isEdit) {
      infoSection.classList.add("hidden");
      editSection.classList.remove("hidden");
    } else {
      infoSection.classList.remove("hidden");
      editSection.classList.add("hidden");
    }
  }

  // Add click event to edit buttons
  editButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const sectionName = this.dataset.section;
      toggleEditMode(sectionName, true);
    });
  });

  // Add click event to cancel buttons
  cancelButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const sectionName = this.dataset.section;
      toggleEditMode(sectionName, false);
    });
  });

  // Form submission handling
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Get the form ID to determine which section is being saved
      const formId = this.id;
      const sectionName = formId.split("-")[0];
      // Create a success message
      // const successMessage = document.createElement("div");
      // successMessage.className = "success-message";
      // successMessage.textContent = "Modifications enregistrées avec succès!";
      // successMessage.style.backgroundColor = "rgba(40, 167, 69, 0.1)";
      // successMessage.style.color = "#28a745";
      // successMessage.style.padding = "10px";
      // successMessage.style.borderRadius = "5px";
      // successMessage.style.marginBottom = "10px";

      if (sectionName === "personal") {
        const nom = document.getElementById("last-name").value;
        const telephone = document.getElementById("phone").value;
        const prenom = document.getElementById("first-name").value;
        const email = document.getElementById("email").value;
        const res = await fetch("/api/profil/information", {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nom,
            prenom,
            telephone,
            email,
          }),
        });
        if (res.ok) window.location.href = "/profil";
      } else {
        const device = document.getElementById("currency").value;
        const password = document.getElementById("password").value;
        const res = await fetch("/api/profil/information", {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            device,
            password,
          }),
        });
        if (res.ok) window.location.href = "/profil";
        console.log(res)
      }
      // Insert the success message at the top of the section
      const sectionContent = document.getElementById(`${sectionName}-info`);
      sectionContent.parentNode.insertBefore(successMessage, sectionContent);

      // Toggle back to view mode
      toggleEditMode(sectionName, false);
    });
  });

  // Delete account modal functionality
  const deleteAccountBtn = document.getElementById("delete-account");
  const deleteModal = document.getElementById("delete-modal");
  const cancelDeleteBtn = document.getElementById("cancel-delete");
  const confirmDeleteBtn = document.getElementById("confirm-delete");
  const closeModalBtn = document.querySelector("#delete-modal .btn-close");
  const deleteConfirmInput = document.getElementById("delete-confirm");

  // Show modal when delete account button is clicked
  if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener("click", () => {
      deleteModal.classList.add("show");
    });
  }

  // Hide modal when cancel button is clicked
  if (cancelDeleteBtn) {
    cancelDeleteBtn.addEventListener("click", () => {
      deleteModal.classList.remove("show");
      deleteConfirmInput.value = "";
      confirmDeleteBtn.disabled = true;
    });
  }

  // Hide modal when close button is clicked
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      deleteModal.classList.remove("show");
      deleteConfirmInput.value = "";
      confirmDeleteBtn.disabled = true;
    });
  }

  // Enable/disable confirm delete button based on input
  if (deleteConfirmInput) {
    deleteConfirmInput.addEventListener("input", function () {
      confirmDeleteBtn.disabled = this.value !== "SUPPRIMER";
    });
  }

  // Handle confirm delete button click
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener("click", () => {
      // Here you would typically send a request to delete the account
      alert("Votre compte a été supprimé avec succès.");
      deleteModal.classList.remove("show");
      // Redirect to login page or home page
      // window.location.href = 'index.html';
    });
  }

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === deleteModal) {
      deleteModal.classList.remove("show");
      deleteConfirmInput.value = "";
      confirmDeleteBtn.disabled = true;
    }
  });

  // Change avatar functionality
  const avatarEditBtn = document.querySelector(".avatar-edit-btn");
  const avatarUpload = document.getElementById("avatar-upload");

  if (avatarEditBtn) {
    avatarEditBtn.addEventListener("click", () => {
      avatarUpload.click();
    });
  }

  if (avatarUpload) {
    avatarUpload.addEventListener("change", async function () {
      if (this.files && this.files[0]) {
        const file = this.files[0];
        const formData = new FormData();
        formData.append("image", file);
        const res = await fetch("/api/profil/image", {
          method: "put",
          body: formData,
        });
        console.log(res);
        if (res.ok) {
          window.location.href = "/profil";
        }
      }
    });
  }

  // Toggle switch functionality for payment methods
  const primaryCard = document.getElementById("primary-card");
  const primaryBank = document.getElementById("primary-bank");

  if (primaryCard && primaryBank) {
    primaryCard.addEventListener("change", function () {
      if (this.checked) {
        primaryBank.checked = false;
      }
    });

    primaryBank.addEventListener("change", function () {
      if (this.checked) {
        primaryCard.checked = false;
      }
    });
  }

  // Add payment method functionality
  const addPaymentBtn = document.getElementById("add-payment-btn");
  const paymentModal = document.getElementById("payment-modal");
  const cancelPaymentBtn = document.getElementById("cancel-payment");
  const confirmPaymentBtn = document.getElementById("confirm-payment");
  const closePaymentBtn = document.querySelector("#payment-modal .btn-close");
  const paymentOptions = document.querySelectorAll(".payment-option");
  const paymentForms = document.querySelectorAll(".payment-form");

  // Show modal when add payment button is clicked
  if (addPaymentBtn) {
    addPaymentBtn.addEventListener("click", () => {
      paymentModal.classList.add("show");
    });
  }

  // Hide modal when cancel button is clicked
  if (cancelPaymentBtn) {
    cancelPaymentBtn.addEventListener("click", () => {
      paymentModal.classList.remove("show");
      resetPaymentModal();
    });
  }

  // Hide modal when close button is clicked
  if (closePaymentBtn) {
    closePaymentBtn.addEventListener("click", () => {
      paymentModal.classList.remove("show");
      resetPaymentModal();
    });
  }

  // Payment option selection
  if (paymentOptions.length > 0) {
    paymentOptions.forEach((option) => {
      option.addEventListener("click", function () {
        // Remove selected class from all options
        paymentOptions.forEach((opt) => opt.classList.remove("selected"));

        // Add selected class to clicked option
        this.classList.add("selected");

        // Hide all payment forms
        paymentForms.forEach((form) => form.classList.add("hidden"));

        // Show the corresponding form
        const paymentType = this.dataset.type;
        if (
          paymentType === "credit-card" ||
          paymentType === "edahabia" ||
          paymentType === "cib" ||
          paymentType === "satim"
        ) {
          document
            .getElementById("credit-card-form")
            .classList.remove("hidden");
        } else if (paymentType === "bank") {
          document.getElementById("bank-form").classList.remove("hidden");
        }
        // PayPal doesn't need a form, it will redirect to PayPal
      });
    });
  }

  // Handle confirm payment button click
  if (confirmPaymentBtn) {
    confirmPaymentBtn.addEventListener("click", () => {
      const selectedOption = document.querySelector(".payment-option.selected");

      if (!selectedOption) {
        alert("Veuillez sélectionner un type de paiement.");
        return;
      }

      const paymentType = selectedOption.dataset.type;

      // Here you would typically validate the form and send the data to the server
      // For this example, we'll just show a success message

      if (paymentType === "paypal") {
        alert(
          "Vous allez être redirigé vers PayPal pour finaliser l'ajout de ce moyen de paiement."
        );
      } else {
        alert("Moyen de paiement ajouté avec succès!");
      }

      paymentModal.classList.remove("show");
      resetPaymentModal();
    });
  }

  // Close payment modal when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === paymentModal) {
      paymentModal.classList.remove("show");
      resetPaymentModal();
    }
  });

  // Function to reset payment modal
  function resetPaymentModal() {
    // Remove selected class from all options
    paymentOptions.forEach((opt) => opt.classList.remove("selected"));

    // Hide all payment forms
    paymentForms.forEach((form) => form.classList.add("hidden"));

    // Reset form fields
    const forms = paymentModal.querySelectorAll("form");
    forms.forEach((form) => form.reset());
  }

  // Save payment changes
  const savePaymentBtn = document.getElementById("save-payment");

  if (savePaymentBtn) {
    savePaymentBtn.addEventListener("click", () => {
      // Here you would typically send the payment method changes to the server
      // For this example, we'll just show a success message and toggle back to view mode

      // Create a success message
      const successMessage = document.createElement("div");
      successMessage.className = "success-message";
      successMessage.textContent = "Moyens de paiement mis à jour avec succès!";
      successMessage.style.backgroundColor = "rgba(40, 167, 69, 0.1)";
      successMessage.style.color = "#28a745";
      successMessage.style.padding = "10px";
      successMessage.style.borderRadius = "5px";
      successMessage.style.marginBottom = "10px";

      // Insert the success message at the top of the section
      const sectionContent = document.getElementById("payment-info");
      sectionContent.parentNode.insertBefore(successMessage, sectionContent);

      // Toggle back to view mode
      toggleEditMode("payment", false);

      // Remove the success message after 3 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 3000);
    });
  }

  // Delete payment method functionality
  const deletePaymentBtns = document.querySelectorAll(".btn-delete");

  deletePaymentBtns.forEach((button) => {
    button.addEventListener("click", function () {
      const paymentMethod = this.closest(".payment-method-edit");
      const methodName = paymentMethod.querySelector("h4").textContent;

      if (
        confirm(
          `Êtes-vous sûr de vouloir supprimer ce moyen de paiement: ${methodName}?`
        )
      ) {
        // Here you would typically send a request to delete the payment method
        paymentMethod.remove();
      }
    });
  });

  // Notifications functionality
  const notificationBell = document.querySelector(".notifications");

  if (notificationBell) {
    notificationBell.addEventListener("click", () => {
      alert("Vous avez 3 nouvelles notifications");
    });
  }
});
