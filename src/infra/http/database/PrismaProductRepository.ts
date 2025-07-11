// @ts-ignore
import { ProductRepository } from './../../../domain/repositories/ProductRepository';
import { PrismaClient } from "@prisma/client";
import { Product } from "../../../domain/entities/Product";

const prisma = new PrismaClient();

export class PrismaProductRepository implements ProductRepository {
  async findAll(): Promise<Product[]> {
    const products = await prisma.product.findMany();
    //return products.map(p => new Product(p.id, p.name, p.price, p.quantity));
    return products;
  }
}