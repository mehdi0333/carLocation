import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    carId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["en_attente", "confirmée", "refusée", "annulée", "terminée"],
      default: "en_attente",
    },
    prix: {
      type: Number,
    },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields automatically
  }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
