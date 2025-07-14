import { ApiKeyRepository } from '../../domain/repositories/ApiKeyRepository';
import { ApiKey } from '../../domain/entities/ApiKey';

export class CreateApiKeyUseCase {
  constructor(private repo: ApiKeyRepository) {}

  async execute(owner?: string): Promise<ApiKey> {
    return await this.repo.create(owner);
  }
}
