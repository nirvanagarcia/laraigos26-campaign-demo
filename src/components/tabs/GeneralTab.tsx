import React, { useState, useMemo, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Card,
  CardContent,
  Divider,
  Chip,
  Stack,
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useCampaignForm } from '../../contexts/CampaignFormContext';
import { mockGrupos, mockCanales, mockPlantillas } from '../../types/mockData';
import { MessagePreview } from '../previews';
import type { PlantillaComunicacion } from '../../types/mockData';

export const GeneralTab: React.FC = () => {
  const { formData, updateFormData } = useCampaignForm();
  const { control, watch, setValue } = useForm({
    defaultValues: formData.general,
  });

  const watchedValues = watch();
  const [selectedPlantilla, setSelectedPlantilla] = useState<PlantillaComunicacion | null>(null);

  const handleFormUpdate = useCallback((data: any) => {
    updateFormData('general', data);
  }, [updateFormData]);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleFormUpdate(watchedValues);
    }, 200);
    return () => clearTimeout(timeoutId);
  }, [watchedValues, handleFormUpdate]);

  React.useEffect(() => {
    if (watchedValues.plantillaComunicacion) {
      const plantilla = mockPlantillas.find(p => p.id === watchedValues.plantillaComunicacion);
      setSelectedPlantilla(plantilla || null);
    } else {
      setSelectedPlantilla(null);
    }
  }, [watchedValues.plantillaComunicacion]);

  const tiposMensajeSoportados = useMemo(() => {
    if (!watchedValues.canal) return [];
    
    const canalSeleccionado = mockCanales.find(c => c.id === watchedValues.canal);
    return canalSeleccionado?.tiposSoportados || [];
  }, [watchedValues.canal]);

  const plantillasFiltradas = useMemo(() => {
    if (!watchedValues.tipoMensaje) return [];
    
    return mockPlantillas.filter(p => p.tipo === watchedValues.tipoMensaje);
  }, [watchedValues.tipoMensaje]);


  React.useEffect(() => {
    const tiposDisponibles = tiposMensajeSoportados;
    
    if (watchedValues.canal && watchedValues.tipoMensaje && !tiposDisponibles.includes(watchedValues.tipoMensaje as any)) {
      setValue('tipoMensaje', '');
      setValue('plantillaComunicacion', '');
    }
    
    if (!watchedValues.canal && watchedValues.tipoMensaje) {
      setValue('tipoMensaje', '');
      setValue('plantillaComunicacion', '');
    }
  }, [watchedValues.canal, watchedValues.tipoMensaje, tiposMensajeSoportados, setValue]);

  React.useEffect(() => {
    if (watchedValues.tipoMensaje && watchedValues.plantillaComunicacion) {
      const plantillaValida = plantillasFiltradas.some(p => p.id === watchedValues.plantillaComunicacion);
      if (!plantillaValida) {
        setValue('plantillaComunicacion', '');
      }
    }
  }, [watchedValues.tipoMensaje, watchedValues.plantillaComunicacion, plantillasFiltradas, setValue]);

  const fuenteOptions = useMemo(() => [
    { value: 'EXTERNA', label: 'EXTERNA', icon: '🌐' },
    { value: 'PERSONAS', label: 'PERSONAS', icon: '🏢' },
    { value: 'OPORTUNIDADES', label: 'OPORTUNIDADES', icon: '🎯' },
  ], []);

  const tipoEjecucionOptions = useMemo(() => [
    { value: 'MANUAL', label: 'MANUAL', icon: '👤' },
    { value: 'PROGRAMADA', label: 'PROGRAMADA', icon: '⏰' },
  ], []);

  const tipoMensajeOptions = useMemo(() => [
    { value: 'HSM', label: 'WhatsApp HSM', icon: '📱', color: '#25d366' },
    { value: 'SMS', label: 'SMS', icon: '💬', color: '#0084ff' },
    { value: 'CORREO', label: 'Email', icon: '📧', color: '#ea4335' },
    { value: 'HTML', label: 'Email HTML', icon: '📨', color: '#673ab7' },
  ], []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Formulario Principal */}
        <Paper 
          elevation={0} 
          sx={{ 
            flex: 1,
            p: 4,
            borderRadius: '20px',
            background: 'rgba(255,255,255,0.95)',
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
              📋
            </Box>
            <Box>
              <Typography variant="h5" sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Configuración de Campaña
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Define los parámetros principales de tu campaña
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Título */}
            <Controller
              name="titulo"
              control={control}
              rules={{ required: 'El título es requerido' }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Título"
                  placeholder="Asigna un nombre a tu campaña"
                  variant="outlined"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            {/* Descripción */}
            <Controller
              name="descripcion"
              control={control}
              rules={{ required: 'La descripción es requerida' }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  rows={3}
                  label="Descripción"
                  placeholder="Asigna una breve descripción del uso de tu campaña"
                  variant="outlined"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            {/* Fechas */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ flex: '1 1 300px' }}>
                <Controller
                  name="fechaInicio"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="Fecha de inicio"
                      value={field.value}
                      onChange={field.onChange}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          variant: "outlined",
                          helperText: "Selecciona la fecha inicio de vigencia de tu campaña"
                        }
                      }}
                    />
                  )}
                />
              </Box>

              <Box sx={{ flex: '1 1 300px' }}>
                <Controller
                  name="fechaFin"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="Fecha de fin"
                      value={field.value}
                      onChange={field.onChange}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          variant: "outlined",
                          helperText: "Selecciona la fecha fin de vigencia de tu campaña"
                        }
                      }}
                    />
                  )}
                />
              </Box>
            </Box>

            {/* Fuente y Tipo de Ejecución */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ flex: '1 1 300px' }}>
                <Controller
                  name="fuente"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Fuente</InputLabel>
                      <Select {...field} label="Fuente">
                        {fuenteOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <span>{option.icon}</span>
                              {option.label}
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, ml: 1 }}>
                        Elige la fuente de origen de datos con la cual se completará a los destinatarios de tu campaña
                      </Typography>
                    </FormControl>
                  )}
                />
              </Box>

              <Box sx={{ flex: '1 1 300px' }}>
                <Controller
                  name="tipoEjecucion"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Tipo de ejecución</InputLabel>
                      <Select {...field} label="Tipo de ejecución">
                        {tipoEjecucionOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <span>{option.icon}</span>
                              {option.label}
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, ml: 1 }}>
                        Define la programación de ejecución de tu campaña
                      </Typography>
                    </FormControl>
                  )}
                />
              </Box>
            </Box>

            {/* Campos condicionales para programación */}
            {watchedValues.tipoEjecucion === 'PROGRAMADA' && (
              <Box sx={{ 
                p: 3, 
                borderRadius: '16px', 
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))',
                border: '1px solid rgba(102, 126, 234, 0.1)'
              }}>
                <Typography variant="h6" sx={{ mb: 2, color: '#667eea', fontWeight: 600 }}>
                  ⏰ Configuración de Programación
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Box sx={{ flex: '1 1 300px' }}>
                    <Controller
                      name="fechaProgramacion"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          label="Fecha de programación"
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
                      name="horaProgramacion"
                      control={control}
                      render={({ field }) => (
                        <TimePicker
                          label="Hora de programación"
                          value={field.value ? new Date(`2000-01-01T${field.value}`) : null}
                          onChange={(newValue) => {
                            if (newValue) {
                              const timeString = newValue.toLocaleTimeString('en-US', { 
                                hour12: false,
                                hour: '2-digit',
                                minute: '2-digit'
                              });
                              field.onChange(timeString);
                            } else {
                              field.onChange('');
                            }
                          }}
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
              </Box>
            )}

            {/* Grupo y Canal */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ flex: '1 1 300px' }}>
                <Controller
                  name="grupo"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Grupo</InputLabel>
                      <Select {...field} label="Grupo">
                        {mockGrupos.map((grupo) => (
                          <MenuItem key={grupo.id} value={grupo.id}>
                            <Box>
                              <Typography variant="body2" fontWeight={600}>
                                {grupo.nombre}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {grupo.cantidad} contactos
                              </Typography>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, ml: 1 }}>
                        Asigna un grupo de atención de asesores a tu campaña
                      </Typography>
                    </FormControl>
                  )}
                />
              </Box>

              <Box sx={{ flex: '1 1 300px' }}>
                <Controller
                  name="canal"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel>Canal</InputLabel>
                      <Select {...field} label="Canal">
                        {mockCanales.filter(c => c.activo).map((canal) => (
                          <MenuItem key={canal.id} value={canal.id}>
                            <Box>
                              <Typography variant="body2" fontWeight={600}>
                                {canal.nombre}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {canal.descripcion}
                              </Typography>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, ml: 1 }}>
                        Selecciona el canal de envío de tu campaña
                      </Typography>
                    </FormControl>
                  )}
                />
              </Box>
            </Box>

            {/* Tipo de Mensaje y Plantilla */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ flex: '1 1 300px' }}>
                <Controller
                  name="tipoMensaje"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth disabled={tiposMensajeSoportados.length === 0}>
                      <InputLabel>Tipo de Mensaje</InputLabel>
                      <Select 
                        {...field} 
                        label="Tipo de Mensaje"
                        value={tiposMensajeSoportados.includes(field.value as any) ? field.value : ''}
                      >
                        {tipoMensajeOptions
                          .filter(option => tiposMensajeSoportados.includes(option.value as any))
                          .map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <span>{option.icon}</span>
                              <Typography sx={{ color: option.color, fontWeight: 600 }}>
                                {option.label}
                              </Typography>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, ml: 1 }}>
                        {tiposMensajeSoportados.length === 0 
                          ? 'Primero selecciona un canal'
                          : `Tipos disponibles para el canal seleccionado: ${tiposMensajeSoportados.join(', ')}`
                        }
                      </Typography>
                    </FormControl>
                  )}
                />
              </Box>

              <Box sx={{ flex: '1 1 300px' }}>
                <Controller
                  name="plantillaComunicacion"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth disabled={plantillasFiltradas.length === 0}>
                      <InputLabel>Plantilla de comunicación</InputLabel>
                      <Select 
                        {...field} 
                        label="Plantilla de comunicación"
                        value={plantillasFiltradas.some(p => p.id === field.value) ? field.value : ''}
                      >
                        {plantillasFiltradas.map((plantilla) => (
                          <MenuItem key={plantilla.id} value={plantilla.id}>
                            <Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" fontWeight={600}>
                                  {plantilla.nombre}
                                </Typography>
                                <Chip 
                                  label={plantilla.categoria} 
                                  size="small" 
                                  sx={{ fontSize: '0.7rem' }}
                                />
                              </Box>
                              <Typography variant="caption" color="text.secondary">
                                Variables: {plantilla.variables.join(', ')}
                              </Typography>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, ml: 1 }}>
                        {plantillasFiltradas.length === 0
                          ? 'Primero selecciona un tipo de mensaje'
                          : `${plantillasFiltradas.length} plantillas disponibles para ${watchedValues.tipoMensaje}`
                        }
                      </Typography>
                    </FormControl>
                  )}
                />
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Panel de Preview */}
        <Card 
          sx={{ 
            width: 420,
            borderRadius: '20px',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.3)',
            height: 'fit-content',
            position: 'sticky',
            top: 20,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Box sx={{
                width: 36,
                height: 36,
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #10b981, #34d399)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
              }}>
                👁️
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Vista Previa
              </Typography>
            </Box>

            <MessagePreview plantilla={selectedPlantilla} />

            {selectedPlantilla && (
              <>
                <Divider sx={{ my: 3 }} />
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                    📝 Plantilla: {selectedPlantilla.nombre}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    <Chip 
                      label={selectedPlantilla.tipo}
                      size="small"
                      sx={{
                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                        color: 'white',
                        fontWeight: 600,
                      }}
                    />
                    <Chip 
                      label={selectedPlantilla.categoria}
                      size="small"
                      variant="outlined"
                    />
                  </Stack>
                </Box>

                {selectedPlantilla.variables.length > 0 && (
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block', fontWeight: 600 }}>
                      🔧 Variables disponibles:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selectedPlantilla.variables.map((variable, index) => (
                        <Chip
                          key={index}
                          label={`{{${variable}}}`}
                          size="small"
                          variant="outlined"
                          sx={{ 
                            fontSize: '0.7rem',
                            fontFamily: 'monospace',
                            background: 'rgba(102, 126, 234, 0.05)',
                            borderColor: '#667eea',
                            color: '#667eea'
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </Box>
    </LocalizationProvider>
  );
};