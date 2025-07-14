import { z } from 'zod';

// DTO para criação de produtos
export const CreateProductDto = z.object({
  name: z.string()
    .min(1, 'Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .trim(),
  
  price: z.number()
    .positive('Preço deve ser um número positivo')
    .max(999999.99, 'Preço não pode exceder R$ 999.999,99')
    .multipleOf(0.01, 'Preço deve ter no máximo 2 casas decimais'),
  
  quantity: z.number()
    .int('Quantidade deve ser um número inteiro')
    .min(0, 'Quantidade não pode ser negativa')
    .max(999999, 'Quantidade não pode exceder 999.999')
    .optional()
    .default(0)
});

// DTO para atualização de produtos
export const UpdateProductDto = z.object({
  name: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres')
    .trim()
    .optional(),
  
  price: z.number()
    .positive('Preço deve ser um número positivo')
    .max(999999.99, 'Preço não pode exceder R$ 999.999,99')
    .multipleOf(0.01, 'Preço deve ter no máximo 2 casas decimais')
    .optional(),
  
  quantity: z.number()
    .int('Quantidade deve ser um número inteiro')
    .min(0, 'Quantidade não pode ser negativa')
    .max(999999, 'Quantidade não pode exceder 999.999')
    .optional()
}).refine(
  (data) => Object.keys(data).length > 0,
  {
    message: 'Pelo menos um campo deve ser fornecido para atualização'
  }
);

// DTO para parâmetros de rota
export const ProductParamsDto = z.object({
  id: z.string()
    .uuid('ID deve ser um UUID válido')
});

// Tipos TypeScript inferidos dos schemas Zod
export type CreateProductDtoType = z.infer<typeof CreateProductDto>;
export type UpdateProductDtoType = z.infer<typeof UpdateProductDto>;
export type ProductParamsDtoType = z.infer<typeof ProductParamsDto>; 