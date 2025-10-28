/**
 * @constants APPLICATION_ROUTES
 * @summary Application route paths
 * @category routing
 */
export const APPLICATION_ROUTES = {
  HOME: '/',
  NOT_FOUND: '*',
} as const;

export type ApplicationRoute = (typeof APPLICATION_ROUTES)[keyof typeof APPLICATION_ROUTES];
