import { useQuery } from '@tanstack/react-query';
import { resultadoService } from '../../services';
import type { UseResultadoListOptions, UseResultadoListReturn } from './types';

/**
 * @hook useResultadoList
 * @summary Hook for fetching and managing result list
 * @domain resultado
 * @type domain-hook
 * @category data
 */
export const useResultadoList = (options: UseResultadoListOptions = {}): UseResultadoListReturn => {
  const { filters, enabled = true } = options;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['resultados', filters],
    queryFn: () => resultadoService.list(filters),
    enabled,
  });

  return {
    resultados: data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
