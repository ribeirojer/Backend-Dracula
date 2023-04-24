import { Request, Response } from "express";
import CartItem from "../models/CartItem";

export class CartController {
  static async index(req: Request, res: Response) {
    try {
      // Busca todos os itens do carrinho
      const cartItems = await CartItem.findAll();

      // Retorna os itens do carrinho
      res.json(cartItems);
    } catch (err) {
      console.error(err);
      res.status(500).send("Erro ao buscar itens do carrinho");
    }
  }

  static async store(req: Request, res: Response) {
    try {
      // Cria um novo item no carrinho
      const { productId, quantity } = req.body;
      const newCartItem = await CartItem.create({ productId, quantity });

      // Retorna o novo item criado
      res.json(newCartItem);
    } catch (err) {
      console.error(err);
      res.status(500).send("Erro ao adicionar item ao carrinho");
    }
  }

  static async update(req: Request, res: Response) {
    try {
      // Atualiza um item do carrinho
      const { id } = req.params;
      const { quantity } = req.body;
      const cartItem = await CartItem.findByPk(id);

      if (!cartItem) {
        return res.status(404).send("Item do carrinho não encontrado");
      }

      cartItem.sequelize.Sequelize = quantity;
      await cartItem.save();

      // Retorna o item atualizado
      res.json(cartItem);
    } catch (err) {
      console.error(err);
      res.status(500).send("Erro ao atualizar item do carrinho");
    }
  }

  static async destroy(req: Request, res: Response) {
    try {
      // Remove um item do carrinho
      const { id } = req.params;
      const cartItem = await CartItem.findByPk(id);

      if (!cartItem) {
        return res.status(404).send("Item do carrinho não encontrado");
      }

      await cartItem.destroy();

      res.send("Item do carrinho removido com sucesso");
    } catch (err) {
      console.error(err);
      res.status(500).send("Erro ao remover item do carrinho");
    }
  }
}
