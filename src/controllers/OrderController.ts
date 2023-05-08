import { Request, Response } from "express";
import { Order } from "../models/Order";
import { Product } from "../models/Product";
import { MercadoLibreRepository } from "../repositories/MercadoLibreRepository";
import { User } from "../models/User";

export class OrderController {
  static async index(req: Request, res: Response) {
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async show(req: Request, res: Response) {
    try {
      const order = await Order.findOne({ _id: req.params.id });
      if (order) {
        res.json(order);
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async store(req: Request, res: Response) {
    try {
      const {
        user,
        orderItems,
        shippingAddress,
        paymentMethod,
        paymentResult,
        taxPrice,
        shippingPrice,
        isPaid,
        totalPrice,
        paidAt,
        isDelivered,
        deliveredAt,
      } = req.body;

      if (!user || !orderItems || orderItems.length === 0) {
        res.status(400).json({
          message: "Invalid data",
        });
        return;
      }

      const userData = await User.findOne({ _id: user });

      if (!userData) {
        res.status(400).json({
          message: "Invalid data",
        });
        return;
      }

      const order = await Order.create({
        user,
        orderItems,
        shippingAddress,
        paymentMethod,
        paymentResult,
        taxPrice,
        shippingPrice,
        totalPrice,
        isPaid,
        paidAt,
      });

      const link = await MercadoLibreRepository.createPayment(
        order,
        orderItems
      );

      res.status(201).json(link);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const order = await Order.findOne({ _id: req.params.id });
      if (order) {
        const orderData = req.body;
        const updatedOrder = await order.updateOne(orderData);
        res.json(updatedOrder);
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async destroy(req: Request, res: Response) {
    try {
      const order = await Order.findOne({ _id: req.params.id });
      if (order) {
        await order.deleteOne();
        res.json({ message: "Order deleted successfully" });
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
