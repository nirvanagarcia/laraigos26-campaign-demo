import React, { useState, useMemo, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Typography, InputLabel, Select, MenuItem, CardContent, Chip, FormHelperText } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useCampaignForm } from '../../contexts/CampaignFormContext';
import { mockGrupos, mockCanales, mockPlantillas } from '../../types/mockData';
import { MessagePreview } from '../previews';
import { getError, hasError } from '../../utils/formHelpers';
import { styles } from '../../styles/components/campaigns/GeneralTab.styles';
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

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <styles.GeneralContainer>
        <styles.FormPaper elevation={0}>
          <styles.FormHeader>
            <styles.HeaderIconBox>
              📋
            </styles.HeaderIconBox>
            <div>
              <styles.HeaderTitle>
                Configuración de Campaña
              </styles.HeaderTitle>
              <styles.HeaderSubtitle>
                Define los parámetros principales de tu campaña
              </styles.HeaderSubtitle>
            </div>
          </styles.FormHeader>
          
          <styles.FormContent>
            <Controller
              name="titulo"
              control={control}
              render={({ field }) => (
                <styles.StyledTextField
                  {...field}
                  fullWidth
                  label="Título"
                  placeholder="Asigna un nombre a tu campaña"
                  variant="outlined"
                  error={showErrors && hasError(errors, 'general.titulo')}
                  helperText={showErrors ? getError(errors, 'general.titulo') : undefined}
                />
              )}
            />

            <Controller
              name="descripcion"
              control={control}
              render={({ field }) => (
                <styles.StyledTextField
                  {...field}
                  fullWidth
                  multiline
                  rows={3}
                  label="Descripción"
                  placeholder="Asigna una breve descripción del uso de tu campaña"
                  variant="outlined"
                  error={showErrors && hasError(errors, 'general.descripcion')}
                  helperText={showErrors ? getError(errors, 'general.descripcion') : undefined}
                />
              )}
            />

            <styles.FieldRow>
              <styles.FieldBox>
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
                          error: showErrors && hasError(errors, 'general.fechaInicio'),
                          helperText: showErrors ? getError(errors, 'general.fechaInicio') : "Selecciona la fecha inicio de vigencia de tu campaña",
                          sx: { maxWidth: '100%' }
                        }
                      }}
                    />
                  )}
                />
              </styles.FieldBox>

              <styles.FieldBox>
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
                          error: showErrors && hasError(errors, 'general.fechaFin'),
                          helperText: showErrors ? getError(errors, 'general.fechaFin') : "Selecciona la fecha fin de vigencia de tu campaña",
                          sx: { maxWidth: '100%' }
                        }
                      }}
                    />
                  )}
                />
              </styles.FieldBox>
            </styles.FieldRow>

            <styles.FieldRow>
              <styles.FieldBox>
                <Controller
                  name="fuente"
                  control={control}
                  render={({ field }) => (
                    <styles.StyledFormControl fullWidth error={showErrors && hasError(errors, 'general.fuente')}>
                      <InputLabel>Fuente</InputLabel>
                      <Select {...field} label="Fuente">
                        {fuenteOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <span>{option.icon}</span>
                              {option.label}
                            </div>
                          </MenuItem>
                        ))}
                      </Select>
                      {showErrors && getError(errors, 'general.fuente') && (
                        <FormHelperText>{getError(errors, 'general.fuente')}</FormHelperText>
                      )}
                      {(!showErrors || !getError(errors, 'general.fuente')) && (
                        <FormHelperText>
                          Elige la fuente de origen de datos con la cual se completará a los destinatarios de tu campaña
                        </FormHelperText>
                      )}
                    </styles.StyledFormControl>
                  )}
                />
              </styles.FieldBox>

              <styles.FieldBox>
                <Controller
                  name="tipoEjecucion"
                  control={control}
                  render={({ field }) => (
                    <styles.StyledFormControl fullWidth error={showErrors && hasError(errors, 'general.tipoEjecucion')}>
                      <InputLabel>Tipo de ejecución</InputLabel>
                      <Select {...field} label="Tipo de ejecución">
                        {tipoEjecucionOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <span>{option.icon}</span>
                              {option.label}
                            </div>
                          </MenuItem>
                        ))}
                      </Select>
                      {showErrors && getError(errors, 'general.tipoEjecucion') && (
                        <FormHelperText>{getError(errors, 'general.tipoEjecucion')}</FormHelperText>
                      )}
                      {(!showErrors || !getError(errors, 'general.tipoEjecucion')) && (
                        <FormHelperText>
                          Define la programación de ejecución de tu campaña
                        </FormHelperText>
                      )}
                    </styles.StyledFormControl>
                  )}
                />
              </styles.FieldBox>
            </styles.FieldRow>

            {watchedValues.tipoEjecucion === 'PROGRAMADA' && (
              <styles.ConditionalSection>
                <styles.ConditionalTitle variant="h6">
                  ⏰ Configuración de Programación
                </styles.ConditionalTitle>
                <styles.FieldRow>
                  <styles.FieldBox>
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
                              error: showErrors && hasError(errors, 'general.fechaProgramacion'),
                              helperText: showErrors ? getError(errors, 'general.fechaProgramacion') : undefined,
                              sx: { maxWidth: '100%' }
                            }
                          }}
                        />
                      )}
                    />
                  </styles.FieldBox>

                  <styles.FieldBox>
                    <Controller
                      name="horaProgramacion"
                      control={control}
                      render={({ field }) => (
                        <TimePicker
                          label="Hora de programación"
                          value={field.value ? new Date(`2000-01-01T${field.value}`) : null}
                          onChange={(newValue) => {
                            if (newValue) {
                              const timeString = newValue.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
                              field.onChange(timeString);
                            } else {
                              field.onChange('');
                            }
                          }}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              variant: "outlined",
                              error: showErrors && hasError(errors, 'general.horaProgramacion'),
                              helperText: showErrors ? getError(errors, 'general.horaProgramacion') : undefined,
                              sx: { maxWidth: '100%' }
                            }
                          }}
                        />
                      )}
                    />
                  </styles.FieldBox>
                </styles.FieldRow>
              </styles.ConditionalSection>
            )}

            <styles.FieldRow>
              <styles.FieldBox>
                <Controller
                  name="grupo"
                  control={control}
                  render={({ field }) => (
                    <styles.StyledFormControl fullWidth error={showErrors && hasError(errors, 'general.grupo')}>
                      <InputLabel>Grupo</InputLabel>
                      <Select {...field} label="Grupo">
                        {mockGrupos.map((grupo) => (
                          <MenuItem key={grupo.id} value={grupo.id}>
                            <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
                              <Typography variant="body2" fontWeight={600} sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '250px' }}>
                                {grupo.nombre}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '250px' }}>
                                {grupo.cantidad} contactos
                              </Typography>
                            </div>
                          </MenuItem>
                        ))}
                      </Select>
                      {showErrors && getError(errors, 'general.grupo') && (
                        <FormHelperText>{getError(errors, 'general.grupo')}</FormHelperText>
                      )}
                      {(!showErrors || !getError(errors, 'general.grupo')) && (
                        <FormHelperText>
                          Asigna un grupo de atención de asesores a tu campaña
                        </FormHelperText>
                      )}
                    </styles.StyledFormControl>
                  )}
                />
              </styles.FieldBox>

              <styles.FieldBox>
                <Controller
                  name="canal"
                  control={control}
                  render={({ field }) => (
                    <styles.StyledFormControl fullWidth error={showErrors && hasError(errors, 'general.canal')}>
                      <InputLabel>Canal</InputLabel>
                      <Select {...field} label="Canal">
                        {mockCanales.filter(c => c.activo).map((canal) => (
                          <MenuItem key={canal.id} value={canal.id}>
                            <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
                              <Typography variant="body2" fontWeight={600} sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '250px' }}>
                                {canal.nombre}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '250px' }}>
                                {canal.descripcion}
                              </Typography>
                            </div>
                          </MenuItem>
                        ))}
                      </Select>
                      {showErrors && getError(errors, 'general.canal') && (
                        <FormHelperText>{getError(errors, 'general.canal')}</FormHelperText>
                      )}
                      {(!showErrors || !getError(errors, 'general.canal')) && (
                        <FormHelperText>
                          Selecciona el canal de envío de tu campaña
                        </FormHelperText>
                      )}
                    </styles.StyledFormControl>
                  )}
                />
              </styles.FieldBox>
            </styles.FieldRow>

            <styles.FieldRow>
              <styles.FieldBox>
                <Controller
                  name="tipoMensaje"
                  control={control}
                  render={({ field }) => (
                    <styles.StyledFormControl fullWidth disabled={tiposMensajeSoportados.length === 0} error={showErrors && hasError(errors, 'general.tipoMensaje')}>
                      <InputLabel>Tipo de Mensaje</InputLabel>
                      <Select {...field} label="Tipo de Mensaje" value={tiposMensajeSoportados.includes(field.value as any) ? field.value : ''}>
                        {tipoMensajeOptions.filter(option => tiposMensajeSoportados.includes(option.value as any)).map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <span>{option.icon}</span>
                              <Typography sx={{ fontWeight: 600 }}>
                                {option.label}
                              </Typography>
                            </div>
                          </MenuItem>
                        ))}
                      </Select>
                      {showErrors && getError(errors, 'general.tipoMensaje') && (
                        <FormHelperText>{getError(errors, 'general.tipoMensaje')}</FormHelperText>
                      )}
                      {(!showErrors || !getError(errors, 'general.tipoMensaje')) && (
                        <FormHelperText>
                          {tiposMensajeSoportados.length === 0 ? 'Primero selecciona un canal' : `Tipos disponibles para el canal seleccionado: ${tiposMensajeSoportados.join(', ')}`}
                        </FormHelperText>
                      )}
                    </styles.StyledFormControl>
                  )}
                />
              </styles.FieldBox>

              <styles.FieldBox>
                <Controller
                  name="plantillaComunicacion"
                  control={control}
                  render={({ field }) => (
                    <styles.StyledFormControl fullWidth disabled={plantillasFiltradas.length === 0} error={showErrors && hasError(errors, 'general.plantillaComunicacion')}>
                      <InputLabel>Plantilla de Comunicación</InputLabel>
                      <Select {...field} label="Plantilla de Comunicación">
                        {plantillasFiltradas.map((plantilla) => (
                          <MenuItem key={plantilla.id} value={plantilla.id}>
                            <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                <Typography variant="body2" fontWeight={600} sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>
                                  {plantilla.nombre}
                                </Typography>
                                <Chip label={plantilla.categoria} size="small" sx={{ fontSize: '0.7rem', flexShrink: 0 }} />
                              </div>
                              <Typography variant="caption" color="text.secondary">
                                Variables: {plantilla.variables.length > 3 ? `${plantilla.variables.slice(0, 3).join(', ')}...` : plantilla.variables.join(', ')}
                              </Typography>
                            </div>
                          </MenuItem>
                        ))}
                      </Select>
                      {showErrors && getError(errors, 'general.plantillaComunicacion') && (
                        <FormHelperText>{getError(errors, 'general.plantillaComunicacion')}</FormHelperText>
                      )}
                      {(!showErrors || !getError(errors, 'general.plantillaComunicacion')) && (
                        <FormHelperText>
                          {plantillasFiltradas.length === 0 ? 'Primero selecciona un tipo de mensaje' : `${plantillasFiltradas.length} plantillas disponibles para ${watchedValues.tipoMensaje}`}
                        </FormHelperText>
                      )}
                    </styles.StyledFormControl>
                  )}
                />
              </styles.FieldBox>
            </styles.FieldRow>
          </styles.FormContent>
        </styles.FormPaper>

        <styles.PreviewCard>
          <CardContent sx={{ p: 4 }}>
            <styles.PreviewHeader>
              <styles.PreviewIconBox>
                👁️
              </styles.PreviewIconBox>
              <styles.PreviewTitle variant="h6">
                Vista Previa
              </styles.PreviewTitle>
            </styles.PreviewHeader>
            <styles.PreviewContent>
              <div style={{ ...(selectedPlantilla?.tipo !== 'HTML' && { display: 'flex', justifyContent: 'center', alignItems: 'center' }) }}>
                <MessagePreview plantilla={selectedPlantilla} />
              </div>
            </styles.PreviewContent>
          </CardContent>
        </styles.PreviewCard>
      </styles.GeneralContainer>
    </LocalizationProvider>
  );
};