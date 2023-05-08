import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export class AuthController {
  public static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
      }

      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (!passwordMatch) {
        res.status(401).json({ error: "Invalid password" });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({
        success: true,
        message: "Authentication successful",
        token,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  public static async register(req: Request, res: Response): Promise<void> {
    try {
      const { firstName, lastName, email, password } = req.body;

      // Verificar se todos os campos de registro foram fornecidos
      if (!firstName || !lastName || !email || !password) {
        res.status(400).json({ error: "All fields are required" });
        return;
      }

      // Verificar se o email já está em uso
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ error: "Email already in use" });
        return;
      }

      const hashedPassword = bcrypt.hashSync(password, 12);

      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(201).json({ user, token });
    } catch (error) {
      res.status(400).json({ error: "message" });
    }
  }

  public static async forgotPassword(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { email } = req.body;
      await AuthService.forgotPassword(email);

      res.status(200).json({ message: "Password reset email sent" });
    } catch (error) {
      res.status(400).json({ error: "message" });
    }
  }

  public static async resetPassword(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { resetToken, password } = req.body;

      await AuthService.resetPassword(resetToken, password);

      res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
      res.status(400).json({ error: "message" });
    }
  }
}
