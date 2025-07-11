import { Request, Response } from "express";
import { PrismaProductRepository } from "../database/PrismaProductRepository";
import { ListProductsUseCase } from "../../../application/use-cases/ListProductsUseCase";

const repo = new PrismaProductRepository();

export class ProductController {
    
    static async list(req: Request, res: Response) {
        // Cria uma instância do caso de uso, injetando o repositório Prisma
        const useCase = new ListProductsUseCase(repo);    
        const products = await useCase.execute();
        res.json(products);
    }
}