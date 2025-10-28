import type {
  AplicacaoProva,
  IniciarProvaDto,
  ResponderQuestaoDto,
  FinalizarProvaDto,
} from '../../types';

export interface UseProvaAplicacaoReturn {
  iniciarProva: (data: IniciarProvaDto) => Promise<AplicacaoProva>;
  responderQuestao: (data: ResponderQuestaoDto) => Promise<AplicacaoProva>;
  finalizarProva: (data: FinalizarProvaDto) => Promise<AplicacaoProva>;
  isIniciando: boolean;
  isRespondendo: boolean;
  isFinalizando: boolean;
  error: Error | null;
}
