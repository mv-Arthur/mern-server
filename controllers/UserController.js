import UserModel from "../models/User.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export class UserController {
  static async reg(req, res) {
    try {
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const doc = new UserModel({
        email: req.body.email,
        name: req.body.name,
        surname: req.body.surname,
        patronimyc: req.body.patronimyc,
        pasportData: req.body.pasportData,
        passwordHash: hash,
      });

      const user = await doc.save();

      const token = jwt.sign(
        {
          _id: user._id,
        },
        "secret123",
        {
          expiresIn: "30d",
        }
      );

      const { passwordHash, ...userData } = user._doc;

      console.log(user);
      res.json({ ...userData, token });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: "не удалось зарегестрироваться" });
    }
  }

  static async login(req, res) {
    try {
      const user = await UserModel.findOne({ email: req.body.email });

      if (!user) {
        return res.status(404).json({
          message: "пользователь не найден",
        });
      }

      const isValidPass = await bcrypt.compare(
        req.body.password,
        user._doc.passwordHash
      );

      if (!isValidPass) {
        return res.status(404).json({
          message: "неверный логин или пароль",
        });
      }

      const token = jwt.sign(
        {
          _id: user._id,
        },
        "secret123",
        {
          expiresIn: "30d",
        }
      );

      const { passwordHash, ...userData } = user._doc;

      res.json({ ...userData, token });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: "не удалось авторизоваться" });
    }
  }

  static async me(req, res) {
    try {
      const user = await UserModel.findById(req.userId);
      if (!user) {
        return res.status(404).json({
          message: "пользователь не найден",
        });
      }

      const { passwordHash, ...userData } = user._doc;

      console.log(user);
      res.json(userData);
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: "не удалось найти пользователя" });
    }
  }
}
