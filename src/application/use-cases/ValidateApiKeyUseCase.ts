import { ApiKeyRepository } from '../../domain/repositories/ApiKeyRepository';

export class ValidateApiKeyUseCase {
  constructor(private repo: ApiKeyRepository) {}

  async execute(key: string): Promise<boolean> {
    const apiKey = await this.repo.findByKey(key);
    return !!apiKey && apiKey.active;
  }
}