/**
 * @module questao
 * @summary Question bank management domain
 * @domain functional
 * @version 1.0.0
 */

export * from './types';
export * from './services';
export * from './hooks/useQuestaoList';
export * from './hooks/useQuestaoCreate';

export const moduleMetadata = {
  name: 'questao',
  domain: 'functional',
  version: '1.0.0',
  publicServices: ['questaoService'],
  publicHooks: ['useQuestaoList', 'useQuestaoCreate'],
  dependencies: {
    internal: ['@/core/lib/api', '@/core/types'],
    external: ['@tanstack/react-query', 'axios'],
  },
} as const;
