/**
 * @module provaAluno
 * @summary Student exam application domain
 * @domain functional
 * @version 1.0.0
 */

export * from './types';
export * from './services';
export * from './hooks/useProvaDisponivel';
export * from './hooks/useProvaAplicacao';

export const moduleMetadata = {
  name: 'provaAluno',
  domain: 'functional',
  version: '1.0.0',
  publicServices: ['provaAlunoService'],
  publicHooks: ['useProvaDisponivel', 'useProvaAplicacao'],
  dependencies: {
    internal: ['@/core/lib/api', '@/core/types'],
    external: ['@tanstack/react-query', 'axios'],
  },
} as const;
