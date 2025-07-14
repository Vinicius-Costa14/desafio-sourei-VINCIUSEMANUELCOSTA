import { Request, Response } from "express";
import { PrismaProductRepository } from "../database/PrismaProductRepository";
import { ListProductsUseCase } from "../../../application/use-cases/ListProductsUseCase";
import { CreateProductUseCase } from "../../../application/use-cases/CreateProductUseCase";
import { GetProductByIdUseCase } from "../../../application/use-cases/GetProductByIdUseCase";
import { UpdateProductUseCase } from "../../../application/use-cases/UpdateProductUseCase";
import { DeleteProductUseCase } from "../../../application/use-cases/DeleteProductUseCase";
import { CreateProductDtoType, UpdateProductDtoType } from "../../../shared/dtos/ProductDto";

const repo = new PrismaProductRepository();

export class ProductController {
    
    static async list(req: Request, res: Response) {
        try {
            const useCase = new ListProductsUseCase(repo);    
            const products = await useCase.execute();
            res.json(products);
        } catch (err: any) {
            res.status(500).json({ 
                erro: 'Erro interno do servidor',
                detalhes: err.message 
            });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const useCase = new GetProductByIdUseCase(repo);
            const product = await useCase.execute(req.params.id);
            if (!product) {
                return res.status(404).json({ 
                    erro: 'Produto não encontrado',
                    detalhes: `Produto com ID ${req.params.id} não existe` 
                });
            }
            res.json(product);
        } catch (err: any) {
            res.status(500).json({ 
                erro: 'Erro interno do servidor',
                detalhes: err.message 
            });
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const validatedData = req.body as CreateProductDtoType;
            const useCase = new CreateProductUseCase(repo);
            const product = await useCase.execute(validatedData);
            res.status(201).json(product);
        } catch (err: any) {
            res.status(400).json({ 
                erro: 'Erro ao criar produto',
                detalhes: err.message 
            });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const validatedData = req.body as UpdateProductDtoType;
            const useCase = new UpdateProductUseCase(repo);
            const product = await useCase.execute(req.params.id, validatedData);
            res.json(product);
        } catch (err: any) {
            if (err.message === 'Product not found') {
                return res.status(404).json({ 
                    erro: 'Produto não encontrado',
                    detalhes: `Produto com ID ${req.params.id} não existe` 
                });
            }
            res.status(400).json({ 
                erro: 'Erro ao atualizar produto',
                detalhes: err.message 
            });
        }
    }

    static async remove(req: Request, res: Response) {
        try {
            const useCase = new DeleteProductUseCase(repo);
            await useCase.execute(req.params.id);
            res.status(204).send();
        } catch (err: any) {
            if (err.message === 'Product not found') {
                return res.status(404).json({ 
                    erro: 'Produto não encontrado',
                    detalhes: `Produto com ID ${req.params.id} não existe` 
                });
            }
            res.status(500).json({ 
                erro: 'Erro ao remover produto',
                detalhes: err.message 
            });
        }
    }
}