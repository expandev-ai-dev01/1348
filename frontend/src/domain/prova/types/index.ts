export type StatusProva = 'rascunho' | 'agendada' | 'em_andamento' | 'finalizada' | 'cancelada';

export interface Prova {
  id_prova: string;
  titulo: string;
  descricao?: string;
  data_aplicacao: string;
  hora_inicio: string;
  duracao: number;
  valor_total: number;
  questoes_selecionadas: string[];
  turmas_selecionadas: string[];
  status: StatusProva;
  embaralhar_questoes: boolean;
  id_professor: string;
  data_criacao: string;
}

export interface ProvaListParams {
  status?: StatusProva;
}

export interface CreateProvaDto {
  titulo: string;
  descricao?: string;
  data_aplicacao: string;
  hora_inicio: string;
  duracao: number;
  questoes_selecionadas: string[];
  turmas_selecionadas: string[];
  embaralhar_questoes?: boolean;
}

export interface UpdateProvaDto {
  titulo?: string;
  descricao?: string;
  data_aplicacao?: string;
  hora_inicio?: string;
  duracao?: number;
  questoes_selecionadas?: string[];
  turmas_selecionadas?: string[];
  embaralhar_questoes?: boolean;
}
