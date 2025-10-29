import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

const EmptyContainer = styled(Box)({
  padding: 32,
  textAlign: 'center',
  borderRadius: '16px',
  background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
  border: '2px dashed rgba(102, 126, 234, 0.3)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 250,
});

const EmptyTitle = styled(Typography)({
  marginBottom: 8,
  color: '#667eea',
});

const EmptySubtitle = styled(Typography)({
  color: 'text.secondary',
});

const ErrorContainer = styled(Box)({
  padding: 32,
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
});

const ErrorTitle = styled(Typography)({
  marginBottom: 8,
  color: '#dc2626',
});

const ErrorSubtitle = styled(Typography)({
  color: 'text.secondary',
});

const PreviewContainer = styled(Box)<{ isHTML?: boolean }>(({ isHTML }) => ({
  ...(isHTML ? {} : {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
}));

export const styles = {
  EmptyContainer,
  EmptyTitle,
  EmptySubtitle,
  ErrorContainer,
  ErrorTitle,
  ErrorSubtitle,
  PreviewContainer,
};