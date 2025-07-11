import { ProductRepository } from "../../domain/repositories/ProductRepository";

export class ListProductsUseCase {
  constructor(private repo: ProductRepository) {}

  async execute() {
    return await this.repo.findAll();
  }
}