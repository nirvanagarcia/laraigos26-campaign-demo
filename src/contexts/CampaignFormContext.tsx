import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { CampaignData, CampaignFormContextType, CampaignValidationErrors } from '../types/campaign';

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
    tipoMensaje: '',
    plantillaComunicacion: '',
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
    hasExcelFile: false,
    excelData: null,
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
  const [validatedTabs, setValidatedTabs] = useState<Set<string>>(new Set());
  const [attemptedSave, setAttemptedSave] = useState(false);

  const updateFormData = useCallback((section: keyof CampaignData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialCampaignData);
    setValidatedTabs(new Set());
    setAttemptedSave(false);
  }, []);

  const validateTab = useCallback((tabName: string): boolean => {
    setValidatedTabs(prev => new Set(prev).add(tabName));
    
    const tabErrors = getTabValidationErrors(tabName);
    return Object.keys(tabErrors).length === 0;
  }, [formData]);

  const getTabValidationErrors = useCallback((tabName: string) => {
    const tabErrors: any = {};

    if (tabName === 'general') {
      if (!formData.general.titulo?.trim()) {
        tabErrors.titulo = 'El título es requerido';
      }
      if (!formData.general.descripcion?.trim()) {
        tabErrors.descripcion = 'La descripción es requerida';
      }
      if (!formData.general.fechaInicio) {
        tabErrors.fechaInicio = 'La fecha de inicio es requerida';
      }
      if (!formData.general.fechaFin) {
        tabErrors.fechaFin = 'La fecha de fin es requerida';
      }
      if (!formData.general.fuente) {
        tabErrors.fuente = 'La fuente es requerida';
      }
      if (!formData.general.tipoEjecucion) {
        tabErrors.tipoEjecucion = 'El tipo de ejecución es requerido';
      }
      if (formData.general.tipoEjecucion === 'PROGRAMADA') {
        if (!formData.general.fechaProgramacion) {
          tabErrors.fechaProgramacion = 'La fecha de programación es requerida';
        }
        if (!formData.general.horaProgramacion?.trim()) {
          tabErrors.horaProgramacion = 'La hora de programación es requerida';
        }
      }
      if (!formData.general.grupo) {
        tabErrors.grupo = 'El grupo es requerido';
      }
      if (!formData.general.canal) {
        tabErrors.canal = 'El canal es requerido';
      }
      if (!formData.general.tipoMensaje) {
        tabErrors.tipoMensaje = 'El tipo de mensaje es requerido';
      }
      if (!formData.general.plantillaComunicacion) {
        tabErrors.plantillaComunicacion = 'La plantilla de comunicación es requerida';
      }
    }

    if (tabName === 'personas') {
      if (formData.general.fuente === 'EXTERNA' && !formData.personas.hasExcelFile) {
        tabErrors.hasExcelFile = 'Debe cargar un archivo Excel cuando la fuente es Externa';
      }
    }

    return tabErrors;
  }, [formData]);

  const errors = useMemo((): CampaignValidationErrors => {
    const validationErrors: CampaignValidationErrors = {
      general: {},
      personas: {},
    };

    if (attemptedSave || validatedTabs.has('general')) {
      validationErrors.general = getTabValidationErrors('general');
    }

    if (attemptedSave || validatedTabs.has('personas')) {
      validationErrors.personas = getTabValidationErrors('personas');
    }

    return validationErrors;
  }, [formData, validatedTabs, attemptedSave, getTabValidationErrors]);

  const validateForm = useCallback((): boolean => {
    setAttemptedSave(true);
    setValidatedTabs(new Set(['general', 'personas', 'mensaje']));
    
    const generalErrors = getTabValidationErrors('general');
    const personasErrors = getTabValidationErrors('personas');
    
    const hasGeneralErrors = Object.keys(generalErrors).length > 0;
    const hasPersonasErrors = Object.keys(personasErrors).length > 0;
    
    return !hasGeneralErrors && !hasPersonasErrors;
  }, [getTabValidationErrors]);

  const showErrors = attemptedSave || validatedTabs.size > 0;

  const isFormComplete = useMemo(() => {
    const allGeneralErrors = getTabValidationErrors('general');
    const allPersonasErrors = getTabValidationErrors('personas');
    
    return Object.keys(allGeneralErrors).length === 0 && Object.keys(allPersonasErrors).length === 0;
  }, [formData, getTabValidationErrors]);

  return (
    <CampaignFormContext.Provider
      value={{
        formData,
        updateFormData,
        resetForm,
        isValid: isFormComplete,
        errors,
        validateForm,
        showErrors,
        validatedTabs,
        validateTab,
        attemptedSave,
      }}
    >
      {children}
    </CampaignFormContext.Provider>
  );
};