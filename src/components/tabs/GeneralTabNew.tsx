import React, { useState } from 'react';
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
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useCampaignForm } from '../../contexts/CampaignFormContext';
import { mockGrupos, mockCanales, mockPlantillas } from '../../types/mockData';
import type { PlantillaComunicacion } from '../../types/mockData';

export const GeneralTab: React.FC = () => {
  const { formData, updateFormData } = useCampaignForm();
  const { control, watch } = useForm({
    defaultValues: formData.general,
  });

  const watchedValues = watch();
  const [selectedPlantilla, setSelectedPlantilla] = useState<PlantillaComunicacion | null>(null);

  React.useEffect(() => {
    updateFormData('general', watchedValues);
  }, [watchedValues, updateFormData]);

  React.useEffect(() => {
    if (watchedValues.plantillaComunicacion) {
      const plantilla = mockPlantillas.find(p => p.id === watchedValues.plantillaComunicacion);
      setSelectedPlantilla(plantilla || null);
    } else {
      setSelectedPlantilla(null);
    }
  }, [watchedValues.plantillaComunicacion]);

  const fuenteOptions = [
    { value: 'EXTERNA', label: 'EXTERNA', icon: '🌐' },
    { value: 'PERSONAS', label: 'PERSONAS', icon: '🏢' },
    { value: 'OPORTUNIDADES', label: 'OPORTUNIDADES', icon: '🎯' },
  ];

  const tipoEjecucionOptions = [
    { value: 'MANUAL', label: 'MANUAL', icon: '👤' },
    { value: 'PROGRAMADA', label: 'PROGRAMADA', icon: '⏰' },
  ];

  const tipoMensajeOptions = [
    { value: 'HSM', label: 'HSM', icon: '📱' },
    { value: 'CORREO', label: 'CORREO', icon: '📧' },
    { value: 'SMS', label: 'SMS', icon: '💬' },
  ];

  const filteredPlantillas = mockPlantillas.filter(p => p.tipo === watchedValues.tipoMensaje);

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
                borderRadius: '12px', 
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
                        <TextField
                          {...field}
                          fullWidth
                          type="time"
                          label="Hora de programación"
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true,
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
                                {canal.tipo}
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
                    <FormControl fullWidth>
                      <InputLabel>Tipo de Mensaje</InputLabel>
                      <Select {...field} label="Tipo de Mensaje">
                        {tipoMensajeOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <span>{option.icon}</span>
                              {option.label}
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, ml: 1 }}>
                        Selecciona el tipo de mensaje que se enviará por tu canal asignado
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
                    <FormControl fullWidth>
                      <InputLabel>Plantilla de comunicación</InputLabel>
                      <Select {...field} label="Plantilla de comunicación">
                        {filteredPlantillas.map((plantilla) => (
                          <MenuItem key={plantilla.id} value={plantilla.id}>
                            <Box>
                              <Typography variant="body2" fontWeight={600}>
                                {plantilla.nombre}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Variables: {plantilla.variables.join(', ')}
                              </Typography>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, ml: 1 }}>
                        Selecciona la plantilla de mensaje que se enviará en tu campaña
                      </Typography>
                    </FormControl>
                  )}
                />
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Preview Panel */}
        <Card 
          sx={{ 
            width: 380,
            borderRadius: '20px',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.3)',
            height: 'fit-content',
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{
                width: 32,
                height: 32,
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #10b981, #34d399)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
                fontSize: '1rem'
              }}>
                👁️
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Preview
              </Typography>
            </Box>

            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              {selectedPlantilla ? selectedPlantilla.nombre : 'No seleccionado'}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {selectedPlantilla ? (
              <Box sx={{ 
                p: 2, 
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
                border: '1px solid rgba(0,0,0,0.05)'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Chip 
                    label={selectedPlantilla.tipo}
                    size="small"
                    sx={{
                      background: 'linear-gradient(45deg, #667eea, #764ba2)',
                      color: 'white',
                      fontWeight: 600,
                    }}
                  />
                </Box>

                <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
                  {selectedPlantilla.nombre}
                </Typography>

                <Typography variant="body2" sx={{ 
                  mb: 2, 
                  p: 2, 
                  bgcolor: 'white', 
                  borderRadius: '8px',
                  border: '1px solid rgba(0,0,0,0.05)',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  lineHeight: 1.6,
                }}>
                  {selectedPlantilla.preview}
                </Typography>

                {selectedPlantilla.variables.length > 0 && (
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                      Variables disponibles:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selectedPlantilla.variables.map((variable, index) => (
                        <Chip
                          key={index}
                          label={`{{${variable}}}`}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.75rem' }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            ) : (
              <Box sx={{ 
                p: 3, 
                textAlign: 'center',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
                border: '1px dashed rgba(102, 126, 234, 0.3)'
              }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  📝 Selecciona una plantilla para ver el preview
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </LocalizationProvider>
  );
};