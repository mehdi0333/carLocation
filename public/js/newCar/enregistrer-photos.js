let files = [];
document.getElementById("submitButton").addEventListener("click", async (e) => {
  e.preventDefault();
  if (files.length < 3 || files.length > 5) {
    alert("Please select between 3 and 5 images.");
    return;
  }
  const formData = new FormData();
  Array.from(files).forEach((file) => {
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
// Handle image input change and display previews
document.getElementById("imageInput").addEventListener("change", (e) => {
  const filesInput = e.target.files;
  if (!filesInput.length) return;
  files = [...Array.from(files), ...filesInput].slice(0, 5);
  const imagePreview = document.getElementsByClassName("image-preview");
  Array.from(imagePreview).forEach((preview, index) => {
    preview.src = URL.createObjectURL(files[index]);
  });
});
// Reset image input and previews
document.getElementById("resetImgBtn").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("imageInput").value = "";
  const imagePreview = document.getElementsByClassName("image-preview");
  Array.from(imagePreview).forEach((preview) => {
    preview.src = "";
  });
});
