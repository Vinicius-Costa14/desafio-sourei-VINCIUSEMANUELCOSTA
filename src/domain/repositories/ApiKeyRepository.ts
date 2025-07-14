import { ApiKey } from '../entities/ApiKey';

export interface ApiKeyRepository {
  create(owner?: string): Promise<ApiKey>;
  findByKey(key: string): Promise<ApiKey | null>;
  deactivate(key: string): Promise<void>;
}