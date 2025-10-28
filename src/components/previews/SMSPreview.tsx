import React from 'react';
import { Box, Typography } from '@mui/material';
import type { PlantillaComunicacion } from '../../types/mockData';

interface SMSPreviewProps {
  plantilla: PlantillaComunicacion;
}

export const SMSPreview: React.FC<SMSPreviewProps> = ({ plantilla }) => (
  <Box sx={{ 
    maxWidth: 320,
    background: 'linear-gradient(145deg, #0084ff, #0066cc)',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 8px 20px rgba(0,132,255,0.3)',
  }}>
    {/* SMS Header */}
    <Box sx={{ 
      background: 'rgba(255,255,255,0.1)',
      p: 2,
      textAlign: 'center'
    }}>
      <Typography sx={{ color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>
        📱 Mensaje SMS
      </Typography>
    </Box>

    {/* SMS Body */}
    <Box sx={{ p: 3, background: 'rgba(255,255,255,0.05)' }}>
      <Box sx={{
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '16px',
        p: 2.5,
        color: '#333'
      }}>
        <Typography sx={{ 
          fontSize: '0.875rem',
          lineHeight: 1.4,
          mb: 1
        }}>
          {plantilla.preview}
        </Typography>
        
        <Typography sx={{ 
          fontSize: '0.7rem', 
          color: '#666', 
          textAlign: 'right'
        }}>
          Enviado 15:30
        </Typography>
      </Box>
    </Box>
  </Box>
);