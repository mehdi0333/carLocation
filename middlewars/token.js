import jwt from "jsonwebtoken";
import { User } from "../models/models.js";
export const generateToken = (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
  } catch (error) {
    res.status(500).json({ message: "Error generating token" });
    throw new Error("Error generating token");
  }
};

export async function verifyToken(req, res, next) {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      req.user = null;
      req.isLogged = false;
      return next();
    }
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = userId;
    const user = await User.findById(userId);
    if (!user) {
      req.user = null;
      req.isLogged = false;
      return next();
    }
    user.id = user._id;
    delete user._id;
    delete user.createdAt;
    delete user.mot_de_passe;
    req.user = user;
    req.isLogged = true;
    next();
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}
export async function accessToken(req, res, next) {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.render("401");
    }
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.render("401");
    }
    user.id = user._id;
    delete user._id;
    delete user.createdAt;
    delete user.mot_de_passe;
    req.user = user;
    req.isLogged = true;
    next();
  } catch (error) {
    console.log(error);
    res.render("500");
  }
}
