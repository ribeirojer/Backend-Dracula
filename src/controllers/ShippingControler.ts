import { Request, Response } from "express";
import { Shipping } from "../models/Shipping";

export class ShippingController {
  public static async show(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const shipping = await Shipping.findByPk(id);
      if (!shipping) {
        return res.status(404).json({ error: "Shipping not found" });
      }
      return res.json(shipping);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  public static async store(req: Request, res: Response) {
    const { id, deliveryTime, method, price } = req.body;
    try {
      const shipping = await Shipping.create({
        id,
        deliveryTime,
        method,
        price,
      });
      return res.status(201).json(shipping);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
