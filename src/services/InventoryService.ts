import { Product } from "../models/Product";

export class InventoryService {
  static async getStock(productId: number): Promise<number> {
    const product = await Product.findOne({
      where: {
        id: productId,
      },
    });
    return product ? parseInt(product.stock.toString()) : 0;
  }

  static async updateStock(productId: number, quantity: number): Promise<void> {
    await Product.update(
      {
        stock: quantity,
      },
      {
        where: {
          id: productId,
        },
      }
    );
  }

  static async isAvailable(
    productId: number,
    quantity: number
  ): Promise<boolean> {
    const product = await Product.findOne({
      where: {
        id: productId,
      },
    });
    return product ? parseInt(product.stock.toString()) >= quantity : false;
  }

  static async addProductToInventory(productData: any): Promise<Product> {
    const product = await Product.create(productData);
    return product;
  }

  static async removeProductFromInventory(productId: number): Promise<number> {
    const result = await Product.destroy({
      where: {
        id: productId,
      },
    });
    return result;
  }

  static async getProductById(productId: number): Promise<Product | null> {
    const product = await Product.findOne({
      where: {
        id: productId,
      },
    });
    return product ? product : null;
  }

  static async getAllProducts(): Promise<Product[]> {
    const products = await Product.findAll();
    return products;
  }

  static async updateProductById(
    productId: number,
    productData: any
  ): Promise<[number, Product[]]> {
    const [rowsAffected] = await Product.update(productData, {
      where: {
        id: productId,
      },
    });

    const updatedProducts = await Product.findAll({
      where: {
        id: productId,
      },
    });

    return [rowsAffected, updatedProducts];
  }
}
