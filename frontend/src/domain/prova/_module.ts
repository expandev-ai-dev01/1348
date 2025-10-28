/**
 * @module prova
 * @summary Exam creation and management domain
 * @domain functional
 * @version 1.0.0
 */

export * from './types';
export * from './services';
export * from './hooks/useProvaList';
export * from './hooks/useProvaCreate';

export const moduleMetadata = {
  name: 'prova',
  domain: 'functional',
  version: '1.0.0',
  publicServices: ['provaService'],
  publicHooks: ['useProvaList', 'useProvaCreate'],
  dependencies: {
    internal: ['@/core/lib/api', '@/core/types'],
    external: ['@tanstack/react-query', 'axios'],
  },
} as const;
