import React from 'react';
import type { PlantillaComunicacion } from '../../types/mockData';
import { styles } from '../../styles/components/campaigns/WhatsAppPreview.styles';

interface WhatsAppPreviewProps {
  plantilla: PlantillaComunicacion;
}

export const WhatsAppPreview: React.FC<WhatsAppPreviewProps> = ({ plantilla }) => (
  <styles.WhatsAppContainer>
    <styles.WhatsAppHeader>
      <styles.ProfileIcon>
        🏢
      </styles.ProfileIcon>
      <styles.ProfileInfo>
        <styles.ContactName>
          LARAIGO BOT
        </styles.ContactName>
        <styles.OnlineStatus>
          en línea
        </styles.OnlineStatus>
      </styles.ProfileInfo>
    </styles.WhatsAppHeader>

    <styles.ChatArea>
      {plantilla.cabecera && (
        <styles.MediaHeader>
          📷 {plantilla.cabecera.tipo.toUpperCase()}
        </styles.MediaHeader>
      )}

      <styles.MessageBubble>
        <styles.MessageText sx={{ mb: plantilla.botones ? 2 : 1 }}>
          {plantilla.preview}
        </styles.MessageText>

        {plantilla.botones && (
          <styles.ButtonStack>
            {plantilla.botones.map((boton, index) => (
              <styles.WhatsAppButton key={index}>
                {boton.tipo === 'url' && '🔗'} 
                {boton.tipo === 'phone' && '📞'} 
                {boton.tipo === 'quick_reply' && '💬'} 
                {boton.texto}
              </styles.WhatsAppButton>
            ))}
          </styles.ButtonStack>
        )}

        <styles.MessageStatus>
          15:30 ✓✓
        </styles.MessageStatus>
      </styles.MessageBubble>
    </styles.ChatArea>
  </styles.WhatsAppContainer>
);