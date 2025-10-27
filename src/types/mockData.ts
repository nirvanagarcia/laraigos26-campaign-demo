// Mock data para simulación de API
export interface Grupo {
  id: string;
  nombre: string;
  descripcion: string;
  cantidad: number;
}

export interface Canal {
  id: string;
  nombre: string;
  tipo: string;
  activo: boolean;
}

export interface PlantillaComunicacion {
  id: string;
  nombre: string;
  tipo: 'HSM' | 'CORREO' | 'SMS';
  contenido: string;
  variables: string[];
  preview: string;
}

// Mock data
export const mockGrupos: Grupo[] = [
  { id: '1', nombre: 'Clientes Premium', descripcion: 'Clientes con alta frecuencia de compra', cantidad: 1250 },
  { id: '2', nombre: 'Leads Calificados', descripcion: 'Prospectos con alto potencial', cantidad: 890 },
  { id: '3', nombre: 'Usuarios Inactivos', descripcion: 'Clientes sin actividad reciente', cantidad: 2100 },
  { id: '4', nombre: 'Nuevos Registros', descripcion: 'Usuarios registrados en los últimos 30 días', cantidad: 456 },
];

export const mockCanales: Canal[] = [
  { id: '1', nombre: 'WhatsApp Business', tipo: 'Mensajería', activo: true },
  { id: '2', nombre: 'Email Marketing', tipo: 'Email', activo: true },
  { id: '3', nombre: 'SMS Masivo', tipo: 'SMS', activo: true },
  { id: '4', nombre: 'Push Notifications', tipo: 'Push', activo: false },
];

export const mockPlantillas: PlantillaComunicacion[] = [
  {
    id: '1',
    nombre: 'Bienvenida Premium',
    tipo: 'HSM',
    contenido: 'Hola {{nombre}}, bienvenido a nuestro programa Premium. Disfruta de beneficios exclusivos.',
    variables: ['nombre'],
    preview: 'Hola Juan, bienvenido a nuestro programa Premium. Disfruta de beneficios exclusivos.'
  },
  {
    id: '2',
    nombre: 'Promoción Especial',
    tipo: 'CORREO',
    contenido: 'Estimado {{nombre}}, tenemos una oferta especial del {{descuento}}% en {{producto}}.',
    variables: ['nombre', 'descuento', 'producto'],
    preview: 'Estimado María, tenemos una oferta especial del 30% en Productos Seleccionados.'
  },
  {
    id: '3',
    nombre: 'Recordatorio Cita',
    tipo: 'SMS',
    contenido: 'Recordatorio: Tu cita es mañana {{fecha}} a las {{hora}}. Confirma al {{telefono}}',
    variables: ['fecha', 'hora', 'telefono'],
    preview: 'Recordatorio: Tu cita es mañana 28/10/2025 a las 15:30. Confirma al 555-1234'
  },
  {
    id: '4',
    nombre: 'Abandonaste tu Carrito',
    tipo: 'HSM',
    contenido: '🛒 ¡No olvides completar tu compra! Tienes {{cantidad}} productos esperándote.',
    variables: ['cantidad'],
    preview: '🛒 ¡No olvides completar tu compra! Tienes 3 productos esperándote.'
  },
];