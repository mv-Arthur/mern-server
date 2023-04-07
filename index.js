import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import handleValidationErrors from "./utils/handleValidationErrors.js";

import { loginValidator, regValidator } from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import { UserController } from "./controllers/UserController.js";
import { TicketController } from "./controllers/TiketController.js";
mongoose
  .connect(
    "mongodb+srv://malakhov051:1234@cluster0.yrgly4r.mongodb.net/airport?retryWrites=true&w=majority"
  )
  .then(() => console.log("db connect"))
  .catch((err) => {
    console.log("error" + err.message);
  });
const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.post(
  "/auth/login",
  loginValidator,
  handleValidationErrors,
  UserController.login
);
app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});
app.post("/auth/reg", regValidator, handleValidationErrors, UserController.reg);
app.get("/auth/me", checkAuth, UserController.me);
app.post("/ticket", checkAuth, TicketController.create);
app.get("/ticket", TicketController.getAll); // добавить check Auth middleware
app.get("/ticket/:id", TicketController.getOne); // добавить check Auth middleware
app.delete("/ticket/:id", checkAuth, TicketController.remove);
app.patch("/ticket/:id", TicketController.update);

app.listen(2000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("server working");
});
