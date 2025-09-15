// Sistema de cache para optimizar rendimiento

interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class Cache {
  private cache = new Map<string, CacheItem<any>>();

  set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    const isExpired = Date.now() - item.timestamp > item.ttl;
    
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

// Instancia global del cache
export const cache = new Cache();

// Función para cachear consultas de Sanity
export const cachedSanityQuery = async <T>(
  query: string,
  params?: any,
  ttl: number = 5 * 60 * 1000
): Promise<T> => {
  const cacheKey = `${query}-${JSON.stringify(params || {})}`;
  
  // Intentar obtener del cache
  const cached = cache.get<T>(cacheKey);
  if (cached) {
    return cached;
  }

  // Si no está en cache, hacer la consulta
  const { sanityClient } = await import('@/sanity');
  const data = await sanityClient.fetch(query, params);
  
  // Guardar en cache
  cache.set(cacheKey, data, ttl);
  
  return data;
};

// Función para invalidar cache por patrón
export const invalidateCacheByPattern = (pattern: string): void => {
  const keys = Array.from(cache['cache'].keys());
  keys.forEach(key => {
    if (key.includes(pattern)) {
      cache.delete(key);
    }
  });
};
