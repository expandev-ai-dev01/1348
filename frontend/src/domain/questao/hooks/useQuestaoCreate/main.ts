import { useMutation, useQueryClient } from '@tanstack/react-query';
import { questaoService } from '../../services';
import type { UseQuestaoCreateReturn } from './types';

/**
 * @hook useQuestaoCreate
 * @summary Hook for creating new questions
 * @domain questao
 * @type domain-hook
 * @category data
 */
export const useQuestaoCreate = (): UseQuestaoCreateReturn => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: questaoService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questoes'] });
    },
  });

  return {
    createQuestao: mutateAsync,
    isCreating: isPending,
    error: error as Error | null,
  };
};
