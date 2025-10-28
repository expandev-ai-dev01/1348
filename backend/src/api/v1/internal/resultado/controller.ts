import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { HTTP_STATUS } from '@/constants/httpStatus';
import { resultadoGet, resultadoList } from '@/services/resultado';

/**
 * @api {get} /internal/resultado List Results
 * @apiName ListResults
 * @apiGroup Result
 * @apiVersion 1.0.0
 *
 * @apiDescription Lists all exam results for the authenticated teacher
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const filters = {
      id_prova: req.query.id_prova as string | undefined,
      id_turma: req.query.id_turma as string | undefined,
    };

    const data = await resultadoList(filters);
    res.json(successResponse(data));
  } catch (error: any) {
    next(error);
  }
}

/**
 * @api {get} /internal/resultado/:id Get Result
 * @apiName GetResult
 * @apiGroup Result
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets detailed results for a specific exam
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  });

  try {
    const validated = paramsSchema.parse(req.params);
    const data = await resultadoGet(validated.id);

    if (!data) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json(errorResponse('Resultado não encontrado', 'NOT_FOUND'));
      return;
    }

    res.json(successResponse(data));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse('ID inválido', 'VALIDATION_ERROR', error.errors));
    } else {
      next(error);
    }
  }
}
