import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

export interface ValidationTarget {
  body?: z.ZodSchema;
  params?: z.ZodSchema;
  query?: z.ZodSchema;
  headers?: z.ZodSchema;
}

export function validate(schemas: ValidationTarget) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validar body
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }

      // Validar params (mantém como está, apenas valida)
      if (schemas.params) {
        schemas.params.parse(req.params);
      }

      // Validar query (mantém como está, apenas valida)
      if (schemas.query) {
        schemas.query.parse(req.query);
      }

      // Validar headers (apenas valida)
      if (schemas.headers) {
        schemas.headers.parse(req.headers);
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((err: any) => ({
          campo: err.path.join('.'),
          mensagem: err.message,
          valorRecebido: err.code === 'invalid_type' ? err.received : 'undefined'
        }));

        return res.status(400).json({
          erro: 'Dados inválidos',
          detalhes: errorMessages
        });
      }

      // Erro não relacionado à validação
      console.error('Erro durante validação:', error);
      return res.status(500).json({
        erro: 'Erro interno do servidor durante validação'
      });
    }
  };
}

// Middleware especializado para validação de body apenas
export function validateBody(schema: z.ZodSchema) {
  return validate({ body: schema });
}

// Middleware especializado para validação de params apenas
export function validateParams(schema: z.ZodSchema) {
  return validate({ params: schema });
}

// Middleware especializado para validação de headers apenas
export function validateHeaders(schema: z.ZodSchema) {
  return validate({ headers: schema });
} 