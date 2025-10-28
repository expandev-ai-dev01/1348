import { useMutation, useQueryClient } from '@tanstack/react-query';
import { provaAlunoService } from '../../services';
import type { UseProvaAplicacaoReturn } from './types';

/**
 * @hook useProvaAplicacao
 * @summary Hook for managing exam application (start, answer, finish)
 * @domain provaAluno
 * @type domain-hook
 * @category data
 */
export const useProvaAplicacao = (): UseProvaAplicacaoReturn => {
  const queryClient = useQueryClient();

  const iniciarMutation = useMutation({
    mutationFn: provaAlunoService.iniciar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prova-disponivel'] });
    },
  });

  const responderMutation = useMutation({
    mutationFn: provaAlunoService.responder,
  });

  const finalizarMutation = useMutation({
    mutationFn: provaAlunoService.finalizar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prova-disponivel'] });
    },
  });

  return {
    iniciarProva: iniciarMutation.mutateAsync,
    responderQuestao: responderMutation.mutateAsync,
    finalizarProva: finalizarMutation.mutateAsync,
    isIniciando: iniciarMutation.isPending,
    isRespondendo: responderMutation.isPending,
    isFinalizando: finalizarMutation.isPending,
    error: (iniciarMutation.error ||
      responderMutation.error ||
      finalizarMutation.error) as Error | null,
  };
};
