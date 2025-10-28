import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { HTTP_STATUS } from '@/constants/httpStatus';
import {
  questaoCreate,
  questaoList,
  questaoGet,
  questaoUpdate,
  questaoDelete,
} from '@/services/questao';
import type { TipoQuestao, NivelDificuldade } from '@/services/questao/questaoTypes';

/**
 * @api {get} /internal/questao List Questions
 * @apiName ListQuestions
 * @apiGroup Question
 * @apiVersion 1.0.0
 *
 * @apiDescription Lists all questions created by the authenticated teacher
 *
 * @apiQuery {String} [tipo_questao] Filter by question type
 * @apiQuery {String} [tema_geografico] Filter by geographic theme
 * @apiQuery {String} [nivel_dificuldade] Filter by difficulty level
 *
 * @apiSuccess {Array} data List of questions
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const filters = {
      tipo_questao: req.query.tipo_questao as TipoQuestao | undefined,
      tema_geografico: req.query.tema_geografico as string | undefined,
      nivel_dificuldade: req.query.nivel_dificuldade as NivelDificuldade | undefined,
    };

    const data = await questaoList(filters);
    res.json(successResponse(data));
  } catch (error: any) {
    next(error);
  }
}

/**
 * @api {post} /internal/questao Create Question
 * @apiName CreateQuestion
 * @apiGroup Question
 * @apiVersion 1.0.0
 *
 * @apiDescription Creates a new question in the question bank
 */
export async function createHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const bodySchema = z.object({
    tipo_questao: z.enum([
      'multipla_escolha',
      'verdadeiro_falso',
      'associacao_colunas',
      'mapa_interativo',
    ]),
    enunciado: z.string().min(10).max(1000),
    nivel_dificuldade: z.enum(['facil', 'medio', 'dificil']),
    tema_geografico: z.string().min(1),
    alternativas: z
      .array(
        z.object({
          texto: z.string(),
          correta: z.boolean(),
        })
      )
      .min(2)
      .max(5)
      .optional(),
    afirmacao: z.string().min(10).max(500).optional(),
    resposta_correta: z.boolean().optional(),
    colunas: z
      .object({
        coluna_a: z.array(z.string()).min(2).max(5),
        coluna_b: z.array(z.string()).min(2).max(5),
        mapeamento: z.record(z.string()),
      })
      .optional(),
    mapa: z
      .object({
        url_imagem: z.string().url(),
        regioes: z.array(
          z.object({
            nome: z.string(),
            coordenadas: z.array(z.number()),
          })
        ),
      })
      .optional(),
    recursos_multimidia: z.array(z.string().url()).optional(),
    valor_pontos: z.number().positive().default(1.0),
  });

  try {
    const validated = bodySchema.parse(req.body);

    if (validated.tipo_questao === 'multipla_escolha' && !validated.alternativas) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(
          errorResponse('Questões de múltipla escolha devem ter alternativas', 'VALIDATION_ERROR')
        );
      return;
    }

    if (
      validated.tipo_questao === 'verdadeiro_falso' &&
      (validated.afirmacao === undefined || validated.resposta_correta === undefined)
    ) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(
          errorResponse(
            'Questões de verdadeiro/falso devem ter afirmação e resposta correta',
            'VALIDATION_ERROR'
          )
        );
      return;
    }

    if (validated.tipo_questao === 'associacao_colunas' && !validated.colunas) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(
          errorResponse('Questões de associação devem ter colunas definidas', 'VALIDATION_ERROR')
        );
      return;
    }

    if (validated.tipo_questao === 'mapa_interativo' && !validated.mapa) {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(
          errorResponse('Questões de mapa interativo devem ter mapa definido', 'VALIDATION_ERROR')
        );
      return;
    }

    const data = await questaoCreate(validated);
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
 * @api {get} /internal/questao/:id Get Question
 * @apiName GetQuestion
 * @apiGroup Question
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets a specific question by ID
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  });

  try {
    const validated = paramsSchema.parse(req.params);
    const data = await questaoGet(validated.id);

    if (!data) {
      res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse('Questão não encontrada', 'NOT_FOUND'));
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
 * @api {put} /internal/questao/:id Update Question
 * @apiName UpdateQuestion
 * @apiGroup Question
 * @apiVersion 1.0.0
 *
 * @apiDescription Updates an existing question
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
    tipo_questao: z
      .enum(['multipla_escolha', 'verdadeiro_falso', 'associacao_colunas', 'mapa_interativo'])
      .optional(),
    enunciado: z.string().min(10).max(1000).optional(),
    nivel_dificuldade: z.enum(['facil', 'medio', 'dificil']).optional(),
    tema_geografico: z.string().min(1).optional(),
    alternativas: z
      .array(
        z.object({
          texto: z.string(),
          correta: z.boolean(),
        })
      )
      .min(2)
      .max(5)
      .optional(),
    afirmacao: z.string().min(10).max(500).optional(),
    resposta_correta: z.boolean().optional(),
    colunas: z
      .object({
        coluna_a: z.array(z.string()).min(2).max(5),
        coluna_b: z.array(z.string()).min(2).max(5),
        mapeamento: z.record(z.string()),
      })
      .optional(),
    mapa: z
      .object({
        url_imagem: z.string().url(),
        regioes: z.array(
          z.object({
            nome: z.string(),
            coordenadas: z.array(z.number()),
          })
        ),
      })
      .optional(),
    recursos_multimidia: z.array(z.string().url()).optional(),
    valor_pontos: z.number().positive().optional(),
  });

  try {
    const validatedParams = paramsSchema.parse(req.params);
    const validatedBody = bodySchema.parse(req.body);

    const data = await questaoUpdate(validatedParams.id, validatedBody);

    if (!data) {
      res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse('Questão não encontrada', 'NOT_FOUND'));
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
 * @api {delete} /internal/questao/:id Delete Question
 * @apiName DeleteQuestion
 * @apiGroup Question
 * @apiVersion 1.0.0
 *
 * @apiDescription Deletes a question from the question bank
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
    const success = await questaoDelete(validated.id);

    if (!success) {
      res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse('Questão não encontrada', 'NOT_FOUND'));
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
