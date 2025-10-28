import type { Prova, ProvaListParams } from '../../types';

export interface UseProvaListOptions {
  filters?: ProvaListParams;
  enabled?: boolean;
}

export interface UseProvaListReturn {
  provas: Prova[] | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
