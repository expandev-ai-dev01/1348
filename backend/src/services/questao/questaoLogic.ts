import { v4 as uuidv4 } from 'uuid';
import type {
  Questao,
  QuestaoCreateRequest,
  QuestaoUpdateRequest,
  QuestaoListFilters,
} from './questaoTypes';

const questoes: Questao[] = [];

/**
 * @summary
 * Creates a new question in the question bank
 *
 * @function questaoCreate
 * @module services/questao
 *
 * @param {QuestaoCreateRequest} params - Question creation parameters
 *
 * @returns {Promise<Questao>} Created question
 */
export async function questaoCreate(params: QuestaoCreateRequest): Promise<Questao> {
  const questao: Questao = {
    id_questao: uuidv4(),
    ...params,
    data_criacao: new Date(),
    id_professor: 'mock-professor-id',
  };

  questoes.push(questao);
  return questao;
}

/**
 * @summary
 * Lists questions with optional filters
 *
 * @function questaoList
 * @module services/questao
 *
 * @param {QuestaoListFilters} filters - Optional filters
 *
 * @returns {Promise<Questao[]>} List of questions
 */
export async function questaoList(filters: QuestaoListFilters = {}): Promise<Questao[]> {
  let filtered = [...questoes];

  if (filters.tipo_questao) {
    filtered = filtered.filter((q) => q.tipo_questao === filters.tipo_questao);
  }

  if (filters.tema_geografico) {
    filtered = filtered.filter((q) => q.tema_geografico === filters.tema_geografico);
  }

  if (filters.nivel_dificuldade) {
    filtered = filtered.filter((q) => q.nivel_dificuldade === filters.nivel_dificuldade);
  }

  return filtered;
}

/**
 * @summary
 * Gets a specific question by ID
 *
 * @function questaoGet
 * @module services/questao
 *
 * @param {string} id - Question ID
 *
 * @returns {Promise<Questao | null>} Question or null if not found
 */
export async function questaoGet(id: string): Promise<Questao | null> {
  const questao = questoes.find((q) => q.id_questao === id);
  return questao || null;
}

/**
 * @summary
 * Updates an existing question
 *
 * @function questaoUpdate
 * @module services/questao
 *
 * @param {string} id - Question ID
 * @param {QuestaoUpdateRequest} params - Update parameters
 *
 * @returns {Promise<Questao | null>} Updated question or null if not found
 */
export async function questaoUpdate(
  id: string,
  params: QuestaoUpdateRequest
): Promise<Questao | null> {
  const index = questoes.findIndex((q) => q.id_questao === id);

  if (index === -1) {
    return null;
  }

  questoes[index] = {
    ...questoes[index],
    ...params,
  };

  return questoes[index];
}

/**
 * @summary
 * Deletes a question
 *
 * @function questaoDelete
 * @module services/questao
 *
 * @param {string} id - Question ID
 *
 * @returns {Promise<boolean>} True if deleted, false if not found
 */
export async function questaoDelete(id: string): Promise<boolean> {
  const index = questoes.findIndex((q) => q.id_questao === id);

  if (index === -1) {
    return false;
  }

  questoes.splice(index, 1);
  return true;
}
