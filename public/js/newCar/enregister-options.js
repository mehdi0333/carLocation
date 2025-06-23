document.addEventListener("DOMContentLoaded", () => {
  // Gestion des services avec options supplémentaires
  const livraisonToggle = document.getElementById("livraison");
  const livraisonOptions = document.getElementById("livraison-options");

  const nettoyageToggle = document.getElementById("nettoyage");
  const nettoyageOptions = document.getElementById("nettoyage-options");

  const kmLimiteToggle = document.getElementById("km-limite");
  const kmOptions = document.getElementById("km-options");

  // Fonction pour afficher/masquer les options en fonction de l'état du toggle
  function toggleOptions(toggle, optionsElement) {
    if (toggle.checked) {
      optionsElement.classList.add("show");
    } else {
      optionsElement.classList.remove("show");
    }
  }

  // Initialisation des états
  toggleOptions(livraisonToggle, livraisonOptions);
  toggleOptions(nettoyageToggle, nettoyageOptions);
  toggleOptions(kmLimiteToggle, kmOptions);

  // Écouteurs d'événements pour les toggles
  livraisonToggle.addEventListener("change", function () {
    toggleOptions(this, livraisonOptions);
  });

  nettoyageToggle.addEventListener("change", function () {
    toggleOptions(this, nettoyageOptions);
  });

  kmLimiteToggle.addEventListener("change", function () {
    toggleOptions(this, kmOptions);
  });

  // Validation des champs numériques
  const numericInputs = document.querySelectorAll(
    "#frais-livraison, #frais-nettoyage, #limite-km, #frais-km"
  );

  numericInputs.forEach((input) => {
    input.addEventListener("input", function () {
      // Remplacer tout ce qui n'est pas un chiffre par une chaîne vide
      this.value = this.value.replace(/[^0-9]/g, "");
    });
  });

  // Sauvegarde des données du formulaire dans le localStorage
  const optionsForm = document.getElementById("options-form");

  // Charger les données sauvegardées si elles existent
  loadFormData();

  // Sauvegarder les données lors de la soumission du formulaire
  optionsForm.addEventListener("submit", function (e) {
    e.preventDefault();
    saveFormData();
    window.location.href = "enregistrer-tarification";
  });

  // Sauvegarder les données lors du clic sur les boutons de navigation
  const nextButton = document.querySelector(".btn-next");

  nextButton.addEventListener("click", function () {
    saveFormData();
    window.location.href = "/enregistrer-tarification";
  });

  // Fonction pour sauvegarder les données du formulaire
  function saveFormData() {
    const services = {
      livraison: document.getElementById("livraison").checked,
      nettoyage: document.getElementById("nettoyage").checked,
      kilometargeLimite: document.getElementById("km-limite").checked,
    };
    const formData = {
      features: getCheckedValues("features"),
      comfort: getCheckedValues("comfort"),
      services: {
        pleinEssence: document.getElementById("plein-essence").checked,
        nettoyage: document.getElementById("nettoyage").checked,
      },
      restrictions: {
        nonFumeur: document.getElementById("non-fumeur").checked,
        animauxInterdits: document.getElementById("animaux-interdits").checked,
      },
    };
    if (services.livraison) {
      const rayonKM = document.getElementById("rayon-livraison").value;
      const rayonPris = document.getElementById("frais-livraison").value;
      services.livraison = {
        enable: true,
        value: rayonKM,
        prix: rayonPris,
      };
    } else {
      services.livraison = {
        enable: false,
      };
    }
    if (services.nettoyage) {
      const pris = document.getElementById("frais-nettoyage").value;
      services.nettoyage = {
        enable: true,
        prix: pris,
      };
    } else {
      services.nettoyage = {
        enable: false,
      };
    }

    if (services.kilometargeLimite) {
      const pris = document.getElementById("frais-km").value || 0;
      const km = document.getElementById("limite-km").value || 0;
      services.kilometargeLimite = {
        enable: true,
        prix: pris,
        value: km,
      };
    } else {
      services.kilometargeLimite = {
        enable: false,
      };
    }

    const Caracteristiques = [
      ...formData.features,
      ...formData.comfort,
      ...Object.keys(formData.services).filter((key) => formData.services[key]),
      ...Object.keys(formData.restrictions).filter(
        (key) => formData.restrictions[key]
      ),
    ];
    localStorage.setItem("carshare_services", JSON.stringify(services));
    localStorage.setItem("carshare_options", JSON.stringify(Caracteristiques));
  }

  // Fonction pour charger les données sauvegardées
  function loadFormData() {
    const savedData = localStorage.getItem("carshare_options");

    if (savedData) {
      const formData = JSON.parse(savedData);

      // Restaurer les caractéristiques
      setCheckedValues("features", formData.features);

      // Restaurer les options de confort
      setCheckedValues("comfort", formData.comfort);

      // Restaurer les services
      if (formData.services) {
        // Livraison
        if (formData.services.livraison) {
          document.getElementById("livraison").checked =
            formData.services.livraison.enabled;
          document.getElementById("rayon-livraison").value =
            formData.services.livraison.rayon;
          document.getElementById("frais-livraison").value =
            formData.services.livraison.frais;
          toggleOptions(document.getElementById("livraison"), livraisonOptions);
        }

        // Plein d'essence
        document.getElementById("plein-essence").checked =
          formData.services.pleinEssence;

        // Nettoyage
        if (formData.services.nettoyage) {
          document.getElementById("nettoyage").checked =
            formData.services.nettoyage.enabled;
          document.getElementById("frais-nettoyage").value =
            formData.services.nettoyage.frais;
          toggleOptions(document.getElementById("nettoyage"), nettoyageOptions);
        }
      }

      // Restaurer les restrictions
      if (formData.restrictions) {
        document.getElementById("non-fumeur").checked =
          formData.restrictions.nonFumeur;
        document.getElementById("animaux-interdits").checked =
          formData.restrictions.animauxInterdits;

        // Kilométrage limité
        if (formData.restrictions.kmLimite) {
          document.getElementById("km-limite").checked =
            formData.restrictions.kmLimite.enabled;
          document.getElementById("limite-km").value =
            formData.restrictions.kmLimite.limite;
          document.getElementById("frais-km").value =
            formData.restrictions.kmLimite.frais;
          toggleOptions(document.getElementById("km-limite"), kmOptions);
        }
      }
    }
  }

  // Fonction pour obtenir les valeurs cochées d'un groupe de checkboxes
  function getCheckedValues(name) {
    const checkboxes = document.querySelectorAll(
      `input[name="${name}"]:checked`
    );
    return Array.from(checkboxes).map((cb) => cb.value);
  }

  // Fonction pour définir les valeurs cochées d'un groupe de checkboxes
  function setCheckedValues(name, values) {
    if (!values || !Array.isArray(values)) return;

    values.forEach((value) => {
      const checkbox = document.querySelector(
        `input[name="${name}"][value="${value}"]`
      );
      if (checkbox) checkbox.checked = true;
    });
  }
});
