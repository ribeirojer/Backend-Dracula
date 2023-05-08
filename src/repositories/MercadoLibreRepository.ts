import { config } from "dotenv";
import mercadopago from "mercadopago";
import Product from "../models/Product";
import { CartExtract, IElectronicProduct } from "../interfaces/Product";

config({ path: ".env" });

const access_token = process.env.ACCESS_TOKEN as string;
const BASE_URL = process.env.BASE_URL as string;

mercadopago.configure({
  access_token,
});

export class MercadoLibreRepository {
  static async createPayment(
    order: any,
    cartItems: CartExtract[]
  ): Promise<any> {
    try {
      const products = await Promise.all(
        cartItems.map(async (item: any) => {
          const product = await Product.findOne(item.id);
          if (!product) {
            throw new Error(`Product with id ${item.id} not found`);
          }
          return product;
        })
      ).then((products) => products);

      // Cria um array de items a partir dos produtos do carrinho
      const items = products.map((product: any, index: number) => {
        const item = cartItems[index];

        return {
          id: String(product.id),
          title: product.name,
          description: product.description.slice(0, 255),
          quantity: item.quantity,
          unit_price: parseFloat(product.price.toString()),
        };
      });

      const preference = {
        items,
        back_urls: {
          success: `${BASE_URL}/success`,
          failure: `${BASE_URL}/failure`,
          pending: `${BASE_URL}/pending`,
        },
        payer: {
          // phone: { area_code: "todo", number: 0 },
          address: {
            zip_code: "" + order.zip_code,
            street_name: order.address,
            street_number: 0,
          },
          email: "email@email.com",
          identification: { number: "" + order.id, type: "" },
          name: "" + order.id,
        },
      };

      const preferenceResponse = await mercadopago.preferences.create(
        preference
      );

      return { link: preferenceResponse.body.init_point };
    } catch (error: any) {
      console.error(error);
      return error.message;
    }
  }
}
