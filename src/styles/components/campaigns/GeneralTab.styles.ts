import { styled } from '@mui/material/styles';
import { Box, Paper, Card, Typography, TextField, FormControl } from '@mui/material';

const GeneralContainer = styled(Box)({
  display: 'flex',
  gap: 24,
  alignItems: 'flex-start',
  minHeight: '100vh',
  overflow: 'hidden',
});

const FormPaper = styled(Paper)(({ theme }) => ({
  width: '55%',
  minWidth: 650,
  maxWidth: 'none',
  padding: theme.spacing(4),
  borderRadius: '20px',
  background: 'rgba(255,255,255,0.95)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.3)',
  maxHeight: 'calc(100vh - 200px)',
  overflowY: 'auto',
}));

const FormHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 32,
});

const HeaderIconBox = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: '16px',
  background: 'linear-gradient(135deg, #667eea, #764ba2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 16,
  fontSize: '1.5rem',
}));

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  background: 'linear-gradient(45deg, #667eea, #764ba2)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontSize: theme.typography.h5.fontSize,
}));

const HeaderSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: theme.typography.body2.fontSize,
}));

const FormContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  width: '100%',
  maxWidth: '100%',
  overflow: 'hidden',
  paddingTop: 8,
});

const FieldRow = styled(Box)({
  display: 'flex',
  gap: 16,
  flexWrap: 'wrap',
  maxWidth: '100%',
});

const FieldBox = styled(Box)({
  flex: '1 1 300px',
  minWidth: 300,
  maxWidth: 'calc(50% - 8px)',
});

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    maxWidth: '100%',
  },
});

const StyledFormControl = styled(FormControl)({
  maxWidth: '100%',
});

const ConditionalSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '16px',
  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))',
  border: '1px solid rgba(102, 126, 234, 0.1)',
  maxWidth: '100%',
}));

const ConditionalTitle = styled(Typography)({
  marginBottom: 16,
  color: '#667eea',
  fontWeight: 600,
});

const PreviewCard = styled(Card)(({ theme }) => ({
  width: '45%',
  minWidth: 400,
  maxHeight: 'calc(100vh - 200px)',
  overflowY: 'auto',
  background: 'rgba(255,255,255,0.95)',
  backdropFilter: 'blur(20px)',
  borderRadius: '20px',
  border: '1px solid rgba(255,255,255,0.3)',
}));

const PreviewHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 24,
});

const PreviewIconBox = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: '12px',
  background: 'linear-gradient(135deg, #10b981, #34d399)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 16,
}));

const PreviewTitle = styled(Typography)({
  fontWeight: 700,
});

const PreviewContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '100%',
  overflow: 'hidden',
  flexGrow: 1,
});

export const styles = {
  GeneralContainer,
  FormPaper,
  FormHeader,
  HeaderIconBox,
  HeaderTitle,
  HeaderSubtitle,
  FormContent,
  FieldRow,
  FieldBox,
  StyledTextField,
  StyledFormControl,
  ConditionalSection,
  ConditionalTitle,
  PreviewCard,
  PreviewHeader,
  PreviewIconBox,
  PreviewTitle,
  PreviewContent,
};