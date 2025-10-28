import React from 'react';
import { Box, Typography } from '@mui/material';
import type { PlantillaComunicacion } from '../../types/mockData';

interface EmailPreviewProps {
  plantilla: PlantillaComunicacion;
}

export const EmailPreview: React.FC<EmailPreviewProps> = ({ plantilla }) => (
  <Box sx={{ 
    maxWidth: 500,
    background: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    border: '1px solid #e0e0e0'
  }}>
    {/* Email Header */}
    <Box sx={{ 
      background: '#f5f5f5',
      p: 2,
      borderBottom: '1px solid #e0e0e0'
    }}>
      <Typography sx={{ fontSize: '0.8rem', color: '#666', mb: 0.5 }}>
        Para: cliente@email.com
      </Typography>
      <Typography sx={{ fontWeight: 600, color: '#333' }}>
        {plantilla.nombre}
      </Typography>
    </Box>

    {/* Email Body */}
    <Box sx={{ p: 3 }}>
      {plantilla.tipo === 'HTML' ? (
        <Box sx={{
          background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
          p: 2,
          borderRadius: '8px',
          textAlign: 'center',
          border: '2px dashed #dee2e6'
        }}>
          <Typography sx={{ fontWeight: 600, mb: 1, color: '#6c757d' }}>
            📧 Vista Previa HTML
          </Typography>
          <Typography sx={{ fontSize: '0.875rem', color: '#6c757d' }}>
            {plantilla.preview}
          </Typography>
        </Box>
      ) : (
        <Typography sx={{ 
          fontSize: '0.875rem',
          lineHeight: 1.6,
          whiteSpace: 'pre-wrap',
          color: '#333'
        }}>
          {plantilla.preview}
        </Typography>
      )}
    </Box>
  </Box>
);