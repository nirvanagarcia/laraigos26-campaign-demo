import { z } from 'zod';
import { fieldLabels, type FieldName } from './fieldLabels';

export const requiredString = (name: FieldName) => z.string().min(1, `${fieldLabels[name]} es requerido`);

export const requiredDate = (name: FieldName) => z.date({ 
  required_error: `${fieldLabels[name]} es requerida`,
  invalid_type_error: `${fieldLabels[name]} debe ser una fecha válida`
}).refine(date => date !== null && date !== undefined, {
  message: `${fieldLabels[name]} es requerida`
});

export const optionalString = () => z.string().optional();

export const requiredSelect = (name: FieldName) => z.string().min(1, `Selecciona ${fieldLabels[name].toLowerCase()}`);

export const trimmedString = (name: FieldName) => z.string().transform(v => v.trim()).pipe(z.string().min(1, `${fieldLabels[name]} es requerido`));

export const upperCaseString = (name: FieldName) => z.string().transform(v => v.toUpperCase().trim()).pipe(z.string().min(1, `${fieldLabels[name]} es requerido`));

export const createErrorMap = (): z.ZodErrorMap => (issue, ctx) => {
  switch (issue.code) {
    case z.ZodIssueCode.invalid_type:
      if (issue.expected === 'string') return { message: 'Campo requerido' };
      if (issue.expected === 'date') return { message: 'Fecha inválida' };
      break;
    case z.ZodIssueCode.too_small:
      if (issue.type === 'string') return { message: 'Campo requerido' };
      break;
    case z.ZodIssueCode.invalid_enum_value:
      return { message: 'Selecciona una opción válida' };
    case z.ZodIssueCode.custom:
      return { message: issue.message || 'Campo requerido' };
  }
  return { message: ctx.defaultError };
};

z.setErrorMap(createErrorMap());