import type { Resultado, ResultadoListParams } from '../../types';

export interface UseResultadoListOptions {
  filters?: ResultadoListParams;
  enabled?: boolean;
}

export interface UseResultadoListReturn {
  resultados: Resultado[] | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
