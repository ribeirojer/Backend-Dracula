import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import { MercadoLibreController } from "../controllers/MercadoLibreController";

const router = Router();

// Rotas de produtos
router.get("/products", ProductController.index);
router.get("/products/:id", ProductController.show);
router.post("/products", ProductController.store);
router.put("/products/:id", ProductController.update);
router.delete("/products/:id", ProductController.destroy);

router.get("/products/:id/ratings", ProductController.show);
router.post("/products/:id/rating", ProductController.store);
router.post("/products/:id/payments", MercadoLibreController.toto);

export default router;
