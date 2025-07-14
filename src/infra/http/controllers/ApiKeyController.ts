import { Request, Response } from "express";
import { PrismaApiKeyRepository } from "../database/PrismaApiKeyRepository";
import { CreateApiKeyUseCase } from "../../../application/use-cases/CreateApiKeyUseCase";

const repo = new PrismaApiKeyRepository();

export class ApiKeyController {
  static async generate(req: Request, res: Response) {
    const owner = req.body.owner || undefined;
    const useCase = new CreateApiKeyUseCase(repo);
    const apiKey = await useCase.execute(owner);
    res.status(201).json({ apiKey: apiKey.key, owner: apiKey.owner, active: apiKey.active });
  }
}