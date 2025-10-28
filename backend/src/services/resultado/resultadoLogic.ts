import { v4 as uuidv4 } from 'uuid';
import { provaGet } from '../prova';
import { questaoGet } from '../questao';
import type {
  Resultado,
  ResultadoListFilters,
  EstatisticasGerais,
  EstatisticaPorQuestao,
} from './resultadoTypes';

const resultados: Resultado[] = [];

/**
 * @summary
 * Lists exam results with optional filters
 *
 * @function resultadoList
 * @module services/resultado
 *
 * @param {ResultadoListFilters} filters - Optional filters
 *
 * @returns {Promise<Resultado[]>} List of results
 */
export async function resultadoList(filters: ResultadoListFilters = {}): Promise<Resultado[]> {
  let filtered = [...resultados];

  if (filters.id_prova) {
    filtered = filtered.filter((r) => r.id_prova === filters.id_prova);
  }

  if (filters.id_turma) {
    filtered = filtered.filter((r) => r.id_turma === filters.id_turma);
  }

  return filtered;
}

/**
 * @summary
 * Gets detailed results for a specific exam
 *
 * @function resultadoGet
 * @module services/resultado
 *
 * @param {string} id_prova - Exam ID
 *
 * @returns {Promise<Resultado | null>} Result or null if not found
 */
export async function resultadoGet(id_prova: string): Promise<Resultado | null> {
  const resultado = resultados.find((r) => r.id_prova === id_prova);
  return resultado || null;
}
