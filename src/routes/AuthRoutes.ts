import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();

// Rotas de autenticação
router.post("/auth/login", AuthController.login);
router.post("/auth/register", AuthController.register);
router.post("/auth/forgot-password", AuthController.forgotPassword);
router.post("/auth/reset-password", AuthController.resetPassword);

export default router;
