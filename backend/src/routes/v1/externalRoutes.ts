/**
 * @summary
 * External (public) API routes configuration
 *
 * @module routes/v1/externalRoutes
 */

import { Router } from 'express';
import * as provaAlunoController from '@/api/v1/external/prova-aluno/controller';

const router = Router();

/**
 * @summary
 * Student exam routes
 * Base path: /api/v1/external/prova-aluno
 */
router.get('/prova-aluno/disponivel', provaAlunoController.disponivelHandler);
router.post('/prova-aluno/iniciar', provaAlunoController.iniciarHandler);
router.post('/prova-aluno/responder', provaAlunoController.responderHandler);
router.post('/prova-aluno/finalizar', provaAlunoController.finalizarHandler);

export default router;
