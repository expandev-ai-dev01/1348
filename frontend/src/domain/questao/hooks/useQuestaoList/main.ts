import { useQuery } from '@tanstack/react-query';
import { questaoService } from '../../services';
import type { UseQuestaoListOptions, UseQuestaoListReturn } from './types';

/**
 * @hook useQuestaoList
 * @summary Hook for fetching and managing question list
 * @domain questao
 * @type domain-hook
 * @category data
 */
export const useQuestaoList = (options: UseQuestaoListOptions = {}): UseQuestaoListReturn => {
  const { filters, enabled = true } = options;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['questoes', filters],
    queryFn: () => questaoService.list(filters),
    enabled,
  });

  return {
    questoes: data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
