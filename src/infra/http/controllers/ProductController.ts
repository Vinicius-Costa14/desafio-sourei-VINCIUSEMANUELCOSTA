import { Request, Response } from "express";
import { PrismaProductRepository } from "../database/PrismaProductRepository";
import { ListProductsUseCase } from "../../../application/use-cases/ListProductsUseCase";
import { CreateProductUseCase } from "../../../application/use-cases/CreateProductUseCase";
import { GetProductByIdUseCase } from "../../../application/use-cases/GetProductByIdUseCase";

const repo = new PrismaProductRepository();

export class ProductController {
    
    static async list(req: Request, res: Response) {
        const useCase = new ListProductsUseCase(repo);    
        const products = await useCase.execute();
        res.json(products);
    }
    static async getById(req: Request, res: Response) {
        const useCase = new GetProductByIdUseCase(repo);
        const product = await useCase.execute(req.params.id);
        if (!product) return res.status(404).json({ message: 'Not found' });
        res.json(product);
    }
    static async create(req: Request, res: Response) {
        try {
        const useCase = new CreateProductUseCase(repo);
        const product = await useCase.execute(req.body);
        res.status(201).json(product);
        } catch (err: any) {
        res.status(400).json({ error: err.message });
        }
    }
}