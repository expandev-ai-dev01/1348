import { authenticatedClient } from '@/core/lib/api';
import type { Prova, ProvaListParams, CreateProvaDto, UpdateProvaDto } from '../types';
import type { ApiResponse } from '@/core/types';

/**
 * @service provaService
 * @summary Exam management service for authenticated endpoints
 * @domain prova
 * @type rest-service
 * @apiContext internal
 */
export const provaService = {
  /**
   * @endpoint GET /api/v1/internal/prova
   * @summary Fetches list of exams with filters
   */
  async list(params?: ProvaListParams): Promise<Prova[]> {
    const response = await authenticatedClient.get<ApiResponse<Prova[]>>('/prova', { params });
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/internal/prova/:id
   * @summary Fetches single exam by ID
   */
  async getById(id: string): Promise<Prova> {
    const response = await authenticatedClient.get<ApiResponse<Prova>>(`/prova/${id}`);
    return response.data.data;
  },

  /**
   * @endpoint POST /api/v1/internal/prova
   * @summary Creates new exam
   */
  async create(data: CreateProvaDto): Promise<Prova> {
    const response = await authenticatedClient.post<ApiResponse<Prova>>('/prova', data);
    return response.data.data;
  },

  /**
   * @endpoint PUT /api/v1/internal/prova/:id
   * @summary Updates existing exam
   */
  async update(id: string, data: UpdateProvaDto): Promise<Prova> {
    const response = await authenticatedClient.put<ApiResponse<Prova>>(`/prova/${id}`, data);
    return response.data.data;
  },

  /**
   * @endpoint DELETE /api/v1/internal/prova/:id
   * @summary Deletes exam
   */
  async delete(id: string): Promise<void> {
    await authenticatedClient.delete(`/prova/${id}`);
  },

  /**
   * @endpoint POST /api/v1/internal/prova/:id/agendar
   * @summary Schedules exam for application
   */
  async agendar(id: string): Promise<Prova> {
    const response = await authenticatedClient.post<ApiResponse<Prova>>(`/prova/${id}/agendar`);
    return response.data.data;
  },
};
