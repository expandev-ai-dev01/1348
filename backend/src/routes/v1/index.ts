/**
 * @summary
 * V1 API router configuration
 *
 * @module routes/v1
 */

import { Router } from 'express';
import externalRoutes from './externalRoutes';
import internalRoutes from './internalRoutes';

const router = Router();

/**
 * @summary
 * External (public) routes
 * Base path: /api/v1/external
 */
router.use('/external', externalRoutes);

/**
 * @summary
 * Internal (authenticated) routes
 * Base path: /api/v1/internal
 */
router.use('/internal', internalRoutes);

export default router;
