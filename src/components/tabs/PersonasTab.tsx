import React, { useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Alert,
  CircularProgress,
  Fade,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';
import { useCampaignForm } from '../../contexts/CampaignFormContext';
import { useExcelImport } from '../../hooks/useExcelImport';
import { ExcelDataTable } from '../tables/ExcelDataTable';

export const PersonasTab: React.FC = () => {
  const { formData } = useCampaignForm();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { 
    excelData, 
    isLoading, 
    error, 
    processExcelFile, 
    removeRow, 
    removeRows, 
    clearData 
  } = useExcelImport();

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processExcelFile(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isExternalSource = formData.general.fuente === 'EXTERNA';

  if (!isExternalSource) {
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
              Funcionalidad disponible para fuente EXTERNA
            </Typography>
          </Box>
        </Box>

        <Alert severity="info" sx={{ borderRadius: '12px' }}>
          Esta funcionalidad estará disponible cuando selecciones "EXTERNA" como fuente en la configuración general.
        </Alert>
      </Paper>
    );
  }

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
            Importar Miembros Externos
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Carga un archivo Excel con la información de tus contactos
          </Typography>
        </Box>
      </Box>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".xlsx,.xls"
        style={{ display: 'none' }}
      />

      {!excelData && (
        <Fade in={true}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            py: 6,
            textAlign: 'center'
          }}>
            <Box sx={{
              width: 120,
              height: 120,
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(240, 147, 251, 0.1))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
              border: '2px dashed rgba(102, 126, 234, 0.3)',
            }}>
              <DescriptionIcon sx={{ fontSize: 48, color: '#667eea' }} />
            </Box>

            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              📂 Importa tu archivo Excel
            </Typography>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 500 }}>
              Sube un archivo Excel (.xlsx o .xls) con la información de tus contactos. 
              Si la primera fila contiene "Obligatorio" u "Opcional", será ignorada automáticamente.
            </Typography>

            <Button
              onClick={handleFileUpload}
              disabled={isLoading}
              variant="contained"
              size="large"
              startIcon={isLoading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
              sx={{
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                color: 'white',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: '12px',
                textTransform: 'none',
                fontSize: '1.1rem',
                '&:hover': {
                  background: 'linear-gradient(45deg, #5a67d8, #6b46c1)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 16px rgba(102, 126, 234, 0.3)',
                },
                '&:disabled': {
                  background: 'rgba(102, 126, 234, 0.3)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {isLoading ? 'Procesando...' : 'Seleccionar Archivo'}
            </Button>

            <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
              Formatos soportados: .xlsx, .xls
            </Typography>
          </Box>
        </Fade>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2, borderRadius: '12px' }}>
          {error}
        </Alert>
      )}

      {excelData && (
        <Fade in={true}>
          <Box sx={{ mt: 3 }}>
            <ExcelDataTable
              headers={excelData.headers}
              rows={excelData.rows}
              onRemoveRows={removeRows}
              onClearAll={clearData}
            />
          </Box>
        </Fade>
      )}
    </Paper>
  );
};