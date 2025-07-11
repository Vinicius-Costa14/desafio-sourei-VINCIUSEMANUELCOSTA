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
      async findById(id: string): Promise<Product | null> {
        const p = await prisma.product.findUnique({ where: { id } });
        // return p ? new Product(p.id, p.name, p.price) : null;
        return p;
    }
    async create(product: Omit<Product, 'id'>): Promise<Product> {
        const created = await prisma.product.create({
        data: {
            name: product.name,
            price: product.price,
            quantity: product.quantity || 0,
        }
        });
        return new Product(created.id, created.name, created.price, created.quantity);
  }
}