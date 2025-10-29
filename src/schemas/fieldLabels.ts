export const fieldLabels = {
  titulo: 'Título',
  descripcion: 'Descripción',
  fechaInicio: 'Fecha de inicio',
  fechaFin: 'Fecha de fin',
  fuente: 'Fuente',
  tipoEjecucion: 'Tipo de ejecución',
  fechaProgramacion: 'Fecha de programación',
  horaProgramacion: 'Hora de programación',
  grupo: 'Grupo',
  canal: 'Canal',
  tipoMensaje: 'Tipo de mensaje',
  plantillaComunicacion: 'Plantilla de comunicación',
  hasExcelFile: 'Archivo Excel'
} as const;

export type FieldName = keyof typeof fieldLabels;