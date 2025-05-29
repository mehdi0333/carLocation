document.addEventListener("DOMContentLoaded", () => {
  // Liste des marques de voitures
  const carBrands = [
    "Abarth",
    "Acura",
    "Alfa Romeo",
    "Alpine",
    "Aston Martin",
    "Audi",
    "Bentley",
    "BMW",
    "Bugatti",
    "Buick",
    "BYD",
    "Cadillac",
    "Chevrolet",
    "Chrysler",
    "Citroën",
    "Cupra",
    "Dacia",
    "Daewoo",
    "Daihatsu",
    "Dodge",
    "Ferrari",
    "Fiat",
    "Ford",
    "Genesis",
    "GMC",
    "Honda",
    "Hummer",
    "Hyundai",
    "Infiniti",
    "Isuzu",
    "Jaguar",
    "Jeep",
    "Kia",
    "Koenigsegg",
    "Lada",
    "Lamborghini",
    "Lancia",
    "Land Rover",
    "Lexus",
    "Lincoln",
    "Lotus",
    "Maserati",
    "Maybach",
    "Mazda",
    "McLaren",
    "Mercedes-Benz",
    "MG",
    "Mini",
    "Mitsubishi",
    "Nissan",
    "Opel",
    "Pagani",
    "Peugeot",
    "Porsche",
    "RAM",
    "Renault",
    "Rolls-Royce",
    "Saab",
    "Seat",
    "Škoda",
    "Smart",
    "SsangYong",
    "Subaru",
    "Suzuki",
    "Tesla",
    "Toyota",
    "Volkswagen",
    "Volvo",
    "Xpeng",
    "Chery",
    "Geely",
    "Great Wall",
    "JAC",
    "DFSK",
    "Dongfeng",
    "Haval",
    "Changan",
    "Mahindra",
    "Tata",
    "UAZ",
    "DS",
  ];

  // Liste des wilayas algériennes
  const algerianWilayas = [
    "01- Adrar",
    "02- Chlef",
    "03- Laghouat",
    "04- Oum El Bouaghi",
    "05- Batna",
    "06- Béjaïa",
    "07- Biskra",
    "08- Bechar",
    "09- Blida",
    "10- Bouira",
    "11- Tamanrasset",
    "12- Tébessa",
    "13- Tlemcen",
    "14- Tiaret",
    "15- Tizi Ouzou",
    "16- Alger",
    "17- Djelfa",
    "18- Jijel",
    "19- Sétif",
    "20- Saïda",
    "21- Skikda",
    "22- Sidi Bel Abbès",
    "23- Annaba",
    "24- Guelma",
    "25- Constantine",
    "26- Médéa",
    "27- Mostaganem",
    "28- M'Sila",
    "29- Mascara",
    "30- Ouargla",
    "31- Oran",
    "32- El Bayadh",
    "33- Illizi",
    "34- Bordj Bou Arreridj",
    "35- Boumerdès",
    "36- El Tarf",
    "37- Tindouf",
    "38- Tissemsilt",
    "39- El Oued",
    "40- Khenchela",
    "41- Souk Ahras",
    "42- Tipaza",
    "43- Mila",
    "44- Aïn Defla",
    "45- Naâma",
    "46- Aïn Témouchent",
    "47- Ghardaïa",
    "48- Relizane",
    "49- Timimoun",
    "50- Bordj Baji Mokhtar",
    "51- Béni Abbès",
    "52- Ouled Djellal",
    "53- In Salah",
    "54- In Guezzam",
    "55- Touggourt",
    "56- Djanet",
    "57- El M'Ghair",
    "58- El Meniaa",
  ];

  // Tri alphabétique des marques
  carBrands.sort();

  // Éléments DOM pour les marques
  const marqueInput = document.getElementById("marque");
  const marqueSuggestions = document.getElementById("marque-suggestions");

  // Éléments DOM pour les wilayas
  const villeInput = document.getElementById("ville");

  // Créer un conteneur pour les suggestions de wilayas
  const villeContainer = villeInput.parentElement;
  villeContainer.classList.add("autocomplete-container");

  // Ajouter l'icône de flèche
  const villeIcon = document.createElement("i");
  villeIcon.className = "fas fa-chevron-down";
  villeContainer.appendChild(villeIcon);

  // Créer le dropdown pour les suggestions de wilayas
  const villeSuggestions = document.createElement("div");
  villeSuggestions.className = "autocomplete-dropdown";
  villeSuggestions.id = "ville-suggestions";
  villeContainer.appendChild(villeSuggestions);

  // Fonction pour filtrer les marques en fonction de la saisie
  function filterBrands(input) {
    const value = input.toLowerCase();
    return carBrands.filter((brand) => brand.toLowerCase().includes(value));
  }

  // Fonction pour filtrer les wilayas en fonction de la saisie
  function filterWilayas(input) {
    const value = input.toLowerCase();
    return algerianWilayas.filter((wilaya) =>
      wilaya.toLowerCase().includes(value)
    );
  }

  // Fonction pour afficher les suggestions de marques
  function showBrandSuggestions(suggestions) {
    // Vider les suggestions précédentes
    marqueSuggestions.innerHTML = "";

    if (suggestions.length === 0) {
      marqueSuggestions.classList.remove("show");
      return;
    }

    // Ajouter les nouvelles suggestions
    suggestions.forEach((brand) => {
      const div = document.createElement("div");
      div.className = "suggestion-item";
      div.textContent = brand;
      div.addEventListener("click", () => {
        marqueInput.value = brand;
        marqueSuggestions.classList.remove("show");
      });
      marqueSuggestions.appendChild(div);
    });

    // Afficher la liste déroulante
    marqueSuggestions.classList.add("show");
  }

  // Fonction pour afficher les suggestions de wilayas
  function showWilayaSuggestions(suggestions) {
    // Vider les suggestions précédentes
    villeSuggestions.innerHTML = "";

    if (suggestions.length === 0) {
      villeSuggestions.classList.remove("show");
      return;
    }

    // Ajouter les nouvelles suggestions
    suggestions.forEach((wilaya) => {
      const div = document.createElement("div");
      div.className = "suggestion-item";
      div.textContent = wilaya;
      div.addEventListener("click", () => {
        villeInput.value = wilaya;
        villeSuggestions.classList.remove("show");
      });
      villeSuggestions.appendChild(div);
    });

    // Afficher la liste déroulante
    villeSuggestions.classList.add("show");
  }

  // Événement input pour filtrer les suggestions de marques
  marqueInput.addEventListener("input", function () {
    const value = this.value.trim();

    if (value.length === 0) {
      marqueSuggestions.classList.remove("show");
      return;
    }

    const filteredBrands = filterBrands(value);
    showBrandSuggestions(filteredBrands);
  });

  // Événement input pour filtrer les suggestions de wilayas
  villeInput.addEventListener("input", function () {
    const value = this.value.trim();

    if (value.length === 0) {
      villeSuggestions.classList.remove("show");
      return;
    }

    const filteredWilayas = filterWilayas(value);
    showWilayaSuggestions(filteredWilayas);
  });

  // Événement focus pour afficher toutes les marques
  marqueInput.addEventListener("focus", function () {
    if (this.value.trim().length === 0) {
      showBrandSuggestions(carBrands);
    } else {
      const filteredBrands = filterBrands(this.value.trim());
      showBrandSuggestions(filteredBrands);
    }
  });

  // Événement focus pour afficher toutes les wilayas
  villeInput.addEventListener("focus", function () {
    if (this.value.trim().length === 0) {
      showWilayaSuggestions(algerianWilayas);
    } else {
      const filteredWilayas = filterWilayas(this.value.trim());
      showWilayaSuggestions(filteredWilayas);
    }
  });

  // Fermer les suggestions quand on clique ailleurs
  document.addEventListener("click", (e) => {
    if (e.target !== marqueInput && e.target !== marqueSuggestions) {
      marqueSuggestions.classList.remove("show");
    }

    if (e.target !== villeInput && e.target !== villeSuggestions) {
      villeSuggestions.classList.remove("show");
    }
  });

  // Variables pour la navigation avec les flèches
  let selectedBrandIndex = -1;
  let selectedWilayaIndex = -1;

  // Navigation avec les flèches dans les suggestions de marques
  marqueInput.addEventListener("keydown", (e) => {
    const items = marqueSuggestions.querySelectorAll(".suggestion-item");

    // Si la liste n'est pas affichée, ne rien faire
    if (!marqueSuggestions.classList.contains("show")) return;

    // Flèche bas
    if (e.key === "ArrowDown") {
      e.preventDefault();
      selectedBrandIndex = (selectedBrandIndex + 1) % items.length;
      updateSelectedItem(items, selectedBrandIndex);
    }
    // Flèche haut
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      selectedBrandIndex =
        (selectedBrandIndex - 1 + items.length) % items.length;
      updateSelectedItem(items, selectedBrandIndex);
    }
    // Touche Entrée
    else if (e.key === "Enter" && selectedBrandIndex >= 0) {
      e.preventDefault();
      marqueInput.value = items[selectedBrandIndex].textContent;
      marqueSuggestions.classList.remove("show");
      selectedBrandIndex = -1;
    }
    // Touche Échap
    else if (e.key === "Escape") {
      marqueSuggestions.classList.remove("show");
      selectedBrandIndex = -1;
    }
  });

  // Navigation avec les flèches dans les suggestions de wilayas
  villeInput.addEventListener("keydown", (e) => {
    const items = villeSuggestions.querySelectorAll(".suggestion-item");

    // Si la liste n'est pas affichée, ne rien faire
    if (!villeSuggestions.classList.contains("show")) return;

    // Flèche bas
    if (e.key === "ArrowDown") {
      e.preventDefault();
      selectedWilayaIndex = (selectedWilayaIndex + 1) % items.length;
      updateSelectedItem(items, selectedWilayaIndex);
    }
    // Flèche haut
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      selectedWilayaIndex =
        (selectedWilayaIndex - 1 + items.length) % items.length;
      updateSelectedItem(items, selectedWilayaIndex);
    }
    // Touche Entrée
    else if (e.key === "Enter" && selectedWilayaIndex >= 0) {
      e.preventDefault();
      villeInput.value = items[selectedWilayaIndex].textContent;
      villeSuggestions.classList.remove("show");
      selectedWilayaIndex = -1;
    }
    // Touche Échap
    else if (e.key === "Escape") {
      villeSuggestions.classList.remove("show");
      selectedWilayaIndex = -1;
    }
  });

  // Mettre à jour l'élément sélectionné visuellement
  function updateSelectedItem(items, selectedIndex) {
    items.forEach((item, index) => {
      if (index === selectedIndex) {
        item.classList.add("selected");
        // Faire défiler pour voir l'élément sélectionné si nécessaire
        item.scrollIntoView({ block: "nearest" });
      } else {
        item.classList.remove("selected");
      }
    });
  }
});

// ! my code
document.getElementById("gotoSecondPage").addEventListener("submit", (e) => {
  e.preventDefault();

  const description = document.getElementById("description").value;
  const marque = document.getElementById("marque").value;
  const modele = document.getElementById("modele").value;
  const annee = document.getElementById("annee").value;
  const kilometrage = document.getElementById("kilometrage").value;
  const location = document.getElementById("ville").value.split(" ")[1];
  console.log("annee : " + annee);
  console.log("description : " + description);
  console.log("kilometrage : " + kilometrage);
  console.log("marque : " + marque);
  console.log("modele : " + modele);
  console.log("ville : " + location);
  const vehiculeInformation = {
    annee,
    description,
    kilometrage,
    marque,
    modele,
    location,
  };
  localStorage.setItem(
    "vehiculeInformation",
    JSON.stringify(vehiculeInformation)
  );
  window.location.href = "enregistrer-document";
});
