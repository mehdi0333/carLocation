import { Plainte, Reservation, User, Car, Admin } from "../models/models.js";
export async function gotoAdminPage(req, res) {
  try {
    const { user } = req;
    // * get users length
    let users = await User.find();
    users = users.length;
    // * get annonce length
    let cars = await Car.find({ status: "publiee" });
    cars = cars.length;
    // ! get litige length
    const litiges = 0;
    // * get plaints length
    const plaints = await Plainte.find();
    // * get notifications
    let annonce = await Car.find({ status: "en_attente" });
    for (let ele of annonce) {
      const user = await User.findById(ele.userId);
      ele.user = user;
    }
    // * get plaints en cours
    const plaintsEnCours = await Plainte.find({
      statut: "En attente",
    });
    for (let ele of plaintsEnCours) {
      const user = await User.findById(ele.userId);
      ele.user = user;
    }
    // * get new users
    const newUsers = await User.find({
      statut_compte: "en_attente",
    });
    // * get notifications
    const notifications = {
      annonce: annonce.length,
      plaints: plaintsEnCours.length,
      users: newUsers.length,
    };
    // * render the admin dashboard
    res.render("admin/dashboard", {
      user,
      users,
      cars,
      litiges,
      plaints,
      notifications,
      annonce,
      newUsers,
      plaintsEnCours,
    });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}
export async function gotoAdminUsersPage(req, res) {
  try {
    const { user, userId } = req;
    // * get users length
    let users = await User.find();
    res.render("admin/users", { user, users });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}
export async function gotoModel(req, res) {
  try {
    const { user, userId } = req;
    const { carId } = req.params;
    if (!carId) return res.redirect("/listings");
    // * get cars data
    let cars = await Car.find();
    // * get car owner'information
    let carsFormat = [];
    let model = null;
    for (const car of cars) {
      const user = await User.findById(car.userId);
      if (!user) continue;
      car.ownerAccount = user;
      carsFormat.push(car);
      // * select the special model
      if (car._id.toString() === carId) model = car;
    }
    if (model === null) return res.render("404");
    res.render("admin/listings", { user, cars: carsFormat, model });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}
export async function gotoAnnonce(req, res) {
  try {
    const { user, userId } = req;

    // * get cars data
    let cars = await Car.find();
    // * get car owner'information
    let carsFormat = [];
    for (const car of cars) {
      const user = await User.findById(car.userId);
      if (!user) continue;
      car.ownerAccount = user;
      carsFormat.push(car);
    }
    res.render("admin/listings", { user, cars: carsFormat, model: null });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}
export async function goToAdminDisputes(req, res) {
  try {
    const { user } = req;

    res.render("admin/disputes", { user });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}
export async function goToAdminReports(req, res) {
  try {
    const { user } = req;

    res.render("admin/reports", { user });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}
export async function goToAdminPlaints(req, res) {
  try {
    const { user } = req;
    const plaintsInformations = await Plainte.find();
    const plaints = [];
    for (let plaint of plaintsInformations) {
      const user = await User.findById(plaint.userId);
      plaint.userInformation = user;
      plaints.push(plaint);
    }
    res.render("admin/complaints", { user, plaints, model: null });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}
export async function goToAdminPlaintsModel(req, res) {
  try {
    const { user } = req;
    const { id } = req.params;
    const plaintsInformations = await Plainte.find();
    const plaints = [];
    let model = null;
    for (let plaint of plaintsInformations) {
      const user = await User.findById(plaint.userId);
      plaint.userInformation = user;
      if (plaint._id.toString() === id) model = plaint;
      plaints.push(plaint);
    }
    res.render("admin/complaints", { user, plaints, model });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}
export async function reservationDetail(req, res) {
  try {
    const { reservationId } = req.params;
    const { user, userId } = req;
    const reservation = await Reservation.findById(reservationId);

    if (!reservation) return res.render("404");
    const reservationUser = await User.findById(reservation.userId);
    //  * add duration
    let startDate = {
      year: +reservation.startDate.substring(0, 4),
      month: +reservation.startDate.substring(5, 7),
      day: +reservation.startDate.substring(8, 10),
    };
    let endDate = {
      year: +reservation.endDate.substring(0, 4),
      month: +reservation.endDate.substring(5, 7),
      day: +reservation.endDate.substring(8, 10),
    };
    startDate = new Date(
      startDate.year,
      startDate.month - 1,
      startDate.day + 1
    );
    endDate = new Date(endDate.year, endDate.month - 1, endDate.day + 1);
    let duration = endDate.getTime() - startDate.getTime();
    duration /= 1000;
    duration /= 60;
    duration /= 60;
    duration /= 24;
    reservation.duration = duration;
    if (!reservationUser) res.render("400");
    const car = await Car.findById(reservation.carId);
    if (!car) return res.render("400");
    reservation.user = reservationUser;
    reservation.car = car;
    res.render("reservation-details", { user, reservation });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}
// apis and middle wars
export default async function accessAdmin(req, res, next) {
  try {
    const { userId, user } = req;
    const isAdmin = await Admin.findOne({ user_id: userId });
    if (!isAdmin) return res.render("503");
    next();
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}

export async function accountStatus(req, res) {
  try {
    const { accountId } = req.body;
    const user = await User.findById(accountId);
    if (!user) return res.status(404).send();
    const newStatus = user.statut_compte === "activé" ? "en_attente" : "activé";
    await User.findByIdAndUpdate(accountId, { statut_compte: newStatus });
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
}
export async function carStatus(req, res) {
  try {
    const { type, carId } = req.body;
    console.log(type);
    console.log(carId);
    if (!type || !carId) return res.status(400).send();
    const car = await Car.findById(carId);
    if (!car) return res.status(404).send();
    const status =
      type === "rejected"
        ? "refusée"
        : type === "approved"
        ? "publiee"
        : "en_attente";
    await Car.findByIdAndUpdate(carId, { status });
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
}
