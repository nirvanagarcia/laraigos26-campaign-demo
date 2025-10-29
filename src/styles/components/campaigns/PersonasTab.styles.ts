import { styled } from '@mui/material/styles';
import { Box, Paper, Typography, Button, Alert } from '@mui/material';

const PersonasContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '20px',
  background: 'rgba(255,255,255,0.9)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.3)',
  transition: 'all 0.3s ease',
}));

const TabHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 32,
});

const HeaderIconBox = styled(Box)<{ gradient: string }>(({ gradient }) => ({
  width: 48,
  height: 48,
  borderRadius: '16px',
  background: gradient,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 16,
}));

const HeaderTitle = styled(Typography)<{ gradient: string }>(({ gradient, theme }) => ({
  fontWeight: 700,
  background: gradient,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontSize: theme.typography.h5.fontSize,
}));

const HeaderSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: theme.typography.body2.fontSize,
}));

const UploadSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(6, 0),
  textAlign: 'center',
}));

const UploadIconBox = styled(Box)(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: 24,
  background: 'linear-gradient(135deg, rgba(102,126,234,0.1), rgba(240,147,251,0.1))',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  border: '2px dashed rgba(102,126,234,0.3)',
}));

const UploadButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #667eea, #764ba2)',
  color: 'white',
  fontWeight: 600,
  padding: theme.spacing(1.5, 4),
  borderRadius: '12px',
  textTransform: 'none',
  fontSize: '1.1rem',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #5a67d8, #6b46c1)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 16px rgba(102,126,234,0.3)',
  },
  '&:disabled': {
    background: 'rgba(102,126,234,0.3)',
  },
}));

const StyledAlert = styled(Alert)({
  marginTop: 16,
  borderRadius: '12px',
});

const DataTableContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const EmojiBox = styled(Box)({
  fontSize: '1.5rem',
});

export const styles = {
  PersonasContainer,
  TabHeader,
  HeaderIconBox,
  HeaderTitle,
  HeaderSubtitle,
  UploadSection,
  UploadIconBox,
  UploadButton,
  StyledAlert,
  DataTableContainer,
  EmojiBox,
};