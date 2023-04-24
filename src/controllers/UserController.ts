import { Request, Response } from "express";
import { User } from "../models/User";

class UserController {
  async index(req: Request, res: Response) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async store(req: Request, res: Response) {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      address,
      billingInfo,
    } = req.body;

    try {
      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        address,
        billingInfo,
      });

      return res.status(201).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      await user.update({
        firstName,
        lastName,
        email,
      });

      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async destroy(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      await user.destroy();

      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new UserController();
