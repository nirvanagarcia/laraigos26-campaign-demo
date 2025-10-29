import type { CampaignFormData, PersonalizedField } from '../schemas/campaignSchema';

/**
 * Helper para manipular arrays dinámicos con setValue/getValues
 */
export class FormArrayHelper {
  constructor(
    private getValues: (path?: string) => any,
    private setValue: (path: string, value: any) => void
  ) {}

  /**
   * Actualiza un elemento específico en un array
   */
  updateArrayItem<T>(arrayPath: string, index: number, updates: Partial<T>): void {
    const currentArray = this.getValues(arrayPath) || [];
    const updatedArray = [...currentArray];
    updatedArray[index] = { ...updatedArray[index], ...updates };
    this.setValue(arrayPath, updatedArray);
  }

  /**
   * Agrega un nuevo elemento al array
   */
  addArrayItem<T>(arrayPath: string, newItem: T): void {
    const currentArray = this.getValues(arrayPath) || [];
    this.setValue(arrayPath, [...currentArray, newItem]);
  }

  /**
   * Elimina un elemento del array por índice
   */
  removeArrayItem(arrayPath: string, index: number): void {
    const currentArray = this.getValues(arrayPath) || [];
    const updatedArray = currentArray.filter((_: any, i: number) => i !== index);
    this.setValue(arrayPath, updatedArray);
  }
}

/**
 * Valida campos personalizados
 */
export const validatePersonalizedField = (field: PersonalizedField): string[] => {
  const errors: string[] = [];
  
  if (!field.name?.trim()) {
    errors.push('El nombre del campo es requerido');
  }
  
  if (field.name && !/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(field.name)) {
    errors.push('El nombre del campo debe ser un identificador válido');
  }
  
  return errors;
};

/**
 * Transforma datos del formulario para envío al backend
 */
export const transformFormDataForSubmission = (formData: CampaignFormData) => {
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