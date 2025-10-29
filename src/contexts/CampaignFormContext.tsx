import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';
import type { ReactNode } from 'react';
import { campaignSchema, type CampaignFormData } from '../schemas/campaignSchema';
import { createSafeDefaults, getResolver } from '../utils/formHelpers';

const initialCampaignData: CampaignFormData = createSafeDefaults();

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
  getTabErrors: () => { general: number; personas: number };
  isTabValid: (tabName: string) => boolean;
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
  config?: { requireExcel?: boolean; allowedSources?: string[] };
}

export const CampaignFormProvider: React.FC<CampaignFormProviderProps> = ({ children, config = {} }) => {
  const [validatedTabs, setValidatedTabs] = useState<Set<string>>(new Set());
  const [attemptedSave, setAttemptedSave] = useState(false);

  const methods = useForm<CampaignFormData>({
    resolver: getResolver(),
    mode: 'onChange',
    defaultValues: initialCampaignData,
  });

  const { watch, trigger, reset, setValue, formState: { errors, isValid } } = methods;
  const formData = watch();

  const updateFormData = useCallback((section: keyof CampaignFormData, data: any) => {
    setValue(section, { ...formData[section], ...data }, { shouldValidate: true, shouldDirty: true });
  }, [setValue, formData]);

  const validateTab = useCallback(async (tabName: string): Promise<boolean> => {
    setValidatedTabs(prev => new Set(prev).add(tabName));
    
    const fieldsToValidate: string[] = [];
    
    switch (tabName) {
      case 'general':
        fieldsToValidate.push('general');
        break;
      case 'personas':
        fieldsToValidate.push('personas');
        break;
    }
    
    return await trigger(fieldsToValidate as any);
  }, [trigger]);

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

  const getTabErrors = useCallback(() => {
    const generalErrors = Object.keys(errors.general || {}).length;
    const personasErrors = Object.keys(errors.personas || {}).length;
    
    return { general: generalErrors, personas: personasErrors };
  }, [errors]);

  const isTabValid = useCallback((tabName: string): boolean => {
    switch (tabName) {
      case 'general':
        return Object.keys(errors.general || {}).length === 0;
      case 'personas':
        return Object.keys(errors.personas || {}).length === 0;
      default:
        return isValid;
    }
  }, [errors, isValid]);

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
    getTabErrors,
    isTabValid,
  }), [methods, formData, isValid, errors, validateForm, resetForm, validatedTabs, validateTab, showErrors, attemptedSave, updateFormData, getTabErrors, isTabValid]);

  return (
    <CampaignFormContext.Provider value={contextValue}>
      {children}
    </CampaignFormContext.Provider>
  );
};