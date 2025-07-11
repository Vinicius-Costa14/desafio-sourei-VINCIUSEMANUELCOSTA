import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { Product } from '../../domain/entities/Product';

export class CreateProductUseCase {
  constructor(private repo: ProductRepository) {}

  async execute(data: { name: string; price: number, quantity?: number }): Promise<Product> {
    return await this.repo.create({ name: data.name, price: data.price, quantity: data.quantity || 0 });
  }
}