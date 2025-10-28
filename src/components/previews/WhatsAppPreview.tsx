import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import type { PlantillaComunicacion } from '../../types/mockData';

interface WhatsAppPreviewProps {
  plantilla: PlantillaComunicacion;
}

export const WhatsAppPreview: React.FC<WhatsAppPreviewProps> = ({ plantilla }) => (
  <Box sx={{ 
    maxWidth: 350,
    background: '#075e54',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
  }}>
    {/* Header */}
    <Box sx={{ 
      background: '#128c7e',
      p: 2,
      display: 'flex',
      alignItems: 'center',
      gap: 2 
    }}>
      <Box sx={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: 'linear-gradient(45deg, #25d366, #128c7e)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2rem'
      }}>
        🏢
      </Box>
      <Box>
        <Typography sx={{ color: 'white', fontWeight: 600, fontSize: '1rem' }}>
          LARAIGO BOT
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem' }}>
          en línea
        </Typography>
      </Box>
    </Box>

    {/* Chat Area */}
    <Box sx={{ background: '#e5ddd5', minHeight: 300, p: 2, position: 'relative' }}>
      {/* Header Media */}
      {plantilla.cabecera && (
        <Box sx={{
          width: '100%',
          height: 120,
          background: 'linear-gradient(45deg, #667eea, #764ba2)',
          borderRadius: '12px',
          mb: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 600
        }}>
          📷 {plantilla.cabecera.tipo.toUpperCase()}
        </Box>
      )}

      {/* Message Bubble */}
      <Box sx={{
        background: 'white',
        borderRadius: '18px 18px 18px 4px',
        p: 2,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: -8,
          width: 0,
          height: 0,
          borderStyle: 'solid',
          borderWidth: '0 8px 10px 0',
          borderColor: 'transparent white transparent transparent'
        }
      }}>
        {/* Message Text */}
        <Typography sx={{ 
          fontSize: '0.875rem',
          lineHeight: 1.4,
          whiteSpace: 'pre-wrap',
          mb: plantilla.botones ? 2 : 1
        }}>
          {plantilla.preview}
        </Typography>

        {/* Buttons */}
        {plantilla.botones && (
          <Stack spacing={0.5}>
            {plantilla.botones.map((boton, index) => (
              <Box
                key={index}
                sx={{
                  borderColor: '#25d366',
                  color: '#25d366',
                  textTransform: 'none',
                  fontSize: '0.8rem',
                  border: '1px solid #25d366',
                  borderRadius: '6px',
                  p: 1,
                  textAlign: 'center',
                  cursor: 'pointer',
                  '&:hover': {
                    background: 'rgba(37, 211, 102, 0.05)',
                  }
                }}
              >
                {boton.tipo === 'url' && '🔗'} 
                {boton.tipo === 'phone' && '📞'} 
                {boton.tipo === 'quick_reply' && '💬'} 
                {boton.texto}
              </Box>
            ))}
          </Stack>
        )}

        {/* Message Status */}
        <Typography sx={{ 
          fontSize: '0.65rem', 
          color: '#999', 
          textAlign: 'right',
          mt: 0.5
        }}>
          15:30 ✓✓
        </Typography>
      </Box>
    </Box>
  </Box>
);