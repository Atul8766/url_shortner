import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const registerService = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return { status: false, error: errors.array() };
  }

  const { name, email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return { status: false, error: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return { status: true, user: newUser };
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

