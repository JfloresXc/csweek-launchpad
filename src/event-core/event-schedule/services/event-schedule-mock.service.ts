import {
  EventScheduleResponse,
  EventSession,
  EventScheduleQueryParams,
  EventDaySchedule,
  EventSessionTimeline,
  EventScheduleStats,
  EventScheduleFilters
} from '../types/event-schedule.types';
import { EventTrack, SessionType } from '../../event-config/event.config';

// Datos mockeados de schedule para CS WEEK 2025
const mockSessions: EventSession[] = [
  {
    "id": "1",
    "event": "tech-summit-2025",
    "title": "Cómo construir un prototipo en salud desde cero",
    "description": "Aprenderás cómo construir un prototipo real ya sea físico, digital o de experiencia usando herramientas accesibles, sin necesidad de escribir una sola línea de código. Exploraremos casos reales y estrategias paso a paso para transformar ideas en soluciones funcionales con el poder del prototipado no-code, agentes con IA como POE o Google AI Studio, y el trabajo colaborativo con hubs o equipos multidisciplinarios.",
    "type": "talk",
    "startTime": "17:00",
    "endTime": "17:20",
    "date": "2025-08-11",
    "room": "Sala IA & Innovación",
    "eventSpeakers": ["deyvid-piero-tolentino-isidro"],
    "tags": ["Salud", "Prototipado", "No-Code", "IA"],
    "level": "beginner",
    "track": "Innovación y Emprendimiento",
    "isLive": true,
    "eventDay": 1,
    "registrationRequired": false,
    "order": 1,
    "isActive": true,
    "createdAt": "2025-08-09T21:30:00Z",
    "updatedAt": "2025-08-09T21:30:00Z"
  },
  {
    "id": "2",
    "event": "tech-summit-2025",
    "title": "Big Data para los negocios",
    "description": "Hablaremos de la importancia del Big Data en la actualidad empresarial.",
    "type": "talk",
    "startTime": "18:30",
    "endTime": "19:15",
    "date": "2025-08-11",
    "room": "Sala IA & Innovación",
    "eventSpeakers": ["renzo-roca"],
    "tags": ["Big Data", "Negocios", "Analytics"],
    "level": "intermediate",
    "track": "Datos e Inteligencia Artificial",
    "isLive": true,
    "eventDay": 1,
    "registrationRequired": false,
    "order": 2,
    "isActive": true,
    "createdAt": "2025-08-09T21:30:00Z",
    "updatedAt": "2025-08-09T21:30:00Z"
  },
  {
    "id": "3",
    "event": "tech-summit-2025",
    "title": "Introducción a la Ciberseguridad",
    "description": "Un breve repaso sobre la historia, conceptos fundamentales y más, orientado a temas muy frecuentes en certificaciones internacionales.",
    "type": "talk",
    "startTime": "19:30",
    "endTime": "20:15",
    "date": "2025-08-11",
    "room": "Sala Ciberseguridad",
    "eventSpeakers": ["renzo-cienfuegos"],
    "tags": ["Ciberseguridad", "Certificaciones", "Seguridad"],
    "level": "beginner",
    "track": "Ciberseguridad",
    "isLive": true,
    "eventDay": 1,
    "registrationRequired": false,
    "order": 3,
    "isActive": true,
    "createdAt": "2025-08-09T21:30:00Z",
    "updatedAt": "2025-08-09T21:30:00Z"
  },
  {
    "id": "4",
    "event": "tech-summit-2025",
    "title": "Chatbots con personalidad: retos técnicos y sociales en el desarrollo de una IA para entretenimiento",
    "description": "En esta charla compartiré el desarrollo de Tralalero Tralala IA Chat, una app móvil creada con Flutter, donde los usuarios pueden conversar con personajes de inteligencia artificial con personalidades únicas, absurdas o emotivas.",
    "type": "talk",
    "startTime": "20:30",
    "endTime": "21:15",
    "date": "2025-08-11",
    "room": "Sala Desarrollo Móvil",
    "eventSpeakers": ["henry-luis-callupe-ancco"],
    "tags": ["Chatbots", "IA", "Flutter", "Móvil"],
    "level": "intermediate",
    "track": "Datos e Inteligencia Artificial",
    "isLive": true,
    "eventDay": 1,
    "registrationRequired": false,
    "order": 4,
    "isActive": true,
    "createdAt": "2025-08-09T21:30:00Z",
    "updatedAt": "2025-08-09T21:30:00Z"
  },
  {
    "id": "5",
    "event": "tech-summit-2025",
    "title": "Web osintomáticas",
    "description": "mi nombre es goblin slay3r y soy un apasionado de la tecnología y la informática, investigador empírico y cocinero de profesión, lector de manga, fanático de los cómics y el anime. Mi camino en la ciberseguridad comenzó literalmente desde cero...",
    "type": "talk",
    "startTime": "17:30",
    "endTime": "18:15",
    "date": "2025-08-12",
    "room": "Sala Ciberseguridad",
    "eventSpeakers": ["goblin-slay3r"],
    "tags": ["OSINT", "Ciberseguridad", "Red Team", "Pentesting"],
    "level": "intermediate",
    "track": "Ciberseguridad",
    "isLive": true,
    "eventDay": 2,
    "registrationRequired": false,
    "order": 5,
    "isActive": true,
    "createdAt": "2025-08-09T21:30:00Z",
    "updatedAt": "2025-08-09T21:30:00Z"
  },
  {
    "id": "6",
    "event": "tech-summit-2025",
    "title": "Introducción a Model Context Protocol (MCP) y Function Calling",
    "description": "Se hablará sobre la evolución de la integración de IA generativa en sistemas, y específicamente, como es que funciona MCP y una alternativa no muy popular llamada Function Calling de Google. La charla mostrará experimentos en vivo.",
    "type": "talk",
    "startTime": "18:30",
    "endTime": "19:15",
    "date": "2025-08-12",
    "room": "Sala IA & Innovación",
    "eventSpeakers": ["jackson-merma"],
    "tags": ["IA Generativa", "MCP", "Function Calling", "Google"],
    "level": "intermediate",
    "track": "Datos e Inteligencia Artificial",
    "isLive": true,
    "eventDay": 2,
    "registrationRequired": false,
    "order": 6,
    "isActive": true,
    "createdAt": "2025-08-09T21:30:00Z",
    "updatedAt": "2025-08-09T21:30:00Z"
  },
  {
    "id": "7",
    "event": "tech-summit-2025",
    "title": "Tu App No Vive Solo en tu PC: Desplegar sin Arruinarte",
    "description": "Exploraremos alternativas económicas como Hetzner, configuraciones manuales, seguridad, mantenimiento y lo que realmente implica lanzar una app al mundo desde cero, sin depender de AWS o Azure.",
    "type": "talk",
    "startTime": "19:30",
    "endTime": "20:15",
    "date": "2025-08-12",
    "room": "Sala Cloud & DevOps",
    "eventSpeakers": ["jimy-dolores"],
    "tags": ["Despliegue", "Cloud", "Hetzner", "DevOps"],
    "level": "intermediate",
    "track": "Cloud y DevOps",
    "isLive": true,
    "eventDay": 2,
    "registrationRequired": false,
    "order": 7,
    "isActive": true,
    "createdAt": "2025-08-09T21:30:00Z",
    "updatedAt": "2025-08-09T21:30:00Z"
  },
  {
    "id": "8",
    "event": "tech-summit-2025",
    "title": "Aplicaciones de la Inteligencia Artificial en Networking",
    "description": "El uso de la IA para universitarios y un caso general.",
    "type": "talk",
    "startTime": "20:30",
    "endTime": "21:15",
    "date": "2025-08-12",
    "room": "Sala IA & Innovación",
    "eventSpeakers": ["jazmin-reyes"],
    "tags": ["IA", "Networking", "Redes"],
    "level": "beginner",
    "track": "Datos e Inteligencia Artificial",
    "isLive": true,
    "eventDay": 2,
    "registrationRequired": false,
    "order": 8,
    "isActive": true,
    "createdAt": "2025-08-09T21:30:00Z",
    "updatedAt": "2025-08-09T21:30:00Z"
  },
  {
    "id": "9",
    "event": "tech-summit-2025",
    "title": "De Cero a Héroe en Ciberseguridad: Rutas, Certificaciones y Oportunidades",
    "description": "En esta charla práctica, te revelaré: Los cimientos imprescindibles, certificaciones estratégicas y el mapa laboral en ciberseguridad.",
    "type": "talk",
    "startTime": "17:30",
    "endTime": "18:15",
    "date": "2025-08-13",
    "room": "Sala Ciberseguridad",
    "eventSpeakers": ["juan-alberto-contreras-flores"],
    "tags": ["Ciberseguridad", "Carrera", "Certificaciones", "Hacking Ético"],
    "level": "beginner",
    "track": "Ciberseguridad",
    "isLive": true,
    "eventDay": 3,
    "registrationRequired": false,
    "order": 9,
    "isActive": true,
    "createdAt": "2025-08-09T21:30:00Z",
    "updatedAt": "2025-08-09T21:30:00Z"
  },
  {
    "id": "10",
    "event": "tech-summit-2025",
    "title": "Testing funcional: el puente entre el desarrollo y el usuario final",
    "description": "Exploraremos el rol fundamental del testing funcional dentro del desarrollo de software y cómo actúa como un puente esencial entre el equipo técnico y los usuarios finales.",
    "type": "talk",
    "startTime": "18:30",
    "endTime": "19:15",
    "date": "2025-08-13",
    "room": "Sala Calidad de Software",
    "eventSpeakers": ["mariluisa-harumi-pereda-pascal"],
    "tags": ["Testing", "QA", "Análisis Funcional", "Calidad"],
    "level": "beginner",
    "track": "Calidad de Software",
    "isLive": true,
    "eventDay": 3,
    "registrationRequired": false,
    "order": 10,
    "isActive": true,
    "createdAt": "2025-08-09T21:30:00Z",
    "updatedAt": "2025-08-09T21:30:00Z"
  },
  {
    "id": "11",
    "event": "tech-summit-2025",
    "title": "Web3 y el nuevo internet del valor y la propiedad",
    "description": "Sobre las tecnologías de registro distribuido, como involucrarse y desarrollar en web3.",
    "type": "talk",
    "startTime": "19:30",
    "endTime": "20:15",
    "date": "2025-08-13",
    "room": "Sala Web3 & Blockchain",
    "eventSpeakers": ["juan-jose-miranda"],
    "tags": ["Web3", "Blockchain", "DLT", "NTT DATA"],
    "level": "intermediate",
    "track": "Web3 y Blockchain",
    "isLive": true,
    "eventDay": 3,
    "registrationRequired": false,
    "order": 11,
    "isActive": true,
    "createdAt": "2025-08-09T21:30:00Z",
    "updatedAt": "2025-08-09T21:30:00Z"
  },
  {
    "id": "12",
    "event": "tech-summit-2025",
    "title": "IA aplicada a la Gestión de Proyectos de Transformación Digital: Caso de uso en Vigilancia y Control Inteligente",
    "description": "En esta charla conocerás cómo la inteligencia artificial está transformando la forma en que las empresas se comunican con sus clientes. Exploraremos el impacto de los chatbots inteligentes en áreas como ventas, atención al cliente y automatización de procesos.",
    "type": "talk",
    "startTime": "20:30",
    "endTime": "21:15",
    "date": "2025-08-13",
    "room": "Sala IA & Innovación",
    "eventSpeakers": ["luz-alicia-acevedo-avila"],
    "tags": ["IA", "Gestión de Proyectos", "Transformación Digital", "Chatbots"],
    "level": "intermediate",
    "track": "Datos e Inteligencia Artificial",
    "isLive": true,
    "eventDay": 3,
    "registrationRequired": false,
    "order": 12,
    "isActive": true,
    "createdAt": "2025-08-09T21:30:00Z",
    "updatedAt": "2025-08-09T21:30:00Z"
  },
  {
    "id": "13",
    "event": "tech-summit-2025",
    "title": "De las Trincheras a Producción: Dominando GraalVM con Spring Boot",
    "description": "Sumérgete en experiencias reales con GraalVM y Spring Boot. Aprende a reducir uso de memoria, CPU y tiempos de arranque, creando contenedores más pequeños y manejando altas cargas.",
    "type": "talk",
    "startTime": "17:30",
    "endTime": "18:15",
    "date": "2025-08-14",
    "room": "Sala Backend",
    "eventSpeakers": ["jose-amadeo-diaz-diaz"],
    "tags": ["GraalVM", "Spring Boot", "Java", "Cloud", "Microservicios"],
    "level": "advanced",
    "track": "Desarrollo Backend",
    "isLive": true,
    "eventDay": 4,
    "registrationRequired": false,
    "order": 13,
    "isActive": true,
    "createdAt": "2025-08-09T21:30:00Z",
    "updatedAt": "2025-08-09T21:30:00Z"
  },
  {
    "id": "14",
    "event": "tech-summit-2025",
    "title": "Modern SQL Development con IA: Extensión MSSQL en VS Code, GitHub Copilot y Azure",
    "description": "Exploraremos cómo la extensión MSSQL para Visual Studio Code, junto con GitHub Copilot y Azure, está transformando el desarrollo SQL moderno con inteligencia artificial.",
    "type": "talk",
    "startTime": "18:30",
    "endTime": "19:15",
    "date": "2025-08-14",
    "room": "Sala IA & Innovación",
    "eventSpeakers": ["elvis-geovanny-batzibal"],
    "tags": ["SQL", "IA", "VS Code", "GitHub Copilot", "Azure"],
    "level": "intermediate",
    "track": "Datos e Inteligencia Artificial",
    "isLive": true,
    "eventDay": 4,
    "registrationRequired": false,
    "order": 14,
    "isActive": true,
    "createdAt": "2025-08-09T21:30:00Z",
    "updatedAt": "2025-08-09T21:30:00Z"
  },
  {
    "id": "15",
    "event": "tech-summit-2025",
    "title": "Diseña sitios webs impresionantes con Google Stich IA para Angular",
    "description": "Esta charla se enfoca en cómo usar Google Stitch para lograrlo. Aprenderás a integrar esta herramienta en tus aplicaciones Angular de manera sencilla, construyendo componentes visualmente amigables.",
    "type": "talk",
    "startTime": "19:30",
    "endTime": "20:15",
    "date": "2025-08-14",
    "room": "Sala Frontend",
    "eventSpeakers": ["jose-flores-chamba"],
    "tags": ["Frontend", "Angular", "Google Stitch", "IA", "Diseño Web"],
    "level": "beginner",
    "track": "Desarrollo Frontend",
    "isLive": true,
    "eventDay": 4,
    "registrationRequired": false,
    "order": 15,
    "isActive": true,
    "createdAt": "2025-08-09T21:30:00Z",
    "updatedAt": "2025-08-09T21:30:00Z"
  },
  {
    "id": "16",
    "event": "tech-summit-2025",
    "title": "La Entrevista Técnica",
    "description": "Algunos aspectos a considerar al momento de aplicar a puestos de desarrollo Frontend.",
    "type": "talk",
    "startTime": "20:30",
    "endTime": "21:15",
    "date": "2025-08-14",
    "room": "Sala Frontend",
    "eventSpeakers": ["carlos-lenon"],
    "tags": ["Frontend", "Entrevista Técnica", "Carrera", "React"],
    "level": "beginner",
    "track": "Desarrollo Profesional",
    "isLive": true,
    "eventDay": 4,
    "registrationRequired": false,
    "order": 16,
    "isActive": true,
    "createdAt": "2025-08-09T21:30:00Z",
    "updatedAt": "2025-08-09T21:30:00Z"
  },
  {
    "id": "17",
    "event": "tech-summit-2025",
    "title": "Liderando la Revolución IA: Agentes Autónomos en la Transformación Digital",
    "description": "Los agentes autónomos de IA están redefiniendo la transformación digital en 2025, automatizando procesos complejos y tomando decisiones en tiempo real.",
    "type": "talk",
    "startTime": "17:30",
    "endTime": "18:15",
    "date": "2025-08-15",
    "room": "Sala IA & Innovación",
    "eventSpeakers": ["maribel-maza"],
    "tags": ["IA", "Agentes Autónomos", "Transformación Digital", "GenAI"],
    "level": "advanced",
    "track": "Datos e Inteligencia Artificial",
    "isLive": true,
    "eventDay": 5,
    "registrationRequired": false,
    "order": 17,
    "isActive": true,
    "createdAt": "2025-08-09T21:30:00Z",
    "updatedAt": "2025-08-09T21:30:00Z"
  },
  {
    "id": "18",
    "event": "tech-summit-2025",
    "title": "De la Idea al Deploy con Firebase Studio",
    "description": "En esta sesión aprenderás a usar agentes como App Prototyping y Gemini Code Assist para generar, desarrollar y lanzar tus proyectos en minutos, integrando servicios como Firebase Hosting y colaboración en tiempo real.",
    "type": "talk",
    "startTime": "18:30",
    "endTime": "19:15",
    "date": "2025-08-15",
    "room": "Sala Cloud & DevOps",
    "eventSpeakers": ["daniel-eduardo-ibanez-garcia"],
    "tags": ["Firebase", "Deploy", "Gemini", "Cloud", "IA"],
    "level": "intermediate",
    "track": "Cloud y DevOps",
    "isLive": true,
    "eventDay": 5,
    "registrationRequired": false,
    "order": 18,
    "isActive": true,
    "createdAt": "2025-08-09T21:30:00Z",
    "updatedAt": "2025-08-09T21:30:00Z"
  },
  {
    "id": "19",
    "event": "tech-summit-2025",
    "title": "Kotlin & Compose Multiplatform",
    "description": "Desarrollo de aplicaciones multiplataforma (Android, iOS, Escritorio y WebAssembly) usando los frameworks Kotlin Multiplatform y Compose Multiplatform, bajo el lenguaje de programación Kotlin.",
    "type": "talk",
    "startTime": "19:30",
    "endTime": "20:15",
    "date": "2025-08-15",
    "room": "Sala Desarrollo Móvil",
    "eventSpeakers": ["andres-david-escobar-villa"],
    "tags": ["Kotlin", "Compose", "Multiplataforma", "Android", "iOS"],
    "level": "advanced",
    "track": "Desarrollo Móvil",
    "isLive": true,
    "eventDay": 5,
    "registrationRequired": false,
    "order": 19,
    "isActive": true,
    "createdAt": "2025-08-09T21:30:00Z",
    "updatedAt": "2025-08-09T21:30:00Z"
  },
  {
    "id": "20",
    "event": "tech-summit-2025",
    "title": "Apps Inteligentes Multiplataforma con Flutter, Firebase y Gemini",
    "description": "En esta charla exploraremos cómo Flutter, Firebase y Gemini se integran para desarrollar apps inteligentes, multiplataforma y modernas sin complicaciones.",
    "type": "talk",
    "startTime": "20:30",
    "endTime": "21:15",
    "date": "2025-08-15",
    "room": "Sala Desarrollo Móvil",
    "eventSpeakers": ["giancarlos-enrique-sandoval-tume"],
    "tags": ["Flutter", "Firebase", "Gemini", "IA", "Multiplataforma"],
    "level": "intermediate",
    "track": "Desarrollo Móvil",
    "isLive": true,
    "eventDay": 5,
    "registrationRequired": false,
    "order": 20,
    "isActive": true,
    "createdAt": "2025-08-09T21:30:00Z",
    "updatedAt": "2025-08-09T21:30:00Z"
  }
];

// Servicio mock para schedule del evento
export class EventScheduleMockService {
  // Simular delay de red
  private static delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Obtener agenda completa del evento
  static async getEventSchedule(params: EventScheduleQueryParams = {}): Promise<EventScheduleResponse> {
    await this.delay();

    const { limit = 10, page = 1, sort = 'startTime' } = params;

    // Aplicar ordenamiento
    const sortedSessions = [...mockSessions];

    switch (sort) {
      case 'startTime':
        sortedSessions.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
        break;
      case '-startTime':
        sortedSessions.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
        break;
      case 'title':
        sortedSessions.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case '-title':
        sortedSessions.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    // Aplicar paginación
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedSessions = sortedSessions.slice(startIndex, endIndex);

    const total = sortedSessions.length;
    const totalPages = Math.ceil(total / limit);

    return {
      docs: paginatedSessions,
      totalDocs: total,
      limit,
      totalPages,
      page,
      pagingCounter: startIndex + 1,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null
    };
  }

  // Obtener agenda por día específico
  static async getEventScheduleByDay(date: string): Promise<EventDaySchedule> {
    await this.delay();

    const sessions = mockSessions
      .filter(session => session.date === date)
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

    const dayNumber = sessions.length > 0 ? sessions[0].eventDay : 1;
    const dayNames = ['', 'Lunes', 'Martes', 'Miércoles'];

    return {
      date,
      day: dayNumber,
      dayName: dayNames[dayNumber] || 'Día',
      sessions
    };
  }

  // Obtener sesión específica por ID
  static async getEventSessionById(id: string): Promise<EventSession> {
    await this.delay();

    const session = mockSessions.find(s => s.id === id);
    if (!session) {
      throw new Error(`Session with ID ${id} not found`);
    }

    return session;
  }

  // Obtener sesiones por track
  static async getEventSessionsByTrack(track: EventTrack): Promise<EventSession[]> {
    await this.delay();

    return mockSessions
      .filter(session => session.track === track)
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  }

  // Obtener sesiones en vivo
  static async getLiveEventSessions(): Promise<EventSession[]> {
    await this.delay();

    const now = new Date();

    return mockSessions.filter(session => {
      const startTime = new Date(session.startTime);
      const endTime = new Date(session.endTime);
      return now >= startTime && now <= endTime;
    });
  }

  // Obtener timeline de sesiones
  static async getEventSessionsTimeline(date: string): Promise<EventSessionTimeline[]> {
    await this.delay();

    const sessions = mockSessions
      .filter(session => session.date === date)
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

    // Agrupar sesiones por hora de inicio
    const timelineMap = new Map<string, EventSession[]>();

    sessions.forEach(session => {
      const startTime = new Date(session.startTime);
      const timeSlot = startTime.toLocaleTimeString('es-PE', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });

      if (!timelineMap.has(timeSlot)) {
        timelineMap.set(timeSlot, []);
      }
      timelineMap.get(timeSlot)!.push(session);
    });

    return Array.from(timelineMap.entries()).map(([timeSlot, sessions]) => ({
      timeSlot,
      sessions
    }));
  }

  // Obtener estadísticas del schedule
  static async getEventScheduleStats(): Promise<EventScheduleStats> {
    await this.delay();

    const sessionsByType = mockSessions.reduce((acc, session) => {
      acc[session.type] = (acc[session.type] || 0) + 1;
      return acc;
    }, {} as Record<SessionType, number>);

    const sessionsByTrack = mockSessions.reduce((acc, session) => {
      acc[session.track] = (acc[session.track] || 0) + 1;
      return acc;
    }, {} as Record<EventTrack, number>);

    const sessionsByLevel = mockSessions.reduce((acc, session) => {
      acc[session.level] = (acc[session.level] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const uniqueDays = new Set(mockSessions.map(s => s.date)).size;
    const liveSessions = mockSessions.filter(s => s.isLive).length;

    return {
      totalSessions: mockSessions.length,
      totalDays: uniqueDays,
      sessionsByType,
      sessionsByTrack,
      sessionsByLevel,
      liveSessions
    };
  }

  // Obtener todas las sesiones agrupadas por día
  static async getAllEventDays(): Promise<EventDaySchedule[]> {
    await this.delay();

    const uniqueDates = [...new Set(mockSessions.map(s => s.date))].sort();

    const daySchedules = await Promise.all(
      uniqueDates.map(date => this.getEventScheduleByDay(date))
    );

    return daySchedules;
  }
}