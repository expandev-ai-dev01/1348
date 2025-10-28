export interface ResultadoAluno {
  id_aluno: string;
  nome: string;
  nota: number;
  status: 'presente' | 'ausente';
}

export interface EstatisticasGerais {
  media_turma: number;
  maior_nota: number;
  menor_nota: number;
  desvio_padrao: number;
}

export interface EstatisticaQuestao {
  id_questao: string;
  percentual_acertos: number;
  percentual_erros: number;
}

export interface EstatisticasTipo {
  multipla_escolha?: number;
  verdadeiro_falso?: number;
  associacao_colunas?: number;
  mapa_interativo?: number;
}

export interface Resultado {
  id_resultado: string;
  id_prova: string;
  id_turma: string;
  resultados_alunos: ResultadoAluno[];
  estatisticas_gerais: EstatisticasGerais;
  estatisticas_por_questao: EstatisticaQuestao[];
  estatisticas_por_tipo: EstatisticasTipo;
  questoes_problematicas: string[];
  data_geracao: string;
}

export interface ResultadoListParams {
  id_prova?: string;
  id_turma?: string;
}
