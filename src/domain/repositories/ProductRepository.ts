import { Product } from "../entities/Product";

export interface ProductRepository {
  findAll(): Promise<Product[]>;
  create(product: Omit<Product, 'id'>): Promise<Product>;
  findById(id: string): Promise<Product | null>;
}