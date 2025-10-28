## Stack Tecnológico

### React v19
- **Nuevas características**: Utilizamos las últimas optimizaciones de renderizado y concurrent features
- **Hooks modernos**: Implementación con `useCallback`, `useMemo` y `useEffect` optimizados

### React Hook Form v7
- **Validación en tiempo real**: Sistema de validación instantánea con `mode: 'onChange'`
- **Context Pattern**: Integración con React Context para manejo global del estado del formulario
- **Cabecera-Detalle**: Validación por tabs con control de errores granular
- **Controller API**: Integración seamless con Material-UI components
- **Conditional Validation**: Reglas dinámicas basadas en dependencias entre campos

### Material-UI v7
- **Design System**: Componentes consistentes con tema personalizado
- **Responsive Layout**: Grid system flexible y adaptativo
- **Form Components**: Select, TextField, DatePicker con validación integrada
- **Visual Feedback**: Estados de error, loading y success

### TanStack React Table v8
- **Data Management**: Manejo eficiente de grandes datasets
- **Excel Integration**: Importación y manipulación de archivos .xlsx/.xls
- **Interactive Features**: Sorting, filtering, pagination y row selection
- **Performance**: Virtualización y rendering optimizado

<br>

## Arquitectura de Validación

### Context-Driven Validation
```tsx
// Validación distribuida por tabs con estado centralizado
const { errors, validateTab, showErrors } = useCampaignForm();
```

### Real-time Error Tracking
- **Tab-level validation**: Validación independiente por sección
- **Cross-field validation**: Validación condicional entre campos relacionados
- **Error aggregation**: Consolidación de errores a nivel de formulario
- **Visual indicators**: Badges y alerts para feedback inmediato

### Conditional Business Logic
```tsx
// Ejemplo: Campos obligatorios dinámicos
if (tipoEjecucion === 'PROGRAMADA') {
  // fechaProgramacion y horaProgramacion son requeridos
}
```

## Características Principales

- ✅ **Validación en tiempo real** con React Hook Form
- ✅ **Gestión de estado global** con Context API
- ✅ **Importación de Excel** con manipulación de datos
- ✅ **Preview de mensajes** multi-canal (WhatsApp, SMS, Email, HTML)
- ✅ **Validación condicional** basada en reglas de negocio
- ✅ **UI responsiva** con Material-UI v7

