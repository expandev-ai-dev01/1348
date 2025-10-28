import type { Prova, CreateProvaDto } from '../../types';

export interface UseProvaCreateReturn {
  createProva: (data: CreateProvaDto) => Promise<Prova>;
  isCreating: boolean;
  error: Error | null;
}
