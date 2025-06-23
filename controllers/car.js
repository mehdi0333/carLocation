import { handleCarInformation } from "../middlewars/car.js";
import { Car, TemporaryDocuments, User } from "../models/models.js";
import { deleteFile } from "../utils/files.js";

// get
export async function gotoNewCarPage(req, res) {
  // const {user , isLogged} = req
  res.render("newCar/enregister-vehicule", {
    user: req.user,
    isLogged: req.isLogged,
  });
}
export async function gotoOption(req, res) {
  // const {user , isLogged} = req
  res.render("newCar/enregister-options", {
    user: req.user,
    isLogged: req.isLogged,
  });
}
export async function gotoTraficationCarPage(req, res) {
  // const {user , isLogged} = req
  res.render("newCar/enregistrer-tarification", {
    user: req.user,
    isLogged: req.isLogged,
  });
}
export async function gotoPhotoCarPage(req, res) {
  res.render("newCar/enregistrer-photo", {
    user: req.user,
    isLogged: req.isLogged,
  });
}
export async function gotoDocumentCarPage(req, res) {
  res.render("newCar/enregistrer-document", {
    user: req.user,
    isLogged: req.isLogged,
  });
}
export async function gotoConfirmationCarPage(req, res) {
  res.render("newCar/enregistrer-confirmation", {
    user: req.user,
    isLogged: req.isLogged,
  });
}

export async function addCarImg(req, res) {
  let carImg = req.files;
  const { userId } = req;
  if (!carImg.length) return res.status(400).send();
  carImg = carImg.map((file) => file.path.replace("public", ""));
  try {
    const isExist = await TemporaryDocuments.findOne({ userId });
    if (!isExist) {
      await new TemporaryDocuments({
        userId,
        carImg,
      }).save();
      return res.status(201).send();
    }
    // deleting the current files
    if (isExist.carImg.length) {
      isExist.carImg.forEach((img) => {
        console.log("deleting file", img);
        deleteFile("/public/" + img);
      });
    }

    await TemporaryDocuments.findByIdAndUpdate(isExist._id, {
      carImg,
    });
    return res.status(201).send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
}

export async function addDocuments(req, res) {
  let [cartGris, permis] = req.files;
  const { userId } = req;
  if (!cartGris || !permis) return res.status(400).send();
  cartGris = cartGris.path.replace("public", "");
  permis = permis.path.replace("public", "");

  // return res.status(201).send();

  try {
    const isExist = await TemporaryDocuments.findOne({ userId });
    if (!isExist) {
      await new TemporaryDocuments({
        userId,
        cartGris,
        permis,
      }).save();
      return res.status(201).send();
    }
    // deleting the current files
    if (isExist.permis) deleteFile("public\\" + isExist.permis);
    if (isExist.cartGris) deleteFile("public\\" + isExist.cartGris);

    await TemporaryDocuments.findByIdAndUpdate(isExist._id, {
      permis,
      cartGris,
    });
    return res.status(201).send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
}

export async function createNewCard(req, res) {
  const {
    marque,
    modele,
    prix,
    kilometrage,
    description: Description,
    location,
    annee,
    remiseSemaine = 0,
    remiseMois = 0,
    Caracteristiques,
    services,
    transmission,
    type,
    Carburant,
    Places = 5,
  } = req.body;
  const { userId } = req;
  console.log(req.body)
  if (
    !marque ||
    !modele ||
    prix < 0 ||
    Caracteristiques.length === 0 ||
    kilometrage < 0 ||
    !location ||
    !Description ||
    +annee < 1950 ||
    !transmission ||
    !type ||
    !Carburant ||
    Places < 0
  )
    return res
      .status(422)
      .send({ message: "one of priciple information are missing " });
  try {
    const files = await TemporaryDocuments.findOne({ userId });
    if (!files)
      return res.status(400).send({ message: "you need to upload file " });
    if (!files.cartGris || !files.permis)
      return res
        .status(400)
        .send({ message: "you need to upload cardgris and permis " });
    if (!files.carImg)
      return res.status(400).send({ message: "you need to upload car img " });

    await new Car({
      marque,
      modele,
      services,
      prix,
      kilometrage,
      location,
      Description,
      carImg: files.carImg,
      cartGris: files.cartGris,
      permis: files.permis,
      remiseSemaine,
      remiseMois,
      userId,
      Caracteristiques,
      Carburant,
      transmission,
      type,
      Places,
      Annee: annee,
    }).save();

    await TemporaryDocuments.findByIdAndDelete(files._id);
    await User.findByIdAndUpdate(userId, { est_proprietaire: true });
    res.status(201).send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
}

export async function annoncePage(req, res) {
  const { isLogged, user, userId } = req;
  const { carId } = req.params;

  try {
    const car = await Car.findById(carId);
    if (!car) return res.render("404");
    let carOwner = await User.findById(car.userId);
    if (carOwner) {
      carOwner = {
        name: `${carOwner.nom} ${carOwner.prenom}`,
        img: carOwner.img,
        year: carOwner.createdAt.getFullYear(),
      };
    }
    res.render("annonce.ejs", {
      isLogged,
      user,
      carOwner,
      car: handleCarInformation(car),
    });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}
export async function deleteCar(req, res) {
  try {
    const { user, userId } = req;
    const { carId } = req.params;
    const car = await Car.findById(carId);
    if (!car) return res.render("404");
    if (car.userId !== userId.toString()) return res.render("400");
    await Car.findByIdAndUpdate(carId, { est_enable: false });
    res.redirect("/mes-vehicules");
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}
