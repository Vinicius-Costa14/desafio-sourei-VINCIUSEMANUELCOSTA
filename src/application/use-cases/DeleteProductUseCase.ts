import { ProductRepository } from '../../domain/repositories/ProductRepository';

export class DeleteProductUseCase {
  constructor(private repo: ProductRepository) {}

  async execute(id: string) {
    return await this.repo.delete(id);
  }
}