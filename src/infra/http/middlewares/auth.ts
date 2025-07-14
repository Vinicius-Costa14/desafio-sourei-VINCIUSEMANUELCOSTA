import { Request, Response, NextFunction } from 'express';
import { PrismaApiKeyRepository } from '../database/PrismaApiKeyRepository';
import { ValidateApiKeyUseCase } from '../../../application/use-cases/ValidateApiKeyUseCase';

const apiKeyRepository = new PrismaApiKeyRepository();
const validateApiKeyUseCase = new ValidateApiKeyUseCase(apiKeyRepository);

export interface AuthenticatedRequest extends Request {
  apiKey?: string;
}

export async function authMiddleware(
  req: AuthenticatedRequest, 
  res: Response, 
  next: NextFunction
) {
  try {
    // Buscar API key no header
    const apiKey = req.headers['x-api-key'] as string;

    if (!apiKey) {
      return res.status(401).json({
        error: 'API Key é obrigatória. Forneça a chave no header X-API-Key'
      });
    }

    // Validar API key
    const isValid = await validateApiKeyUseCase.execute(apiKey);

    if (!isValid) {
      return res.status(401).json({
        error: 'API Key inválida ou inativa'
      });
    }

    // Adicionar API key ao request para uso posterior se necessário
    req.apiKey = apiKey;
    
    // Continuar para o próximo middleware/rota
    next();
  } catch (error) {
    console.error('Erro na validação da API key:', error);
    return res.status(500).json({
      error: 'Erro interno do servidor durante autenticação'
    });
  }
} 