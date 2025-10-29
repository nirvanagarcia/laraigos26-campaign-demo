import { styled } from '@mui/material/styles';
import { Box, Typography, Chip } from '@mui/material';

const EmailContainer = styled(Box)({
  background: '#fff',
  border: '1px solid #ccc',
  borderRadius: '10px',
  overflow: 'hidden',
  width: '100%',
});

const EmailHeader = styled(Box)({
  padding: 16,
  borderBottom: '1px solid #e0e0e0',
  backgroundColor: '#fcfcfc',
  fontFamily: 'Roboto, sans-serif',
});

const EmailRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  marginBottom: 8,
});

const EmailRowLast = styled(Box)({
  display: 'flex',
  alignItems: 'baseline',
  gap: 8,
  paddingTop: 12,
  borderTop: '1px solid #f0f0f0',
});

const EmailLabel = styled(Typography)({
  color: 'text.secondary',
  minWidth: '50px',
});

const EmailChip = styled(Chip)({
  fontSize: '0.8rem',
});

const EmailChipPrimary = styled(EmailChip)({
  backgroundColor: '#eeeeee',
  color: '#333',
});

const EmailSubject = styled(Typography)({
  fontWeight: 600,
  color: 'text.primary',
  lineHeight: 1.4,
});

const EmailContent = styled(Box)({
  padding: 16,
  overflowY: 'auto',
  maxHeight: 500,
});

const EmailText = styled(Typography)({
  whiteSpace: 'pre-wrap',
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace",
  fontSize: '0.88rem',
  lineHeight: 1.7,
  color: '#222',
});

export const styles = {
  EmailContainer,
  EmailHeader,
  EmailRow,
  EmailRowLast,
  EmailLabel,
  EmailChip,
  EmailChipPrimary,
  EmailSubject,
  EmailContent,
  EmailText,
};