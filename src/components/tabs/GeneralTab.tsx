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
  Chip,
  FormHelperText,
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
  const { formData, updateFormData, errors, showErrors } = useCampaignForm();
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
    { value: 'HSM', label: 'WhatsApp HSM', icon: '📱' },
    { value: 'SMS', label: 'SMS', icon: '💬', },
    { value: 'CORREO', label: 'Email', icon: '📧'},
    { value: 'HTML', label: 'HTML', icon: '📨' },
  ], []);

  const getErrorMessage = (error: any): string => {
    if (typeof error === 'string') return error;
    if (error?.message) return error.message;
    if (typeof error === 'object') return JSON.stringify(error);
    return 'Error de validación';
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box 
        sx={{ 
          display: 'flex', 
          gap: 3,
          alignItems: 'flex-start', 
          minHeight: '100vh',
          overflow: 'hidden',
        }}
      >
        <Paper 
          elevation={0} 
          sx={{ 
            width: '55%',
            minWidth: 650,
            maxWidth: 'none',
            p: 4,
            borderRadius: '20px',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.3)',
            maxHeight: 'calc(100vh - 200px)',
            overflowY: 'auto',
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
          
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 3,
              width: '100%',
              maxWidth: '100%',
              overflow: 'hidden',
              paddingTop: 1
            }}
          >
            <Controller
              name="titulo"
              control={control}
              rules={{ required: 'El título es requerido' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Título"
                  placeholder="Asigna un nombre a tu campaña"
                  variant="outlined"
                  error={showErrors && !!errors.general?.titulo}
                  helperText={showErrors && errors.general?.titulo ? getErrorMessage(errors.general.titulo) : undefined}
                  sx={{
                    maxWidth: '100%',
                    '& .MuiOutlinedInput-root': {
                      maxWidth: '100%',
                    }
                  }}
                />
              )}
            />

            <Controller
              name="descripcion"
              control={control}
              rules={{ required: 'La descripción es requerida' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  rows={3}
                  label="Descripción"
                  placeholder="Asigna una breve descripción del uso de tu campaña"
                  variant="outlined"
                  error={showErrors && !!errors.general?.descripcion}
                  helperText={showErrors && errors.general?.descripcion ? getErrorMessage(errors.general.descripcion) : undefined}
                  sx={{
                    maxWidth: '100%',
                    '& .MuiOutlinedInput-root': {
                      maxWidth: '100%',
                    }
                  }}
                />
              )}
            />

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', maxWidth: '100%' }}>
              <Box sx={{ flex: '1 1 300px', minWidth: 300, maxWidth: 'calc(50% - 8px)' }}>
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
                          error: showErrors && !!errors.general?.fechaInicio,
                          helperText: showErrors && errors.general?.fechaInicio ? getErrorMessage(errors.general.fechaInicio) : "Selecciona la fecha inicio de vigencia de tu campaña",
                          sx: { maxWidth: '100%' }
                        }
                      }}
                    />
                  )}
                />
              </Box>

              <Box sx={{ flex: '1 1 300px', minWidth: 300, maxWidth: 'calc(50% - 8px)' }}>
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
                          error: showErrors && !!errors.general?.fechaFin,
                          helperText: showErrors && errors.general?.fechaFin ? getErrorMessage(errors.general.fechaFin) : "Selecciona la fecha fin de vigencia de tu campaña",
                          sx: { maxWidth: '100%' }
                        }
                      }}
                    />
                  )}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', maxWidth: '100%' }}>
              <Box sx={{ flex: '1 1 300px', minWidth: 300, maxWidth: 'calc(50% - 8px)' }}>
                <Controller
                  name="fuente"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth sx={{ maxWidth: '100%' }} error={showErrors && !!errors.general?.fuente}>
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
                      {showErrors && errors.general?.fuente && (
                        <FormHelperText>{getErrorMessage(errors.general.fuente)}</FormHelperText>
                      )}
                      {(!showErrors || !errors.general?.fuente) && (
                        <FormHelperText>
                          Elige la fuente de origen de datos con la cual se completará a los destinatarios de tu campaña
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Box>

              <Box sx={{ flex: '1 1 300px', minWidth: 300, maxWidth: 'calc(50% - 8px)' }}>
                <Controller
                  name="tipoEjecucion"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth sx={{ maxWidth: '100%' }} error={showErrors && !!errors.general?.tipoEjecucion}>
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
                      {showErrors && errors.general?.tipoEjecucion && (
                        <FormHelperText>{getErrorMessage(errors.general.tipoEjecucion)}</FormHelperText>
                      )}
                      {(!showErrors || !errors.general?.tipoEjecucion) && (
                        <FormHelperText>
                          Define la programación de ejecución de tu campaña
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Box>
            </Box>

            {watchedValues.tipoEjecucion === 'PROGRAMADA' && (
              <Box sx={{ 
                p: 3, 
                borderRadius: '16px', 
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))',
                border: '1px solid rgba(102, 126, 234, 0.1)',
                maxWidth: '100%'
              }}>
                <Typography variant="h6" sx={{ mb: 2, color: '#667eea', fontWeight: 600 }}>
                  ⏰ Configuración de Programación
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', maxWidth: '100%' }}>
                  <Box sx={{ flex: '1 1 300px', minWidth: 300, maxWidth: 'calc(50% - 8px)' }}>
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
                              variant: "outlined",
                              error: showErrors && !!errors.general?.fechaProgramacion,
                              helperText: showErrors && errors.general?.fechaProgramacion ? getErrorMessage(errors.general.fechaProgramacion) : undefined,
                              sx: { maxWidth: '100%' }
                            }
                          }}
                        />
                      )}
                    />
                  </Box>

                  <Box sx={{ flex: '1 1 300px', minWidth: 300, maxWidth: 'calc(50% - 8px)' }}>
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
                              variant: "outlined",
                              error: showErrors && !!errors.general?.horaProgramacion,
                              helperText: showErrors && errors.general?.horaProgramacion ? getErrorMessage(errors.general.horaProgramacion) : undefined,
                              sx: { maxWidth: '100%' }
                            }
                          }}
                        />
                      )}
                    />
                  </Box>
                </Box>
              </Box>
            )}

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', maxWidth: '100%' }}>
              <Box sx={{ flex: '1 1 300px', minWidth: 300, maxWidth: 'calc(50% - 8px)' }}>
                <Controller
                  name="grupo"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth sx={{ maxWidth: '100%' }} error={showErrors && !!errors.general?.grupo}>
                      <InputLabel>Grupo</InputLabel>
                      <Select {...field} label="Grupo">
                        {mockGrupos.map((grupo) => (
                          <MenuItem key={grupo.id} value={grupo.id}>
                            <Box sx={{ maxWidth: '100%', overflow: 'hidden' }}>
                              <Typography 
                                variant="body2" 
                                fontWeight={600}
                                sx={{ 
                                  whiteSpace: 'nowrap', 
                                  overflow: 'hidden', 
                                  textOverflow: 'ellipsis',
                                  maxWidth: '250px'
                                }}
                              >
                                {grupo.nombre}
                              </Typography>
                              <Typography 
                                variant="caption" 
                                color="text.secondary"
                                sx={{ 
                                  whiteSpace: 'nowrap', 
                                  overflow: 'hidden', 
                                  textOverflow: 'ellipsis',
                                  maxWidth: '250px'
                                }}
                              >
                                {grupo.cantidad} contactos
                              </Typography>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                      {showErrors && errors.general?.grupo && (
                        <FormHelperText>{getErrorMessage(errors.general.grupo)}</FormHelperText>
                      )}
                      {(!showErrors || !errors.general?.grupo) && (
                        <FormHelperText>
                          Asigna un grupo de atención de asesores a tu campaña
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Box>

              <Box sx={{ flex: '1 1 300px', minWidth: 300, maxWidth: 'calc(50% - 8px)' }}>
                <Controller
                  name="canal"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth sx={{ maxWidth: '100%' }} error={showErrors && !!errors.general?.canal}>
                      <InputLabel>Canal</InputLabel>
                      <Select {...field} label="Canal">
                        {mockCanales.filter(c => c.activo).map((canal) => (
                          <MenuItem key={canal.id} value={canal.id}>
                            <Box sx={{ maxWidth: '100%', overflow: 'hidden' }}>
                              <Typography 
                                variant="body2" 
                                fontWeight={600}
                                sx={{ 
                                  whiteSpace: 'nowrap', 
                                  overflow: 'hidden', 
                                  textOverflow: 'ellipsis',
                                  maxWidth: '250px'
                                }}
                              >
                                {canal.nombre}
                              </Typography>
                              <Typography 
                                variant="caption" 
                                color="text.secondary"
                                sx={{ 
                                  whiteSpace: 'nowrap', 
                                  overflow: 'hidden', 
                                  textOverflow: 'ellipsis',
                                  maxWidth: '250px'
                                }}
                              >
                                {canal.descripcion}
                              </Typography>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                      {showErrors && errors.general?.canal && (
                        <FormHelperText>{getErrorMessage(errors.general.canal)}</FormHelperText>
                      )}
                      {(!showErrors || !errors.general?.canal) && (
                        <FormHelperText>
                          Selecciona el canal de envío de tu campaña
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', maxWidth: '100%' }}>
              <Box sx={{ flex: '1 1 300px', minWidth: 300, maxWidth: 'calc(50% - 8px)' }}>
                <Controller
                  name="tipoMensaje"
                  control={control}
                  render={({ field }) => (
                    <FormControl 
                      fullWidth 
                      disabled={tiposMensajeSoportados.length === 0}
                      sx={{ maxWidth: '100%' }}
                      error={showErrors && !!errors.general?.tipoMensaje}
                    >
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
                              <Typography sx={{ fontWeight: 600 }}>
                                {option.label}
                              </Typography>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                      {showErrors && errors.general?.tipoMensaje && (
                        <FormHelperText>{getErrorMessage(errors.general.tipoMensaje)}</FormHelperText>
                      )}
                      {(!showErrors || !errors.general?.tipoMensaje) && (
                        <FormHelperText>
                          {tiposMensajeSoportados.length === 0 
                            ? 'Primero selecciona un canal'
                            : `Tipos disponibles para el canal seleccionado: ${tiposMensajeSoportados.join(', ')}`
                          }
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Box>

              <Box sx={{ flex: '1 1 300px', minWidth: 300, maxWidth: 'calc(50% - 8px)' }}>
                <Controller
                  name="plantillaComunicacion"
                  control={control}
                  render={({ field }) => (
                    <FormControl 
                      fullWidth 
                      disabled={plantillasFiltradas.length === 0}
                      sx={{ maxWidth: '100%' }}
                      error={showErrors && !!errors.general?.plantillaComunicacion}
                    >
                      <InputLabel>Plantilla de Comunicación</InputLabel>
                      <Select {...field} label="Plantilla de Comunicación">
                        {plantillasFiltradas.map((plantilla) => (
                          <MenuItem key={plantilla.id} value={plantilla.id}>
                            <Box sx={{ maxWidth: '100%', overflow: 'hidden' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                <Typography 
                                  variant="body2" 
                                  fontWeight={600}
                                  sx={{ 
                                    whiteSpace: 'nowrap', 
                                    overflow: 'hidden', 
                                    textOverflow: 'ellipsis',
                                    maxWidth: '180px'
                                  }}
                                >
                                  {plantilla.nombre}
                                </Typography>
                                <Chip 
                                  label={plantilla.categoria} 
                                  size="small" 
                                  sx={{ fontSize: '0.7rem', flexShrink: 0 }}
                                />
                              </Box>
                              <Typography variant="caption" color="text.secondary">
                                Variables: {
                                  plantilla.variables.length > 3
                                    ? `${plantilla.variables.slice(0, 3).join(', ')}...`
                                    : plantilla.variables.join(', ')
                                }
                              </Typography>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                      {showErrors && errors.general?.plantillaComunicacion && (
                        <FormHelperText>{getErrorMessage(errors.general.plantillaComunicacion)}</FormHelperText>
                      )}
                      {(!showErrors || !errors.general?.plantillaComunicacion) && (
                        <FormHelperText>
                          {plantillasFiltradas.length === 0
                            ? 'Primero selecciona un tipo de mensaje'
                            : `${plantillasFiltradas.length} plantillas disponibles para ${watchedValues.tipoMensaje}`
                          }
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Box>
            </Box>
          </Box>
        </Paper>

        <Card 
        sx={{
            width: '45%',
            minWidth: 400,
            maxHeight: 'calc(100vh - 200px)',
            overflowY: 'auto',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.3)',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Box sx={{
                width: 40,
                height: 40,
                borderRadius: '12px',
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
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                maxWidth: '100%',
                overflow: 'hidden',
                flexGrow: 1,
              }}
            >
              <Box sx={{
                ...(selectedPlantilla?.tipo !== 'HTML' && {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                })
              }}>
                <MessagePreview plantilla={selectedPlantilla} />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </LocalizationProvider>
  );
};