import Car from "../models/Car.js";
import User from "../models/User.js";
import { hashPassword } from "../utils/bcryptControll.js";
import { deleteFile } from "../utils/files.js";

export const changeProfileImg = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(204).send();
    }

    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) return res.status(400).json();

    if (user.userImg) deleteFile("\\public\\" + user.userImg);
    let path = req.file.path;
    path = path.replace("public\\", "");
    user.userImg = path;
    await user.save();

    res.status(200).json();
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
};

export const goToProfile = async (req, res) => {
  try {
    let { userId, user } = req;
    const cars = await Car.find({ userId });
    if (!user) return res.render("404");
    user.cars = cars;

    res.render("profil", { user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error accessing profile",
      error: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { nom, prenom, email, telephone, device, langue, password } =
      req.body;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json();

    if (nom && nom !== user.nom) user.nom = nom;
    if (prenom && prenom !== user.prenom) user.prenom = prenom;
    if (email && email !== user.email) user.email = email;
    if (telephone && telephone !== user.telephone) user.telephone = telephone;
    if (device && device !== user.device) user.device = device;
    if (langue && langue !== user.langue) user.langue = langue;
    if (password && password.trim() !== "") {
      const p = await hashPassword(password);
      user.mot_de_passe = p;
    }
    await user.save();
    res.status(200).json();
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
};
