import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      default: "",
    },
  },
  { timestamps : true }
);

const Admin = mongoose.model("admin", schema);

export default Admin;
