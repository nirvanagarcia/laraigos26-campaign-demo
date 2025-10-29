# Arquitectura Avanzada de Formularios con React Hook Form + Zod

## Resumen Ejecutivo

Este sistema implementa un patrón avanzado de React Hook Form (RHF) para manejar formularios dinámicos tipo "cabecera-detalle" con validación robusta usando Zod, gestión de arrays dinámicos, y estado global centralizado.

## Stack Tecnológico

### Core Libraries
- **React Hook Form v7**: Gestión de formularios con alto rendimiento
- **Zod**: Validación de esquemas TypeScript-first
- **Material-UI v7**: Componentes de interfaz
- **TanStack React Table v8**: Manejo de datos tabulares
- **React Context API**: Estado global

### Patrones Implementados
- **Controller Pattern**: Para componentes complejos (MUI, custom)
- **useFieldArray**: Gestión de arrays dinámicos
- **Context Provider**: Estado global del formulario
- **Validation Schema**: Validaciones declarativas con Zod
- **Helper Classes**: Utilities para manipulación de arrays

## Estrcutura de Carpetas actual

src/    
├── components/
│   ├── previews/
│   │   ├── EmailPreview.tsx           // Preview de emails con iframe seguro
│   │   ├── MessagePreview.tsx         // Router de previews por tipo de mensaje
│   │   ├── WhatsAppPreview.tsx        // Preview visual de WhatsApp
│   │   ├── SMSPreview.tsx             // Preview visual de SMS
│   │   └── index.ts                   // Barrel exports de previews
│   ├── tables/
│   │   └── ExcelDataTable.tsx         // Tabla con React Table + paginación + filtros
│   ├── tabs/
│   │   ├── GeneralTab.tsx             // Formulario principal con validación Zod
│   │   └── PersonasTab.tsx            // Gestión de audiencia + import Excel
│   ├── CampaignAdvanced.tsx           // Container principal con tabs + validación global
│   └── TabPanel.tsx                   // Wrapper de Material-UI para tabs
├── contexts/
│   └── CampaignFormContext.tsx        // Estado global del form + validación por tabs
├── data/
│   └── mockData.ts                    // Datos mock para personas y oportunidades
├── hooks/
│   ├── useExcelImport.ts              // Hook para procesar archivos Excel
│   └── useFieldArrayManager.ts        // Hook para gestión de arrays dinámicos
├── schemas/
│   ├── campaignSchema.ts              // Schema principal Zod + sub-schemas
│   ├── common.ts                      // Schemas atómicos reutilizables
│   └── fieldLabels.ts                 // Diccionario centralizado de etiquetas
├── types/
│   ├── campaign.ts                    // Tipos TypeScript del formulario
│   ├── mockData.ts                    // Interfaces para datos mock + plantillas
│   └── excel.ts                       // Tipos para importación Excel
├── utils/
│   └── formHelpers.ts                 // Helpers Zod + buildDefaults + resolvers dinámicos