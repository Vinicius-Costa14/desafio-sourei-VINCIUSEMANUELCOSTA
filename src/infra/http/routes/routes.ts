import { Router } from "express";
import { ProductController } from "../controllers/ProductController";
import { ApiKeyController } from "../controllers/ApiKeyController";

const router = Router();

router.get("/products", ProductController.list);
router.get("/products/:id", ProductController.getById);
router.post("/products", ProductController.create);
router.put("/products/:id", ProductController.update);
router.delete("/products/:id", ProductController.remove);

router.post("/apikey/generate", ApiKeyController.generate);

export default router; 