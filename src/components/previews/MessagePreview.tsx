import React, { useMemo } from 'react';
import { WhatsAppPreview } from './WhatsAppPreview';
import { EmailPreview } from './EmailPreview';
import { SMSPreview } from './SMSPreview';
import type { PlantillaComunicacion } from '../../types/mockData';
import { styles } from '../../styles/components/campaigns/MessagePreview.styles';

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
      <styles.EmptyContainer>
        <styles.EmptyTitle variant="h6">
          📱 Preview del Mensaje
        </styles.EmptyTitle>
        <styles.EmptySubtitle variant="body2">
          Selecciona una plantilla para ver el preview
        </styles.EmptySubtitle>
      </styles.EmptyContainer>
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
        <styles.ErrorContainer>
          <styles.ErrorTitle variant="h6">
            ⚠️ Tipo no soportado
          </styles.ErrorTitle>
          <styles.ErrorSubtitle variant="body2">
            El tipo de plantilla "{plantilla.tipo}" no tiene preview disponible
          </styles.ErrorSubtitle>
        </styles.ErrorContainer>
      );
  }
};