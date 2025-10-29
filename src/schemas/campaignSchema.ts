import { z } from 'zod';

export const excelRowSchema = z.object({
  id: z.string(),
  data: z.record(z.string(), z.any())
});

export const excelDataSchema = z.object({
  headers: z.array(z.string()),
  rows: z.array(excelRowSchema)
});

export const campaignSchema = z.object({
  general: z.object({
    titulo: z.string().min(1, "El título es requerido"),
    descripcion: z.string().min(1, "La descripción es requerida"),
    fechaInicio: z.date().nullable().refine(val => val !== null, "La fecha de inicio es requerida"),
    fechaFin: z.date().nullable().refine(val => val !== null, "La fecha de fin es requerida"),
    fuente: z.enum(['EXTERNA', 'PERSONAS', 'OPORTUNIDADES']),
    tipoEjecucion: z.enum(['MANUAL', 'PROGRAMADA']),
    fechaProgramacion: z.date().nullable().optional(),
    horaProgramacion: z.string().optional(),
    grupo: z.string().min(1, "El grupo es requerido"),
    canal: z.string().min(1, "El canal es requerido"),
    tipoMensaje: z.string().min(1, "El tipo de mensaje es requerido"),
    plantillaComunicacion: z.string().min(1, "La plantilla de comunicación es requerida")
  }).refine((data) => {
    if (data.tipoEjecucion === 'PROGRAMADA') {
      return data.fechaProgramacion !== null && data.horaProgramacion?.trim() !== '';
    }
    return true;
  }, {
    message: "Para ejecución programada se requiere fecha y hora de programación",
    path: ['fechaProgramacion']
  }),

  personas: z.object({
    targetAudience: z.string().optional(),
    demographics: z.object({
      ageRange: z.tuple([z.number(), z.number()]).default([18, 65]),
      gender: z.string().optional(),
      location: z.array(z.string()).default([])
    }).optional(),
    segmentation: z.array(z.string()).default([]),
    estimatedReach: z.number().default(0),
    hasExcelFile: z.boolean().default(false),
    excelData: excelDataSchema.nullable().optional()
  })
}).refine((data) => {
  if (data.general.fuente === 'EXTERNA' && !data.personas.hasExcelFile) {
    return false;
  }
  return true;
}, {
  message: "Debe cargar un archivo Excel cuando la fuente es Externa",
  path: ['personas', 'hasExcelFile']
});

export type CampaignFormData = z.infer<typeof campaignSchema>;
export type ExcelData = z.infer<typeof excelDataSchema>;
export type ExcelRow = z.infer<typeof excelRowSchema>;

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}