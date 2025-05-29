import { handleCarInformation } from "../middlewars/car.js";
import Car from "../models/Car.js";

export default async function landingPage(req, res) {
  try {
    // * get from req
    const { user, userId, isLogged } = req;
    // * get some cars
    let cars = [];
    if (userId)
      cars = await Car.find({
        est_disponible: true,
        status: "publiee",
        userId: { $ne: userId },
      });
    else
      cars = await Car.find({
        est_disponible: true,
        status: "publiee",
      });
    cars = cars.slice(0, 4);
    cars = cars.map((car) => handleCarInformation(car));
    if (!user) {
      res.clearCookie("jwt");
      return res.render("index", { cars, isLogged: false });
    }
    return res.render("index", { user, cars, isLogged: true });
  } catch (error) {
    console.log(error);
    res.clearCookie("jwt");
    return res.render("500");
  }
}
export async function upcooming(req, res) {
  res.render("503");
}
export async function logout(req, res) {
  res.clearCookie("jwt");
  res.redirect("/");
}
