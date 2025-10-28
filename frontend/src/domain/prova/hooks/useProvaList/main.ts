import { useQuery } from '@tanstack/react-query';
import { provaService } from '../../services';
import type { UseProvaListOptions, UseProvaListReturn } from './types';

/**
 * @hook useProvaList
 * @summary Hook for fetching and managing exam list
 * @domain prova
 * @type domain-hook
 * @category data
 */
export const useProvaList = (options: UseProvaListOptions = {}): UseProvaListReturn => {
  const { filters, enabled = true } = options;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['provas', filters],
    queryFn: () => provaService.list(filters),
    enabled,
  });

  return {
    provas: data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
