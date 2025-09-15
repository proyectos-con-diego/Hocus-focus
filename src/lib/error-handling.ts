// Sistema de manejo de errores

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Función para manejar errores de Sanity
export const handleSanityError = (error: any, context: string = 'Unknown') => {
  console.error(`❌ Sanity Error in ${context}:`, error);
  
  // Enviar a servicio de monitoreo de errores
  if (process.env.NODE_ENV === 'production') {
    // Aquí puedes integrar con Sentry, LogRocket, etc.
    console.error('Error details:', {
      context,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });
  }
  
  return {
    error: true,
    message: 'Error al cargar el contenido',
    details: process.env.NODE_ENV === 'development' ? error.message : undefined,
  };
};

// Función para validar datos de Sanity
export const validateSanityData = (data: any, expectedFields: string[]) => {
  if (!data) {
    throw new AppError('Datos no encontrados', 404);
  }
  
  const missingFields = expectedFields.filter(field => !data[field]);
  
  if (missingFields.length > 0) {
    throw new AppError(`Campos faltantes: ${missingFields.join(', ')}`, 400);
  }
  
  return data;
};

// Función para retry con backoff exponencial
export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: Error;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (i === maxRetries - 1) {
        throw lastError;
      }
      
      const delay = baseDelay * Math.pow(2, i);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
};
