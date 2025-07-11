import { ProductRepository } from '../../domain/repositories/ProductRepository';

export class GetProductByIdUseCase {
  constructor(private repo: ProductRepository) {}

  async execute(id: string) {
    return await this.repo.findById(id);
  }
}