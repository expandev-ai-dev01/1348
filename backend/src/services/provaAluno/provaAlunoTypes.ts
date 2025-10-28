export type StatusAplicacao = 'nao_iniciada' | 'em_andamento' | 'finalizada' | 'ausente';

export interface Resposta {
  id_questao: string;
  resposta: any;
}

export interface AplicacaoProva {
  id_aplicacao: string;
  id_prova: string;
  id_aluno: string;
  status_aplicacao: StatusAplicacao;
  horario_inicio?: Date;
  horario_termino?: Date;
  tempo_restante?: number;
  respostas: Resposta[];
  nota_final?: number;
  ordem_questoes?: string[];
}
