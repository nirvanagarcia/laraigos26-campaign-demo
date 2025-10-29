import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { campaignSchema, type CampaignFormData } from '../schemas/campaignSchema';

const extractGeneralSchema = () => {
  const campaignShape = campaignSchema.shape || campaignSchema._def?.shape;
  return campaignShape?.general;
};

const extractPersonasSchema = () => {
  const campaignShape = campaignSchema.shape || campaignSchema._def?.shape;
  return campaignShape?.personas;
};

export const getCampaignResolver = (tab?: 'general' | 'personas') => {
  switch (tab) {
    case 'general':
      const generalSchema = extractGeneralSchema();
      return generalSchema ? zodResolver(z.object({ general: generalSchema })) : zodResolver(campaignSchema);
    case 'personas':
      const personasSchema = extractPersonasSchema();
      return personasSchema ? zodResolver(z.object({ personas: personasSchema })) : zodResolver(campaignSchema);
    default:
      return zodResolver(campaignSchema);
  }
};

export const transformCampaignDataForSubmission = (formData: CampaignFormData) => {
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

export const validateCampaignConditionalFields = (formData: CampaignFormData): string[] => {
  const errors: string[] = [];
  
  if (formData.general.tipoEjecucion === 'PROGRAMADA') {
    if (!formData.general.fechaProgramacion) errors.push('Fecha de programación requerida');
    if (!formData.general.horaProgramacion) errors.push('Hora de programación requerida');
  }
  
  if (formData.general.fuente === 'EXTERNA' && !formData.personas.excelData) {
    errors.push('Archivo Excel requerido para fuente externa');
  }
  
  return errors;
};

export const createCampaignDefaults = (): CampaignFormData => {
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
      excelData: null,
    }
  };
};