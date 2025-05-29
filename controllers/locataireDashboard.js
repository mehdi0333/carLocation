import { Car, Rating } from "../models/models.js";
import Reservation from "../models/reservation.js";

function getDateData(date) {
  const year = date.substring(0, 4);
  const month = date.substring(5, 7);
  const day = date.substring(8, 10);

  return { year, month, day };
}

export async function getoLocataireDashboard(req, res) {
  try {
    const { user, userId } = req;
    const myReservationInfo = await Reservation.find({ userId });
    const myReservation = [];
    for (let reservation of myReservationInfo) {
      const car = await Car.findById(reservation.carId);
      const isRated = await Rating.find({ userId, carId: car._id });
      reservation.isRated = Boolean(isRated.length);
      reservation.car = car;
      myReservation.push(reservation);
    }

    const reservationEnCour = myReservation.filter((ele) => {
      if (ele.status !== "confirmée") return false;
      const now = new Date();

      const start = getDateData(ele.startDate);
      const end = getDateData(ele.endDate);
      console.log(start, end);
      if (+start.year > now.getFullYear()) return false;
      if (+start.year === now.getFullYear()) {
        if (+start.month > now.getMonth() + 1) return false;
        if (+start.month === now.getMonth() + 1) {
          if (+start.day > now.getDate()) return false;
        }
      }
      // * with end date
      if (+end.year < now.getFullYear()) return false;
      if (+end.year === now.getFullYear()) {
        if (+end.month < now.getMonth() + 1) return false;
        if (+end.month === now.getMonth() + 1) {
          if (+end.day < now.getDate()) return false;
        }
      }
      return true;
    });

    res.render("dashboard-locataire", {
      user,
      myReservation,
      reservationEnCour,
      model: null,
    });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}
export async function getoLocataireDashboardModel(req, res) {
  try {
    const { user, userId } = req;
    const myReservationInfo = await Reservation.find({ userId });
    const myReservation = [];
    for (let reservation of myReservationInfo) {
      const car = await Car.findById(reservation.carId);
      reservation.car = car;
      myReservation.push(reservation);
    }

    const reservationEnCour = myReservation.filter((ele) => {
      const now = new Date();
      const start = getDateData(ele.startDate);
      const end = getDateData(ele.endDate);
      if (start.year > now.getFullYear()) return false;
      if (+start.year === now.getFullYear()) {
        if (start.month > now.getMonth() + 1) return false;
        if (+start.month === now.getMonth() + 1) {
          if (+start.day > now.getDate()) return false;
        }
      }
      // * with end date
      if (end.year < now.getFullYear()) return false;
      if (+end.year === now.getFullYear()) {
        if (end.month < now.getMonth() + 1) return false;
        if (+end.month === now.getMonth() + 1) {
          if (+end.day < now.getDate()) return false;
        }
      }
      return true;
    });

    // get model
    const { carId } = req.params;
    let model = null;
    for (let reserv of myReservation) {
      if (reserv._id.toString() === carId) {
        model = reserv;
        break;
      }
    }
    // const car
    res.render("dashboard-locataire", {
      user,
      myReservation,
      reservationEnCour,
      model: model,
    });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}
