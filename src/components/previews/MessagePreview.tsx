import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { WhatsAppPreview } from './WhatsAppPreview';
import { EmailPreview } from './EmailPreview';
import { SMSPreview } from './SMSPreview';
import type { PlantillaComunicacion } from '../../types/mockData';

interface MessagePreviewProps {
  plantilla: PlantillaComunicacion | null;
}

export const MessagePreview: React.FC<MessagePreviewProps> = React.memo(({ plantilla }) => {
  const previewComponent = useMemo(() => {
    if (!plantilla) {
      return (
        <Box sx={{ 
          p: 4, 
          textAlign: 'center',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
          border: '2px dashed rgba(102, 126, 234, 0.3)'
        }}>
          <Typography variant="h6" sx={{ mb: 1, color: '#667eea' }}>
            📱 Preview del Mensaje
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Selecciona una plantilla para ver el preview
          </Typography>
        </Box>
      );
    }

    switch (plantilla.tipo) {
      case 'HSM':
        return <WhatsAppPreview plantilla={plantilla} />;
      case 'SMS':
        return <SMSPreview plantilla={plantilla} />;
      case 'CORREO':
      case 'HTML':
        return <EmailPreview plantilla={plantilla} />;
      default:
        return (
          <Box sx={{ 
            p: 4, 
            textAlign: 'center',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #fee2e2, #fecaca)',
            border: '2px dashed rgba(239, 68, 68, 0.3)'
          }}>
            <Typography variant="h6" sx={{ mb: 1, color: '#dc2626' }}>
              ⚠️ Tipo no soportado
            </Typography>
            <Typography variant="body2" color="text.secondary">
              El tipo de plantilla "{plantilla.tipo}" no tiene preview disponible
            </Typography>
          </Box>
        );
    }
  }, [plantilla?.id, plantilla?.tipo]);

  return previewComponent;
});

MessagePreview.displayName = 'MessagePreview';