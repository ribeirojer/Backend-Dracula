import { Request, Response } from "express";
import { Product } from "../models/Product";

export class ProductController {
  static async index(req: Request, res: Response) {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  static async show(req: Request, res: Response) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  static async store(req: Request, res: Response) {
    const { name, price, description, image } = req.body;
    console.log(req.body);
    try {
      const product = await Product.create(req.body);
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }
      await product.update(req.body);
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  static async destroy(req: Request, res: Response) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }
      await product.destroy();
      res.json({ message: "Produto excluído com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  static async showRatings(req: Request, res: Response) {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: "ratings",
      });
      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }
      res.json(product.ratings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  static async storeRating(req: Request, res: Response) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }
      const rating = await product.createRating(req.body);
      res.json(rating);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}
