import { Order } from "../models/Order";

export class ShippingService {
  static async shipOrder(order: Order): Promise<void> {
    // Simula o envio do pedido, atualiza o status do pedido para "enviado"
    order.status = "enviado";
    await order.save();
  }

  static async cancelOrderShipment(order: Order): Promise<void> {
    // Cancela o envio do pedido, atualiza o status do pedido para "pendente de envio"
    order.status = "pendente de envio";
    await order.save();
  }

  static async getShipmentStatus(order: Order): Promise<string> {
    // Retorna o status de envio atual do pedido
    return order.status;
  }
}
