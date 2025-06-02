let files = [];
document.getElementById("submitButton").addEventListener("click", async (e) => {
  e.preventDefault();

  const imageInput = document.getElementById("imageInput").files;
  try {
    const carId = e.target.getAttribute("data-carId");
    if (imageInput.length >= 3 && imageInput.length <= 5) {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("image", file);
      });
      formData.append("carId", carId);
      formData.append("type", "carImage");
      const res = await fetch("/edit/car-img", {
        method: "PUT",
        body: formData,
      });
      console.log(res);
      window.location.href = "/edit/enregister-options/" + carId;
    } else alert("nothing change!");
    window.location.href = "/edit/enregister-options/" + carId;
  } catch (error) {
    console.log(error);
  }
});

document.getElementById("imageInput").addEventListener("change", (e) => {
  const filesInput = e.target.files;
  if (!filesInput.length) return;
  files = [...Array.from(files), ...filesInput].slice(0, 5);

  const imagePreview = document.getElementsByClassName("image-preview");
  Array.from(imagePreview).forEach((preview) => {
    preview.src = ""; // Clear previous previews
  });
  Array.from(imagePreview).forEach((preview, index) => {
    if (index >= files.length) return; // Prevent accessing out of bounds
    if (!files[index]) return; // Skip if no file is selected
    preview.src = URL.createObjectURL(files[index]);
  });
});

document.getElementById("resetImgBtn").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("imageInput").value = "";
  const imagePreview = document.getElementsByClassName("image-preview");
  Array.from(imagePreview).forEach((preview) => {
    preview.src = "";
  });
});
