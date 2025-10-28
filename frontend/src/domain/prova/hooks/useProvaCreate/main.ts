import { useMutation, useQueryClient } from '@tanstack/react-query';
import { provaService } from '../../services';
import type { UseProvaCreateReturn } from './types';

/**
 * @hook useProvaCreate
 * @summary Hook for creating new exams
 * @domain prova
 * @type domain-hook
 * @category data
 */
export const useProvaCreate = (): UseProvaCreateReturn => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: provaService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['provas'] });
    },
  });

  return {
    createProva: mutateAsync,
    isCreating: isPending,
    error: error as Error | null,
  };
};
