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
  Paper
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useCampaignForm } from '../../contexts/CampaignFormContext';

export const GeneralTab: React.FC = () => {
  const { formData, updateFormData } = useCampaignForm();
  const { control, watch } = useForm({
    defaultValues: formData.general,
  });

  const watchedValues = watch();

  React.useEffect(() => {
    updateFormData('general', watchedValues);
  }, [watchedValues, updateFormData]);

  const priorities = [
    { value: 'low', label: 'Baja' },
    { value: 'medium', label: 'Media' },
    { value: 'high', label: 'Alta' },
  ];

  const categories = [
    'Marketing Digital',
    'Email Marketing',
    'Redes Sociales',
    'Publicidad Online',
    'Marketing de Contenidos',
    'SEO/SEM',
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 2,
            fontSize: '1.5rem'
          }}>
            🎯
          </Box>
          <Box>
            <Typography variant="h5" sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Configuración General
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Define los aspectos fundamentales de tu campaña
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ flex: '1 1 300px' }}>
              <Controller
                name="name"
                control={control}
                rules={{ required: 'El nombre es requerido' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Nombre de la Campaña"
                    variant="outlined"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Box>

            <Box sx={{ flex: '1 1 300px' }}>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Categoría</InputLabel>
                    <Select {...field} label="Categoría">
                      {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Box>
          </Box>

          <Controller
            name="description"
            control={control}
            rules={{ required: 'La descripción es requerida' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                rows={4}
                label="Descripción"
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ flex: '1 1 300px' }}>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Fecha de Inicio"
                    value={field.value}
                    onChange={field.onChange}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        variant: "outlined"
                      }
                    }}
                  />
                )}
              />
            </Box>

            <Box sx={{ flex: '1 1 300px' }}>
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Fecha de Fin"
                    value={field.value}
                    onChange={field.onChange}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        variant: "outlined"
                      }
                    }}
                  />
                )}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ flex: '1 1 300px' }}>
              <Controller
                name="budget"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type="number"
                    label="Presupuesto (€)"
                    variant="outlined"
                    InputProps={{
                      inputProps: { min: 0 }
                    }}
                  />
                )}
              />
            </Box>

            <Box sx={{ flex: '1 1 300px' }}>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Prioridad</InputLabel>
                    <Select {...field} label="Prioridad">
                      {priorities.map((priority) => (
                        <MenuItem key={priority.value} value={priority.value}>
                          {priority.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Box>
          </Box>

          <Box>
            <Typography gutterBottom>Tags (separados por comas)</Typography>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <Box>
                  <TextField
                    fullWidth
                    placeholder="Ej: digital, social media, promoción"
                    onChange={(e) => {
                      const tags = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
                      field.onChange(tags);
                    }}
                  />
                  <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {field.value.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        onDelete={() => {
                          const newTags = field.value.filter((_, i) => i !== index);
                          field.onChange(newTags);
                        }}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>
              )}
            />
          </Box>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
};