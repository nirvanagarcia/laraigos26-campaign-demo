import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Button,
  AppBar,
  Toolbar,
  Paper,
  Alert,
  Snackbar,
  Badge,
} from '@mui/material';
import {
  Campaign as CampaignIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { CampaignFormProvider, useCampaignForm } from '../contexts/CampaignFormContext';
import { TabPanel, a11yProps } from './TabPanel';
import { GeneralTab } from './tabs/GeneralTab';
import { PersonasTab } from './tabs/PersonasTab';

const CampaignTabsContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const { formData, resetForm, isValid, errors, validateForm, validateTab, showErrors } = useCampaignForm();

  const getTabName = (tabIndex: number): string => {
    const tabNames = ['general', 'personas'];
    return tabNames[tabIndex] || 'general';
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    const currentTabName = getTabName(activeTab);
    
    if (activeTab > 0 || formData.general.titulo || formData.general.descripcion || Object.values(formData.general).some(value => value && value !== '')) {
      const isCurrentTabValid = validateTab(currentTabName);
      
      if (!isCurrentTabValid) {
        console.log(`Tab ${currentTabName} tiene errores, pero permitiendo el cambio`);
      }
    }
    
    setActiveTab(newValue);
  };

  const handleSave = () => {
    if (validateForm()) {
      console.log('Guardando campaña:', formData);
      setShowAlert(true);
    } else {
      console.log('Formulario inválido:', errors);
    }
  };

  const handleReset = () => {
    resetForm();
    setActiveTab(0);
  };

  const getTabErrors = () => {
    const generalErrors = Object.keys(errors.general || {}).length;
    const personasErrors = Object.keys(errors.personas || {}).length;
    
    return {
      general: generalErrors,
      personas: personasErrors,
    };
  };

  const tabErrors = getTabErrors();

  return (
    <Box sx={{ 
      flexGrow: 1, 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh'
    }}>
      <AppBar 
        position="static" 
        elevation={0} 
        sx={{ 
          background: 'transparent',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          mb: 4
        }}
      >
        <Toolbar sx={{ py: 2 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50px',
            px: 2,
            py: 1,
            mr: 3
          }}>
            <CampaignIcon sx={{ mr: 1, color: 'white' }} />
            <Typography variant="h5" component="div" sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #ffffff, #f0f0f0)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Campañas Avanzadas
            </Typography>
          </Box>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              startIcon={<RefreshIcon />}
              onClick={handleReset}
              variant="outlined"
              sx={{
                color: 'white',
                borderColor: 'rgba(255,255,255,0.3)',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  borderColor: 'rgba(255,255,255,0.5)',
                  background: 'rgba(255,255,255,0.2)',
                }
              }}
            >
              Limpiar
            </Button>
            <Button
              startIcon={<SaveIcon />}
              onClick={handleSave}
              variant="contained"
              disabled={!isValid}
              sx={{
                background: isValid 
                  ? 'linear-gradient(45deg, #f093fb, #f5576c)'
                  : 'rgba(255,255,255,0.2)',
                color: 'white',
                fontWeight: 600,
                px: 4,
                '&:hover': {
                  background: isValid 
                    ? 'linear-gradient(45deg, #ec69f8, #f34f63)'
                    : 'rgba(255,255,255,0.2)',
                  transform: isValid ? 'translateY(-2px)' : 'none',
                  boxShadow: isValid ? '0 10px 20px rgba(240, 147, 251, 0.4)' : 'none',
                },
                '&:disabled': {
                  background: 'rgba(255,255,255,0.2)',
                  color: 'rgba(255,255,255,0.5)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Guardar Campaña
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth={false}>
        <Paper 
          elevation={0} 
          sx={{ 
            mb: 4,
            borderRadius: '24px',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.2)',
            overflow: 'hidden'
          }}
        >
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            aria-label="campaign tabs"
            variant="fullWidth"
            sx={{
              '& .MuiTabs-indicator': {
                height: 4,
                borderRadius: '2px 2px 0 0',
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1.1rem',
                py: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(102, 126, 234, 0.05)',
                },
                '&.Mui-selected': {
                  color: '#667eea',
                  fontWeight: 700,
                },
              },
            }}
          >
            <Tab 
              label={
                <Badge 
                  badgeContent={tabErrors.general} 
                  color="error" 
                  invisible={tabErrors.general === 0}
                >
                  📋 General
                </Badge>
              }
              {...a11yProps(0)}
              icon={<Box sx={{ fontSize: '1.2rem' }}>🎯</Box>}
              iconPosition="start"
            />
            <Tab 
              label={
                <Badge 
                  badgeContent={tabErrors.personas} 
                  color="error" 
                  invisible={tabErrors.personas === 0}
                >
                  👥 Personas
                </Badge>
              }
              {...a11yProps(1)}
              icon={<Box sx={{ fontSize: '1.2rem' }}>🎭</Box>}
              iconPosition="start"
            />
           
          </Tabs>
        </Paper>

        <TabPanel value={activeTab} index={0}>
          <GeneralTab />
        </TabPanel>
        
        <TabPanel value={activeTab} index={1}>
          <PersonasTab />
        </TabPanel>

        {/* Panel de errores de validación */}
        {showErrors && !isValid && (
          <Paper 
            elevation={0} 
            sx={{ 
              mt: 4, 
              p: 3, 
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(239, 68, 68, 0.2)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ErrorIcon sx={{ color: '#ef4444', mr: 1 }} />
              <Typography variant="h6" sx={{ 
                color: '#ef4444',
                fontWeight: 700,
              }}>
                ⚠️ Campos Requeridos Faltantes
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Errores del tab General */}
              {Object.keys(errors.general || {}).length > 0 && (
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#ef4444' }}>
                    📋 Tab General:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {Object.entries(errors.general || {}).map(([field, message]) => (
                      <Alert 
                        key={field}
                        severity="error" 
                        sx={{ 
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                        }}
                      >
                        {String(message?.message || message || 'Error de validación')}
                      </Alert>
                    ))}
                  </Box>
                </Box>
              )}

              {/* Errores del tab Personas */}
              {Object.keys(errors.personas || {}).length > 0 && (
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#ef4444' }}>
                    👥 Tab Personas:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {Object.entries(errors.personas || {}).map(([field, message]) => (
                      <Alert 
                        key={field}
                        severity="error" 
                        sx={{ 
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                        }}
                      >
                        {String(message?.message || message || 'Error de validación')}
                      </Alert>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Paper>
        )}

        <Paper 
          elevation={0} 
          sx={{ 
            mt: 4, 
            p: 3, 
            borderRadius: '20px',
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.3)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ 
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
              mr: 2
            }}>
              🔍 Estado del Formulario (Debug)
            </Typography>
            <Box sx={{
              px: 2,
              py: 0.5,
              borderRadius: '20px',
              background: isValid 
                ? 'linear-gradient(45deg, #10b981, #34d399)' 
                : 'linear-gradient(45deg, #ef4444, #f87171)',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}>
              {isValid ? '✅ Válido' : '⚠️ Incompleto'}
            </Box>
          </Box>
          
          <Typography variant="body2" component="pre" sx={{ 
            fontSize: '0.75rem', 
            overflow: 'auto',
            maxHeight: 200,
            background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
            p: 2,
            borderRadius: '12px',
            border: '1px solid rgba(102, 126, 234, 0.1)',
            fontFamily: '"Fira Code", "Monaco", monospace',
            lineHeight: 1.4,
          }}>
            {JSON.stringify(formData, null, 2)}
          </Typography>
        </Paper>
      </Container>

      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowAlert(false)} 
          severity="success" 
          sx={{ 
            width: '100%',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: 600,
          }}
        >
          ✅ ¡Campaña guardada exitosamente!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export const CampaignAdvanced: React.FC = () => {
  return (
    <CampaignFormProvider>
      <CampaignTabsContent />
    </CampaignFormProvider>
  );
};