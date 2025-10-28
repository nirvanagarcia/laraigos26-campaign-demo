import React, { useRef, useMemo } from 'react';
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
  People as PeopleIcon,
  BusinessCenter as BusinessCenterIcon,
} from '@mui/icons-material';
import { useCampaignForm } from '../../contexts/CampaignFormContext';
import { useExcelImport } from '../../hooks/useExcelImport';
import { ExcelDataTable } from '../tables/ExcelDataTable';
import { personasMockData, oportunidadesMockData } from '../../data/mockData';

export const PersonasTab: React.FC = () => {
  const { formData } = useCampaignForm();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { 
    excelData, 
    isLoading, 
    error, 
    processExcelFile, 
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

  const fuente = formData.general.fuente;

  const personasTableData = useMemo(() => {
    const headers = ['Nombre', 'Apellido', 'Teléfono', 'Correo', 'Nº Documento', 'Cumpleaños', 'Género', 'Nivel Educación', 'Asesor'];
    const rows = personasMockData.map((persona, index) => ({
      id: `persona-${index}`,
      data: {
        'Nombre': persona.nombre,
        'Apellido': persona.apellido,
        'Teléfono': persona.telefono,
        'Correo': persona.correo,
        'Nº Documento': persona.numeroDocumento,
        'Cumpleaños': persona.cumpleanos,
        'Género': persona.genero,
        'Nivel Educación': persona.nivelEducacion,
        'Asesor': persona.asesor
      }
    }));
    return { headers, rows };
  }, []);

  const getOportunidadesTableData = useMemo(() => {
    const headers = ['Oportunidad', 'Última Act.', 'Nombre', 'Correo', 'Teléfono', 'Ingreso Esperado', 'Fecha Fin', 'Fecha Inicio', 'Tag', 'Asesor', 'Productos', 'Fases'];
    const rows = oportunidadesMockData.map((oportunidad, index) => ({
      id: `oportunidad-${index}`,
      data: {
        'Oportunidad': oportunidad.oportunidad,
        'Última Act.': oportunidad.ultimaActualizacion,
        'Nombre': oportunidad.nombre,
        'Correo': oportunidad.correo,
        'Teléfono': oportunidad.telefono,
        'Ingreso Esperado': oportunidad.ingresoEsperado,
        'Fecha Fin': oportunidad.fechaFin,
        'Fecha Inicio': oportunidad.fechaInicio,
        'Tag': oportunidad.tag,
        'Asesor': oportunidad.asesor,
        'Productos': oportunidad.productos,
        'Fases': oportunidad.fases
      }
    }));
    return { headers, rows };
  }, []);

  if (fuente === 'PERSONAS') {
    const tableData = personasTableData;
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
            background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 2,
          }}>
            <PeopleIcon sx={{ color: 'white', fontSize: 24 }} />
          </Box>
          <Box>
            <Typography variant="h5" sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #4facfe, #00f2fe)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Personas Preexistentes
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {personasMockData.length} personas disponibles en la base de datos
            </Typography>
          </Box>
        </Box>

        <ExcelDataTable
          headers={tableData.headers}
          rows={tableData.rows}
          defaultColumnConfig={{ width: 150 }}
        />
      </Paper>
    );
  }

  if (fuente === 'OPORTUNIDADES') {
    const tableData = getOportunidadesTableData;
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
            background: 'linear-gradient(135deg, #fa709a, #fee140)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 2,
          }}>
            <BusinessCenterIcon sx={{ color: 'white', fontSize: 24 }} />
          </Box>
          <Box>
            <Typography variant="h5" sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #fa709a, #fee140)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Oportunidades de Negocio
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {oportunidadesMockData.length} oportunidades activas en el sistema
            </Typography>
          </Box>
        </Box>

        <ExcelDataTable
          headers={tableData.headers}
          rows={tableData.rows}
          defaultColumnConfig={{ width: 140 }}
        />
      </Paper>
    );
  }

  if (fuente === 'EXTERNA') {
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
            Audiencia y Personas
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Selecciona una fuente en la configuración general
          </Typography>
        </Box>
      </Box>

      <Alert severity="info" sx={{ borderRadius: '12px' }}>
        Selecciona una fuente de datos en el tab "General" para ver las opciones disponibles.
      </Alert>
    </Paper>
  );
};