export interface ExcelRow {
  id: string;
  data: Record<string, any>;
}

export interface ExcelData {
  headers: string[];
  rows: ExcelRow[];
}

export interface ExcelImportState {
  data: ExcelData | null;
  isLoading: boolean;
  error: string | null;
}