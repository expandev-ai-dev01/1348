export type StatusAplicacao = 'nao_iniciada' | 'em_andamento' | 'finalizada' | 'ausente';

export interface ProvaDisponivel {
  id_prova: string;
  titulo: string;
  descricao?: string;
  data_aplicacao: string;
  hora_inicio: string;
  duracao: number;
  valor_total: number;
}

export interface AplicacaoProva {
  id_aplicacao: string;
  id_prova: string;
  id_aluno: string;
  status_aplicacao: StatusAplicacao;
  horario_inicio?: string;
  horario_termino?: string;
  tempo_restante?: number;
  respostas?: Array<{
    id_questao: string;
    resposta: any;
  }>;
  nota_final?: number;
  ordem_questoes?: string[];
}

export interface IniciarProvaDto {
  id_prova: string;
  id_aluno: string;
}

export interface ResponderQuestaoDto {
  id_aplicacao: string;
  id_questao: string;
  resposta: any;
}

export interface FinalizarProvaDto {
  id_aplicacao: string;
}
