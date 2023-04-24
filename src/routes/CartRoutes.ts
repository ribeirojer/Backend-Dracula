import { Router } from "express";
import { CartController } from "../controllers/CartController";

const router = Router();

// Rotas de carrinho de compras
router.get("/cart", CartController.index);
router.post("/cart", CartController.store);
router.put("/cart/:id", CartController.update);
router.delete("/cart/:id", CartController.destroy);

export default router;
