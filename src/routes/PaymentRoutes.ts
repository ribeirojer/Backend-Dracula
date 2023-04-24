import { Router } from "express";
import { PaymentController } from "../controllers/PaymentController";

const router = Router();

// Rotas de pagamentos
router.get("/payment", PaymentController.index);
router.get("/payment/:id", PaymentController.show);
router.post("/payment", PaymentController.store);
router.put("/payment/:id", PaymentController.update);
router.delete("/payment/:id", PaymentController.destroy);

export default router;
