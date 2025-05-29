import mongoose from "mongoose";

const temporaryDocumentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
      default: "",
    },
    carImg: {
      type: Array,
      unique: true,
      default: [],
    },
    permis: {
      type: String,
      unique: true,
      default: "",
    },
    cartGris: {
      type: String,
      unique: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const TemporaryDocument = mongoose.model(
  "TemporaryDocument",
  temporaryDocumentSchema
);

export default TemporaryDocument;
