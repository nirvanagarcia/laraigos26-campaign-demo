export const fieldLabels = {
  titulo: 'Título de la campaña',
  descripcion: 'Descripción',
  fechaInicio: 'Fecha de inicio',
  fechaFin: 'Fecha de fin',
  fuente: 'Fuente de datos',
  tipoEjecucion: 'Tipo de ejecución',
  fechaProgramacion: 'Fecha de programación',
  horaProgramacion: 'Hora de programación',
  grupo: 'Grupo de asesores',
  canal: 'Canal de comunicación',
  tipoMensaje: 'Tipo de mensaje',
  plantillaComunicacion: 'Plantilla de comunicación',
  excelData: 'Archivo Excel'
} as const;

export type FieldName = keyof typeof fieldLabels;