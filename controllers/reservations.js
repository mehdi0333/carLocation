import { Car, Reservation } from "../models/models.js";

function verifyDate(date) {
  if (!date) return null;
  if (!date.day || !date.year || !date.month) return null;
  return true;
}
function setDateFormat(date) {
  const { year, day, month } = date;
  return `${year}-${month}-${day}`;
}
function isDateCorrect(date) {
  const now = new Date();
  const { year, month, day } = date;
  if (+year > now.getFullYear()) return true;
  if (+year == now.getFullYear()) {
    if (+month > now.getMonth() + 1) return true;
    if (+month == now.getMonth() + 1) {
      if (+day >= now.getDate()) return true;
      else return false;
    } else return false;
  } else return false;
}
async function createReservation(req, res) {
  try {
    // * get data
    const userId = req.userId;
    let { startDate, endDate, carId } = req.body;
    // * verify date format
    if (!verifyDate(startDate) || !verifyDate(endDate))
      return res.status(400).send();
    // * Find the car
    const car = await Car.findById(carId);
    if (!car) return res.status(404).send("car not found");
    if (car.status !== "publiee") res.status(403).send("car not published");
    if (car.userId === userId)
      res.status(403).send("you can't reserve your own car");
    // * check for dates if is logical
    if (!isDateCorrect(startDate) || !isDateCorrect(endDate))
      return res.status(403).send("invalid date");
    if (startDate.year > endDate.year)
      return res.status(403).send("invalid date");
    else if (startDate.year === endDate.year) {
      if (startDate.month > endDate.month)
        return res.status(403).send("invalid date");
      else if (startDate.month === endDate.month) {
        if (startDate.day > endDate.day)
          return res.status(403).send("invalid date");
      }
    }
    // * check if the car is already reserved in this period
    const reservations = await Reservation.find({
      carId,
      status: "confirmée",
      $or: [
        {
          startDate: { $lte: setDateFormat(endDate) },
          endDate: { $gte: setDateFormat(startDate) },
        },
      ],
    });
    if (reservations.length > 0) {
      console.log("reservations non");
      return res.status(403).send("car is already reserved");
    }
    // * calculating how day set
    const start = new Date();
    start.setMonth(+startDate.month - 1);
    start.setFullYear(+startDate.year);
    start.setDate(+startDate.day);
    const end = new Date();
    end.setMonth(+endDate.month - 1);
    end.setFullYear(+endDate.year);
    end.setDate(+endDate.day);

    let deff = (+end.getTime() - +start.getTime()) / 1000;
    deff /= 60;
    deff /= 60;
    deff /= 24;
    deff += 1;
    // * get exactly how many day need the car
    const day = Math.floor(deff);
    deff /= 7;
    // * check if has a promo
    const promo = deff < 1 ? "none" : deff / 4 < 1 ? "semaine" : "mois";
    // * get final price
    const prix = car.prix * day;

    const finalPrix =
      promo === "none"
        ? prix
        : promo === "semaine"
        ? prix - (prix * car.remiseSemaine) / 100
        : prix - (prix * car.remiseMois) / 100;
    // Create new reservation
    const newReservation = new Reservation({
      carId,
      userId,
      startDate: setDateFormat(startDate),
      endDate: setDateFormat(endDate),
      prix: finalPrix,
    });

    await newReservation.save();

    res.status(201).json();
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).send();
  }
}
export async function reservationVerification(req, res) {
  try {
    const { carId, dateStart, dateEnd } = req.body;

    // Check if the car has any confirmed reservations in this period
    console.log(dateStart, dateEnd);
    const reservations = await Reservation.find({
      carId,
      status: "confirmée",
      $or: [
        {
          startDate: { $lte: dateEnd },
          endDate: { $gte: dateStart },
        },
      ],
    });

    // If there are any reservations, the car is not available
    if (reservations.length > 0) {
      return res.status(200).json({ isValid: false });
    }

    // If no reservations found, the car is available
    return res.status(200).json({ isValid: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "internal server error" });
  }
}

export async function reservationResponse(req, res) {
  try {
    const { user, userId } = req;
    const { status, reservationId } = req.body;
    if (!status || !reservationId) return res.status(422).send();
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) return res.status(404).send();

    const car = await Car.findById(reservation.carId);
    if (!car) return res.status(404).send();

    if (car.userId === userId) {
      reservation.status = status;
      await reservation.save();
      return res.status(200).send();
    }
    res.status(403).send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
}

export { createReservation };
