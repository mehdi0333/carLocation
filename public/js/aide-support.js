document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener("click", () => {
      mainNav.style.display =
        mainNav.style.display === "flex" ? "none" : "flex";
    });
  }

  // FAQ tabs
  const tabButtons = document.querySelectorAll(".faq-tabs .tab-btn");
  const tabContents = document.querySelectorAll(".faq-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");

      // Update active tab
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Show selected tab content
      tabContents.forEach((content) => {
        content.classList.remove("active");
      });
      document.getElementById(`${tabId}-faq`).classList.add("active");
    });
  });

  // FAQ accordion
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      // Toggle active class
      const isActive = item.classList.contains("active");

      // Close all items
      faqItems.forEach((faqItem) => {
        faqItem.classList.remove("active");
      });

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });

  // File upload handling
  const fileInput = document.getElementById("complaint-attachments");
  const fileList = document.getElementById("file-list");

  if (fileInput && fileList) {
    fileInput.addEventListener("change", function () {
      fileList.innerHTML = "";

      if (this.files.length > 0) {
        for (let i = 0; i < this.files.length; i++) {
          const file = this.files[i];
          const fileItem = document.createElement("div");
          fileItem.className = "file-item";

          const fileName = document.createElement("span");
          fileName.className = "file-name";
          fileName.textContent = file.name;

          const removeButton = document.createElement("button");
          removeButton.className = "file-remove";
          removeButton.innerHTML = '<i class="fas fa-times"></i>';
          removeButton.addEventListener("click", () => {
            fileItem.remove();
          });

          fileItem.appendChild(fileName);
          fileItem.appendChild(removeButton);
          fileList.appendChild(fileItem);
        }
      }
    });
  }

  // Complaint form submission
  const complaintForm = document.getElementById("complaint-form");

  if (complaintForm) {
    complaintForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Basic validation
      const type = document.getElementById("complaint-type").value;
      const subject = document.getElementById("complaint-subject").value;
      const description = document.getElementById(
        "complaint-description"
      ).value;
      const priority = document.getElementById("complaint-priority").value;

      const file = document.getElementById("complaint-attachments").files[0];

      if (!priority || !type || !subject || !description || !file) {
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
      }

      // Simulate form submission
      const formData = new FormData();
      formData.append("image", file);
      formData.append("type", type);
      formData.append("description", description);
      formData.append("sujet", subject);
      formData.append("priorite", priority);
      try {
        const res = await fetch("/api/plaint", {
          method: "post",
          body: formData,
        });
        if (res.status === 200) {
          window.location.href = "/";
          return;
        }
      } catch (error) {
        console.log(error);
      }
      if (fileList) {
        fileList.innerHTML = "";
      }

      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Contact form submission
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Basic validation
      const name = document.getElementById("contact-name").value;
      const email = document.getElementById("contact-email").value;
      const message = document.getElementById("contact-message").value;

      if (!name || !email || !message) {
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
      }

      // Simulate form submission
      alert(
        "Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais."
      );

      // Reset form
      this.reset();
    });
  }

  // Chat widget
  const startChatButton = document.getElementById("start-chat");
  const chatWidget = document.getElementById("chat-widget");
  const chatClose = document.querySelector(".chat-close");
  const chatInput = document.getElementById("chat-input-field");
  const chatSend = document.getElementById("chat-send");
  const chatMessages = document.getElementById("chat-messages");

  if (startChatButton && chatWidget) {
    startChatButton.addEventListener("click", () => {
      chatWidget.classList.add("active");
    });
  }

  if (chatClose && chatWidget) {
    chatClose.addEventListener("click", () => {
      chatWidget.classList.remove("active");
    });
  }

  if (chatSend && chatInput && chatMessages) {
    // Function to add a message
    function addMessage(content, isUser = false) {
      const messageDiv = document.createElement("div");
      messageDiv.className = `message ${isUser ? "user" : "support"}`;

      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const timeString = `${hours}:${minutes}`;

      messageDiv.innerHTML = `
                <div class="message-content">
                    <p>${content}</p>
                    <span class="message-time">${timeString}</span>
                </div>
            `;

      chatMessages.appendChild(messageDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Send message
    function sendMessage() {
      const message = chatInput.value.trim();

      if (message) {
        addMessage(message, true);
        chatInput.value = "";

        // Simulate automatic response after 1 second
        setTimeout(() => {
          const responses = [
            "Merci pour votre message. Un agent va vous répondre dans quelques instants.",
            "Je comprends votre préoccupation. Pouvez-vous me donner plus de détails?",
            "Nous allons examiner ce problème et revenir vers vous rapidement.",
            "Avez-vous essayé de rafraîchir la page ou de vous déconnecter puis reconnecter?",
            "Je vais transférer votre demande à notre équipe technique.",
          ];

          const randomResponse =
            responses[Math.floor(Math.random() * responses.length)];
          addMessage(randomResponse);
        }, 1000);
      }
    }

    chatSend.addEventListener("click", sendMessage);

    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});
