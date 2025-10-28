import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { WhatsAppPreview } from './WhatsAppPreview';
import { EmailPreview } from './EmailPreview';
import { SMSPreview } from './SMSPreview';
import type { PlantillaComunicacion } from '../../types/mockData';

interface MessagePreviewProps {
  plantilla: PlantillaComunicacion | null;
}

export const MessagePreview: React.FC<MessagePreviewProps> = ({ plantilla }) => {
  const hashKey = useMemo(() => {
    if (!plantilla) return 'empty';
    const base = `${plantilla.id}-${plantilla.tipo}-${plantilla.contenido ?? ''}`;
    let hash = 0;
    for (let i = 0; i < base.length; i++) {
      hash = (hash << 5) - hash + base.charCodeAt(i);
      hash |= 0;
    }
    return hash.toString();
  }, [plantilla]);

  if (!plantilla) {
    return (
      <Box
        sx={{
          p: 4,
          textAlign: 'center',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
          border: '2px dashed rgba(102, 126, 234, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 250,
        }}
      >
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
      return <WhatsAppPreview key={hashKey} plantilla={plantilla} />;

    case 'SMS':
      return <SMSPreview key={hashKey} plantilla={plantilla} />;

    case 'CORREO':
    case 'HTML':
      return <EmailPreview key={hashKey} plantilla={plantilla} />;

    default:
      return (
        <Box
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #fee2e2, #fecaca)',
            border: '2px dashed rgba(239, 68, 68, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 250,
            width: '100%',
          }}
        >
          <Typography variant="h6" sx={{ mb: 1, color: '#dc2626' }}>
            ⚠️ Tipo no soportado
          </Typography>
          <Typography variant="body2" color="text.secondary">
            El tipo de plantilla "{plantilla.tipo}" no tiene preview disponible
          </Typography>
        </Box>
      );
  }
};
