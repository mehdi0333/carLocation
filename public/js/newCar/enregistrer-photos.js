document.getElementById("submitButton").addEventListener("click", async (e) => {
  e.preventDefault();

  const imageInput = document.getElementById("imageInput").files;
  if (!imageInput.length) return;
  const formData = new FormData();
  Array.from(imageInput).forEach((file) => {
    formData.append("images", file);
  });
  try {
    const res = await fetch("/api/car/image", {
      method: "POST",
      body: formData,
    });
    if (res.status === 201) {
      window.location.href = "enregister-options";
      return;
    } else {
      console.error(res.status);
    }
  } catch (error) {
    console.log(error);
  }
});
document.getElementById("imageInput").addEventListener("change", (e) => {
  const files = e.target.files;
  const imagePreview = document.getElementsByClassName("image-preview");
  Array.from(imagePreview).forEach((preview) => {
    preview.src = "";
  });
  if (files.length >= 3 && files.length <= 5) {
    alert(
      "Images sélectionnées : " +
        Array.from(files)
          .map((file) => file.name)
          .join(", ")
    );
    Array.from(files).forEach((file, index) => {
      if (index < imagePreview.length) {
        imagePreview[index].src = URL.createObjectURL(file);
      }
    });
  } else {
    alert("Veuillez sélectionner minimum 3 et maximum 5 images.");
    e.target.value = ""; // Reset the input if less than 3 images
  }
});
