document
  .getElementById("documents-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const carId = e.target.getAttribute("data-carId");
    const cartGris = document.getElementById("carte-grise").files[0];
    const permis = document.getElementById("permis").files[0];
    const formData = new FormData();
    formData.append("carId", carId);
    if (cartGris) {
      formData.append("image", cartGris);
      formData.append("type", "cardGris");
      await fetch("/edit/car-document", {
        method: "PUT",
        body: formData,
      });
    }
    if (permis) {
      formData.append("image", permis);
      formData.append("type", "permis");
      await fetch("/edit/car-document", {
        method: "PUT",
        body: formData,
      });
    }
    window.location.href = "/edit/enregistrer-photo/" + carId;
  });

document.getElementById("carte-grise").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    alert("Veuillez patienter pendant le téléchargement de la carte grise.");
    document.getElementById("carte-grise-preview").src =
      URL.createObjectURL(file);
  } else {
    document.getElementById("carte-grise-preview").src = "";
  }
});
document.getElementById("permis").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    document.getElementById("permis-preview").src = URL.createObjectURL(file);
  } else {
    document.getElementById("permis-preview").src = "";
  }
});
