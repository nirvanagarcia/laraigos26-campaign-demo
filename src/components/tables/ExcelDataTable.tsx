import React, { useState, useMemo } from 'react';
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, flexRender, createColumnHelper, type ColumnDef, type SortingState, type RowSelectionState } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableRow, Box, Checkbox, Typography, Alert } from '@mui/material';
import { Delete as DeleteIcon, DeleteSweep as DeleteSweepIcon, Search as SearchIcon } from '@mui/icons-material';
import type { ExcelRow } from '../../hooks/useExcelImport';
import { styles } from '../../styles/components/campaigns/ExcelDataTable.styles';

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
            <styles.CellContent>
              {String(info.getValue() || '')}
            </styles.CellContent>
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
    <styles.StyledPaper elevation={0}>
      <styles.StyledToolbar>
        <styles.ToolbarLeft>
          <styles.DataTitle>
            📊 Datos Importados
          </styles.DataTitle>
          <styles.DataChip>
            {rows.length} registros
          </styles.DataChip>
        </styles.ToolbarLeft>
        
        <styles.ToolbarRight>
          <styles.SearchField
            size="small"
            placeholder="Buscar..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
            }}
          />
          
          {enableRowSelection && selectedRows.length > 0 && (
            <styles.RemoveButton
              startIcon={<DeleteIcon />}
              onClick={handleRemoveSelected}
              variant="outlined"
              size="small"
            >
              Eliminar ({selectedRows.length})
            </styles.RemoveButton>
          )}
          
          {enableClearAll && (
            <styles.ClearAllButton
              startIcon={<DeleteSweepIcon />}
              onClick={onClearAll}
              variant="contained"
              size="small"
            >
              Limpiar Todo
            </styles.ClearAllButton>
          )}
        </styles.ToolbarRight>
      </styles.StyledToolbar>

      <styles.StyledTableContainer>
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
                  <styles.SortableHeaderCell
                    key={header.id}
                    sortable={header.column.getCanSort()}
                    sx={{
                      width: header.getSize(),
                      minWidth: header.column.columnDef.minSize,
                      maxWidth: header.column.columnDef.maxSize,
                      position: 'relative',
                    }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <styles.HeaderContent>
                      <styles.HeaderTitle>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getIsSorted() && (
                          <styles.SortIcon>
                            {header.column.getIsSorted() === 'desc' ? '🔽' : '🔼'}
                          </styles.SortIcon>
                        )}
                      </styles.HeaderTitle>

                      {enableColumnResize && header.column.getCanResize() && (
                        <styles.ResizeHandle
                          isResizing={header.column.getIsResizing()}
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                        />
                      )}
                    </styles.HeaderContent>
                  </styles.SortableHeaderCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <styles.DataRow
                key={row.id}
                selected={row.getIsSelected()}
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
              </styles.DataRow>
            ))}
          </TableBody>
        </Table>
      </styles.StyledTableContainer>

      <styles.StyledTablePagination
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
      />
    </styles.StyledPaper>
  );
};