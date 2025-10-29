import React, { useState } from 'react';
import { Container, Tabs, Tab, Snackbar, Badge } from '@mui/material';
import { Campaign as CampaignIcon, Save as SaveIcon, Refresh as RefreshIcon, Error as ErrorIcon } from '@mui/icons-material';
import { CampaignFormProvider, useCampaignForm } from '../contexts/CampaignFormContext';
import { TabPanel, a11yProps } from './TabPanel';
import { GeneralTab } from './tabs/GeneralTab';
import { PersonasTab } from './tabs/PersonasTab';
import { styles } from '../styles/components/campaigns/CampaignAdvanced.styles';

const CampaignTabsContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const { formData, resetForm, isValid, errors, validateForm, validateTab, showErrors, getTabErrors, isTabValid } = useCampaignForm();

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

  const handleSave = async () => {
    const isFormValid = await validateForm();
    if (isFormValid) {
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

  const tabErrors = getTabErrors();

  return (
    <styles.MainContainer>
      <styles.StyledAppBar position="static" elevation={0}>
        <styles.StyledToolbar>
          <styles.LogoBox>
            <CampaignIcon sx={{ mr: 1, color: 'white' }} />
            <styles.AppTitle variant="h5" component="div">
              Campañas Avanzadas
            </styles.AppTitle>
          </styles.LogoBox>
          
          <styles.FlexGrow />
          
          <styles.ButtonGroup>
            <styles.ResetButton 
              startIcon={<RefreshIcon />} 
              onClick={handleReset} 
              variant="outlined"
            >
              Limpiar
            </styles.ResetButton>
            <styles.SaveButton 
              startIcon={<SaveIcon />} 
              onClick={handleSave} 
              variant="contained" 
              disabled={!isValid}
              isValid={isValid}
            >
              Guardar Campaña
            </styles.SaveButton>
          </styles.ButtonGroup>
        </styles.StyledToolbar>
      </styles.StyledAppBar>

      <Container maxWidth={false}>
        <styles.TabsPaper elevation={0}>
          <styles.StyledTabs>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange} 
              aria-label="campaign tabs" 
              variant="fullWidth"
            >
              <Tab 
                label={
                  <Badge badgeContent={tabErrors.general} color="error" invisible={tabErrors.general === 0}>
                    📋 General
                  </Badge>
                } 
                {...a11yProps(0)} 
                icon={<styles.TabIcon>🎯</styles.TabIcon>} 
                iconPosition="start" 
              />
              <Tab 
                label={
                  <Badge badgeContent={tabErrors.personas} color="error" invisible={tabErrors.personas === 0}>
                    👥 Personas
                  </Badge>
                } 
                {...a11yProps(1)} 
                icon={<styles.TabIcon>🎭</styles.TabIcon>} 
                iconPosition="start" 
              />
            </Tabs>
          </styles.StyledTabs>
        </styles.TabsPaper>

        <TabPanel value={activeTab} index={0}>
          <GeneralTab />
        </TabPanel>
        
        <TabPanel value={activeTab} index={1}>
          <PersonasTab />
        </TabPanel>

        {showErrors && !isValid && (
          <styles.ErrorPaper elevation={0}>
            <styles.ErrorHeader>
              <ErrorIcon sx={{ color: '#ef4444', mr: 1 }} />
              <styles.ErrorTitle variant="h6">
                ⚠️ Campos Requeridos Faltantes
              </styles.ErrorTitle>
            </styles.ErrorHeader>
            
            <styles.ErrorContent>
              {Object.keys(errors.general || {}).length > 0 && (
                <styles.ErrorSection>
                  <div className="section-title">📋 Tab General:</div>
                  <styles.ErrorAlerts>
                    {Object.entries(errors.general || {}).map(([field, message]) => (
                      <styles.StyledErrorAlert key={field} severity="error">
                        {String(message?.message || message || 'Error de validación')}
                      </styles.StyledErrorAlert>
                    ))}
                  </styles.ErrorAlerts>
                </styles.ErrorSection>
              )}

              {Object.keys(errors.personas || {}).length > 0 && (
                <styles.ErrorSection>
                  <div className="section-title">👥 Tab Personas:</div>
                  <styles.ErrorAlerts>
                    {Object.entries(errors.personas || {}).map(([field, message]) => (
                      <styles.StyledErrorAlert key={field} severity="error">
                        {String(message?.message || message || 'Error de validación')}
                      </styles.StyledErrorAlert>
                    ))}
                  </styles.ErrorAlerts>
                </styles.ErrorSection>
              )}
            </styles.ErrorContent>
          </styles.ErrorPaper>
        )}

        <styles.DebugPaper elevation={0}>
          <styles.DebugHeader>
            <styles.DebugTitle variant="h6">
              🔍 Estado del Formulario (Debug)
            </styles.DebugTitle>
            <styles.StatusBadge isValid={isValid}>
              {isValid ? '✅ Válido' : '⚠️ Incompleto'}
            </styles.StatusBadge>
          </styles.DebugHeader>
          
          <styles.DebugContent variant="body2" component="pre">
            {JSON.stringify(formData, null, 2)}
          </styles.DebugContent>
        </styles.DebugPaper>
      </Container>

      <Snackbar 
        open={showAlert} 
        autoHideDuration={6000} 
        onClose={() => setShowAlert(false)} 
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <styles.SuccessAlert onClose={() => setShowAlert(false)} severity="success">
          ✅ ¡Campaña guardada exitosamente!
        </styles.SuccessAlert>
      </Snackbar>
    </styles.MainContainer>
  );
};

export const CampaignAdvanced: React.FC = () => {
  return (
    <CampaignFormProvider>
      <CampaignTabsContent />
    </CampaignFormProvider>
  );
};