document.getElementById("submitButton").addEventListener("click", async (e) => {
  e.preventDefault();

  const imageInput = document.getElementById("imageInput").files;
  try {
    const carId = e.target.getAttribute("data-carId");
    if (imageInput.length >= 3 && imageInput.length <= 5) {
      const formData = new FormData();
      Array.from(imageInput).forEach((file) => {
        formData.append("image", file);
      });
      formData.append("carId", carId);
      formData.append("type", "carImage");
      // alert("Uploading images, please wait...");
      await fetch("/edit/car-img", {
        method: "PUT",
        body: formData,
      });
    }
    window.location.href = "/edit/enregister-options/" + carId;
  } catch (error) {
    console.log(error);
  }
});
document.getElementById("imageInput").addEventListener("change", (e) => {
  const files = e.target.files;
  const imagePreview = document.getElementsByClassName("image-preview");
  console.log(Array.from(imagePreview));
  Array.from(imagePreview).forEach((img) => {
    img.src = "";
  });
  if (files.length >= 3 && files.length <= 5) {
    Array.from(imagePreview).forEach((img, index) => {
      img.src = URL.createObjectURL(files[index]);
    });
  }
});
