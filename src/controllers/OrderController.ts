import { Request, Response } from "express";
import { Order } from "../models/Order";
import sequelize from "../config/database";
import { OrderItem } from "../models/OrderItem";

export class OrderController {
  static async index(req: Request, res: Response) {
    try {
      const orders = await Order.findAll();
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async show(req: Request, res: Response) {
    try {
      const order = await Order.findByPk(req.params.id);
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
      const { items, ...orderData } = req.body;
      console.log(items)
      console.log(orderData)
      const transaction = await sequelize.transaction();

      const order = await Order.create(orderData, { transaction });

      for (const item of items) {
        await OrderItem.create(
          {
            ...item,
            orderId: order.id,
          },
          { transaction }
        );
      }

      await transaction.commit();

      res.json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const order = await Order.findByPk(req.params.id);
      if (order) {
        const orderData = req.body;
        const updatedOrder = await order.update(orderData);
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
      const order = await Order.findByPk(req.params.id);
      if (order) {
        await order.destroy();
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
