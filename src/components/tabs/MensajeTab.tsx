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
    <Paper 
      elevation={0} 
      sx={{ 
        p: 4,
        borderRadius: '20px',
        background: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.3)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Box sx={{
          width: 48,
          height: 48,
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #10b981, #34d399)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mr: 2,
          fontSize: '1.5rem'
        }}>
          ✨
        </Box>
        <Box>
          <Typography variant="h5" sx={{ 
            fontWeight: 700,
            background: 'linear-gradient(45deg, #10b981, #34d399)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Mensajes y Contenido
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Crea contenido persuasivo y personalizado para tu audiencia
          </Typography>
        </Box>
      </Box>
      
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

        <Box sx={{ 
          mt: 4, 
          p: 3, 
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(240, 147, 251, 0.05))',
          border: '1px solid rgba(102, 126, 234, 0.1)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Box sx={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
              fontSize: '1rem'
            }}>
              👁️
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Vista Previa del Mensaje
            </Typography>
          </Box>
          
          <Box sx={{ 
            p: 3, 
            background: 'linear-gradient(135deg, #ffffff, #f8fafc)',
            borderRadius: '16px', 
            border: '1px solid rgba(255,255,255,0.5)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          }}>
            <Typography variant="h5" sx={{ 
              mb: 2, 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              {watchedValues.title || '✨ Título del mensaje...'}
            </Typography>
            
            <Typography variant="body1" sx={{ 
              mb: 3, 
              whiteSpace: 'pre-wrap',
              lineHeight: 1.7,
              color: 'text.primary'
            }}>
              {watchedValues.content || '📝 Contenido del mensaje...'}
            </Typography>
            
            {watchedValues.callToAction && (
              <Button 
                variant="contained" 
                disabled
                sx={{
                  background: 'linear-gradient(45deg, #f093fb, #f5576c)',
                  color: 'white',
                  fontWeight: 600,
                  borderRadius: '12px',
                  px: 3,
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '1rem',
                }}
              >
                🚀 {watchedValues.callToAction}
              </Button>
            )}
            
            <Box sx={{ 
              mt: 3, 
              pt: 2, 
              borderTop: '1px solid rgba(0,0,0,0.05)', 
              display: 'flex', 
              gap: 2, 
              flexWrap: 'wrap',
              alignItems: 'center'
            }}>
              <Chip
                label={`🎨 ${toneOptions.find(t => t.value === watchedValues.tone)?.label || 'No seleccionado'}`}
                size="small"
                sx={{
                  background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                  color: '#667eea',
                  fontWeight: 600,
                }}
              />
              {watchedValues.channels && watchedValues.channels.length > 0 && (
                <Chip
                  label={`📡 ${watchedValues.channels.length} canal${watchedValues.channels.length > 1 ? 'es' : ''}`}
                  size="small"
                  sx={{
                    background: 'linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(52, 211, 153, 0.1))',
                    color: '#10b981',
                    fontWeight: 600,
                  }}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};