import type { Questao, QuestaoListParams } from '../../types';

export interface UseQuestaoListOptions {
  filters?: QuestaoListParams;
  enabled?: boolean;
}

export interface UseQuestaoListReturn {
  questoes: Questao[] | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
