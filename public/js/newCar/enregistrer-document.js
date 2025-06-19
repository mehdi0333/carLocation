window.onpageshow = (e) => {
  const permisInput = document.getElementById("permis").files[0];
  const cardGrisInput = document.getElementById("carte-grise").files[0];
  const permisPreview = document.getElementById("permis-preview");
  const cardGrisPreview = document.getElementById("carte-grise-preview");
  if (permisInput) {
    permisPreview.src = URL.createObjectURL(permisInput);
  }
  if (cardGrisInput) {
    cardGrisPreview.src = URL.createObjectURL(cardGrisInput);
  }
};
document
  .getElementById("documents-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const cartGris = document.getElementById("carte-grise").files[0];
    const permis = document.getElementById("permis").files[0];
    if (!cartGris || !permis) {
      return;
    }

    const formData = new FormData();
    formData.append("images", cartGris);
    formData.append("images", permis);

    const res = await fetch("/api/car/documents", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      window.location.href = "enregistrer-photo";
      return;
    } else {
      console.error(res.status);
    }
  });

document.getElementById("carte-grise").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
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
