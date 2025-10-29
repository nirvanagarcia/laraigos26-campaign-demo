import { styled } from '@mui/material/styles';
import { Paper, Toolbar, Box, TextField, Button, TableContainer, TableCell, TableRow, TablePagination } from '@mui/material';

const StyledPaper = styled(Paper)({
  borderRadius: '16px',
  border: '1px solid rgba(0,0,0,0.1)',
  overflow: 'hidden',
});

const StyledToolbar = styled(Toolbar)({
  paddingLeft: 24,
  paddingRight: 24,
  paddingTop: 16,
  paddingBottom: 16,
  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(240, 147, 251, 0.05))',
  borderBottom: '1px solid rgba(0,0,0,0.1)',
});

const ToolbarLeft = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  flexGrow: 1,
});

const DataChip = styled(Box)({
  background: 'linear-gradient(45deg, #667eea, #764ba2)',
  color: 'white',
  fontWeight: 600,
  padding: '4px 12px',
  borderRadius: '16px',
  fontSize: '0.75rem',
});

const ToolbarRight = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
});

const SearchField = styled(TextField)({
  minWidth: 200,
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
  },
});

const RemoveButton = styled(Button)({
  color: '#ef4444',
  borderColor: '#ef4444',
  '&:hover': {
    borderColor: '#dc2626',
    background: 'rgba(239, 68, 68, 0.04)',
  },
});

const ClearAllButton = styled(Button)({
  background: 'linear-gradient(45deg, #ef4444, #f87171)',
  '&:hover': {
    background: 'linear-gradient(45deg, #dc2626, #ef4444)',
  },
});

const StyledTableContainer = styled(TableContainer)({
  maxHeight: 600,
  overflowX: 'auto',
  '&::-webkit-scrollbar': {
    height: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(0,0,0,0.05)',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(107, 88, 227, 0.61)',
    borderRadius: '4px',
    '&:hover': {
      background: 'rgba(102, 126, 234, 0.93)',
    },
  },
  '&::-webkit-scrollbar-thumb:active': {
    background: 'rgba(102, 126, 234, 0.91)',
  },
});

const HeaderCell = styled(TableCell)({
  background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
  fontWeight: 600,
  userSelect: 'none',
  position: 'relative',
});

const SortableHeaderCell = styled(HeaderCell)<{ sortable?: boolean }>(({ sortable }) => ({
  cursor: sortable ? 'pointer' : 'default',
  '&:hover': sortable ? {
    background: 'linear-gradient(135deg, #e2e8f0, #cbd5e1)',
  } : {},
}));

const HeaderContent = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const HeaderTitle = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

const SortIcon = styled(Box)({
  marginLeft: 8,
});

const ResizeHandle = styled(Box)<{ isResizing?: boolean }>(({ isResizing }) => ({
  position: 'absolute',
  right: 0,
  top: 0,
  height: '100%',
  width: '4px',
  background: isResizing ? '#667eea' : 'transparent',
  cursor: 'col-resize',
  userSelect: 'none',
  touchAction: 'none',
  '&:hover': {
    background: '#667eea',
  },
}));

const DataRow = styled(TableRow)<{ selected?: boolean }>(({ selected }) => ({
  '&:hover': {
    background: 'rgba(102, 126, 234, 0.04)',
  },
  ...(selected && {
    background: 'rgba(102, 126, 234, 0.08)',
    '&:hover': {
      background: 'rgba(102, 126, 234, 0.12)',
    },
  }),
}));

const StyledTablePagination = styled(TablePagination)({
  borderTop: '1px solid rgba(0,0,0,0.1)',
  background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
});

const EmptyAlert = styled(Box)({
  marginTop: 16,
  padding: 16,
  borderRadius: '8px',
  background: 'rgba(59, 130, 246, 0.1)',
  border: '1px solid rgba(59, 130, 246, 0.2)',
  color: '#1e40af',
  textAlign: 'center',
});

const DataTitle = styled(Box)({
  fontWeight: 600,
  fontSize: '1.25rem',
});

const CellContent = styled(Box)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  width: '100%',
  fontSize: '0.875rem',
});

export const styles = {
  StyledPaper,
  StyledToolbar,
  ToolbarLeft,
  DataChip,
  ToolbarRight,
  SearchField,
  RemoveButton,
  ClearAllButton,
  StyledTableContainer,
  HeaderCell,
  SortableHeaderCell,
  HeaderContent,
  HeaderTitle,
  SortIcon,
  ResizeHandle,
  DataRow,
  StyledTablePagination,
  EmptyAlert,
  DataTitle,
  CellContent,
};