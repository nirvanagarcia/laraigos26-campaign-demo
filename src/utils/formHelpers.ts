import { zodResolver } from '@hookform/resolvers/zod';
import type { FieldErrors } from 'react-hook-form';
import { z } from 'zod';
import { campaignSchema, generalSchema, personasSchema, type CampaignFormData } from '../schemas/campaignSchema';

export const getZodError = <T>(errors: FieldErrors<T>, path: string): string | undefined => {
  const keys = path.split('.');
  let current: any = errors;
  for (const key of keys) {
    current = current?.[key];
  }
  return current?.message;
};

export const hasZodError = <T>(errors: FieldErrors<T>, path: string): boolean => {
  return !!getZodError(errors, path);
};

export const buildDefaults = (schema: z.ZodTypeAny): any => {
  try {
    if (schema instanceof z.ZodObject) {
      const shape = schema.shape || schema._def?.shape;
      if (!shape) return {};
      return Object.fromEntries(Object.entries(shape).map(([key, fieldSchema]) => [key, buildDefaults(fieldSchema as z.ZodTypeAny)]));
    }
    
    if (schema instanceof z.ZodDefault) {
      const defaultValue = schema._def?.defaultValue;
      if (typeof defaultValue === 'function') {
        try {
          return defaultValue();
        } catch {
          return undefined;
        }
      }
      return defaultValue;
    }
    
    if (schema instanceof z.ZodArray) {
      return [];
    }
    
    if (schema instanceof z.ZodOptional) {
      const innerType = schema._def?.innerType;
      return innerType ? buildDefaults(innerType) : undefined;
    }
    
    if (schema instanceof z.ZodNullable) {
      const innerType = schema._def?.innerType;
      return innerType ? buildDefaults(innerType) : null;
    }
    
    if (schema instanceof z.ZodString) {
      return '';
    }
    
    if (schema instanceof z.ZodNumber) {
      return 0;
    }
    
    if (schema instanceof z.ZodBoolean) {
      return false;
    }
    
    if (schema instanceof z.ZodEnum) {
      const values = schema._def?.values;
      return Array.isArray(values) && values.length > 0 ? values[0] : '';
    }
    
    if (schema instanceof z.ZodLiteral) {
      return schema._def?.value;
    }
    
    if (schema instanceof z.ZodTuple) {
      const items = schema._def?.items;
      return Array.isArray(items) ? items.map((item: z.ZodTypeAny) => buildDefaults(item)) : [];
    }
    
    if (schema instanceof z.ZodRecord) {
      return {};
    }
    
    if (schema instanceof z.ZodDate) {
      return null;
    }
    
    if (schema instanceof z.ZodUnion) {
      const options = schema._def?.options;
      return Array.isArray(options) && options.length > 0 ? buildDefaults(options[0]) : undefined;
    }
    
    return undefined;
  } catch (error) {
    console.warn('Error building defaults for schema:', error);
    return undefined;
  }
};

export const getResolver = (tab?: 'general' | 'personas') => {
  switch (tab) {
    case 'general':
      return zodResolver(z.object({ general: generalSchema }));
    case 'personas':
      return zodResolver(z.object({ personas: personasSchema }));
    default:
      return zodResolver(campaignSchema);
  }
};

export class FormArrayHelper<T = any> {
  constructor(private getValues: (path?: string) => any, private setValue: (path: string, value: any) => void) {}

  updateArrayItem(arrayPath: string, index: number, updates: Partial<T>): void {
    const currentArray = this.getValues(arrayPath) || [];
    const updatedArray = [...currentArray];
    updatedArray[index] = { ...updatedArray[index], ...updates };
    this.setValue(arrayPath, updatedArray);
  }

  addArrayItem(arrayPath: string, newItem: T): void {
    const currentArray = this.getValues(arrayPath) || [];
    this.setValue(arrayPath, [...currentArray, newItem]);
  }

  removeArrayItem(arrayPath: string, index: number): void {
    const currentArray = this.getValues(arrayPath) || [];
    const updatedArray = currentArray.filter((_: any, i: number) => i !== index);
    this.setValue(arrayPath, updatedArray);
  }

  moveArrayItem(arrayPath: string, fromIndex: number, toIndex: number): void {
    const currentArray = this.getValues(arrayPath) || [];
    const updatedArray = [...currentArray];
    const [removed] = updatedArray.splice(fromIndex, 1);
    updatedArray.splice(toIndex, 0, removed);
    this.setValue(arrayPath, updatedArray);
  }
}

export const transformFormDataForSubmission = (formData: CampaignFormData) => {
  return {
    ...formData,
    general: {
      ...formData.general,
      fechaInicio: formData.general.fechaInicio?.toISOString(),
      fechaFin: formData.general.fechaFin?.toISOString(),
      fechaProgramacion: formData.general.fechaProgramacion?.toISOString(),
    },
  };
};

export const validateConditionalFields = (formData: CampaignFormData): string[] => {
  const errors: string[] = [];
  
  if (formData.general.tipoEjecucion === 'PROGRAMADA') {
    if (!formData.general.fechaProgramacion) errors.push('Fecha de programación requerida');
    if (!formData.general.horaProgramacion) errors.push('Hora de programación requerida');
  }
  
  if (formData.general.fuente === 'EXTERNA' && !formData.personas.hasExcelFile) {
    errors.push('Archivo Excel requerido para fuente externa');
  }
  
  return errors;
};

export const getFormFieldProps = <T>(errors: FieldErrors<T>, name: string, showErrors: boolean) => ({
  error: showErrors && hasZodError(errors, name),
  helperText: showErrors ? getZodError(errors, name) : undefined
});

export const createSafeDefaults = (): CampaignFormData => {
  return {
    general: {
      titulo: '',
      descripcion: '',
      fechaInicio: null,
      fechaFin: null,
      fuente: 'EXTERNA',
      tipoEjecucion: 'MANUAL',
      fechaProgramacion: null,
      horaProgramacion: '',
      grupo: '',
      canal: '',
      tipoMensaje: '',
      plantillaComunicacion: '',
    },
    personas: {
      targetAudience: '',
      demographics: {
        ageRange: [18, 65],
        gender: '',
        location: [],
      },
      segmentation: [],
      estimatedReach: 0,
      hasExcelFile: false,
      excelData: null,
    }
  };
};