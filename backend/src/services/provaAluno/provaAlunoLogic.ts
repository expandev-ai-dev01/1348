import { v4 as uuidv4 } from 'uuid';
import { provaGet } from '../prova';
import { questaoGet } from '../questao';
import type { AplicacaoProva, StatusAplicacao, Resposta } from './provaAlunoTypes';

const aplicacoes: AplicacaoProva[] = [];

/**
 * @summary
 * Gets available exam for a student
 *
 * @function provaAlunoDisponivel
 * @module services/provaAluno
 *
 * @param {string} id_aluno - Student ID
 *
 * @returns {Promise<any | null>} Available exam or null
 */
export async function provaAlunoDisponivel(id_aluno: string): Promise<any | null> {
  const now = new Date();
  const aplicacaoExistente = aplicacoes.find(
    (a) => a.id_aluno === id_aluno && a.status_aplicacao === 'em_andamento'
  );

  if (aplicacaoExistente) {
    const prova = await provaGet(aplicacaoExistente.id_prova);
    return {
      prova,
      aplicacao: aplicacaoExistente,
    };
  }

  return null;
}

/**
 * @summary
 * Starts an exam for a student
 *
 * @function provaAlunoIniciar
 * @module services/provaAluno
 *
 * @param {string} id_prova - Exam ID
 * @param {string} id_aluno - Student ID
 *
 * @returns {Promise<AplicacaoProva | null>} Started exam application or null
 */
export async function provaAlunoIniciar(
  id_prova: string,
  id_aluno: string
): Promise<AplicacaoProva | null> {
  const prova = await provaGet(id_prova);

  if (!prova || prova.status !== 'agendada') {
    return null;
  }

  const existente = aplicacoes.find((a) => a.id_prova === id_prova && a.id_aluno === id_aluno);

  if (existente) {
    return null;
  }

  let ordem_questoes = [...prova.questoes_selecionadas];
  if (prova.embaralhar_questoes) {
    ordem_questoes = ordem_questoes.sort(() => Math.random() - 0.5);
  }

  const aplicacao: AplicacaoProva = {
    id_aplicacao: uuidv4(),
    id_prova,
    id_aluno,
    status_aplicacao: 'em_andamento',
    horario_inicio: new Date(),
    tempo_restante: prova.duracao * 60,
    respostas: [],
    ordem_questoes,
  };

  aplicacoes.push(aplicacao);
  return aplicacao;
}

/**
 * @summary
 * Submits an answer to a question
 *
 * @function provaAlunoResponder
 * @module services/provaAluno
 *
 * @param {string} id_aplicacao - Application ID
 * @param {string} id_questao - Question ID
 * @param {any} resposta - Answer data
 *
 * @returns {Promise<AplicacaoProva | null>} Updated application or null
 */
export async function provaAlunoResponder(
  id_aplicacao: string,
  id_questao: string,
  resposta: any
): Promise<AplicacaoProva | null> {
  const index = aplicacoes.findIndex((a) => a.id_aplicacao === id_aplicacao);

  if (index === -1 || aplicacoes[index].status_aplicacao !== 'em_andamento') {
    return null;
  }

  const respostaIndex = aplicacoes[index].respostas.findIndex((r) => r.id_questao === id_questao);

  const novaResposta: Resposta = {
    id_questao,
    resposta,
  };

  if (respostaIndex === -1) {
    aplicacoes[index].respostas.push(novaResposta);
  } else {
    aplicacoes[index].respostas[respostaIndex] = novaResposta;
  }

  return aplicacoes[index];
}

/**
 * @summary
 * Finishes an exam for a student
 *
 * @function provaAlunoFinalizar
 * @module services/provaAluno
 *
 * @param {string} id_aplicacao - Application ID
 *
 * @returns {Promise<any | null>} Final result or null
 */
export async function provaAlunoFinalizar(id_aplicacao: string): Promise<any | null> {
  const index = aplicacoes.findIndex((a) => a.id_aplicacao === id_aplicacao);

  if (index === -1 || aplicacoes[index].status_aplicacao !== 'em_andamento') {
    return null;
  }

  aplicacoes[index].horario_termino = new Date();
  aplicacoes[index].status_aplicacao = 'finalizada';

  let nota_final = 0;
  const prova = await provaGet(aplicacoes[index].id_prova);

  if (prova) {
    for (const resposta of aplicacoes[index].respostas) {
      const questao = await questaoGet(resposta.id_questao);
      if (questao) {
        let correta = false;

        if (questao.tipo_questao === 'multipla_escolha' && questao.alternativas) {
          const alternativaCorreta = questao.alternativas.find((a) => a.correta);
          correta = alternativaCorreta?.texto === resposta.resposta;
        } else if (questao.tipo_questao === 'verdadeiro_falso') {
          correta = questao.resposta_correta === resposta.resposta;
        }

        if (correta) {
          nota_final += questao.valor_pontos;
        }
      }
    }
  }

  aplicacoes[index].nota_final = nota_final;

  return {
    nota_final,
    aplicacao: aplicacoes[index],
  };
}
