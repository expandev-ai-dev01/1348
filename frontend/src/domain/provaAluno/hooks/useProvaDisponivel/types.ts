import type { ProvaDisponivel } from '../../types';

export interface UseProvaDisponivelOptions {
  id_aluno: string;
  enabled?: boolean;
}

export interface UseProvaDisponivelReturn {
  prova: ProvaDisponivel | null | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
