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
} from '@mui/material';
import {
  Campaign as CampaignIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { CampaignFormProvider, useCampaignForm } from '../contexts/CampaignFormContext';
import { TabPanel, a11yProps } from './TabPanel';
import { GeneralTab } from './tabs/GeneralTab';
import { PersonasTab } from './tabs/PersonasTab';
import { MensajeTab } from './tabs/MensajeTab';

const CampaignTabsContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const { formData, resetForm, isValid } = useCampaignForm();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleSave = () => {
    console.log('Guardando campaña:', formData);
    setShowAlert(true);
    // Aquí integrarías con tu API usando RTK Query
  };

  const handleReset = () => {
    resetForm();
    setActiveTab(0);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'primary.main', mb: 3 }}>
        <Toolbar>
          <CampaignIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Campañas Avanzadas
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              color="inherit"
              startIcon={<RefreshIcon />}
              onClick={handleReset}
              variant="outlined"
            >
              Limpiar
            </Button>
            <Button
              color="inherit"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              variant="contained"
              sx={{ bgcolor: 'secondary.main', '&:hover': { bgcolor: 'secondary.dark' } }}
              disabled={!isValid}
            >
              Guardar Campaña
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Paper elevation={1} sx={{ mb: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            aria-label="campaign tabs"
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="General" {...a11yProps(0)} />
            <Tab label="Personas" {...a11yProps(1)} />
            <Tab label="Mensaje" {...a11yProps(2)} />
          </Tabs>
        </Paper>

        <TabPanel value={activeTab} index={0}>
          <GeneralTab />
        </TabPanel>
        
        <TabPanel value={activeTab} index={1}>
          <PersonasTab />
        </TabPanel>
        
        <TabPanel value={activeTab} index={2}>
          <MensajeTab />
        </TabPanel>

        {/* Debug Panel - Solo para desarrollo */}
        <Paper elevation={2} sx={{ mt: 4, p: 2, bgcolor: 'grey.50' }}>
          <Typography variant="h6" gutterBottom>
            Estado del Formulario (Debug)
          </Typography>
          <Typography variant="body2" component="pre" sx={{ 
            fontSize: '0.75rem', 
            overflow: 'auto',
            maxHeight: 200,
            bgcolor: 'white',
            p: 1,
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'grey.300'
          }}>
            {JSON.stringify(formData, null, 2)}
          </Typography>
          <Typography variant="caption" color={isValid ? 'success.main' : 'error.main'}>
            Formulario {isValid ? 'válido' : 'incompleto'}
          </Typography>
        </Paper>
      </Container>

      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowAlert(false)} severity="success" sx={{ width: '100%' }}>
          ¡Campaña guardada exitosamente!
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