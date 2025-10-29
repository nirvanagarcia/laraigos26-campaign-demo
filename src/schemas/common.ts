import { z } from 'zod';
import { fieldLabels, type FieldName } from './fieldLabels';

const baseSchema = (
  type: 'string' | 'number' | 'date' | 'select' | 'boolean' | 'array',
  required: boolean,
  name?: FieldName,
  subschema?: z.ZodTypeAny
) => {
  switch (type) {
    case 'string':
    case 'select':
      return required
        ? z.string().min(1, `${fieldLabels[name!]} es requerido`)
        : z.string().optional();

    case 'number':
      return required
        ? z.coerce
            .number({ invalid_type_error: `${fieldLabels[name!]} debe ser un número válido` })
            .refine(val => !isNaN(val), `${fieldLabels[name!]} debe ser numérico`)
        : z.coerce.number().optional();

    case 'date':
      return required
        ? z.coerce.date({
            required_error: `${fieldLabels[name!]} es requerida`,
            invalid_type_error: `${fieldLabels[name!]} debe ser una fecha válida`,
          })
        : z
            .coerce
            .date({
              invalid_type_error: name
                ? `${fieldLabels[name]} debe ser una fecha válida`
                : 'Fecha inválida',
            })
            .nullable()
            .optional();

    case 'boolean':
      return required ? z.boolean() : z.boolean().optional();

    case 'array':
      const baseArray = z.array(subschema || z.any());
      return required
        ? baseArray.min(1, `${fieldLabels[name!]} debe tener al menos un elemento`)
        : baseArray.optional();

    default:
      throw new Error(`Tipo de campo no soportado: ${type}`);
  }
};

export const required = (
  type: 'string' | 'number' | 'date' | 'select' | 'boolean' | 'array',
  name: FieldName,
  subschema?: z.ZodTypeAny
) => baseSchema(type, true, name, subschema);

export const optional = (
  type: 'string' | 'number' | 'date' | 'select' | 'boolean' | 'array',
  name: FieldName,
  subschema?: z.ZodTypeAny
) => baseSchema(type, false, name, subschema);

export const buildFieldIssue = (
  fieldName: FieldName,
  path: string[],
  isRequired: boolean = true
) => ({
  path,
  code: z.ZodIssueCode.custom,
  message: `${fieldLabels[fieldName]} es ${
    isRequired ? 'requerida' : 'requerido'
  }`,
});
