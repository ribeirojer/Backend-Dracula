import { Request, Response } from "express";
import { Order } from "../models/Order";
import sequelize from "../config/database";
import { OrderItem } from "../models/OrderItem";
import { Product } from "../models/Product";
import { MercadoLibreRepository } from "../repositories/MercadoLibreRepository";

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
    const transaction = await sequelize.transaction();
    try {
      const {
        paymentInfo,
        shippingInfo,
        additionalInfo,
        createAccount,
        password,
        confirmPassword,
        cartItems,
      } = req.body;

      if (!paymentInfo || !shippingInfo || !cartItems) {
        res.status(400).json({
          message: "Missing required fields",
        });
        return;
      }
      if (password !== confirmPassword) {
        res.status(400).json({
          message: "Passwords do not match",
        });
        return;
      }
      if (cartItems.length === 0) {
        res.status(400).json({
          message: "Cart is empty",
        });
        return;
      }

      const totalPrice = await Promise.all(
        cartItems.map(async (item: any) => {
          const product = await Product.findByPk(item.id, {
            attributes: ["price"],
            transaction,
          });
          if (!product) {
            throw new Error(`Product with id ${item.id} not found`);
          }
          return product.price * item.quantity;
        })
      ).then((prices: number[]) =>
        prices.reduce((acc, price) => acc + price, 0)
      );

      const order = await Order.create(
        {
          status: "pending",
          totalPrice,
          paymentMethod: "credit_card",
          firstName: paymentInfo.firstName,
          lastName: paymentInfo.lastName,
          email: paymentInfo.email,
          zipCode: shippingInfo.zipCode || paymentInfo.zipCode,
          address: shippingInfo.logradouro || paymentInfo.logradouro,
          numberAddress:
            shippingInfo.numberAddress || paymentInfo.numberAddress,
          complemento: shippingInfo.complemento || paymentInfo.complemento,
          bairro: shippingInfo.bairro || paymentInfo.bairro,
          city: shippingInfo.city || paymentInfo.city,
          state: shippingInfo.state || paymentInfo.state,
          tel: shippingInfo.tel || paymentInfo.tel,
        },
        { transaction }
      );

      const link = await MercadoLibreRepository.createPayment(order, cartItems);

      await transaction.commit();

      res.status(201).json(link);
    } catch (error) {
      console.error(error);
      await transaction.rollback();
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
