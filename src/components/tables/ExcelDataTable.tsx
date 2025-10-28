import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  type ColumnDef,
  type SortingState,
  type RowSelectionState,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Checkbox,
  Button,
  Typography,
  TablePagination,
  TextField,
  Toolbar,
  Chip,
  Alert,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  DeleteSweep as DeleteSweepIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import type { ExcelRow } from '../../hooks/useExcelImport';

interface DefaultColumnConfig {
  width: number;
}

interface ExcelDataTableProps {
  headers: string[];
  rows: ExcelRow[];
  onRemoveRows?: (rowIds: string[]) => void;
  onClearAll?: () => void;
  defaultColumnConfig?: DefaultColumnConfig;
}

const columnHelper = createColumnHelper<ExcelRow>();

export const ExcelDataTable: React.FC<ExcelDataTableProps> = ({
  headers,
  rows,
  onRemoveRows,
  onClearAll,
  defaultColumnConfig,
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnSizing, setColumnSizing] = useState<Record<string, number>>({});
  
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });

  const enableColumnResize = !defaultColumnConfig;
  const enableRowSelection = Boolean(onRemoveRows);
  const enableClearAll = Boolean(onClearAll);

  const columns = useMemo<ColumnDef<ExcelRow>[]>(() => {
    const selectColumn = columnHelper.display({
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
          size="small"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          indeterminate={row.getIsSomeSelected()}
          onChange={row.getToggleSelectedHandler()}
          size="small"
        />
      ),
      size: 50,
      minSize: 50,
      maxSize: 50,
      enableResizing: false,
    });

    const dataColumns = headers.map(header => {
      return columnHelper.accessor(
        row => row.data[header],
        {
          id: header,
          header: () => (
            <Typography variant="subtitle2" fontWeight={600}>
              {header}
            </Typography>
          ),
          cell: info => (
            <Typography 
              variant="body2" 
              sx={{ 
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: '100%'
              }}
            >
              {String(info.getValue() || '')}
            </Typography>
          ),
          size: defaultColumnConfig?.width || 160,
          minSize: defaultColumnConfig?.width || 100,
          maxSize: defaultColumnConfig?.width ? defaultColumnConfig.width * 2 : 500,
          enableResizing: enableColumnResize,
        }
      );
    });

    if (enableRowSelection) {
      return [selectColumn, ...dataColumns];
    }
    
    return dataColumns;
  }, [headers, defaultColumnConfig, enableColumnResize, enableRowSelection]);

  const table = useReactTable({
    data: rows,
    columns,
    state: {
      sorting,
      globalFilter,
      rowSelection,
      pagination,
      columnSizing,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onColumnSizingChange: setColumnSizing,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: enableRowSelection,
    enableColumnResizing: enableColumnResize,
    columnResizeMode: 'onChange',
  });

  const selectedRows = Object.keys(rowSelection).filter(key => rowSelection[key]);
  
  const handleRemoveSelected = () => {
    if (!onRemoveRows) return;
    const selectedRowIds = selectedRows.map(index => rows[parseInt(index)]?.id).filter(Boolean);
    onRemoveRows(selectedRowIds);
    setRowSelection({});
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPagination(prev => ({ ...prev, pageIndex: newPage }));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPagination({
      pageIndex: 0,
      pageSize: parseInt(event.target.value, 10),
    });
  };

  if (rows.length === 0) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        No hay datos para mostrar. Importa un archivo Excel para comenzar.
      </Alert>
    );
  }

  const tableWidth = defaultColumnConfig?.width 
    ? (defaultColumnConfig.width * headers.length) + (enableRowSelection ? 50 : 0)
    : 'auto';

  return (
    <Paper elevation={0} sx={{ 
      borderRadius: '16px',
      border: '1px solid rgba(0,0,0,0.1)',
      overflow: 'hidden'
    }}>
      <Toolbar sx={{ 
        px: 3, 
        py: 2,
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(240, 147, 251, 0.05))',
        borderBottom: '1px solid rgba(0,0,0,0.1)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
          <Typography variant="h6" fontWeight={600}>
            📊 Datos Importados
          </Typography>
          <Chip 
            label={`${rows.length} registros`} 
            size="small"
            sx={{ 
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              color: 'white',
              fontWeight: 600
            }}
          />
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            size="small"
            placeholder="Buscar..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
            }}
            sx={{ minWidth: 200 }}
          />
          
          {enableRowSelection && selectedRows.length > 0 && (
            <Button
              startIcon={<DeleteIcon />}
              onClick={handleRemoveSelected}
              color="error"
              variant="outlined"
              size="small"
            >
              Eliminar ({selectedRows.length})
            </Button>
          )}
          
          {enableClearAll && (
            <Button
              startIcon={<DeleteSweepIcon />}
              onClick={onClearAll}
              color="error"
              variant="contained"
              size="small"
              sx={{
                background: 'linear-gradient(45deg, #ef4444, #f87171)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #dc2626, #ef4444)',
                }
              }}
            >
              Limpiar Todo
            </Button>
          )}
        </Box>
      </Toolbar>

      <TableContainer 
        sx={{ 
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
        }}
      >
        <Table 
          stickyHeader 
          sx={{ 
            width: tableWidth,
            minWidth: '100%'
          }}
        >
          <TableHead>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableCell
                    key={header.id}
                    sx={{
                      background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
                      fontWeight: 600,
                      cursor: header.column.getCanSort() ? 'pointer' : 'default',
                      userSelect: 'none',
                      width: header.getSize(),
                      minWidth: header.column.columnDef.minSize,
                      maxWidth: header.column.columnDef.maxSize,
                      position: 'relative',
                      '&:hover': header.column.getCanSort() ? {
                        background: 'linear-gradient(135deg, #e2e8f0, #cbd5e1)',
                      } : {},
                    }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getIsSorted() && (
                          <Box component="span" sx={{ ml: 1 }}>
                            {header.column.getIsSorted() === 'desc' ? '🔽' : '🔼'}
                          </Box>
                        )}
                      </Box>
                      
                      {enableColumnResize && header.column.getCanResize() && (
                        <Box
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          sx={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            height: '100%',
                            width: '4px',
                            background: header.column.getIsResizing() ? '#667eea' : 'transparent',
                            cursor: 'col-resize',
                            userSelect: 'none',
                            touchAction: 'none',
                            '&:hover': {
                              background: '#667eea',
                            },
                          }}
                        />
                      )}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                selected={row.getIsSelected()}
                sx={{
                  '&:hover': { 
                    background: 'rgba(102, 126, 234, 0.04)',
                  },
                  '&.Mui-selected': {
                    background: 'rgba(102, 126, 234, 0.08)',
                    '&:hover': {
                      background: 'rgba(102, 126, 234, 0.12)',
                    }
                  }
                }}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell 
                    key={cell.id}
                    sx={{
                      width: cell.column.getSize(),
                      minWidth: cell.column.columnDef.minSize,
                      maxWidth: cell.column.columnDef.maxSize,
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={rows.length}
        page={pagination.pageIndex}
        onPageChange={handleChangePage}
        rowsPerPage={pagination.pageSize}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        labelRowsPerPage="Filas por página:"
        labelDisplayedRows={({ from, to, count }) => 
          `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
        }
        sx={{
          borderTop: '1px solid rgba(0,0,0,0.1)',
          background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
        }}
      />
    </Paper>
  );
};