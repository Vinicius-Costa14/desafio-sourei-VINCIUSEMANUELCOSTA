import { Request, Response } from "express";
import { PrismaApiKeyRepository } from "../database/PrismaApiKeyRepository";
import { CreateApiKeyUseCase } from "../../../application/use-cases/CreateApiKeyUseCase";
import { CreateApiKeyDtoType } from "../../../shared/dtos/ApiKeyDto";

const repo = new PrismaApiKeyRepository();

export class ApiKeyController {
  static async generate(req: Request, res: Response) {
    try {
      const validatedData = req.body as CreateApiKeyDtoType;
      const owner = validatedData?.owner || undefined;
      const useCase = new CreateApiKeyUseCase(repo);
      const apiKey = await useCase.execute(owner);
      
      res.status(201).json({ 
        apiKey: apiKey.key, 
        owner: apiKey.owner, 
        active: apiKey.active,
        createdAt: apiKey.createdAt
      });
    } catch (err: any) {
      res.status(500).json({ 
        erro: 'Erro ao gerar API key',
        detalhes: err.message 
      });
    }
  }
}