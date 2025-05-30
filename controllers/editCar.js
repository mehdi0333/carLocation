import { Car } from "../models/models.js";
import { deleteFile } from "../utils/files.js";

export async function editCarInformation(req, res) {
  try {
    const { user, userId, isLogged } = req;
    const carId = req.params.carId;
    console.log(carId);
    const car = await Car.findById(carId);
    if (!car) return res.render("404");
    console.log(car);
    // Check if the user is authorized to edit this car
    if (car.userId.toString() !== userId.toString()) return res.render("403");

    res.render("editCar/enregister-vehicule", {
      user,
      userId,
      isLogged,
      car,
    });
  } catch (error) {
    console.error("Error rendering new car page:", error);
    res.status(500).send("Internal Server Error");
  }
}
export async function submitCarInformation(req, res) {
  try {
    const { user, userId, isLogged } = req;
    const {
      carId,
      marque,
      modele,
      annee,
      kilometrage,
      description,
      transmission,
      Carburant,
      type,
      Plcaces,
    } = req.body;
    const car = await Car.findById(carId);
    if (!car) return res.render("404");
    // Check if the user is authorized to edit this car
    if (car.userId.toString() !== userId.toString()) return res.render("403");
    // Update car information
    if (marque && car.marque !== marque) car.marque = marque;
    if (modele && car.modele !== modele) car.modele = modele;
    if (annee && car.Annee !== annee) car.Annee = annee;
    if (kilometrage && car.kilometrage !== kilometrage)
      car.kilometrage = kilometrage;
    if (description && car.Description !== description)
      car.Description = description;
    if (transmission && car.transmission !== transmission)
      car.transmission = transmission;
    if (Carburant && car.Carburant !== Carburant)
      car.Carburant = Carburant;
    if (type && car.type !== type) car.type = type;
    if (Plcaces && car.Places !== Plcaces) car.Places = Plcaces;
    await car.save(); 
    res.redirect(`/edit/enregistrer-document/${carId}`);
  } catch (error) {
    console.error("Error rendering new car page:", error);
    res.status(500).send("Internal Server Error");
  }
}

export async function editCarDocument(req, res) {
  try {
    const { user, userId, isLogged } = req;
    const carId = req.params.carId;
    const car = await Car.findById(carId);
    if (!car) return res.render("404");
    // Check if the user is authorized to edit this car
    if (car.userId.toString() !== userId.toString()) return res.render("403");
    // Render the document page with car information
    res.render("editCar/enregistrer-document", {
      user,
      userId,
      isLogged,
      car,
    });
  } catch (error) {
    console.error("Error rendering new car page:", error);
    res.status(500).send("Internal Server Error");
  }
}

export async function submitCarDocument(req, res) {
  try {
    const { user, userId, file } = req;
    const { carId, type } = req.body;
    const car = await Car.findById(carId);
    if (!car) return res.render("404");
    // Check if the user is authorized to edit this car
    if (car.userId.toString() !== userId.toString()) return res.render("403");
    // Handle file uploads
    if (file) {
      if (type === "cardGris") {
        deleteFile("\\public" + car.cardGris);
        car.cardGris = "/" + file.filename;
      } else if (type === "permis") {
        deleteFile("\\public" + car.permis);
        car.permis = "/" + file.filename;
      } else if (type === "carImage") {
        if (car.carImg) deleteFile("\\public" + car.carImg);
        car.carImg = "/" + file.filename;
      }
      await car.save();
    }
    res.status(200);
  } catch (error) {
    console.error("Error rendering new car page:", error);
    res.status(500).send("Internal Server Error");
  }
}

export async function submitCarImg(req, res) {
  try {
    const { userId, files } = req;
    const { carId } = req.body;
    const car = await Car.findById(carId);
    if (!car) return res.render("404");
    // Check if the user is authorized to edit this car
    if (car.userId.toString() !== userId.toString()) return res.render("403");
    // Handle file uploads
    if (files.length > 0) {
      console.log(files);
      car.carImg.forEach((img) => {
        if (img) deleteFile("\\public" + img);
      });
      car.carImg = files.map((file) => {
        return "/" + file.filename;
      });
      await car.save();
    }
    res.status(200);
  } catch (error) {
    console.error("Error rendering new car page:", error);
    res.status(500).send("Internal Server Error");
  }
}

export async function editCarConfirmation(req, res) {
  try {
    const { user, userId, isLogged } = req;
    const carId = req.params.carId;
    const car = await Car.findById(carId);
    if (!car) return res.render("404");
    // Check if the user is authorized to edit this car
    if (car.userId.toString() !== userId.toString()) return res.render("403");
    // Render the confirmation page with car information
    res.render("editCar/enregistrer-confirmation", {
      user,
      car,
      isLogged,
      userId,
    });
  } catch (error) {
    console.error("Error rendering new car page:", error);
    res.status(500).send("Internal Server Error");
  }
}

export async function editCarPhoto(req, res) {
  try {
    const { user, userId, isLogged } = req;
    const carId = req.params.carId;
    const car = await Car.findById(carId);
    if (!car) return res.render("404");
    // Check if the user is authorized to edit this car
    if (car.userId.toString() !== userId.toString()) return res.render("403");
    // Render the photo page with car information
    res.render("editCar/enregistrer-photo", {
      user,
      userId,
      isLogged,
      car,
    });
  } catch (error) {
    console.error("Error rendering new car page:", error);
    res.status(500).send("Internal Server Error");
  }
}
export async function editCarOptions(req, res) {
  try {
    const { user, userId, isLogged } = req;
    const carId = req.params.carId;
    const car = await Car.findById(carId);
    if (!car) return res.render("404");
    // Check if the user is authorized to edit this car
    if (car.userId.toString() !== userId.toString()) return res.render("403");
    // Render the options page with car information

    res.render("editCar/enregistrer-options", {
      isLogged,
      car,
      user,
      userId,
    });
  } catch (error) {
    console.error("Error rendering new car page:", error);
    res.render("500");
  }
}
export async function editCarTarification(req, res) {
  try {
    const { user, userId, isLogged } = req;
    const carId = req.params.carId;
    const car = await Car.findById(carId);
    if (!car) return res.render("404");
    // Check if the user is authorized to edit this car

    if (car.userId.toString() !== userId.toString()) return res.render("403");
    // Render the tarification page with car information
    res.render("editCar/enregistrer-tarification", {
      car,
      isLogged,
      user,
      userId,
    });
  } catch (error) {
    console.error("Error rendering new car page:", error);
    res.status(500).send("Internal Server Error");
  }
}

export async function submitCarTarification(req, res) {
  try {
    const { user, userId, isLogged } = req;
    const { prix, remiseSemaine, remiseMois, carId } = req.body;
    const car = await Car.findById(carId);
    if (!car) return res.render("404");
    // Check if the user is authorized to edit this car
    if (car.userId.toString() !== userId.toString()) return res.render("403");
    // Render the tarification page with car information

    // Update car pricing information
    if (prix && car.prix !== prix) car.prix = prix;
    if (remiseSemaine && car.remiseSemaine !== remiseSemaine)
      car.remiseSemaine = remiseSemaine;
    if (remiseMois && car.remiseMois !== remiseMois)
      car.remiseMois = remiseMois;

    await car.save();
    res.status(200).send();
  } catch (error) {
    console.error("Error rendering new car page:", error);
    res.status(500).send("Internal Server Error");
  }
}
export async function submitCarOptions(req, res) {
  try {
    const { user, userId, isLogged } = req;
    const { Caracteristiques, carId } = req.body;
    console.log(Caracteristiques);
    console.log(carId);
    const car = await Car.findById(carId);
    if (!car) return res.render("404");
    // Check if the user is authorized to edit this car
    if (car.userId.toString() !== userId.toString()) return res.render("403");
    // Render the options page with car information
    // Update car options
    car.Caracteristiques = Caracteristiques;
    await car.save();
    res.status(200).send();
  } catch (error) {
    console.error("Error rendering new car page:", error);
    res.render("500");
  }
}
// ? finished

export async function submitCarConfirmation(req, res) {
  try {
    res.render("editCar/enregistrer-confirmation", {
      title: "Enregistrer une confirmation",
      user: req.user,
    });
  } catch (error) {
    console.error("Error rendering new car page:", error);
    res.status(500).send("Internal Server Error");
  }
}
