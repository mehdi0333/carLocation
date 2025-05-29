import { handleCarInformation } from "../middlewars/car.js";
import Car from "../models/Car.js";

export async function gotoRecherchePage(req, res) {
  try {
    const { user, isLogged, userId } = req;
    let cars = await Car.find({
      userId: { $ne: userId },
      status: "publiee",
      est_disponible: true,
    });
    cars = cars.map((e) => handleCarInformation(e));
    res.render("recherche", { user, cars, isLogged });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}
export async function gotoRecherchePagePost(req, res) {
  try {
    const { user, isLogged, userId } = req;
    console.log(req.body);
    let cars = await Car.find({
      userId: { $ne: userId },
      status: "publiee",
      est_disponible: true,
    });
    cars = cars.map((e) => handleCarInformation(e));
    res.render("recherche", { user, cars, isLogged });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}
