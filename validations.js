import { body } from "express-validator";

export const regValidator = [
  body("email", "неверный формат почты").isEmail(),
  body("password", "длина пароля должна быть минимум 5 символов").isLength({
    min: 5,
  }),
  body("name", "длина имени должна быть не меньше двух символов").isLength({
    min: 2,
  }),
  body("surname", "длина фамилии должна быть не меньше двух символов").isLength(
    { min: 2 }
  ),
  body(
    "patronimyc",
    "длина отчества должна быть не меньше двух символов"
  ).isLength({ min: 2 }),
  body(
    "pasportData",
    "длина серии и номера паспорта должна быть равна 10"
  ).isLength({ min: 10 }),
];

export const loginValidator = [
  body("email", "неверный формат почты").isEmail(),
  body("password", "длина пароля должна быть минимум 5 символов").isLength({
    min: 5,
  }),
];
