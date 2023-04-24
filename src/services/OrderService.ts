import { Order } from "../models/Order";
import { Product } from "../models/Product";
import { OrderProduct } from "../models/OrderProduct";

export class OrderService {
  static async createOrder(data: any): Promise<Order> {
    const order = await Order.create(data);
    return order;
  }

  static async getOrderById(id: number): Promise<Order | null> {
    const order = await Order.findByPk(id);
    return order;
  }

  static async getOrders(): Promise<Order[]> {
    const orders = await Order.findAll();
    return orders;
  }

  static async updateOrderById(
    id: number,
    data: any
  ): Promise<[number, Order[]]> {
    const [rowsAffected] = await Order.update(data, {
      where: {
        id,
      },
    });

    const updatedProducts = await Order.findAll({
      where: {
        id,
      },
    });

    return [rowsAffected, updatedProducts];
  }

  static async deleteOrderById(id: number): Promise<number> {
    const result = await Order.destroy({
      where: {
        id,
      },
    });
    return result;
  }

  static async getProductsByOrderId(orderId: number): Promise<Product[]> {
    const products = await Product.findAll({
      include: [
        {
          model: OrderProduct,
          where: { orderId },
        },
      ],
    });
    return products;
  }

  static async addProductToOrder(
    orderId: number,
    productId: number,
    quantity: number
  ): Promise<void> {
    const order = await Order.findByPk(orderId);
    const product = await Product.findByPk(productId);
    if (!order || !product) {
      throw new Error("Order or product not found.");
    }

    const orderProduct = {
      orderId: order.id,
      productId: product.id,
      quantity: quantity,
    };

    await OrderProduct.create(orderProduct);
  }

  static async removeProductFromOrder(
    orderId: number,
    productId: number
  ): Promise<void> {
    const order = await Order.findByPk(orderId);
    const product = await Product.findByPk(productId);
    if (!order || !product) {
      throw new Error("Order or product not found.");
    }
    await OrderProduct.destroy({
      where: {
        orderId,
        productId,
      },
    });
  }
}
