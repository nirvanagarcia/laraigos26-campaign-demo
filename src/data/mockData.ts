export interface PersonaMockData {
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
  numeroDocumento: string;
  cumpleanos: string;
  genero: string;
  nivelEducacion: string;
  asesor: string;
}

export interface OportunidadMockData {
  oportunidad: string;
  ultimaActualizacion: string;
  nombre: string;
  correo: string;
  telefono: string;
  ingresoEsperado: string;
  fechaFin: string;
  fechaInicio: string;
  tag: string;
  asesor: string;
  productos: string;
  fases: string;
}

export const personasMockData: PersonaMockData[] = [
  {
    nombre: "María",
    apellido: "García López",
    telefono: "+34 612 345 678",
    correo: "maria.garcia@email.com",
    numeroDocumento: "12345678A",
    cumpleanos: "1985-03-15",
    genero: "Femenino",
    nivelEducacion: "Universitario",
    asesor: "Juan Pérez"
  },
  {
    nombre: "Carlos",
    apellido: "Rodríguez Sánchez",
    telefono: "+34 623 456 789",
    correo: "carlos.rodriguez@email.com",
    numeroDocumento: "23456789B",
    cumpleanos: "1990-07-22",
    genero: "Masculino",
    nivelEducacion: "Postgrado",
    asesor: "Ana Martín"
  },
  {
    nombre: "Elena",
    apellido: "Fernández Ruiz",
    telefono: "+34 634 567 890",
    correo: "elena.fernandez@email.com",
    numeroDocumento: "34567890C",
    cumpleanos: "1988-11-08",
    genero: "Femenino",
    nivelEducacion: "Universitario",
    asesor: "Pedro González"
  },
  {
    nombre: "Javier",
    apellido: "Martínez Torres",
    telefono: "+34 645 678 901",
    correo: "javier.martinez@email.com",
    numeroDocumento: "45678901D",
    cumpleanos: "1982-05-30",
    genero: "Masculino",
    nivelEducacion: "Técnico Superior",
    asesor: "Laura Jiménez"
  },
  {
    nombre: "Lucía",
    apellido: "Hernández Castro",
    telefono: "+34 656 789 012",
    correo: "lucia.hernandez@email.com",
    numeroDocumento: "56789012E",
    cumpleanos: "1993-09-12",
    genero: "Femenino",
    nivelEducacion: "Universitario",
    asesor: "Miguel Romero"
  },
  {
    nombre: "Antonio",
    apellido: "González Moreno",
    telefono: "+34 667 890 123",
    correo: "antonio.gonzalez@email.com",
    numeroDocumento: "67890123F",
    cumpleanos: "1987-12-03",
    genero: "Masculino",
    nivelEducacion: "Postgrado",
    asesor: "Carmen Vega"
  },
  {
    nombre: "Isabel",
    apellido: "López Díaz",
    telefono: "+34 678 901 234",
    correo: "isabel.lopez@email.com",
    numeroDocumento: "78901234G",
    cumpleanos: "1991-02-18",
    genero: "Femenino",
    nivelEducacion: "Universitario",
    asesor: "Francisco Silva"
  },
  {
    nombre: "Roberto",
    apellido: "Sánchez Iglesias",
    telefono: "+34 689 012 345",
    correo: "roberto.sanchez@email.com",
    numeroDocumento: "89012345H",
    cumpleanos: "1984-06-25",
    genero: "Masculino",
    nivelEducacion: "Técnico Superior",
    asesor: "Teresa Ramos"
  },
  {
    nombre: "Patricia",
    apellido: "Ruiz Navarro",
    telefono: "+34 690 123 456",
    correo: "patricia.ruiz@email.com",
    numeroDocumento: "90123456I",
    cumpleanos: "1989-10-14",
    genero: "Femenino",
    nivelEducacion: "Universitario",
    asesor: "David Herrera"
  },
  {
    nombre: "Fernando",
    apellido: "Torres Muñoz",
    telefono: "+34 601 234 567",
    correo: "fernando.torres@email.com",
    numeroDocumento: "01234567J",
    cumpleanos: "1986-04-07",
    genero: "Masculino",
    nivelEducacion: "Postgrado",
    asesor: "Silvia Campos"
  },
  {
    nombre: "Cristina",
    apellido: "Castro Vargas",
    telefono: "+34 612 345 678",
    correo: "cristina.castro@email.com",
    numeroDocumento: "12345670K",
    cumpleanos: "1992-08-19",
    genero: "Femenino",
    nivelEducacion: "Universitario",
    asesor: "Rafael Ortega"
  },
  {
    nombre: "Manuel",
    apellido: "Moreno Peña",
    telefono: "+34 623 456 789",
    correo: "manuel.moreno@email.com",
    numeroDocumento: "23456701L",
    cumpleanos: "1983-01-11",
    genero: "Masculino",
    nivelEducacion: "Técnico Superior",
    asesor: "Beatriz León"
  },
  {
    nombre: "Pilar",
    apellido: "Díaz Guerrero",
    telefono: "+34 634 567 890",
    correo: "pilar.diaz@email.com",
    numeroDocumento: "34567012M",
    cumpleanos: "1994-05-28",
    genero: "Femenino",
    nivelEducacion: "Universitario",
    asesor: "Andrés Molina"
  },
  {
    nombre: "Ramón",
    apellido: "Iglesias Cortés",
    telefono: "+34 645 678 901",
    correo: "ramon.iglesias@email.com",
    numeroDocumento: "45670123N",
    cumpleanos: "1981-09-06",
    genero: "Masculino",
    nivelEducacion: "Postgrado",
    asesor: "Rosa Aguilar"
  },
  {
    nombre: "Almudena",
    apellido: "Navarro Serrano",
    telefono: "+34 656 789 012",
    correo: "almudena.navarro@email.com",
    numeroDocumento: "56701234O",
    cumpleanos: "1990-12-21",
    genero: "Femenino",
    nivelEducacion: "Universitario",
    asesor: "Jorge Medina"
  },
  {
    nombre: "Sergio",
    apellido: "Muñoz Delgado",
    telefono: "+34 667 890 123",
    correo: "sergio.munoz@email.com",
    numeroDocumento: "67012345P",
    cumpleanos: "1988-03-04",
    genero: "Masculino",
    nivelEducacion: "Técnico Superior",
    asesor: "Mónica Prieto"
  },
  {
    nombre: "Raquel",
    apellido: "Vargas Rubio",
    telefono: "+34 678 901 234",
    correo: "raquel.vargas@email.com",
    numeroDocumento: "70123456Q",
    cumpleanos: "1985-07-17",
    genero: "Femenino",
    nivelEducacion: "Universitario",
    asesor: "Óscar Santos"
  },
  {
    nombre: "Emilio",
    apellido: "Peña Jiménez",
    telefono: "+34 689 012 345",
    correo: "emilio.pena@email.com",
    numeroDocumento: "01234568R",
    cumpleanos: "1987-11-29",
    genero: "Masculino",
    nivelEducacion: "Postgrado",
    asesor: "Nuria Blanco"
  },
  {
    nombre: "Susana",
    apellido: "Guerrero Moya",
    telefono: "+34 690 123 456",
    correo: "susana.guerrero@email.com",
    numeroDocumento: "12345679S",
    cumpleanos: "1991-06-13",
    genero: "Femenino",
    nivelEducacion: "Universitario",
    asesor: "Álvaro Castro"
  },
  {
    nombre: "Víctor",
    apellido: "Cortés Vázquez",
    telefono: "+34 601 234 567",
    correo: "victor.cortes@email.com",
    numeroDocumento: "23456780T",
    cumpleanos: "1984-02-26",
    genero: "Masculino",
    nivelEducacion: "Técnico Superior",
    asesor: "Inés Morales"
  }
];

export const oportunidadesMockData: OportunidadMockData[] = [
  {
    oportunidad: "Venta Software CRM Empresarial",
    ultimaActualizacion: "2024-01-15",
    nombre: "TechCorp Solutions",
    correo: "contacto@techcorp.com",
    telefono: "+34 915 123 456",
    ingresoEsperado: "45000€",
    fechaFin: "2024-03-30",
    fechaInicio: "2024-01-10",
    tag: "Software",
    asesor: "Ana Martín",
    productos: "CRM Premium, Licencias",
    fases: "Negociación"
  },
  {
    oportunidad: "Consultoría Marketing Digital",
    ultimaActualizacion: "2024-01-14",
    nombre: "Retail Plus S.L.",
    correo: "info@retailplus.es",
    telefono: "+34 932 654 789",
    ingresoEsperado: "12000€",
    fechaFin: "2024-02-28",
    fechaInicio: "2024-01-05",
    tag: "Consultoría",
    asesor: "Pedro González",
    productos: "Consultoría, Formación",
    fases: "Propuesta"
  },
  {
    oportunidad: "Implementación ERP",
    ultimaActualizacion: "2024-01-13",
    nombre: "Industrial Machinery Co.",
    correo: "gerencia@industrialmach.com",
    telefono: "+34 954 321 098",
    ingresoEsperado: "78000€",
    fechaFin: "2024-06-15",
    fechaInicio: "2024-01-08",
    tag: "ERP",
    asesor: "Laura Jiménez",
    productos: "ERP Completo, Soporte",
    fases: "Calificación"
  },
  {
    oportunidad: "Desarrollo Web Personalizado",
    ultimaActualizacion: "2024-01-12",
    nombre: "Startup Innovations",
    correo: "dev@startupinno.com",
    telefono: "+34 661 789 123",
    ingresoEsperado: "25000€",
    fechaFin: "2024-04-20",
    fechaInicio: "2024-01-12",
    tag: "Desarrollo",
    asesor: "Miguel Romero",
    productos: "Desarrollo, Hosting",
    fases: "Contacto Inicial"
  },
  {
    oportunidad: "Servicios Cloud Azure",
    ultimaActualizacion: "2024-01-11",
    nombre: "Healthcare Systems",
    correo: "it@healthsys.es",
    telefono: "+34 913 456 789",
    ingresoEsperado: "35000€",
    fechaFin: "2024-05-10",
    fechaInicio: "2024-01-03",
    tag: "Cloud",
    asesor: "Carmen Vega",
    productos: "Azure, Migración",
    fases: "Demostración"
  },
  {
    oportunidad: "Plataforma E-commerce",
    ultimaActualizacion: "2024-01-10",
    nombre: "Fashion Boutique",
    correo: "online@fashionboutique.es",
    telefono: "+34 934 567 890",
    ingresoEsperado: "18000€",
    fechaFin: "2024-03-15",
    fechaInicio: "2024-01-01",
    tag: "E-commerce",
    asesor: "Francisco Silva",
    productos: "Plataforma, Integración",
    fases: "Negociación"
  },
  {
    oportunidad: "Seguridad Cibernética",
    ultimaActualizacion: "2024-01-09",
    nombre: "Financial Services Ltd",
    correo: "security@finservices.com",
    telefono: "+34 917 890 123",
    ingresoEsperado: "52000€",
    fechaFin: "2024-07-30",
    fechaInicio: "2024-01-09",
    tag: "Seguridad",
    asesor: "Teresa Ramos",
    productos: "Firewall, Monitoreo",
    fases: "Calificación"
  },
  {
    oportunidad: "Automatización Procesos",
    ultimaActualizacion: "2024-01-08",
    nombre: "Manufacturing Pro",
    correo: "automation@mfgpro.es",
    telefono: "+34 955 123 456",
    ingresoEsperado: "67000€",
    fechaFin: "2024-08-15",
    fechaInicio: "2024-01-02",
    tag: "Automatización",
    asesor: "David Herrera",
    productos: "RPA, Integración",
    fases: "Propuesta"
  },
  {
    oportunidad: "Sistema de Gestión Documental",
    ultimaActualizacion: "2024-01-07",
    nombre: "Legal Associates",
    correo: "admin@legalassoc.es",
    telefono: "+34 914 567 890",
    ingresoEsperado: "28000€",
    fechaFin: "2024-04-30",
    fechaInicio: "2024-01-07",
    tag: "Gestión",
    asesor: "Silvia Campos",
    productos: "GED, Digitalización",
    fases: "Demostración"
  },
  {
    oportunidad: "Análisis de Datos BI",
    ultimaActualizacion: "2024-01-06",
    nombre: "Logistics Express",
    correo: "analytics@logexpress.com",
    telefono: "+34 933 678 901",
    ingresoEsperado: "41000€",
    fechaFin: "2024-05-25",
    fechaInicio: "2024-01-06",
    tag: "BI",
    asesor: "Rafael Ortega",
    productos: "Power BI, Dashboards",
    fases: "Contacto Inicial"
  },
  {
    oportunidad: "Migración a Office 365",
    ultimaActualizacion: "2024-01-05",
    nombre: "Education Center",
    correo: "it@educenter.es",
    telefono: "+34 956 789 012",
    ingresoEsperado: "22000€",
    fechaFin: "2024-03-20",
    fechaInicio: "2024-01-05",
    tag: "Migración",
    asesor: "Beatriz León",
    productos: "Office 365, Formación",
    fases: "Negociación"
  },
  {
    oportunidad: "App Mobile Nativa",
    ultimaActualizacion: "2024-01-04",
    nombre: "Tourism Agency",
    correo: "mobile@touragency.es",
    telefono: "+34 612 890 123",
    ingresoEsperado: "33000€",
    fechaFin: "2024-06-30",
    fechaInicio: "2024-01-04",
    tag: "Mobile",
    asesor: "Andrés Molina",
    productos: "App iOS/Android",
    fases: "Calificación"
  },
  {
    oportunidad: "Infraestructura IT",
    ultimaActualizacion: "2024-01-03",
    nombre: "Construction Group",
    correo: "infrastructure@constgroup.es",
    telefono: "+34 918 901 234",
    ingresoEsperado: "85000€",
    fechaFin: "2024-09-30",
    fechaInicio: "2024-01-03",
    tag: "Infraestructura",
    asesor: "Rosa Aguilar",
    productos: "Servidores, Redes",
    fases: "Propuesta"
  },
  {
    oportunidad: "Chatbot Inteligente",
    ultimaActualizacion: "2024-01-02",
    nombre: "Customer Service Plus",
    correo: "ai@custservice.com",
    telefono: "+34 935 012 345",
    ingresoEsperado: "16000€",
    fechaFin: "2024-04-15",
    fechaInicio: "2024-01-02",
    tag: "IA",
    asesor: "Jorge Medina",
    productos: "Chatbot, IA",
    fases: "Demostración"
  },
  {
    oportunidad: "Backup y Recuperación",
    ultimaActualizacion: "2024-01-01",
    nombre: "Media Production",
    correo: "backup@mediaprod.es",
    telefono: "+34 957 123 456",
    ingresoEsperado: "19000€",
    fechaFin: "2024-03-31",
    fechaInicio: "2024-01-01",
    tag: "Backup",
    asesor: "Mónica Prieto",
    productos: "Backup, Cloud Storage",
    fases: "Negociación"
  },
  {
    oportunidad: "Formación Tecnológica",
    ultimaActualizacion: "2023-12-30",
    nombre: "Corporate Training",
    correo: "training@corptraining.es",
    telefono: "+34 616 234 567",
    ingresoEsperado: "14000€",
    fechaFin: "2024-02-29",
    fechaInicio: "2023-12-20",
    tag: "Formación",
    asesor: "Óscar Santos",
    productos: "Cursos, Certificaciones",
    fases: "Contacto Inicial"
  },
  {
    oportunidad: "Videoconferencia Empresarial",
    ultimaActualizacion: "2023-12-29",
    nombre: "Remote Solutions",
    correo: "video@remotesol.com",
    telefono: "+34 919 345 678",
    ingresoEsperado: "21000€",
    fechaFin: "2024-04-10",
    fechaInicio: "2023-12-25",
    tag: "Videoconferencia",
    asesor: "Nuria Blanco",
    productos: "Teams, Hardware",
    fases: "Calificación"
  },
  {
    oportunidad: "IoT Industrial",
    ultimaActualizacion: "2023-12-28",
    nombre: "Smart Factory",
    correo: "iot@smartfactory.es",
    telefono: "+34 936 456 789",
    ingresoEsperado: "73000€",
    fechaFin: "2024-10-15",
    fechaInicio: "2023-12-28",
    tag: "IoT",
    asesor: "Álvaro Castro",
    productos: "Sensores, Plataforma IoT",
    fases: "Propuesta"
  },
  {
    oportunidad: "Monitoreo de Red",
    ultimaActualizacion: "2023-12-27",
    nombre: "Network Operations",
    correo: "monitoring@netops.es",
    telefono: "+34 958 567 890",
    ingresoEsperado: "29000€",
    fechaFin: "2024-05-20",
    fechaInicio: "2023-12-27",
    tag: "Monitoreo",
    asesor: "Inés Morales",
    productos: "SNMP, Dashboards",
    fases: "Demostración"
  },
  {
    oportunidad: "Transformación Digital",
    ultimaActualizacion: "2023-12-26",
    nombre: "Traditional Business",
    correo: "digital@tradbusiness.es",
    telefono: "+34 617 678 901",
    ingresoEsperado: "95000€",
    fechaFin: "2024-12-31",
    fechaInicio: "2023-12-20",
    tag: "Transformación",
    asesor: "Juan Pérez",
    productos: "Consultoría, Implementación",
    fases: "Negociación"
  }
];
