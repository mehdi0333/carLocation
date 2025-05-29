document
  .getElementById("pricing-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const carId = e.target.getAttribute("data-carId");
    let prix = document.getElementById("prix-jour").value;
    // ! handle error
    if (isNaN(prix)) {
      return;
    }
    const remiseSemaine =
      document.getElementsByName("reduction-hebdo")[0].value;
    const remiseMois = document.getElementsByName("reduction-mensuelle")[0]
      .value;
    const body = {
      prix,
      remiseMois,
      carId,
      remiseSemaine,
    };

    try {
      await fetch("/edit/car-tarification", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      window.location.href = "/edit/enregistrer-confirmation/" + carId;
    } catch (error) {
      console.log(error);
      alert("error");
    }
  });
