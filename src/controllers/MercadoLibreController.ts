import { Request, Response } from "express";
import { config } from "dotenv";
import { Product } from "../models/Product";
import mercadopago from "mercadopago";

config({ path: ".env" });

const access_token = process.env.ACCESS_TOKEN as string;
const BASE_URL = process.env.BASE_URL as string;

mercadopago.configure({
  access_token,
});

export class MercadoLibreController {
  static async toto(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const item = req.body.items as any; // mudar any para um tipo mais adequado

      const product = await Product.findByPk(id);

      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      if (product.stock < item[0].quantity) {
        res.status(400).json({ message: "Insufficient stock" });
        return;
      }

      const preference = {
        items: [
          {
            id: String(product.id),
            title: product.name,
            description: product.description,
            quantity: item[0].quantity,
            unit_price: parseFloat(product.price.toString()),
          },
        ],
        back_urls: {
          success: `${BASE_URL}/success`,
          failure: `${BASE_URL}/failure`,
          pending: `${BASE_URL}/pending`,
        },
        payer: {
        //   phone: { area_code: "", number:  },
        //   address: { zip_code: "", street_name: "", street_number: 0 },
        //   email: "",
        //   identification: { number: "", type: "" },
        //   name: "",
        },
      };
      console.log(preference);

      const preferenceResponse = await mercadopago.preferences.create(
        preference
      );
      console.log(preferenceResponse.body);

      const initPoint = preferenceResponse.body.init_point;
      res.status(200).json({ init_point: initPoint });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
