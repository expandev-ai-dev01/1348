/**
 * @module resultado
 * @summary Exam results and analysis domain
 * @domain functional
 * @version 1.0.0
 */

export * from './types';
export * from './services';
export * from './hooks/useResultadoList';

export const moduleMetadata = {
  name: 'resultado',
  domain: 'functional',
  version: '1.0.0',
  publicServices: ['resultadoService'],
  publicHooks: ['useResultadoList'],
  dependencies: {
    internal: ['@/core/lib/api', '@/core/types'],
    external: ['@tanstack/react-query', 'axios'],
  },
} as const;
