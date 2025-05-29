document.addEventListener("DOMContentLoaded", function () {
  // Determine which page we're on
  const currentPath = window.location.pathname;
  const page = currentPath.split("/").pop();

  // Initialize the appropriate functionality based on the page
  if (page === "dashboard" || page === "") {
    initDashboard();
  } else if (page === "disponibilite") {
    initAvailability();
  } else if (page === "revenus") {
    initRevenue();
  } else if (page === "reservations") {
    initReservations();
  }

  // Common functionality for all pages
  initNotifications();
});

// Dashboard initialization
function initDashboard() {
  const calendarDays = document.getElementById("calendar-days");
  if (calendarDays) {
    generateCalendar(calendarDays, new Date(), true);
  }
}

// Availability page initialization
function initAvailability() {
  const currentDate = new Date();
  const calendarDays = document.getElementById("calendar-days");
  if (!calendarDays) return;

  generateCalendar(calendarDays, currentDate);

  const prevBtn = document.getElementById("prev-month");
  const nextBtn = document.getElementById("next-month");
  const currentMonthDisplay = document.getElementById("current-month");

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      let currentMonth = parseInt(calendarDays.dataset.month);
      let currentYear = parseInt(calendarDays.dataset.year);

      let newMonth = currentMonth - 1;
      let newYear = currentYear;

      if (newMonth < 0) {
        newMonth = 11;
        newYear--;
      }

      const newDate = new Date(newYear, newMonth, 1);
      if (currentMonthDisplay)
        currentMonthDisplay.textContent = formatMonth(newDate);
      generateCalendar(calendarDays, newDate);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      let currentMonth = parseInt(calendarDays.dataset.month);
      let currentYear = parseInt(calendarDays.dataset.year);

      let newMonth = currentMonth + 1;
      let newYear = currentYear;

      if (newMonth > 11) {
        newMonth = 0;
        newYear++;
      }

      const newDate = new Date(newYear, newMonth, 1);
      if (currentMonthDisplay)
        currentMonthDisplay.textContent = formatMonth(newDate);
      generateCalendar(calendarDays, newDate);
    });
  }
}

// Revenue page initialization
function initRevenue() {
  const monthlyRevenueCtx = document.getElementById("monthlyRevenueChart");
  if (monthlyRevenueCtx) {
    new Chart(monthlyRevenueCtx, {
      type: "bar",
      data: {
        labels: [
          "Jan",
          "Fév",
          "Mar",
          "Avr",
          "Mai",
          "Juin",
          "Juil",
          "Aoû",
          "Sep",
          "Oct",
          "Nov",
          "Déc",
        ],
        datasets: [
          {
            label: "Revenus mensuels (DZD)",
            data: [1200, 1350, 1100, 1450, 1300, 1600, 0, 0, 0, 0, 0, 0],
            backgroundColor: (context) => {
              const index = context.dataIndex;
              return index === 5 ? "#8a3ffc" : "#e0e0e0"; // Highlight June
            },
            borderRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: { beginAtZero: true, grid: { display: false } },
          x: { grid: { display: false } },
        },
      },
    });
  }
}

// Reservations page initialization
function initReservations() {
  const tabButtons = document.querySelectorAll(".tab-btn");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const tabType = this.dataset.tab;
      console.log(`Showing ${tabType} reservations`);
    });
  });

  const searchInput = document.querySelector(".search-box input");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const rows = document.querySelectorAll(".reservations-table tbody tr");

      rows.forEach((row) => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? "" : "none";
      });
    });
  }
}

// Common notifications initialization
function initNotifications() {
  console.log("Notifications initialized.");
}

// Calendar generation function
function generateCalendar(container, date, mini = false) {
  if (!container) return;

  container.innerHTML = "";

  container.dataset.month = date.getMonth();
  container.dataset.year = date.getFullYear();

  if (!mini) {
    const monthDisplay = document.getElementById("current-month");
    if (monthDisplay) {
      monthDisplay.textContent = formatMonth(date);
    }
  }

  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  let firstDayIndex = firstDay.getDay() - 1;
  if (firstDayIndex < 0) firstDayIndex = 6; // Adjust Sunday

  const totalDays = lastDay.getDate();

  // Empty cells before the first day
  for (let i = 0; i < firstDayIndex; i++) {
    const emptyDay = document.createElement("div");
    emptyDay.className = "day empty";
    container.appendChild(emptyDay);
  }

  // Days of the month
  for (let day = 1; day <= totalDays; day++) {
    const dayElement = document.createElement("div");
    dayElement.className = "day";
    dayElement.textContent = day;
    container.appendChild(dayElement);
  }
}

// Month formatting helper
function formatMonth(date) {
  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}
