import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import { ApiKeyController } from "../controllers/ApiKeyController";
import { authMiddleware } from "../middlewares/auth";
import { validateBody, validateParams } from "../../../shared/middlewares/validation";
import { CreateProductDto, UpdateProductDto, ProductParamsDto } from "../../../shared/dtos/ProductDto";
import { CreateApiKeyDto } from "../../../shared/dtos/ApiKeyDto";

const router = Router();

// Rotas públicas (não precisam de API key)
router.get("/products", ProductController.list);
router.get("/products/:id", 
  validateParams(ProductParamsDto),
  ProductController.getById
);

// Rota para gerar API key (pública)
router.post("/apikey/generate", 
  validateBody(CreateApiKeyDto),
  ApiKeyController.generate
);

// Rotas protegidas (precisam de API key)
router.post("/products", 
  authMiddleware,
  validateBody(CreateProductDto),
  ProductController.create
);

router.put("/products/:id", 
  authMiddleware,
  validateParams(ProductParamsDto),
  validateBody(UpdateProductDto),
  ProductController.update
);

router.delete("/products/:id", 
  authMiddleware,
  validateParams(ProductParamsDto),
  ProductController.remove
);

export default router; 