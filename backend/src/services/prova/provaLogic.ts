import { v4 as uuidv4 } from 'uuid';
import { questaoGet } from '../questao';
import type {
  Prova,
  ProvaCreateRequest,
  ProvaUpdateRequest,
  ProvaListFilters,
  StatusProva,
} from './provaTypes';

const provas: Prova[] = [];

/**
 * @summary
 * Creates a new exam
 *
 * @function provaCreate
 * @module services/prova
 *
 * @param {ProvaCreateRequest} params - Exam creation parameters
 *
 * @returns {Promise<Prova>} Created exam
 */
export async function provaCreate(params: ProvaCreateRequest): Promise<Prova> {
  let valor_total = 0;
  for (const id_questao of params.questoes_selecionadas) {
    const questao = await questaoGet(id_questao);
    if (questao) {
      valor_total += questao.valor_pontos;
    }
  }

  const prova: Prova = {
    id_prova: uuidv4(),
    ...params,
    valor_total,
    status: 'rascunho',
    id_professor: 'mock-professor-id',
    data_criacao: new Date(),
  };

  provas.push(prova);
  return prova;
}

/**
 * @summary
 * Lists exams with optional filters
 *
 * @function provaList
 * @module services/prova
 *
 * @param {ProvaListFilters} filters - Optional filters
 *
 * @returns {Promise<Prova[]>} List of exams
 */
export async function provaList(filters: ProvaListFilters = {}): Promise<Prova[]> {
  let filtered = [...provas];

  if (filters.status) {
    filtered = filtered.filter((p) => p.status === filters.status);
  }

  return filtered;
}

/**
 * @summary
 * Gets a specific exam by ID
 *
 * @function provaGet
 * @module services/prova
 *
 * @param {string} id - Exam ID
 *
 * @returns {Promise<Prova | null>} Exam or null if not found
 */
export async function provaGet(id: string): Promise<Prova | null> {
  const prova = provas.find((p) => p.id_prova === id);
  return prova || null;
}

/**
 * @summary
 * Updates an existing exam
 *
 * @function provaUpdate
 * @module services/prova
 *
 * @param {string} id - Exam ID
 * @param {ProvaUpdateRequest} params - Update parameters
 *
 * @returns {Promise<Prova | null>} Updated exam or null if not found
 */
export async function provaUpdate(id: string, params: ProvaUpdateRequest): Promise<Prova | null> {
  const index = provas.findIndex((p) => p.id_prova === id);

  if (index === -1) {
    return null;
  }

  let valor_total = provas[index].valor_total;
  if (params.questoes_selecionadas) {
    valor_total = 0;
    for (const id_questao of params.questoes_selecionadas) {
      const questao = await questaoGet(id_questao);
      if (questao) {
        valor_total += questao.valor_pontos;
      }
    }
  }

  provas[index] = {
    ...provas[index],
    ...params,
    valor_total,
  };

  return provas[index];
}

/**
 * @summary
 * Deletes an exam
 *
 * @function provaDelete
 * @module services/prova
 *
 * @param {string} id - Exam ID
 *
 * @returns {Promise<boolean>} True if deleted, false if not found
 */
export async function provaDelete(id: string): Promise<boolean> {
  const index = provas.findIndex((p) => p.id_prova === id);

  if (index === -1) {
    return false;
  }

  provas.splice(index, 1);
  return true;
}

/**
 * @summary
 * Schedules an exam for application
 *
 * @function provaAgendar
 * @module services/prova
 *
 * @param {string} id - Exam ID
 *
 * @returns {Promise<Prova | null>} Scheduled exam or null if not found
 */
export async function provaAgendar(id: string): Promise<Prova | null> {
  const index = provas.findIndex((p) => p.id_prova === id);

  if (index === -1) {
    return null;
  }

  provas[index].status = 'agendada';
  return provas[index];
}
