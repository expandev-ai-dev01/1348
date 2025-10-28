export interface ResultadoAluno {
  id_aluno: string;
  nome: string;
  nota: number;
  status: 'presente' | 'ausente';
}

export interface EstatisticasGerais {
  media: number;
  maior_nota: number;
  menor_nota: number;
  desvio_padrao: number;
}

export interface EstatisticaPorQuestao {
  id_questao: string;
  percentual_acertos: number;
  percentual_erros: number;
}

export interface EstatisticaPorTipo {
  tipo: string;
  percentual_acertos: number;
}

export interface Resultado {
  id_resultado: string;
  id_prova: string;
  id_turma: string;
  resultados_alunos: ResultadoAluno[];
  estatisticas_gerais: EstatisticasGerais;
  estatisticas_por_questao: EstatisticaPorQuestao[];
  estatisticas_por_tipo: EstatisticaPorTipo[];
  questoes_problematicas: string[];
  data_geracao: Date;
}

export interface ResultadoListFilters {
  id_prova?: string;
  id_turma?: string;
}
