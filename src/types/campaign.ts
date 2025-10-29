export interface CampaignData {
  general: {
    titulo: string;
    descripcion: string;
    fechaInicio: Date | null;
    fechaFin: Date | null;
    fuente: 'PERSONAS' | 'EXTERNA' | 'OPORTUNIDADES';
    tipoEjecucion: 'MANUAL' | 'PROGRAMADA';
    fechaProgramacion?: Date | null;
    horaProgramacion?: string;
    grupo: string;
    canal: string;
    tipoMensaje: string;
    plantillaComunicacion: string;
    name?: string;
    category?: string;
    startDate?: Date | null;
    endDate?: Date | null;
    budget?: number;
    priority?: string;
    tags?: string[];
  };
  
  personas: {
    targetAudience: string;
    demographics: {
      ageRange: [number, number];
      gender: string;
      location: string[];
    };
    segmentation: string[];
    estimatedReach: number;
    hasExcelFile: boolean;
    excelData?: {
      headers: string[];
      rows: Array<{
        id: string;
        data: Record<string, any>;
      }>;
    } | null;
  };
  
}

export interface CampaignValidationErrors {
  general?: {
    titulo?: string;
    descripcion?: string;
    fechaInicio?: string;
    fechaFin?: string;
    fuente?: string;
    tipoEjecucion?: string;
    fechaProgramacion?: string;
    horaProgramacion?: string;
    grupo?: string;
    canal?: string;
    tipoMensaje?: string;
    plantillaComunicacion?: string;
  };
  personas?: {
    hasExcelFile?: string;
  };
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface CampaignFormContextType {
  formData: CampaignData;
  updateFormData: (section: keyof CampaignData, data: any) => void;
  resetForm: () => void;
  isValid: boolean;
  errors: CampaignValidationErrors;
  validateForm: () => boolean;
  showErrors: boolean;
  validatedTabs: Set<string>;
  validateTab: (tabName: string) => boolean;
  attemptedSave: boolean;
}