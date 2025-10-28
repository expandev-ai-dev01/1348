export type TipoQuestao =
  | 'multipla_escolha'
  | 'verdadeiro_falso'
  | 'associacao_colunas'
  | 'mapa_interativo';
export type NivelDificuldade = 'facil' | 'medio' | 'dificil';

export interface Alternativa {
  texto: string;
  correta: boolean;
}

export interface Colunas {
  coluna_a: string[];
  coluna_b: string[];
  mapeamento: Record<string, string>;
}

export interface Mapa {
  url_imagem: string;
  regioes: Array<{
    nome: string;
    coordenadas: number[];
  }>;
}

export interface Questao {
  id_questao: string;
  tipo_questao: TipoQuestao;
  enunciado: string;
  nivel_dificuldade: NivelDificuldade;
  tema_geografico: string;
  alternativas?: Alternativa[];
  afirmacao?: string;
  resposta_correta?: boolean;
  colunas?: Colunas;
  mapa?: Mapa;
  recursos_multimidia?: string[];
  valor_pontos: number;
  data_criacao: Date;
  id_professor: string;
}

export interface QuestaoCreateRequest {
  tipo_questao: TipoQuestao;
  enunciado: string;
  nivel_dificuldade: NivelDificuldade;
  tema_geografico: string;
  alternativas?: Alternativa[];
  afirmacao?: string;
  resposta_correta?: boolean;
  colunas?: Colunas;
  mapa?: Mapa;
  recursos_multimidia?: string[];
  valor_pontos: number;
}

export interface QuestaoUpdateRequest {
  tipo_questao?: TipoQuestao;
  enunciado?: string;
  nivel_dificuldade?: NivelDificuldade;
  tema_geografico?: string;
  alternativas?: Alternativa[];
  afirmacao?: string;
  resposta_correta?: boolean;
  colunas?: Colunas;
  mapa?: Mapa;
  recursos_multimidia?: string[];
  valor_pontos?: number;
}

export interface QuestaoListFilters {
  tipo_questao?: TipoQuestao;
  tema_geografico?: string;
  nivel_dificuldade?: NivelDificuldade;
}
