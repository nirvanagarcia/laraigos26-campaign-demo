import { z } from 'zod';
import { requiredString, requiredDate, requiredSelect, optionalString, trimmedString } from './common';

export const excelRowSchema = z.object({
  id: z.string(),
  data: z.record(z.string(), z.any())
});

export const excelDataSchema = z.object({
  headers: z.array(z.string()),
  rows: z.array(excelRowSchema)
});

export const generalSchema = z.object({
  titulo: trimmedString('titulo'),
  descripcion: trimmedString('descripcion'),
  fechaInicio: requiredDate('fechaInicio'),
  fechaFin: requiredDate('fechaFin'),
  fuente: z.enum(['EXTERNA', 'PERSONAS', 'OPORTUNIDADES']),
  tipoEjecucion: z.enum(['MANUAL', 'PROGRAMADA']),
  fechaProgramacion: z.date().nullable().optional(),
  horaProgramacion: optionalString(),
  grupo: requiredSelect('grupo'),
  canal: requiredSelect('canal'),
  tipoMensaje: requiredSelect('tipoMensaje'),
  plantillaComunicacion: requiredSelect('plantillaComunicacion')
}).superRefine((data, ctx) => {
  if (data.tipoEjecucion === 'PROGRAMADA') {
    if (!data.fechaProgramacion) {
      ctx.addIssue({ path: ['fechaProgramacion'], code: z.ZodIssueCode.custom, message: 'Fecha de programación es requerida' });
    }
    if (!data.horaProgramacion?.trim()) {
      ctx.addIssue({ path: ['horaProgramacion'], code: z.ZodIssueCode.custom, message: 'Hora de programación es requerida' });
    }
  }
});

export const personasSchema = z.object({
  targetAudience: optionalString(),
  demographics: z.object({
    ageRange: z.tuple([z.number(), z.number()]).default([18, 65]),
    gender: optionalString(),
    location: z.array(z.string()).default([])
  }).optional(),
  segmentation: z.array(z.string()).default([]),
  estimatedReach: z.number().default(0),
  hasExcelFile: z.boolean().default(false),
  excelData: excelDataSchema.nullable().optional()
});

export const campaignSchema = z.object({
  general: generalSchema,
  personas: personasSchema
}).superRefine((data, ctx) => {
  if (data.general.fuente === 'EXTERNA' && !data.personas.hasExcelFile) {
    ctx.addIssue({ path: ['personas', 'hasExcelFile'], code: z.ZodIssueCode.custom, message: "Debe cargar un archivo Excel cuando la fuente es Externa" });
  }
});

export const createCampaignSchema = (config: { requireExcel?: boolean; allowedSources?: string[] } = {}) => {
  return campaignSchema.superRefine((data, ctx) => {
    if (config.requireExcel && !data.personas.hasExcelFile) {
      ctx.addIssue({ path: ['personas', 'hasExcelFile'], code: z.ZodIssueCode.custom, message: 'Archivo Excel requerido por configuración' });
    }
    if (config.allowedSources && !config.allowedSources.includes(data.general.fuente)) {
      ctx.addIssue({ path: ['general', 'fuente'], code: z.ZodIssueCode.custom, message: 'Fuente no permitida' });
    }
  });
};

export type CampaignFormData = z.infer<typeof campaignSchema>;
export type GeneralFormData = z.infer<typeof generalSchema>;
export type PersonasFormData = z.infer<typeof personasSchema>;
export type ExcelData = z.infer<typeof excelDataSchema>;
export type ExcelRow = z.infer<typeof excelRowSchema>;

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}