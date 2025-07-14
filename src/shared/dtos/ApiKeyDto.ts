import { z } from 'zod';

// DTO para criação de API key
export const CreateApiKeyDto = z.object({
  owner: z.string()
    .email('Owner deve ser um email válido')
    .max(255, 'Owner deve ter no máximo 255 caracteres')
    .trim()
    .optional()
}).optional().default({});

// DTO para validação de API key no header
export const ApiKeyHeaderDto = z.object({
  'x-api-key': z.string()
    .min(1, 'API Key é obrigatória')
    .max(255, 'API Key deve ter no máximo 255 caracteres')
});

// DTO para deativar API key
export const DeactivateApiKeyDto = z.object({
  key: z.string()
    .min(1, 'API Key é obrigatória')
    .max(255, 'API Key deve ter no máximo 255 caracteres')
});

// Tipos TypeScript inferidos dos schemas Zod
export type CreateApiKeyDtoType = z.infer<typeof CreateApiKeyDto>;
export type ApiKeyHeaderDtoType = z.infer<typeof ApiKeyHeaderDto>;
export type DeactivateApiKeyDtoType = z.infer<typeof DeactivateApiKeyDto>; 