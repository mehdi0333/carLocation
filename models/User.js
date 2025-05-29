// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    prenom: {
      type: String,
      required: true,
    },
    nom: {
      type: String,
      required: true,
    },
    userImg: {
      type: String,
      default: "",
    },
    device: {
      type: String,
      default: "dzd",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mot_de_passe: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
    },
    est_proprietaire: {
      type: Boolean,
      default: false,
    },
    langue: {
      type: String,
      default: "france",
    },
    est_locataire: {
      type: Boolean,
      default: true,
    },
    statut_compte: {
      type: String,
      enum: ["en_attente", "activé", "désactivé"],
      default: "en_attente",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
