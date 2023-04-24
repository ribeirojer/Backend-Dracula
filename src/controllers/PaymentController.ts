import { Request, Response } from "express";
import { PaymentRepository } from "../repositories/PaymentRepository";
import { Payment } from "../models/Payment";

export class PaymentController {
  public static async index(req: Request, res: Response) {
    try {
      const payments = await PaymentRepository.findAll();
      res.json(payments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  public static async show(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const payment = await PaymentRepository.findById(parseInt(id));

      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }

      res.json(payment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  public static async store(req: Request, res: Response) {
    const { id, orderId, paymentMethod, amount, status } = req.body;

    try {
      const payment = new Payment({
        orderId,
        paymentMethod,
        amount,
        status,
        id,
      });

      const newPayment = await PaymentRepository.create(payment);

      res.status(201).json(newPayment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  public static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { order_id, method, amount } = req.body;

    try {
      const payment = await PaymentRepository.findById(parseInt(id));

      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }

      payment.orderId = order_id ?? payment.orderId;
      payment.paymentMethod = method ?? payment.paymentMethod;
      payment.amount = amount ?? payment.amount;

      const updatedPayment = await PaymentRepository.update(
        parseInt(id),
        payment
      );

      res.json(updatedPayment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  public static async destroy(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const payment = await PaymentRepository.findById(parseInt(id));

      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }

      await PaymentRepository.delete(parseInt(id));

      res.json({ message: "Payment deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
