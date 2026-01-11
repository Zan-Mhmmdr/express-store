type CacheValue = any;

interface CacheItem {
  value: CacheValue;
  expiresAt?: number;
}

class CacheService {
  private store: Map<string, CacheItem> = new Map();

  set(key: string, value: CacheValue, ttlSeconds?: number): void {
    const expiresAt = ttlSeconds
      ? Date.now() + ttlSeconds * 1000
      : undefined;

    this.store.set(key, { value, expiresAt });
  }

  get<T = any>(key: string): T | null {
    const item = this.store.get(key);

    if (!item) return null;

    if (item.expiresAt && Date.now() > item.expiresAt) {
      this.store.delete(key);
      return null;
    }

    return item.value as T;
  }

  delete(key: string): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }
}

export const cacheService = new CacheService();
