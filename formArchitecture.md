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

## Arquitectura del Sistema

### 1. Esquema de Validación (Zod)

```typescript
// src/schemas/campaignSchema.ts
export const campaignSchema = z.object({
  // CABECERA - Campos estáticos
  general: z.object({
    titulo: z.string().min(1, "El título es requerido"),
    // ... otros campos
  }).refine((data) => {
    // Validación condicional
    if (data.tipoEjecucion === 'PROGRAMADA') {
      return data.fechaProgramacion !== null;
    }
    return true;
  }),
  
  // DETALLE - Arrays dinámicos
  personas: z.object({
    hasExcelFile: z.boolean(),
    excelData: excelDataSchema.nullable()
  }),
  
  mensaje: z.object({
    personalizedFields: z.array(personalizedFieldSchema)
  })
});

src/
├── schemas/
│   └── campaignSchema.ts              ✅ Zod validation
├── contexts/
│   └── CampaignFormContext.tsx        ✅ Form state (optimizado)
├── hooks/
│   ├── useFieldArrayManager.ts        ✅ Array management
│   └── useExcelImport.ts             ✅ (existente)
├── utils/
│   └── formHelpers.ts                ✅ (consolidado)
├── components/
│   ├── forms/
│   │   └── PersonalizedFieldsManager.tsx ✅ Dynamic fields
│   └── tabs/
│       ├── GeneralTab.tsx            ✅ (existente)
│       ├── PersonasTab.tsx           ✅ (existente) 
│       └── MensajeTab.tsx            ✅ (actualizado)


src/    
├── components/
│   ├── forms/
│   │   └── PersonalizedFieldsManager.tsx 
│   ├── previews/
│   │   ├── EmailPreview.tsx  
│   │   ├── MessagePreview.tsx 
│   │   ├── WhatsAppPreview.tsx 
│   │   ├── index.ts
│   │   └── SMSPreview.tsx  
│   ├── tables/
│   │   ├── ExcelDataTable.tsx  
│   ├── tabs/
│   │   ├── GeneralTab.tsx  
│   │   ├── PersonasTab.tsx 
│   │   └── MensajeTab.tsx  
│   ├── CampaignAdvanced.tsx
│   ├── TabPanel.tsx
├── contexts/
│   └── CampaignFormContext.tsx  
├── hooks/
│   ├── useFieldArrayManager.ts  
│   └── useExcelImport.ts   
├── schemas/
│   └── campaignSchema.ts
├── types/
│   ├── campaign.ts  
│   ├── mockData.ts  
│   └── excel.ts       
├── utils/
│   └── formHelpers.ts           
