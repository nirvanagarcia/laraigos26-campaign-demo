import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ReactNode } from 'react';
import { campaignSchema, type CampaignFormData } from '../schemas/campaignSchema';

const initialCampaignData: CampaignFormData = {
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

interface CampaignFormContextType {
  methods: UseFormReturn<CampaignFormData>;
  
  formData: CampaignFormData;
  isValid: boolean;
  errors: any;
  
  validateForm: () => Promise<boolean>;
  resetForm: () => void;
  
  validatedTabs: Set<string>;
  validateTab: (tabName: string) => Promise<boolean>;
  showErrors: boolean;
  attemptedSave: boolean;
  
  updateFormData: (section: keyof CampaignFormData, data: any) => void;
}

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
  const [validatedTabs, setValidatedTabs] = useState<Set<string>>(new Set());
  const [attemptedSave, setAttemptedSave] = useState(false);

  const methods = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
    mode: 'onChange',
    defaultValues: initialCampaignData,
  });

  const { watch, trigger, reset, setValue, formState: { errors, isValid } } = methods;
  const formData = watch();

  const updateFormData = useCallback((section: keyof CampaignFormData, data: any) => {
    setValue(section, { ...formData[section], ...data }, { shouldValidate: true });
  }, [setValue, formData]);

  const validateTab = useCallback(async (tabName: string): Promise<boolean> => {
    setValidatedTabs(prev => new Set(prev).add(tabName));
    
    let fieldsToValidate: string[] = [];
    
    switch (tabName) {
      case 'general':
        fieldsToValidate = [
          'general.titulo',
          'general.descripcion', 
          'general.fechaInicio',
          'general.fechaFin',
          'general.grupo',
          'general.canal',
          'general.tipoMensaje',
          'general.plantillaComunicacion'
        ];
        
        if (formData.general.tipoEjecucion === 'PROGRAMADA') {
          fieldsToValidate.push('general.fechaProgramacion', 'general.horaProgramacion');
        }
        break;
        
      case 'personas':
        fieldsToValidate = ['personas'];
        break;
    }
    
    return await trigger(fieldsToValidate as any);
  }, [trigger, formData.general.tipoEjecucion]);

  const validateForm = useCallback(async (): Promise<boolean> => {
    setAttemptedSave(true);
    setValidatedTabs(new Set(['general', 'personas']));
    return await trigger();
  }, [trigger]);

  const resetForm = useCallback(() => {
    reset(initialCampaignData);
    setValidatedTabs(new Set());
    setAttemptedSave(false);
  }, [reset]);

  const showErrors = attemptedSave || validatedTabs.size > 0;

  const contextValue = useMemo((): CampaignFormContextType => ({
    methods,
    formData,
    isValid,
    errors,
    validateForm,
    resetForm,
    validatedTabs,
    validateTab,
    showErrors,
    attemptedSave,
    updateFormData,
  }), [
    methods,
    formData,
    isValid,
    errors,
    validateForm,
    resetForm,
    validatedTabs,
    validateTab,
    showErrors,
    attemptedSave,
    updateFormData,
  ]);

  return (
    <CampaignFormContext.Provider value={contextValue}>
      {children}
    </CampaignFormContext.Provider>
  );
};