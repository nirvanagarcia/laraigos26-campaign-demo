export interface CampaignData {
  // General tab data
  general: {
    titulo: string;
    descripcion: string;
    fechaInicio: Date | null;
    fechaFin: Date | null;
    fuente: 'INTERNA' | 'EXTERNA' | 'OPORTUNIDADES';
    tipoEjecucion: 'MANUAL' | 'PROGRAMADA';
    fechaProgramacion?: Date | null;
    horaProgramacion?: string;
    grupo: string;
    canal: string;
    tipoMensaje: 'HSM' | 'CORREO' | 'SMS';
    plantillaComunicacion: string;
  };
  
  // Personas tab data
  personas: {
    targetAudience: string;
    demographics: {
      ageRange: [number, number];
      gender: string;
      location: string[];
    };
    segmentation: string[];
    estimatedReach: number;
  };
  
  // Mensaje tab data
  mensaje: {
    title: string;
    content: string;
    tone: 'formal' | 'casual' | 'friendly' | 'professional';
    channels: string[];
    callToAction: string;
    personalizedFields: string[];
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
}