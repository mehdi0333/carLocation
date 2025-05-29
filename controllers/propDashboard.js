import Car from "../models/Car.js";
import Reservation from "../models/reservation.js";
import User from "../models/User.js";

export async function getoMainPropDashboard(req, res) {
  const { user, userId } = req;
  try {
    let myCars = await Car.find({ userId });

    // ! make reservation logic return max 4
    // * get payment moyenne
    let moiReservations = 0;
    const reservations = [];
    for (let car of myCars) {
      const reserv = await Reservation.find({ carId: car._id });
      moiReservations += reserv.length;
      for (let ele of reserv) {
        const reservationUser = await User.findById(ele.userId);
        ele.car = car;
        ele.user = reservationUser;
        reservations.push(ele);
      }
    }
    myCars = myCars.map((ele) => {
      const reservation = 10;
      const total = 0;
      ele.reservation = reservation;
      ele.total = total;
      return ele;
    });
    const statistique = {
      moisPayment: 0,
      moisPaymentpercent: {
        isHigher: true,
        number: 0,
      },
      moisReservation: moiReservations,
      moisReservationpercent: {
        isHigher: true,
        number: 0,
      },
      newLocataire: 0,
      newLocatairepercent: {
        isHigher: true,
        number: 0,
      },
      tauxOccupation: 0,
      tauxOccupationpercent: {
        isHigher: true,
        number: 0,
      },
    };

    res.render("prop dashboard/dashboard", {
      user,
      myCars,
      reservations,
      statistique,
    });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}

export async function gotoPropDisponibility(req, res) {
  const { user } = req;
  try {
    res.render("prop dashboard/disponibilite", {
      user,
    });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}

export async function getoPropReservations(req, res) {
  const { user, userId } = req;
  const { category } = req.query;
  try {
    const myCars = await Car.find({ userId });
    const myReservation = [];
    const reservationFutures = [];
    const reservationPasses = [];
    const reservationAnnulation = [];
    const reservationEnCours = [];
    const today = new Date();
    for (let ele of myCars) {
      const reservations = await Reservation.find({ carId: ele._id });
      for (let reservationInfo of reservations) {
        const reservationUser = await User.findById(reservationInfo.userId);
        reservationInfo.user = reservationUser;
        reservationInfo.car = ele;
        myReservation.push(reservationInfo);
        if (reservationInfo.status === "annulée") {
          reservationAnnulation.push(reservationInfo);
        } else if (reservationInfo.status === "confirmée") {
          reservationEnCours.push(reservationInfo);
        } else if (
          new Date(reservationInfo.startDate) > today &&
          reservationInfo.status === "confirmée"
        ) {
          reservationFutures.push(reservationInfo);
        } else if (
          new Date(reservationInfo.endDate) < today &&
          reservationInfo.status === "confirmée"
        ) {
          reservationPasses.push(reservationInfo);
        }
      }
    }
    res.render("prop dashboard/reservations", {
      user,
      reservations: myReservation,
      reservationFutures,
      reservationPasses,
      reservationAnnulation,
      reservationEnCours,
      category: category || "all",
    });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}

export async function getoPropRevenu(req, res) {
  const { user, userId } = req;
  try {
    const statistique = {
      totalAnnuel: 0,
      annuelMoyenne: 0,
      annuelMoyennePercent: {
        isHigher: true,
        number: 0,
      },
      annulation: 0,
      annulationPercent: {
        isHigher: true,
        number: 0,
      },
      reservationTotalPercent: {
        isHigher: true,
        number: 0,
      },
    };
    let myCars = await Car.find({ userId });
    myCars = myCars.map((car) => {
      const reservationTotalPrix = 0;
      const reservationPercent = 100;
      car.reservationTotalPrix = reservationTotalPrix;
      car.reservationPercent = reservationPercent;
      return car;
    });
    res.render("prop dashboard/revenus", {
      user,
      myCars,
      statistique,
    });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}

export async function getoPropChat(req, res) {
  const { user, isLogged } = req;
  try {
    res.render("prop dashboard/chat", {
      user,
      isLogged,
    });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}

export async function getoPropMyCars(req, res) {
  const { user, userId } = req;
  try {
    let myCars = await Car.find({ userId, est_enable: true });
    myCars = myCars.map((car) => {
      const reservations = 0;
      const total = 0;
      car.reservations = reservations;
      car.total = total;
      return car;
    });
    res.render("prop dashboard/mes-vehicules", {
      user,
      myCars,
    });
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}
