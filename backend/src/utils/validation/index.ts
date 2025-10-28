/**
 * @summary
 * Common validation utilities using Zod
 *
 * @module utils/validation
 */

import { z } from 'zod';

/**
 * @summary
 * Common Zod validation schemas
 */

export const zString = z.string().min(1, 'Campo obrigatório');
export const zNullableString = z.string().nullable();
export const zEmail = z.string().email('Email inválido');
export const zNumber = z.number();
export const zPositiveNumber = z.number().positive('Deve ser um número positivo');
export const zBoolean = z.boolean();
export const zDate = z.date();
export const zDateString = z.string().datetime();

/**
 * @summary
 * Creates a string schema with maximum length
 *
 * @function zMaxString
 * @module utils/validation
 *
 * @param {number} maxLength - Maximum string length
 *
 * @returns {z.ZodString} Zod string schema
 */
export const zMaxString = (maxLength: number) =>
  z.string().max(maxLength, `Máximo ${maxLength} caracteres`);

/**
 * @summary
 * Creates a nullable string schema with maximum length
 *
 * @function zNullableMaxString
 * @module utils/validation
 *
 * @param {number} maxLength - Maximum string length
 *
 * @returns {z.ZodNullable<z.ZodString>} Zod nullable string schema
 */
export const zNullableMaxString = (maxLength: number) =>
  z.string().max(maxLength, `Máximo ${maxLength} caracteres`).nullable();

/**
 * @summary
 * ID validation schema
 */
export const zId = z.coerce.number().int().positive('ID inválido');

/**
 * @summary
 * Optional ID validation schema
 */
export const zOptionalId = z.coerce.number().int().positive('ID inválido').optional();

/**
 * @summary
 * Nullable ID validation schema
 */
export const zNullableId = z.coerce.number().int().positive('ID inválido').nullable();
