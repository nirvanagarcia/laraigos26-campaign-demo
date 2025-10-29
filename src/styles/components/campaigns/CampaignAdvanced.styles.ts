import { styled } from '@mui/material/styles';
import { Box, Paper, AppBar, Toolbar, Button, Typography, Alert } from '@mui/material';

const MainContainer = styled(Box)({
  flexGrow: 1,
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  minHeight: '100vh',
});

const StyledAppBar = styled(AppBar)({
  background: 'transparent',
  backdropFilter: 'blur(20px)',
  borderBottom: '1px solid rgba(255,255,255,0.1)',
  marginBottom: 32,
});

const StyledToolbar = styled(Toolbar)({
  paddingTop: 16,
  paddingBottom: 16,
});

const LogoBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  background: 'rgba(255,255,255,0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: '50px',
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 8,
  paddingBottom: 8,
  marginRight: 24,
});

const AppTitle = styled(Typography)({
  fontWeight: 700,
  background: 'linear-gradient(45deg, #ffffff, #f0f0f0)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});

const FlexGrow = styled(Box)({
  flexGrow: 1,
});

const ButtonGroup = styled(Box)({
  display: 'flex',
  gap: 16,
});

const ResetButton = styled(Button)({
  color: 'white',
  borderColor: 'rgba(255,255,255,0.3)',
  background: 'rgba(255,255,255,0.1)',
  backdropFilter: 'blur(10px)',
  '&:hover': {
    borderColor: 'rgba(255,255,255,0.5)',
    background: 'rgba(255,255,255,0.2)',
  },
});

const SaveButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isValid',
})<{ isValid: boolean }>(({ isValid }) => ({
  background: isValid 
    ? 'linear-gradient(45deg, #f093fb, #f5576c)' 
    : 'rgba(255,255,255,0.2)',
  color: 'white',
  fontWeight: 600,
  paddingLeft: 32,
  paddingRight: 32,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: isValid 
      ? 'linear-gradient(45deg, #ec69f8, #f34f63)' 
      : 'rgba(255,255,255,0.2)',
    transform: isValid ? 'translateY(-2px)' : 'none',
    boxShadow: isValid ? '0 10px 20px rgba(240, 147, 251, 0.4)' : 'none',
  },
  '&:disabled': {
    background: 'rgba(255,255,255,0.2)',
    color: 'rgba(255,255,255,0.5)',
  },
}));

const TabsPaper = styled(Paper)({
  marginBottom: 32,
  borderRadius: '24px',
  background: 'rgba(255,255,255,0.95)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.2)',
  overflow: 'hidden',
});

const StyledTabs = styled('div')({
  '& .MuiTabs-indicator': {
    height: 4,
    borderRadius: '2px 2px 0 0',
    background: 'linear-gradient(45deg, #667eea, #764ba2)',
  },
  '& .MuiTab-root': {
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '1.1rem',
    paddingTop: 24,
    paddingBottom: 24,
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(102, 126, 234, 0.05)',
    },
    '&.Mui-selected': {
      color: '#667eea',
      fontWeight: 700,
    },
  },
});

const TabIcon = styled(Box)({
  fontSize: '1.2rem',
});

const ErrorPaper = styled(Paper)({
  marginTop: 32,
  padding: 24,
  borderRadius: '20px',
  background: 'rgba(255,255,255,0.9)',
  backdropFilter: 'blur(20px)',
  border: '2px solid rgba(239, 68, 68, 0.2)',
});

const ErrorHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 16,
});

const ErrorTitle = styled(Typography)({
  color: '#ef4444',
  fontWeight: 700,
});

const ErrorContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
});

const ErrorSection = styled(Box)({
  '& .section-title': {
    fontWeight: 600,
    marginBottom: 8,
    color: '#ef4444',
  },
});

const ErrorAlerts = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
});

const StyledErrorAlert = styled(Alert)({
  borderRadius: '8px',
  fontSize: '0.8rem',
});

const DebugPaper = styled(Paper)({
  marginTop: 32,
  padding: 24,
  borderRadius: '20px',
  background: 'rgba(255,255,255,0.9)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.3)',
});

const DebugHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 16,
});

const DebugTitle = styled(Typography)({
  background: 'linear-gradient(45deg, #667eea, #764ba2)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 700,
  marginRight: 16,
});

const StatusBadge = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isValid',
})<{ isValid: boolean }>(({ isValid }) => ({
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 4,
  paddingBottom: 4,
  borderRadius: '20px',
  background: isValid 
    ? 'linear-gradient(45deg, #10b981, #34d399)' 
    : 'linear-gradient(45deg, #ef4444, #f87171)',
  color: 'white',
  fontSize: '0.75rem',
  fontWeight: 600,
}));

const DebugContent = styled(Typography)({
  fontSize: '0.75rem',
  overflow: 'auto',
  maxHeight: 200,
  background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
  padding: 16,
  borderRadius: '12px',
  border: '1px solid rgba(102, 126, 234, 0.1)',
  fontFamily: '"Fira Code", "Monaco", monospace',
  lineHeight: 1.4,
});

const SuccessAlert = styled(Alert)({
  width: '100%',
  borderRadius: '12px',
  fontSize: '1rem',
  fontWeight: 600,
});

export const styles = {
  MainContainer,
  StyledAppBar,
  StyledToolbar,
  LogoBox,
  AppTitle,
  FlexGrow,
  ButtonGroup,
  ResetButton,
  SaveButton,
  TabsPaper,
  StyledTabs,
  TabIcon,
  ErrorPaper,
  ErrorHeader,
  ErrorTitle,
  ErrorContent,
  ErrorSection,
  ErrorAlerts,
  StyledErrorAlert,
  DebugPaper,
  DebugHeader,
  DebugTitle,
  StatusBadge,
  DebugContent,
  SuccessAlert,
};