import { Router } from "express";
import { ProductController } from "../controllers/ProductController";

const router = Router();

router.get("/products", ProductController.list);

export default router;