import { check } from "express-validator";

export const registerValidation = [
  check("name", "Name is required and must be at least 2 characters")
    .trim()
    .isLength({ min: 2 }),

  check("email", "Please provide a valid email").isEmail(),
  check("password")
    .trim()
    .custom((value) => {
      if (!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)) {
        throw new Error(
          "Password must be at least 8 characters and contain one uppercase, one lowercase, and one number"
        );
      }
      if (value.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }
      return true;
    }),
];

export const urlValidation = [
  check("originalUrl", "Please provide a valid URL").isURL(),
];
