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
  Slider,
  Paper,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from '@mui/material';
import { useCampaignForm } from '../../contexts/CampaignFormContext';

export const PersonasTab: React.FC = () => {
  const { formData, updateFormData } = useCampaignForm();
  const { control, watch } = useForm({
    defaultValues: formData.personas,
  });

  const watchedValues = watch();

  React.useEffect(() => {
    updateFormData('personas', watchedValues);
  }, [watchedValues, updateFormData]);

  const genderOptions = [
    { value: 'all', label: 'Todos' },
    { value: 'male', label: 'Masculino' },
    { value: 'female', label: 'Femenino' },
    { value: 'other', label: 'Otro' },
  ];

  const locationOptions = [
    'España',
    'México',
    'Argentina',
    'Colombia',
    'Chile',
    'Perú',
    'Venezuela',
    'Ecuador',
    'Bolivia',
    'Paraguay',
    'Uruguay',
  ];

  const segmentationOptions = [
    'Estudiantes',
    'Profesionales',
    'Empresarios',
    'Padres de familia',
    'Jubilados',
    'Millennials',
    'Gen Z',
    'Baby Boomers',
    'Usuarios de redes sociales',
    'Compradores online',
  ];

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
          background: 'linear-gradient(135deg, #f093fb, #f5576c)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mr: 2,
          fontSize: '1.5rem'
        }}>
          🎭
        </Box>
        <Box>
          <Typography variant="h5" sx={{ 
            fontWeight: 700,
            background: 'linear-gradient(45deg, #f093fb, #f5576c)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Audiencia y Personas
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Define tu audiencia objetivo y características demográficas
          </Typography>
        </Box>
      </Box>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Controller
          name="targetAudience"
          control={control}
          rules={{ required: 'La audiencia objetivo es requerida' }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              multiline
              rows={3}
              label="Descripción de Audiencia Objetivo"
              variant="outlined"
              error={!!fieldState.error}
              helperText={fieldState.error?.message || 'Describe detalladamente a tu audiencia ideal'}
            />
          )}
        />

        <Box>
          <Typography variant="h6" gutterBottom>
            Demografía
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <Typography gutterBottom>
                Rango de Edad: {watchedValues.demographics?.ageRange?.[0] || 18} - {watchedValues.demographics?.ageRange?.[1] || 65} años
              </Typography>
              <Controller
                name="demographics.ageRange"
                control={control}
                render={({ field }) => (
                  <Slider
                    {...field}
                    value={field.value || [18, 65]}
                    onChange={(_, newValue) => field.onChange(newValue)}
                    valueLabelDisplay="auto"
                    min={13}
                    max={80}
                    marks={[
                      { value: 18, label: '18' },
                      { value: 30, label: '30' },
                      { value: 45, label: '45' },
                      { value: 65, label: '65+' },
                    ]}
                  />
                )}
              />
            </Box>

            <Box sx={{ flex: '1 1 300px' }}>
              <Controller
                name="demographics.gender"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Género</InputLabel>
                    <Select {...field} label="Género">
                      {genderOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Box>

            <Box>
              <Typography gutterBottom>Ubicaciones</Typography>
              <Controller
                name="demographics.location"
                control={control}
                render={({ field }) => (
                  <FormGroup>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {locationOptions.map((location) => (
                        <FormControlLabel
                          key={location}
                          control={
                            <Checkbox
                              checked={field.value?.includes(location) || false}
                              onChange={(e) => {
                                const currentLocations = field.value || [];
                                if (e.target.checked) {
                                  field.onChange([...currentLocations, location]);
                                } else {
                                  field.onChange(currentLocations.filter(l => l !== location));
                                }
                              }}
                            />
                          }
                          label={location}
                        />
                      ))}
                    </Box>
                  </FormGroup>
                )}
              />
            </Box>
          </Box>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            Segmentación Avanzada
          </Typography>
          
          <Controller
            name="segmentation"
            control={control}
            render={({ field }) => (
              <Box>
                <Typography gutterBottom>Selecciona los segmentos que mejor describan tu audiencia:</Typography>
                <FormGroup>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {segmentationOptions.map((segment) => (
                      <FormControlLabel
                        key={segment}
                        control={
                          <Checkbox
                            checked={field.value?.includes(segment) || false}
                            onChange={(e) => {
                              const currentSegments = field.value || [];
                              if (e.target.checked) {
                                field.onChange([...currentSegments, segment]);
                              } else {
                                field.onChange(currentSegments.filter(s => s !== segment));
                              }
                            }}
                          />
                        }
                        label={segment}
                      />
                    ))}
                  </Box>
                </FormGroup>
                
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {field.value?.map((segment, index) => (
                    <Chip
                      key={index}
                      label={segment}
                      onDelete={() => {
                        const newSegments = field.value.filter((_, i) => i !== index);
                        field.onChange(newSegments);
                      }}
                      size="small"
                      color="secondary"
                      variant="filled"
                    />
                  ))}
                </Box>
              </Box>
            )}
          />
        </Box>

        <Controller
          name="estimatedReach"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              type="number"
              label="Alcance Estimado (número de personas)"
              variant="outlined"
              InputProps={{
                inputProps: { min: 0 }
              }}
              helperText="Estimación del número de personas que podrías alcanzar"
            />
          )}
        />
      </Box>
    </Paper>
  );
};