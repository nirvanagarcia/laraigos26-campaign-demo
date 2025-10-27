import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Paper,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Button,
  IconButton,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useCampaignForm } from '../../contexts/CampaignFormContext';

export const MensajeTab: React.FC = () => {
  const { formData, updateFormData } = useCampaignForm();
  const { control, watch, setValue, getValues } = useForm({
    defaultValues: formData.mensaje,
  });

  const watchedValues = watch();

  React.useEffect(() => {
    updateFormData('mensaje', watchedValues);
  }, [watchedValues, updateFormData]);

  const toneOptions = [
    { value: 'formal', label: 'Formal' },
    { value: 'casual', label: 'Casual' },
    { value: 'friendly', label: 'Amigable' },
    { value: 'professional', label: 'Profesional' },
  ];

  const channelOptions = [
    'Email',
    'SMS',
    'WhatsApp',
    'Facebook',
    'Instagram',
    'LinkedIn',
    'Twitter',
    'YouTube',
    'TikTok',
    'Google Ads',
    'Display Ads',
    'Push Notifications',
  ];

  const addPersonalizedField = () => {
    const currentFields = getValues('personalizedFields') || [];
    setValue('personalizedFields', [...currentFields, '']);
  };

  const removePersonalizedField = (index: number) => {
    const currentFields = getValues('personalizedFields') || [];
    const newFields = currentFields.filter((_, i) => i !== index);
    setValue('personalizedFields', newFields);
  };

  const updatePersonalizedField = (index: number, value: string) => {
    const currentFields = getValues('personalizedFields') || [];
    const newFields = [...currentFields];
    newFields[index] = value;
    setValue('personalizedFields', newFields);
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom color="primary">
        Creación de Mensajes y Contenido
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Controller
          name="title"
          control={control}
          rules={{ required: 'El título es requerido' }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              label="Título Principal del Mensaje"
              variant="outlined"
              error={!!fieldState.error}
              helperText={fieldState.error?.message || 'Título que captará la atención de tu audiencia'}
            />
          )}
        />

        <Controller
          name="content"
          control={control}
          rules={{ required: 'El contenido es requerido' }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              multiline
              rows={6}
              label="Contenido del Mensaje"
              variant="outlined"
              error={!!fieldState.error}
              helperText={fieldState.error?.message || 'Desarrolla aquí el mensaje completo de tu campaña'}
            />
          )}
        />

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box sx={{ flex: '1 1 300px' }}>
            <Controller
              name="tone"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Tono del Mensaje</InputLabel>
                  <Select {...field} label="Tono del Mensaje">
                    {toneOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Box>

          <Box sx={{ flex: '1 1 300px' }}>
            <Controller
              name="callToAction"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Call to Action (CTA)"
                  variant="outlined"
                  placeholder="Ej: Compra ahora, Regístrate, Descarga gratis"
                  helperText="Acción que quieres que realice tu audiencia"
                />
              )}
            />
          </Box>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            Canales de Distribución
          </Typography>
          
          <Controller
            name="channels"
            control={control}
            render={({ field }) => (
              <Box>
                <Typography gutterBottom>Selecciona los canales donde se distribuirá el mensaje:</Typography>
                <FormGroup>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {channelOptions.map((channel) => (
                      <FormControlLabel
                        key={channel}
                        control={
                          <Checkbox
                            checked={field.value?.includes(channel) || false}
                            onChange={(e) => {
                              const currentChannels = field.value || [];
                              if (e.target.checked) {
                                field.onChange([...currentChannels, channel]);
                              } else {
                                field.onChange(currentChannels.filter(c => c !== channel));
                              }
                            }}
                          />
                        }
                        label={channel}
                      />
                    ))}
                  </Box>
                </FormGroup>
                
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {field.value?.map((channel, index) => (
                    <Chip
                      key={index}
                      label={channel}
                      onDelete={() => {
                        const newChannels = field.value.filter((_, i) => i !== index);
                        field.onChange(newChannels);
                      }}
                      size="small"
                      color="info"
                      variant="filled"
                    />
                  ))}
                </Box>
              </Box>
            )}
          />
        </Box>

        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">
              Campos Personalizados
            </Typography>
            <Button
              startIcon={<AddIcon />}
              onClick={addPersonalizedField}
              variant="outlined"
              size="small"
            >
              Agregar Campo
            </Button>
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Define campos que se personalizarán para cada contacto (ej: nombre, empresa, ubicación)
          </Typography>

          <Controller
            name="personalizedFields"
            control={control}
            render={({ field }) => (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {field.value?.map((personalizedField, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <TextField
                      fullWidth
                      size="small"
                      label={`Campo ${index + 1}`}
                      value={personalizedField}
                      onChange={(e) => updatePersonalizedField(index, e.target.value)}
                      placeholder="Ej: {{nombre}}, {{empresa}}, {{ciudad}}"
                    />
                    <IconButton
                      color="error"
                      onClick={() => removePersonalizedField(index)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
                
                {(!field.value || field.value.length === 0) && (
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    No hay campos personalizados. Haz clic en "Agregar Campo" para añadir uno.
                  </Typography>
                )}
              </Box>
            )}
          />
        </Box>

        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>
            Vista Previa del Mensaje
          </Typography>
          
          <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 1, border: '1px solid', borderColor: 'grey.300' }}>
            <Typography variant="h6" sx={{ mb: 1, color: 'primary.main' }}>
              {watchedValues.title || 'Título del mensaje...'}
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 2, whiteSpace: 'pre-wrap' }}>
              {watchedValues.content || 'Contenido del mensaje...'}
            </Typography>
            
            {watchedValues.callToAction && (
              <Button variant="contained" color="primary" disabled>
                {watchedValues.callToAction}
              </Button>
            )}
            
            <Box sx={{ mt: 2, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              <Typography variant="caption" color="text.secondary">
                Tono: {toneOptions.find(t => t.value === watchedValues.tone)?.label || 'No seleccionado'}
              </Typography>
              {watchedValues.channels && watchedValues.channels.length > 0 && (
                <>
                  <Typography variant="caption" color="text.secondary">
                    • Canales: {watchedValues.channels.join(', ')}
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};