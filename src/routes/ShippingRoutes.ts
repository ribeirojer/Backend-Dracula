import { Router } from "express";
import { ShippingController } from "../controllers/ShippingControler";

const router = Router();

// Rotas de frete
router.get("/shipping/:id", ShippingController.show);
router.post("/shipping", ShippingController.store);

export default router;
