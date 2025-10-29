import React from 'react';
import type { PlantillaComunicacion } from '../../types/mockData';
import { styles } from '../../styles/components/campaigns/SMSPreview.styles';

interface SMSPreviewProps {
  plantilla: PlantillaComunicacion;
}

export const SMSPreview: React.FC<SMSPreviewProps> = ({ plantilla }) => (
  <styles.SMSContainer>
    <styles.SMSHeader>
      <styles.SMSHeaderTitle>
        📱 Mensaje SMS
      </styles.SMSHeaderTitle>
    </styles.SMSHeader>

    <styles.SMSBody>
      <styles.SMSMessage>
        <styles.SMSText>
          {plantilla.preview}
        </styles.SMSText>
        
        <styles.SMSTimestamp>
          Enviado 15:30
        </styles.SMSTimestamp>
      </styles.SMSMessage>
    </styles.SMSBody>
  </styles.SMSContainer>
);