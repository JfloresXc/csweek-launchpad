// Configuración principal del evento CS WEEK 2025
export const EVENT_CONFIG = {
  // Información básica del evento
  name: 'CS WEEK 2025',
  fullName: 'Computer Science Week 2025',
  tagline: 'El evento de tecnología más grande del año',
  description: 'Una semana completa dedicada a las ciencias de la computación, con speakers internacionales, workshops y networking.',

  // Fechas del evento
  dates: {
    start: '2025-03-10',
    end: '2025-03-14',
    registrationStart: '2025-01-15',
    registrationEnd: '2025-03-05',
    earlyBirdEnd: '2025-02-15'
  },

  // Ubicación
  location: {
    venue: 'Centro de Convenciones Lima',
    address: 'Av. Aviación 2680, San Borja, Lima',
    city: 'Lima',
    country: 'Perú',
    coordinates: {
      lat: -12.0464,
      lng: -77.0428
    }
  },

  // Capacidad y límites
  capacity: {
    total: 2000,
    perDay: 500,
    workshops: 50
  },

  // Redes sociales del evento
  social: {
    website: 'https://csweek2025.com',
    twitter: '@csweek2025',
    instagram: '@csweek2025',
    linkedin: 'company/csweek2025',
    youtube: '@csweek2025',
    discord: 'https://discord.gg/csweek2025'
  },

  // Contacto
  contact: {
    email: 'info@csweek2025.com',
    phone: '+51 1 234-5678',
    whatsapp: '+51 987 654 321'
  },

  // Tracks disponibles
  tracks: [
    'frontend',
    'backend',
    'mobile',
    'ai',
    'devops',
    'general',
    'qa',
    'product',
    'healthtech',
    'data',
    'cybersecurity',
    'Desarrollo Móvil',
    'Cloud y DevOps',
    'Datos e Inteligencia Artificial',
    'Desarrollo Profesional',
    'Desarrollo Frontend',
    'Desarrollo Backend',
    'Web3 y Blockchain',
    'Calidad de Software',
    'Ciberseguridad',
    'Innovación y Emprendimiento',
    'Evento Especial'
  ] as const,

  // Niveles de experiencia
  experienceLevels: [
    'beginner',
    'intermediate',
    'advanced'
  ] as const,

  // Tipos de sesiones
  sessionTypes: [
    'keynote',
    'talk',
    'workshop',
    'panel',
    'networking',
    'break',
    'ceremony'
  ] as const
} as const;

export type EventTrack = typeof EVENT_CONFIG.tracks[number];
export type ExperienceLevel = typeof EVENT_CONFIG.experienceLevels[number];
export type SessionType = typeof EVENT_CONFIG.sessionTypes[number];