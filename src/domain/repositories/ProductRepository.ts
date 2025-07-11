import { Product } from "../entities/Product";

export interface ProductRepository {
  findAll(): Promise<Product[]>;
  create(product: Omit<Product, 'id'>): Promise<Product>;
}