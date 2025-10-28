import { useState, useCallback } from 'react';
import * as XLSX from 'xlsx';

export interface ExcelRow {
  id: string;
  data: Record<string, any>;
}

export interface ExcelData {
  headers: string[];
  rows: ExcelRow[];
}

export const useExcelImport = () => {
  const [excelData, setExcelData] = useState<ExcelData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processExcelFile = useCallback(async (file: File): Promise<void> => {
    if (!file.name.match(/\.(xlsx|xls)$/)) {
      setError('Solo se permiten archivos Excel (.xlsx, .xls)');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

      if (jsonData.length < 2) {
        setError('El archivo debe tener al menos 2 filas (header y datos)');
        return;
      }

      let startIndex = 0;
      const firstRow = jsonData[0];
      
      if (firstRow && firstRow.length > 0) {
        const firstCell = String(firstRow[0]).toLowerCase();
        if (firstCell.includes('obligatorio') || firstCell.includes('opcional')) {
          startIndex = 1;
        }
      }

      if (jsonData.length <= startIndex + 1) {
        setError('No hay suficientes datos después del header');
        return;
      }

      const headers = jsonData[startIndex].filter(Boolean).map(String);
      const dataRows = jsonData.slice(startIndex + 1);

      const processedRows: ExcelRow[] = dataRows
        .filter(row => row && row.some(cell => cell !== null && cell !== undefined && cell !== ''))
        .map((row, index) => {
          const rowData: Record<string, any> = {};
          headers.forEach((header, colIndex) => {
            rowData[header] = row[colIndex] || '';
          });
          return {
            id: `row-${index}`,
            data: rowData
          };
        });

      setExcelData({
        headers,
        rows: processedRows
      });
    } catch (err) {
      setError('Error al procesar el archivo Excel');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeRow = useCallback((rowId: string) => {
    setExcelData(prev => {
      if (!prev) return null;
      return {
        ...prev,
        rows: prev.rows.filter(row => row.id !== rowId)
      };
    });
  }, []);

  const removeRows = useCallback((rowIds: string[]) => {
    setExcelData(prev => {
      if (!prev) return null;
      return {
        ...prev,
        rows: prev.rows.filter(row => !rowIds.includes(row.id))
      };
    });
  }, []);

  const clearData = useCallback(() => {
    setExcelData(null);
    setError(null);
  }, []);

  return {
    excelData,
    isLoading,
    error,
    processExcelFile,
    removeRow,
    removeRows,
    clearData
  };
};