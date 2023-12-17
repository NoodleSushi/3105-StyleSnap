import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { createUser, getUser } from "./db";
import { hashPassword } from "./utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface User {
  username: string;
  email: string;
  password: string;
}

export const createUserAccount: RequestHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Invalid user registration data.",
      errors: errors.array().map((error) => error.msg),
    });
  }

  try {
    const user: User = req.body;
    const hashedPassword = await hashPassword(user.password);
    await createUser(user.username, user.email, hashedPassword);
    return res.status(201).json({
      message: "User registration successful.",
      errors: [],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error.",
      errors: [],
    });
  }
}

export const loginUser: RequestHandler = async (req, res) => {
  const errors = validationResult(req);

  const invalidCredentialsResponse = {
    message: "Invalid username, email, and/or password."
  };

  if (!errors.isEmpty()) {
    return res.status(401).json(invalidCredentialsResponse);
  }

  try {
    const user: User = req.body;
    const userRow = await getUser(user.username, user.email);
    if (!userRow) {
      return res.status(401).json(invalidCredentialsResponse);
    }
    
    const isPasswordValid = await bcrypt.compare(user.password, userRow.password);
    if (!isPasswordValid) {
      return res.status(401).json(invalidCredentialsResponse);
    }

    const accessToken = jwt.sign(
      {
        user_id: userRow.user_id,
        username: userRow.username,
        email: userRow.email,
      },
      process.env.ACCESS_TOKEN_SCERET!,
    );

    return res.status(200).json({
      message: "User login successful.",
      accessToken,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "User login failed."
    });
  }
}
