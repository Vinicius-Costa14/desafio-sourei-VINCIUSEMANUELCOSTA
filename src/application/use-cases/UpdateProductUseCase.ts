import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { Product } from '../../domain/entities/Product';

export class UpdateProductUseCase {
  constructor(private repo: ProductRepository) {}

  async execute(id: string, data: { name?: string; price?: number; quantity?: number }) {
    const product = await this.repo.findById(id);
    if (!product) throw new Error('Product not found');

    // Atualizar apenas os campos fornecidos
    if (data.name !== undefined) product.name = data.name;
    if (data.price !== undefined) product.price = data.price;
    if (data.quantity !== undefined) product.quantity = data.quantity;

    return await this.repo.update(product);
  }
}