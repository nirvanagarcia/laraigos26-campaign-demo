import { z } from 'zod';
import { required, optional, buildFieldIssue } from './common';

export const excelRowSchema = z.object({
  id: z.string(),
  data: z.record(z.string(), z.any()),
});

export const excelDataSchema = z.object({
  headers: z.array(z.string()),
  rows: z.array(excelRowSchema),
});

export const campaignSchema = z
  .object({
    general: z
      .object({
        titulo: required('string', 'titulo'),
        descripcion: required('string', 'descripcion'),
        fechaInicio: required('date', 'fechaInicio'),
        fechaFin: required('date', 'fechaFin'),
        fuente: required('select', 'fuente'),
        tipoEjecucion: required('select', 'tipoEjecucion'),
        fechaProgramacion: optional('date', 'fechaProgramacion'),
        horaProgramacion: optional('string', 'horaProgramacion'),
        grupo: required('select', 'grupo'),
        canal: required('select', 'canal'),
        tipoMensaje: required('select', 'tipoMensaje'),
        plantillaComunicacion: required('select', 'plantillaComunicacion'),
      })
      .superRefine((data, ctx) => {
        if (data.tipoEjecucion === 'PROGRAMADA') {
          if (!data.fechaProgramacion) {
            ctx.addIssue(
              buildFieldIssue('fechaProgramacion', ['fechaProgramacion'])
            );
          }
          if (!data.horaProgramacion?.trim()) {
            ctx.addIssue(
              buildFieldIssue('horaProgramacion', ['horaProgramacion'])
            );
          }
        }
      }),

    personas: z.object({
      excelData: optional('array', 'excelData', excelRowSchema),
    }),
  })
  .superRefine((data, ctx) => {
    if (data.general.fuente === 'EXTERNA' && !data.personas.excelData) {
      ctx.addIssue(
        buildFieldIssue('excelData', ['personas', 'excelData'])
      );
    }
  });

export type CampaignFormData = z.infer<typeof campaignSchema>;
export type ExcelData = z.infer<typeof excelDataSchema>;
export type ExcelRow = z.infer<typeof excelRowSchema>;