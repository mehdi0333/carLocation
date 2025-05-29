import { generateToken } from "../middlewars/token.js";
import Admin from "../models/Admin.js";
import User from "../models/User.js";
import { comparePassword, hashPassword } from "../utils/bcryptControll.js";

const registerData = {
  telephone: "",
  prenom: "",
  email: "",
  nom: "",
  confirmPassword: "",
  password: "",
};
const connexionData = {
  email: "",
  password: "",
};
// get request for login and register
export async function login(req, res) {
  res.render("connexion", { ...connexionData, values: connexionData });
}

export async function register(req, res) {
  res.render("inscription", { ...registerData, values: registerData });
}

// post request for login and register
export async function postLogin(req, res) {
  let { email, password, rememberMe } = req.body;
  rememberMe = rememberMe ? true : false;
  const connexionDataCopy = { ...connexionData };
  try {
    if (!email) {
      connexionDataCopy.email = "email is required";
      return res.render("connexion", {
        ...connexionDataCopy,
        values: req.body,
      });
    }
    if (!password) {
      connexionDataCopy.password = "password is required";
      return res.render("connexion", {
        ...connexionDataCopy,
        values: req.body,
      });
    }

    // check if email already exists
    const user = await User.findOne({ email });
    if (!user) {
      connexionDataCopy.password = "email or password inccorect";
      connexionDataCopy.email = "email or password inccorect";
      return res.render("connexion", {
        ...connexionDataCopy,
        values: req.body,
      });
    }
    // check if password is correct
    const isPasswordCorrect = await comparePassword(
      password,
      user.mot_de_passe
    );
    if (!isPasswordCorrect) {
      connexionDataCopy.password = "email or password inccorect";
      connexionDataCopy.email = "email or password inccorect";
      return res.render("connexion", {
        ...connexionDataCopy,
        values: req.body,
      });
    }
    generateToken(user._id, res);
    const isAdmin = await Admin.findOne({ user_id: user._id });
    if (!isAdmin) return res.redirect("/");

    res.redirect("/admin");
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}

export async function postRegister(req, res) {
  let { confirmPassword, email, password, telephone, nom, prenom } = req.body;
  const registerDataCopy = { ...registerData };
  try {
    if (!nom) {
      registerDataCopy.nom = "nom is required";
      return res.render("inscription", {
        ...registerDataCopy,
        values: req.body,
      });
    }
    if (!prenom) {
      registerDataCopy.prenom = "prenom is required";
      return res.render("inscription", {
        ...registerDataCopy,
        values: req.body,
      });
    }
    if (!telephone) {
      registerDataCopy.telephone = "telephone is required";
      return res.render("inscription", {
        ...registerDataCopy,
        values: req.body,
      });
    }
    if (!email) {
      registerDataCopy.email = "email is required";
      return res.render("inscription", {
        ...registerDataCopy,
        values: req.body,
      });
    }
    if (!password) {
      registerDataCopy.password = "password is required";
      return res.render("inscription", {
        ...registerDataCopy,
        values: req.body,
      });
    }
    if (!confirmPassword) {
      registerDataCopy.confirmPassword = "confirm password is required";
      return res.render("inscription", {
        ...registerDataCopy,
        values: req.body,
      });
    }

    if (password !== confirmPassword) {
      registerDataCopy.confirmPassword = "your confirm password are incorrect";
      return res.render("inscription", {
        ...registerDataCopy,
        values: req.body,
      });
    }
    // check if email already exists
    const user = await User.findOne({ email });
    if (user) {
      registerDataCopy.email = "this email is token";
      return res.render("inscription", {
        ...registerDataCopy,
        values: req.body,
      });
    }
    // hash password
    const hashedPassword = await hashPassword(password);

    // create new user
    const newUser = await new User({
      prenom,
      nom,
      email,
      mot_de_passe: hashedPassword,
      telephone,
    }).save();
    generateToken(newUser._id, res);

    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}
