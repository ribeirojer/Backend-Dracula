import { IOrder } from "../interfaces/UserInterface";
import { Order } from "../models/Order";

export class OrderService {
  static async createOrder(data: any): Promise<IOrder> {
    const order = await Order.create(data);
    return order as unknown as IOrder;
  }

  static async getOrderById(id: number): Promise<IOrder | null> {
    const order = await Order.findOne({ id: id });
    return order as unknown as IOrder;
  }

  static async getOrders(): Promise<IOrder[]> {
    const orders = await Order.find();
    return orders as unknown as IOrder[];
  }

  // static async updateOrderById(
  //   id: number,
  //   data: any
  // ): Promise<[number, Order[]]> {
  //   const [rowsAffected] = await Order.update(data, {
  //     where: {
  //       id,
  //     },
  //   });

  //   const updatedProducts = await Order.find({
  //     where: {
  //       id,
  //     },
  //   });

  //   return [rowsAffected, updatedProducts];
  // }

  static async deleteOrderById(id: number): Promise<number> {
    const result = await Order.deleteOne({
      where: {
        id,
      },
    });
    return result.deletedCount;
  }

  // static async getProductsByOrderId(orderId: number): Promise<Product[]> {
  //   const products = await Product.findAll({
  //     include: [
  //       {
  //         model: OrderProduct,
  //         where: { orderId },
  //       },
  //     ],
  //   });
  //   return products;
  // }

  // static async addProductToOrder(
  //   orderId: number,
  //   productId: number,
  //   quantity: number
  // ): Promise<void> {
  //   const order = await Order.findByPk(orderId);
  //   const product = await Product.findByPk(productId);
  //   if (!order || !product) {
  //     throw new Error("Order or product not found.");
  //   }

  //   const orderProduct = {
  //     orderId: order.id,
  //     productId: product.id,
  //     quantity: quantity,
  //   };

  //   await OrderProduct.create(orderProduct);
  // }

  // static async removeProductFromOrder(
  //   orderId: number,
  //   productId: number
  // ): Promise<void> {
  //   const order = await Order.findByPk(orderId);
  //   const product = await Product.findByPk(productId);
  //   if (!order || !product) {
  //     throw new Error("Order or product not found.");
  //   }
  //   await OrderProduct.destroy({
  //     where: {
  //       orderId,
  //       productId,
  //     },
  //   });
  // }
}
