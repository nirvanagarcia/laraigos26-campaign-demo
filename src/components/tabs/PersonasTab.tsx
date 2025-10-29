import React, { useRef, useMemo } from 'react';
import { Typography, CircularProgress, Fade } from '@mui/material';
import { CloudUpload as CloudUploadIcon, Description as DescriptionIcon, People as PeopleIcon, BusinessCenter as BusinessCenterIcon } from '@mui/icons-material';
import { useCampaignForm } from '../../contexts/CampaignFormContext';
import { useExcelImport } from '../../hooks/useExcelImport';
import { ExcelDataTable } from '../tables/ExcelDataTable';
import { personasMockData, oportunidadesMockData } from '../../data/mockData';
import { getError, hasError } from '../../utils/formHelpers';
import { styles } from '../../styles/components/campaigns/PersonasTab.styles';

export const PersonasTab: React.FC = () => {
  const { formData, updateFormData, errors, showErrors } = useCampaignForm();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isLoading, error, processExcelFile } = useExcelImport();

  const excelData = formData.personas.excelData;

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const data = await processExcelFile(file);
      if (data) {
        updateFormData('personas', { excelData: data });
      }
    } else {
      updateFormData('personas', { excelData: null });
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeRows = (rowIds: string[]) => {
    if (!excelData) return;
    const updatedRows = excelData.rows.filter(row => !rowIds.includes(row.id));
    updateFormData('personas', { excelData: { ...excelData, rows: updatedRows } });
  };

  const clearData = () => {
    updateFormData('personas', { excelData: null });
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
      <styles.PersonasContainer elevation={0}>
        <styles.TabHeader>
          <styles.HeaderIconBox gradient="linear-gradient(135deg, #667eea, #764ba2)">
            <PeopleIcon sx={{ color: 'white', fontSize: 24 }} />
          </styles.HeaderIconBox>
          <div>
            <styles.HeaderTitle gradient="linear-gradient(45deg, #667eea, #764ba2)">
              Base de Personas
            </styles.HeaderTitle>
            <styles.HeaderSubtitle>
              {personasMockData.length} personas registradas en el sistema
            </styles.HeaderSubtitle>
          </div>
        </styles.TabHeader>
        <ExcelDataTable headers={tableData.headers} rows={tableData.rows} defaultColumnConfig={{ width: 140 }} />
      </styles.PersonasContainer>
    );
  }

  if (fuente === 'OPORTUNIDADES') {
    const tableData = getOportunidadesTableData;
    return (
      <styles.PersonasContainer elevation={0}>
        <styles.TabHeader>
          <styles.HeaderIconBox gradient="linear-gradient(135deg, #f59e0b, #f97316)">
            <BusinessCenterIcon sx={{ color: 'white', fontSize: 24 }} />
          </styles.HeaderIconBox>
          <div>
            <styles.HeaderTitle gradient="linear-gradient(45deg, #f59e0b, #f97316)">
              Oportunidades de Negocio
            </styles.HeaderTitle>
            <styles.HeaderSubtitle>
              {oportunidadesMockData.length} oportunidades activas en el sistema
            </styles.HeaderSubtitle>
          </div>
        </styles.TabHeader>
        <ExcelDataTable headers={tableData.headers} rows={tableData.rows} defaultColumnConfig={{ width: 140 }} />
      </styles.PersonasContainer>
    );
  }

  if (fuente === 'EXTERNA') {
    return (
      <styles.PersonasContainer elevation={0}>
        <styles.TabHeader>
          <styles.HeaderIconBox gradient="linear-gradient(135deg, #10b981, #34d399)">
            <DescriptionIcon sx={{ color: 'white', fontSize: 24 }} />
          </styles.HeaderIconBox>
          <div>
            <styles.HeaderTitle gradient="linear-gradient(45deg, #10b981, #34d399)">
              Importar Miembros Externos
            </styles.HeaderTitle>
            <styles.HeaderSubtitle>
              Carga un archivo Excel con la información de tus contactos
            </styles.HeaderSubtitle>
          </div>
        </styles.TabHeader>

        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".xlsx,.xls" style={{ display: 'none' }} />

        {!excelData && (
          <Fade in={true}>
            <styles.UploadSection>
              <styles.UploadIconBox>
                <DescriptionIcon sx={{ fontSize: 48, color: '#667eea' }} />
              </styles.UploadIconBox>

              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Importa tu archivo Excel
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 500 }}>
                Sube un archivo Excel (.xlsx o .xls) con la información de tus contactos. Si la primera fila contiene "Obligatorio" u "Opcional", será ignorada automáticamente.
              </Typography>

              <styles.UploadButton 
                onClick={handleFileUpload} 
                disabled={isLoading} 
                variant="contained" 
                size="large" 
                startIcon={isLoading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
              >
                {isLoading ? 'Procesando...' : 'Seleccionar Archivo'}
              </styles.UploadButton>

              <Typography variant="caption" color="text.secondary" sx={{ mt: 2 }}>
                Formatos soportados: .xlsx, .xls
              </Typography>
            </styles.UploadSection>
          </Fade>
        )}
        {showErrors && hasError(errors, 'personas.excelData') && (
          <styles.StyledAlert severity="error">
            {getError(errors, 'personas.excelData')}
          </styles.StyledAlert>
        )}
        {error && (
          <styles.StyledAlert severity="error">
            {error}
          </styles.StyledAlert>
        )}
        {excelData && (
          <Fade in={true}>
            <styles.DataTableContainer>
              <ExcelDataTable headers={excelData.headers} rows={excelData.rows} onRemoveRows={removeRows} onClearAll={() => { clearData(); }} />
            </styles.DataTableContainer>
          </Fade>
        )}
      </styles.PersonasContainer>
    );
  }

  return (
    <styles.PersonasContainer elevation={0}>
      <styles.TabHeader>
        <styles.EmojiBox>👥</styles.EmojiBox>
        <div>
          <styles.HeaderTitle gradient="linear-gradient(45deg, #667eea, #764ba2)">
            Audiencia y Personas
          </styles.HeaderTitle>
          <styles.HeaderSubtitle>
            Selecciona una fuente en la configuración general
          </styles.HeaderSubtitle>
        </div>
      </styles.TabHeader>
      <styles.StyledAlert severity="info">
        Selecciona una fuente de datos en el tab "General" para ver las opciones disponibles.
      </styles.StyledAlert>
    </styles.PersonasContainer>
  );
};