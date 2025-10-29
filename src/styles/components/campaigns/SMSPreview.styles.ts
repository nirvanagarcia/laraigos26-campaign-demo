import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

const SMSContainer = styled(Box)({
  maxWidth: 320,
  background: 'linear-gradient(145deg, #0084ff, #0066cc)',
  borderRadius: '20px',
  overflow: 'hidden',
  boxShadow: '0 8px 20px rgba(0,132,255,0.3)',
});

const SMSHeader = styled(Box)({
  background: 'rgba(255,255,255,0.1)',
  padding: 16,
  textAlign: 'center',
});

const SMSHeaderTitle = styled(Typography)({
  color: 'white',
  fontWeight: 600,
  fontSize: '0.9rem',
});

const SMSBody = styled(Box)({
  padding: 24,
  background: 'rgba(255,255,255,0.05)',
});

const SMSMessage = styled(Box)({
  background: 'rgba(255,255,255,0.95)',
  borderRadius: '16px',
  padding: 20,
  color: '#333',
});

const SMSText = styled(Typography)({
  fontSize: '0.875rem',
  lineHeight: 1.4,
  marginBottom: 8,
});

const SMSTimestamp = styled(Typography)({
  fontSize: '0.7rem',
  color: '#666',
  textAlign: 'right',
});

export const styles = {
  SMSContainer,
  SMSHeader,
  SMSHeaderTitle,
  SMSBody,
  SMSMessage,
  SMSText,
  SMSTimestamp,
};