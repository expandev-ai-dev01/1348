/**
 * @summary
 * Internal (authenticated) API routes configuration
 *
 * @module routes/v1/internalRoutes
 */

import { Router } from 'express';
import * as questaoController from '@/api/v1/internal/questao/controller';
import * as provaController from '@/api/v1/internal/prova/controller';
import * as resultadoController from '@/api/v1/internal/resultado/controller';

const router = Router();

/**
 * @summary
 * Question bank routes
 * Base path: /api/v1/internal/questao
 */
router.get('/questao', questaoController.listHandler);
router.post('/questao', questaoController.createHandler);
router.get('/questao/:id', questaoController.getHandler);
router.put('/questao/:id', questaoController.updateHandler);
router.delete('/questao/:id', questaoController.deleteHandler);

/**
 * @summary
 * Exam routes
 * Base path: /api/v1/internal/prova
 */
router.get('/prova', provaController.listHandler);
router.post('/prova', provaController.createHandler);
router.get('/prova/:id', provaController.getHandler);
router.put('/prova/:id', provaController.updateHandler);
router.delete('/prova/:id', provaController.deleteHandler);
router.post('/prova/:id/agendar', provaController.agendarHandler);

/**
 * @summary
 * Result routes
 * Base path: /api/v1/internal/resultado
 */
router.get('/resultado', resultadoController.listHandler);
router.get('/resultado/:id', resultadoController.getHandler);

export default router;
