import { useQuery } from '@tanstack/react-query';
import { provaAlunoService } from '../../services';
import type { UseProvaDisponivelOptions, UseProvaDisponivelReturn } from './types';

/**
 * @hook useProvaDisponivel
 * @summary Hook for fetching available exam for student
 * @domain provaAluno
 * @type domain-hook
 * @category data
 */
export const useProvaDisponivel = (
  options: UseProvaDisponivelOptions
): UseProvaDisponivelReturn => {
  const { id_aluno, enabled = true } = options;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['prova-disponivel', id_aluno],
    queryFn: () => provaAlunoService.disponivel(id_aluno),
    enabled: enabled && !!id_aluno,
  });

  return {
    prova: data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
