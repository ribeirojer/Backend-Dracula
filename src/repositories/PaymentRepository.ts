import { Payment } from "../models/Payment";

export class PaymentRepository {
  static async findAll(): Promise<Payment[]> {
    const payments = await Payment.findAll();
    return payments;
  }

  static async findById(id: number): Promise<Payment | null> {
    const payment = await Payment.findByPk(id);
    return payment || null;
  }

  static async create(payment: Payment): Promise<Payment> {
    const createdPayment = await Payment.create(payment);
    return createdPayment;
  }

  static async update(id: number, payment: Payment): Promise<boolean> {
    const updatedRows = await Payment.update(payment, { where: { id } });
    return !!updatedRows;
  }

  static async delete(id: number): Promise<boolean> {
    const deletedRows = await Payment.destroy({ where: { id } });
    return deletedRows > 0;
  }
}
