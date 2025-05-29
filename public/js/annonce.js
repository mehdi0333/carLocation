document.addEventListener("DOMContentLoaded", function () {
  // Photo Slider Functionality
  initPhotoSlider();

  // Date Picker Functionality
  initDatePicker();

  // Contact Button Functionality
  initContactButton();

  // Booking Button Functionality
  initBookingButton();
});

// Initialize Photo Slider
function initPhotoSlider() {
  const slider = document.getElementById("photo-slider");
  const slides = document.querySelectorAll(".photo-slide");
  const thumbnails = document.querySelectorAll(".thumbnail");
  const prevBtn = document.getElementById("prev-slide");
  const nextBtn = document.getElementById("next-slide");

  let currentSlide = 0;
  const maxSlides = slides.length;

  // Function to show a specific slide
  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });

    // Deactivate all thumbnails
    thumbnails.forEach((thumb) => {
      thumb.classList.remove("active");
    });

    // Show the selected slide
    slides[index].classList.add("active");

    // Activate the corresponding thumbnail
    thumbnails[index].classList.add("active");

    // Update current slide index
    currentSlide = index;
  }

  // Event listener for previous button
  prevBtn.addEventListener("click", function () {
    let newIndex = currentSlide - 1;
    if (newIndex < 0) {
      newIndex = maxSlides - 1;
    }
    showSlide(newIndex);
  });

  // Event listener for next button
  nextBtn.addEventListener("click", function () {
    let newIndex = currentSlide + 1;
    if (newIndex >= maxSlides) {
      newIndex = 0;
    }
    showSlide(newIndex);
  });

  // Event listeners for thumbnails
  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", function () {
      const index = parseInt(this.dataset.index);
      showSlide(index);
    });
  });

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      prevBtn.click();
    } else if (e.key === "ArrowRight") {
      nextBtn.click();
    }
  });

  // Touch swipe functionality
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].screenX;
  });

  slider.addEventListener("touchend", function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;

    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left, show next slide
      nextBtn.click();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right, show previous slide
      prevBtn.click();
    }
  }

  // Auto-rotate slides (optional)
  // Uncomment the following code to enable auto-rotation
  /*
    let slideInterval = setInterval(function() {
        nextBtn.click();
    }, 5000);
    
    // Pause auto-rotation on hover
    slider.addEventListener('mouseenter', function() {
        clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', function() {
        slideInterval = setInterval(function() {
            nextBtn.click();
        }, 5000);
    });
    */

  // Initialize with the first slide
  showSlide(0);
}

// Initialize Date Picker
function initDatePicker() {
  const startDateInput = document.getElementById("start-date");
  const endDateInput = document.getElementById("end-date");

  // Event listeners for date inputs
  startDateInput.addEventListener("change", function () {
    updatePriceBreakdown();
  });

  endDateInput.addEventListener("change", function () {
    updatePriceBreakdown();
  });

  // Function to calculate number of days between dates
  function calculateDays(startDate, endDate) {
    console.log("Calculating days between:", startDate, endDate);
    if (!startDate || !endDate) return 0;

    // Parse dates (DD/MM/YYYY format)
    const parts1 = startDate.split("-");
    const parts2 = endDate.split("-");

    if (parts1.length !== 3 || parts2.length !== 3) return 0;
    const date1 = new Date(parts1[0], parts1[1] - 1, parts1[2]);
    const date2 = new Date(parts2[0], parts2[1] - 1, parts2[2]);
    new Date();
    // Calculate difference in days
    const diffTime = date2 - date1;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
  }

  // Function to update price breakdown based on selected dates
  function updatePriceBreakdown() {
    const days = calculateDays(startDateInput.value, endDateInput.value);
    // Update price breakdown elements
    const priceItems = document.querySelectorAll(".price-item");
    const priceTotal = document.querySelector(".price-total span:last-child");
    const monthRemise = +document
      .getElementById("totalInformation")
      .getAttribute("data-month");
    const semaineRemise = +document
      .getElementById("totalInformation")
      .getAttribute("data-semaine");
    const dailyRate = +document
      .getElementById("totalInformation") 
      .getAttribute("data-price");
    if (days > 0) {
      const subtotal = dailyRate * days;
      let total = subtotal;
      console.log("Subtotal:", subtotal);
      console.log("Month Remise:", monthRemise);
      console.log("Semaine Remise:", semaineRemise);
      console.log("Days:", days);
      if (days >= 30 && monthRemise > 0) {
        total = (subtotal * monthRemise) / 100;
      } else if (days >= 7 && semaineRemise > 0) {
        total = (subtotal * semaineRemise) / 100;
      }

      // Update rental period and subtotal
      priceItems[0].innerHTML = `<span>${dailyRate} DZD x ${days} jours</span><span>${total} DZD</span>`;

      // Update total
      priceTotal.textContent = `${total} DZD`;
    } else {
      // Reset price breakdown if no valid dates
      priceItems[0].innerHTML = `<span>${dailyRate} DZD x 0 jours</span><span>0 DZD</span>`;
      priceTotal.textContent = `0 DZD`;
    }
  }
}

// Initialize Contact Button
function initContactButton() {
  const contactBtn = document.querySelector(".btn-contact");

  contactBtn.addEventListener("click", function () {
    // In a real application, this would open a chat interface or contact form
    alert(
      "Fonctionnalité de contact en cours de développement. Vous pourrez bientôt contacter le propriétaire directement."
    );
  });
}

// Initialize Booking Button
function initBookingButton() {
  const bookBtn = document.querySelector(".btn-book");

  function getDate(date) {
    if (!date) return null;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
    const year = date.substring(0, 4);
    const month = date.substring(5, 7);
    const day = date.substring(8, 10);
    return {
      year,
      month,
      day,
    };
  }

  bookBtn.addEventListener("click", async function (e) {
    let startDate = document.getElementById("start-date").value;
    let endDate = document.getElementById("end-date").value;
    const carId = e.target.getAttribute("data-carId");
    console.log(startDate);
    console.log(endDate);
    startDate = getDate(startDate);
    endDate = getDate(endDate);
    if (!startDate || !endDate) {
      alert("Veuillez sélectionner les dates de début et de fin de location.");
      return;
    }
    try {
      const res = await fetch("/api/reservation", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate,
          endDate,
          carId,
        }),
      });
      if (res.status === 201) window.location.href = "/dashboard-locataire";
    } catch (error) {
      console.log(error);
    }
  });
}

// ? my code
// document.getElementById("start-date").addEventListener("change", function (e) {
//   console.log("Start date changed:", e.target.value);
//   const startDate = e.target.value;
//   // check if date is correctly formatted
//   if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
//   }
// });
