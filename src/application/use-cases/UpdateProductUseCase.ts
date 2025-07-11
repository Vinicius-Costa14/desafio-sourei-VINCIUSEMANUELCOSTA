import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { Product } from '../../domain/entities/Product';

export class UpdateProductUseCase {
  constructor(private repo: ProductRepository) {}

  async execute(id: string, data: { name: string; price: number }) {
    const product = await this.repo.findById(id);
    if (!product) throw new Error('Product not found');

    product.name = data.name;
    product.price = data.price;

    return await this.repo.update(product);
  }
}