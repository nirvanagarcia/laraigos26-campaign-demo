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
    // Nueva validación para archivo Excel
    hasExcelFile?: boolean;
  };
  
  mensaje: {
    title: string;
    content: string;
    tone: string;
    channels: string[];
    callToAction: string;
    personalizedFields: string[];
  };
}

// Nueva interfaz para errores de validación
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
  // Nuevas propiedades para controlar cuándo mostrar errores
  showErrors: boolean;
  validatedTabs: Set<string>;
  validateTab: (tabName: string) => boolean;
  attemptedSave: boolean;
}