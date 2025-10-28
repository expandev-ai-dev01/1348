import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { HTTP_STATUS } from '@/constants/httpStatus';
import {
  provaCreate,
  provaList,
  provaGet,
  provaUpdate,
  provaDelete,
  provaAgendar,
} from '@/services/prova';
import type { StatusProva } from '@/services/prova/provaTypes';

/**
 * @api {get} /internal/prova List Exams
 * @apiName ListExams
 * @apiGroup Exam
 * @apiVersion 1.0.0
 *
 * @apiDescription Lists all exams created by the authenticated teacher
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const filters = {
      status: req.query.status as StatusProva | undefined,
    };

    const data = await provaList(filters);
    res.json(successResponse(data));
  } catch (error: any) {
    next(error);
  }
}

/**
 * @api {post} /internal/prova Create Exam
 * @apiName CreateExam
 * @apiGroup Exam
 * @apiVersion 1.0.0
 *
 * @apiDescription Creates a new exam
 */
export async function createHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const bodySchema = z.object({
    titulo: z.string().min(5).max(100),
    descricao: z.string().max(500).optional(),
    data_aplicacao: z.string().refine((date) => {
      const parsedDate = new Date(date);
      return parsedDate > new Date();
    }, 'Data de aplicação deve ser futura'),
    hora_inicio: z.string().regex(/^\d{2}:\d{2}$/),
    duracao: z.number().int().min(15).max(180),
    questoes_selecionadas: z.array(z.string().uuid()).min(1),
    turmas_selecionadas: z.array(z.string().uuid()).min(1),
    embaralhar_questoes: z.boolean().default(false),
  });

  try {
    const validated = bodySchema.parse(req.body);
    const data = await provaCreate(validated);
    res.status(HTTP_STATUS.CREATED).json(successResponse(data));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse('Dados inválidos', 'VALIDATION_ERROR', error.errors));
    } else {
      next(error);
    }
  }
}

/**
 * @api {get} /internal/prova/:id Get Exam
 * @apiName GetExam
 * @apiGroup Exam
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets a specific exam by ID
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  });

  try {
    const validated = paramsSchema.parse(req.params);
    const data = await provaGet(validated.id);

    if (!data) {
      res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse('Prova não encontrada', 'NOT_FOUND'));
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

/**
 * @api {put} /internal/prova/:id Update Exam
 * @apiName UpdateExam
 * @apiGroup Exam
 * @apiVersion 1.0.0
 *
 * @apiDescription Updates an existing exam
 */
export async function updateHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  });

  const bodySchema = z.object({
    titulo: z.string().min(5).max(100).optional(),
    descricao: z.string().max(500).optional(),
    data_aplicacao: z.string().optional(),
    hora_inicio: z
      .string()
      .regex(/^\d{2}:\d{2}$/)
      .optional(),
    duracao: z.number().int().min(15).max(180).optional(),
    questoes_selecionadas: z.array(z.string().uuid()).min(1).optional(),
    turmas_selecionadas: z.array(z.string().uuid()).min(1).optional(),
    embaralhar_questoes: z.boolean().optional(),
  });

  try {
    const validatedParams = paramsSchema.parse(req.params);
    const validatedBody = bodySchema.parse(req.body);

    const currentProva = await provaGet(validatedParams.id);
    if (!currentProva) {
      res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse('Prova não encontrada', 'NOT_FOUND'));
      return;
    }

    if (currentProva.status === 'em_andamento' || currentProva.status === 'finalizada') {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(
          errorResponse(
            'Não é possível editar uma prova que já está em andamento ou finalizada',
            'INVALID_STATUS'
          )
        );
      return;
    }

    const data = await provaUpdate(validatedParams.id, validatedBody);
    res.json(successResponse(data));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse('Dados inválidos', 'VALIDATION_ERROR', error.errors));
    } else {
      next(error);
    }
  }
}

/**
 * @api {delete} /internal/prova/:id Delete Exam
 * @apiName DeleteExam
 * @apiGroup Exam
 * @apiVersion 1.0.0
 *
 * @apiDescription Deletes an exam
 */
export async function deleteHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  });

  try {
    const validated = paramsSchema.parse(req.params);
    const success = await provaDelete(validated.id);

    if (!success) {
      res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse('Prova não encontrada', 'NOT_FOUND'));
      return;
    }

    res.status(HTTP_STATUS.NO_CONTENT).send();
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

/**
 * @api {post} /internal/prova/:id/agendar Schedule Exam
 * @apiName ScheduleExam
 * @apiGroup Exam
 * @apiVersion 1.0.0
 *
 * @apiDescription Schedules an exam for application
 */
export async function agendarHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  });

  try {
    const validated = paramsSchema.parse(req.params);
    const data = await provaAgendar(validated.id);

    if (!data) {
      res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse('Prova não encontrada', 'NOT_FOUND'));
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
