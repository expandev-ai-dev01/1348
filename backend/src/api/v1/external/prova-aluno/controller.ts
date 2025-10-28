import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { HTTP_STATUS } from '@/constants/httpStatus';
import {
  provaAlunoIniciar,
  provaAlunoResponder,
  provaAlunoFinalizar,
  provaAlunoDisponivel,
} from '@/services/provaAluno';

/**
 * @api {get} /external/prova-aluno/disponivel Get Available Exam
 * @apiName GetAvailableExam
 * @apiGroup StudentExam
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets available exam for the student
 */
export async function disponivelHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const querySchema = z.object({
    id_aluno: z.string().uuid(),
  });

  try {
    const validated = querySchema.parse(req.query);
    const data = await provaAlunoDisponivel(validated.id_aluno);

    if (!data) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json(errorResponse('Nenhuma prova disponível no momento', 'NOT_FOUND'));
      return;
    }

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
 * @api {post} /external/prova-aluno/iniciar Start Exam
 * @apiName StartExam
 * @apiGroup StudentExam
 * @apiVersion 1.0.0
 *
 * @apiDescription Starts an exam for a student
 */
export async function iniciarHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const bodySchema = z.object({
    id_prova: z.string().uuid(),
    id_aluno: z.string().uuid(),
  });

  try {
    const validated = bodySchema.parse(req.body);
    const data = await provaAlunoIniciar(validated.id_prova, validated.id_aluno);

    if (!data) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse('Não foi possível iniciar a prova', 'INVALID_REQUEST'));
      return;
    }

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
 * @api {post} /external/prova-aluno/responder Answer Question
 * @apiName AnswerQuestion
 * @apiGroup StudentExam
 * @apiVersion 1.0.0
 *
 * @apiDescription Submits an answer to a question
 */
export async function responderHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const bodySchema = z.object({
    id_aplicacao: z.string().uuid(),
    id_questao: z.string().uuid(),
    resposta: z.any(),
  });

  try {
    const validated = bodySchema.parse(req.body);
    const data = await provaAlunoResponder(
      validated.id_aplicacao,
      validated.id_questao,
      validated.resposta
    );

    if (!data) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse('Não foi possível registrar a resposta', 'INVALID_REQUEST'));
      return;
    }

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
 * @api {post} /external/prova-aluno/finalizar Finish Exam
 * @apiName FinishExam
 * @apiGroup StudentExam
 * @apiVersion 1.0.0
 *
 * @apiDescription Finishes an exam for a student
 */
export async function finalizarHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const bodySchema = z.object({
    id_aplicacao: z.string().uuid(),
  });

  try {
    const validated = bodySchema.parse(req.body);
    const data = await provaAlunoFinalizar(validated.id_aplicacao);

    if (!data) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse('Não foi possível finalizar a prova', 'INVALID_REQUEST'));
      return;
    }

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
