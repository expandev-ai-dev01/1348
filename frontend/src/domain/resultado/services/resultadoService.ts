import { authenticatedClient } from '@/core/lib/api';
import type { Resultado, ResultadoListParams } from '../types';
import type { ApiResponse } from '@/core/types';

/**
 * @service resultadoService
 * @summary Result management service for authenticated endpoints
 * @domain resultado
 * @type rest-service
 * @apiContext internal
 */
export const resultadoService = {
  /**
   * @endpoint GET /api/v1/internal/resultado
   * @summary Fetches list of exam results with filters
   */
  async list(params?: ResultadoListParams): Promise<Resultado[]> {
    const response = await authenticatedClient.get<ApiResponse<Resultado[]>>('/resultado', {
      params,
    });
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/internal/resultado/:id
   * @summary Fetches detailed results for specific exam
   */
  async getById(id: string): Promise<Resultado> {
    const response = await authenticatedClient.get<ApiResponse<Resultado>>(`/resultado/${id}`);
    return response.data.data;
  },
};
