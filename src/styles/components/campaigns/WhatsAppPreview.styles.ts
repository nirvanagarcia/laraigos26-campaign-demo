import { styled } from '@mui/material/styles';
import { Box, Typography, Stack } from '@mui/material';

const WhatsAppContainer = styled(Box)({
  maxWidth: 350,
  background: '#075e54',
  borderRadius: '20px',
  overflow: 'hidden',
  boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
});

const WhatsAppHeader = styled(Box)({
  background: '#128c7e',
  padding: 16,
  display: 'flex',
  alignItems: 'center',
  gap: 16,
});

const ProfileIcon = styled(Box)({
  width: 40,
  height: 40,
  borderRadius: '50%',
  background: 'linear-gradient(45deg, #25d366, #128c7e)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.2rem',
});

const ProfileInfo = styled(Box)({});

const ContactName = styled(Typography)({
  color: 'white',
  fontWeight: 600,
  fontSize: '1rem',
});

const OnlineStatus = styled(Typography)({
  color: 'rgba(255,255,255,0.7)',
  fontSize: '0.75rem',
});

const ChatArea = styled(Box)({
  background: '#e5ddd5',
  minHeight: 300,
  padding: 16,
  position: 'relative',
});

const MediaHeader = styled(Box)({
  width: '100%',
  height: 120,
  background: 'linear-gradient(45deg, #667eea, #764ba2)',
  borderRadius: '12px',
  marginBottom: 8,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontWeight: 600,
});

const MessageBubble = styled(Box)({
  background: 'white',
  borderRadius: '18px 18px 18px 4px',
  padding: 16,
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
    borderColor: 'transparent white transparent transparent',
  },
});

const MessageText = styled(Typography)({
  fontSize: '0.875rem',
  lineHeight: 1.4,
  whiteSpace: 'pre-wrap',
});

const ButtonStack = styled(Stack)({
  marginTop: 16,
  gap: 4,
});

const WhatsAppButton = styled(Box)({
  border: '1px solid #25d366',
  color: '#25d366',
  textTransform: 'none',
  fontSize: '0.8rem',
  borderRadius: '6px',
  padding: 8,
  textAlign: 'center',
  cursor: 'pointer',
  '&:hover': {
    background: 'rgba(37, 211, 102, 0.05)',
  },
});

const MessageStatus = styled(Typography)({
  fontSize: '0.65rem',
  color: '#999',
  textAlign: 'right',
  marginTop: 4,
});

export const styles = {
  WhatsAppContainer,
  WhatsAppHeader,
  ProfileIcon,
  ProfileInfo,
  ContactName,
  OnlineStatus,
  ChatArea,
  MediaHeader,
  MessageBubble,
  MessageText,
  ButtonStack,
  WhatsAppButton,
  MessageStatus,
};