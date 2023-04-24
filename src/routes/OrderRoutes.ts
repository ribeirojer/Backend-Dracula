import { Router } from "express";
import { OrderController } from "../controllers/OrderController";

const router = Router();

// Rotas de pedidos
router.get("/orders", OrderController.index);
router.get("/orders/:id", OrderController.show);
router.post("/orders", OrderController.store);
router.put("/orders/:id", OrderController.update);
router.delete("/orders/:id", OrderController.destroy);

export default router;
