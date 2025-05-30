import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    // Basic information
    marque: {
      type: String,
    },
    modele: {
      type: String,
    },
    Description: {
      type: String,
    },
    Carburant: {
      type: String,
      default: "Essence",
    },
    type: {
      type: String,
      default: "citadine",
    },
    transmission: {
      type: String,
      default: "manuelle",
    },
    cardGris: {
      type: String,
    },
    permis: {
      type: String,
    },
    Caracteristiques: {
      type: [String],
      default: [],
    },
    location: {
      type: String,
      default: "",
    },
    kilometrage: {
      type: Number,
      default: 0,
    },
    cartGris: {
      type: String,
      defulat: "",
    },
    userId: {
      type: String,
    },
    prix: {
      type: Number,
    },
    Kilometrage: {
      type: Number,
    },
    Places: {
      type: Number,
      defualt: 5,
    },
    Annee: {
      type: Number,
      default: 2010,
    },
    remiseSemaine: {
      type: Number,
      default: 0,
    },
    remiseMois: {
      type: Number,
      default: 0,
    },

    // Images
    carImg: {
      type: Array,
      default: [],
    },

    // Availability and status
    est_disponible: {
      type: Boolean,
      default: true,
    },
    est_enable: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ["en_attente", "publiee", "refusée", "archivée"],
      default: "en_attente",
    },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);

export default Car;
