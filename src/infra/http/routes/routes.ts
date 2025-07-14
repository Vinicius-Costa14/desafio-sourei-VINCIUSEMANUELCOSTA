import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import { ApiKeyController } from "../controllers/ApiKeyController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

// Rotas públicas (não precisam de API key)
router.get("/products", ProductController.list);
router.get("/products/:id", ProductController.getById);

// Rota para gerar API key (pública)
router.post("/apikey/generate", ApiKeyController.generate);

// Rotas protegidas (precisam de API key)
router.post("/products", authMiddleware, ProductController.create);
router.put("/products/:id", authMiddleware, ProductController.update);
router.delete("/products/:id", authMiddleware, ProductController.remove);

export default router; 