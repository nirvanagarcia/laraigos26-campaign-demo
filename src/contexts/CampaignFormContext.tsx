import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { CampaignData, CampaignFormContextType } from '../types/campaign';

const initialCampaignData: CampaignData = {
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
    tipoMensaje: 'HSM',
    plantillaComunicacion: '',
    // Nuevos campos
    name: '',
    category: '',
    startDate: null,
    endDate: null,
    budget: 0,
    priority: 'medium',
    tags: [],
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
  },
  mensaje: {
    title: '',
    content: '',
    tone: 'professional',
    channels: [],
    callToAction: '',
    personalizedFields: [],
  },
};

const CampaignFormContext = createContext<CampaignFormContextType | undefined>(undefined);

export const useCampaignForm = () => {
  const context = useContext(CampaignFormContext);
  if (context === undefined) {
    throw new Error('useCampaignForm must be used within a CampaignFormProvider');
  }
  return context;
};

interface CampaignFormProviderProps {
  children: ReactNode;
}

export const CampaignFormProvider: React.FC<CampaignFormProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<CampaignData>(initialCampaignData);

  const updateFormData = (section: keyof CampaignData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }));
  };

  const resetForm = () => {
    setFormData(initialCampaignData);
  };

  // Simple validation logic
  const isValid = Boolean(
    formData.general.titulo &&
    formData.general.descripcion &&
    formData.general.fuente &&
    formData.general.tipoEjecucion &&
    formData.mensaje.title &&
    formData.mensaje.content
  );

  return (
    <CampaignFormContext.Provider
      value={{
        formData,
        updateFormData,
        resetForm,
        isValid,
      }}
    >
      {children}
    </CampaignFormContext.Provider>
  );
};