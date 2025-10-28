import type { Questao, CreateQuestaoDto } from '../../types';

export interface UseQuestaoCreateReturn {
  createQuestao: (data: CreateQuestaoDto) => Promise<Questao>;
  isCreating: boolean;
  error: Error | null;
}
