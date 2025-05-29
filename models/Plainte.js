import mongoose from "mongoose";

const plainteSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    imgPath: {
      type: String,
    },
    sujet: {
      type: String,
      required: true,
      maxlength: 255,
    },
    problemType: {
      type: String,
    },
    description: {
      type: String,
    },
    statut: {
      type: String,
      default: "En attente",
      maxlength: 20,
    },
  },
  { timestamps: true }
);

const Plainte = mongoose.model("Plainte", plainteSchema);

export default Plainte;
