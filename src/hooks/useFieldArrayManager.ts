import { useFieldArray } from 'react-hook-form';
import { useCallback } from 'react';
import type { Control } from 'react-hook-form';
import type { CampaignFormData, PersonalizedField } from '../schemas/campaignSchema';

interface UseFieldArrayManagerProps {
  control: Control<CampaignFormData>;
  fieldName: 'mensaje.personalizedFields';
}

export const useFieldArrayManager = ({ control, fieldName }: UseFieldArrayManagerProps) => {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: fieldName,
  });

  const addField = useCallback(() => {
    const newField: PersonalizedField = {
      id: `field-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      name: '',
      placeholder: '',
      required: false,
    };
    append(newField);
  }, [append]);

  const removeField = useCallback((index: number) => {
    remove(index);
  }, [remove]);

  const updateField = useCallback((index: number, field: Partial<PersonalizedField>) => {
    const currentField = fields[index] as PersonalizedField;
    update(index, { ...currentField, ...field });
  }, [fields, update]);

  return {
    fields: fields as PersonalizedField[],
    addField,
    removeField,
    updateField,
  };
};