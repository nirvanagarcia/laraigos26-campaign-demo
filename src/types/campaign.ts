export interface CampaignData {
  // General tab data
  general: {
    name: string;
    description: string;
    startDate: Date | null;
    endDate: Date | null;
    budget: number;
    category: string;
    priority: 'low' | 'medium' | 'high';
    tags: string[];
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