import { publicClient } from '@/core/lib/api';
import type {
  ProvaDisponivel,
  AplicacaoProva,
  IniciarProvaDto,
  ResponderQuestaoDto,
  FinalizarProvaDto,
} from '../types';
import type { ApiResponse } from '@/core/types';

/**
 * @service provaAlunoService
 * @summary Student exam service for public endpoints
 * @domain provaAluno
 * @type rest-service
 * @apiContext external
 */
export const provaAlunoService = {
  /**
   * @endpoint GET /api/v1/external/prova-aluno/disponivel
   * @summary Gets available exam for student
   */
  async disponivel(id_aluno: string): Promise<ProvaDisponivel | null> {
    const response = await publicClient.get<ApiResponse<ProvaDisponivel>>(
      '/prova-aluno/disponivel',
      {
        params: { id_aluno },
      }
    );
    return response.data.data;
  },

  /**
   * @endpoint POST /api/v1/external/prova-aluno/iniciar
   * @summary Starts exam for student
   */
  async iniciar(data: IniciarProvaDto): Promise<AplicacaoProva> {
    const response = await publicClient.post<ApiResponse<AplicacaoProva>>(
      '/prova-aluno/iniciar',
      data
    );
    return response.data.data;
  },

  /**
   * @endpoint POST /api/v1/external/prova-aluno/responder
   * @summary Submits answer to question
   */
  async responder(data: ResponderQuestaoDto): Promise<AplicacaoProva> {
    const response = await publicClient.post<ApiResponse<AplicacaoProva>>(
      '/prova-aluno/responder',
      data
    );
    return response.data.data;
  },

  /**
   * @endpoint POST /api/v1/external/prova-aluno/finalizar
   * @summary Finishes exam for student
   */
  async finalizar(data: FinalizarProvaDto): Promise<AplicacaoProva> {
    const response = await publicClient.post<ApiResponse<AplicacaoProva>>(
      '/prova-aluno/finalizar',
      data
    );
    return response.data.data;
  },
};
