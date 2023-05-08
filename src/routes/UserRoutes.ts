import { Router } from "express";
import UserController from "../controllers/UserController";
import { authMiddleware } from "../middleware/AuthMiddleware";

const router = Router();

// Rotas de usuários
router.get("/users", UserController.index);
router.get("/users/:id", UserController.show);
router.post("/users", UserController.store);
router.put("/users/:id", UserController.update);
router.delete("/users/:id", UserController.destroy);

export default router;
