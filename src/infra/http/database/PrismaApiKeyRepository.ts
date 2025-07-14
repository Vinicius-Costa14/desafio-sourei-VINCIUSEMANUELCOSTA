import { PrismaClient } from '@prisma/client';
import { ApiKeyRepository } from '../../../domain/repositories/ApiKeyRepository';
import { ApiKey } from '../../../domain/entities/ApiKey';

const prisma = new PrismaClient();

function generateRandomKey() {
  // Use algo mais robusto em produção!
  return (
    Math.random().toString(36).slice(2) +
    Math.random().toString(36).slice(2)
  );
}

export class PrismaApiKeyRepository implements ApiKeyRepository {
  async create(owner?: string): Promise<ApiKey> {
    const key = generateRandomKey();
    const created = await prisma.apiKey.create({
      data: { key, owner }
    });
    return new ApiKey(
      created.id,
      created.key,
      created.createdAt,
      created.owner ?? undefined,
      created.active
    );
  }

  async findByKey(key: string): Promise<ApiKey | null> {
    const found = await prisma.apiKey.findUnique({ where: { key } });
    if (!found) return null;
    return new ApiKey(
      found.id,
      found.key,
      found.createdAt,
      found.owner ?? undefined,
      found.active
    );
  }

  async deactivate(key: string): Promise<void> {
    await prisma.apiKey.update({
      where: { key },
      data: { active: false }
    });
  }
}
