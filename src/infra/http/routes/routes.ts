import { Router } from "express";
import { ProductController } from "../controllers/ProductController";

const router = Router();

router.get("/products", ProductController.list);
router.get("/products/:id", ProductController.getById);
router.post("/products", ProductController.create);
router.put("/products/:id", ProductController.update);
router.delete("/products/:id", ProductController.remove);

export default router; 