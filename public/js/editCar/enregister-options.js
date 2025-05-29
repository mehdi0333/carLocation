document.addEventListener("DOMContentLoaded", () => {
  // Gestion des services avec options supplémentaires
  const livraisonToggle = document.getElementById("livraison");
  const livraisonOptions = document.getElementById("livraison-options");

  const nettoyageToggle = document.getElementById("nettoyage");
  const nettoyageOptions = document.getElementById("nettoyage-options");

  const kmLimiteToggle = document.getElementById("km-limite");
  const kmOptions = document.getElementById("km-options");

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

  nextButton.addEventListener("click", function (e) {
    saveFormData(e);
    e.preventDefault();
    // const carId = e.target.getAttribute("data-carId");
    // window.location.href = "/edit/enregistrer-tarification/" + carId;
  });

  // Fonction pour sauvegarder les données du formulaire
  async function saveFormData(e) {
    e.preventDefault();
    const formData = {
      features: getCheckedValues("features"),
      comfort: getCheckedValues("comfort"),
      services: {
        livraison: document.getElementById("livraison").checked,
        pleinEssence: document.getElementById("plein-essence").checked,
        nettoyage: document.getElementById("nettoyage").checked,
      },
      restrictions: {
        nonFumeur: document.getElementById("non-fumeur").checked,
        animauxInterdits: document.getElementById("animaux-interdits").checked,
      },
    };
    const Caracteristiques = [...formData.features, ...formData.comfort];
    if (formData.services.livraison) Caracteristiques.push("Livraison");
    if (formData.services.pleinEssence)
      Caracteristiques.push("Plein d'essence");
    if (formData.services.nettoyage) Caracteristiques.push("Nettoyage");

    if (formData.restrictions.nonFumeur) Caracteristiques.push("Non fumeur");
    if (formData.restrictions.animauxInterdits)
      Caracteristiques.push("Animaux interdits");
    await fetch("/edit/car-options", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Caracteristiques,
        carId: e.target.getAttribute("data-carId"),
      }),
    });
    window.location.href =
      "/edit/enregistrer-tarification/" + e.target.getAttribute("data-carId");
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
