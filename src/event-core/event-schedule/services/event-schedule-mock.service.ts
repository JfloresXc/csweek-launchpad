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
  // DÍA 1 - Lunes 10 de Marzo 2025
  {
    id: '1',
    event: 'csweek2025',
    title: 'Inauguración CS WEEK 2025',
    description: 'Ceremonia de apertura del evento más grande de tecnología del año. Bienvenida oficial y presentación de la agenda.',
    type: 'keynote',
    startTime: '2025-03-10T09:00:00Z',
    endTime: '2025-03-10T09:30:00Z',
    date: '2025-03-10',
    room: 'Auditorio Principal',
    eventSpeakers: ['1'], // CEO de Google
    tags: ['inauguración', 'bienvenida', 'cs week'],
    level: 'beginner',
    track: 'general',
    isLive: false,
    eventDay: 1,
    registrationRequired: false,
    order: 1,
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    event: 'csweek2025',
    title: 'El Futuro de la Inteligencia Artificial',
    description: 'Una mirada profunda a las tendencias emergentes en IA y su impacto en la industria tecnológica.',
    type: 'keynote',
    startTime: '2025-03-10T10:00:00Z',
    endTime: '2025-03-10T10:45:00Z',
    date: '2025-03-10',
    room: 'Auditorio Principal',
    eventSpeakers: ['2'], // CTO de Microsoft
    tags: ['inteligencia artificial', 'machine learning', 'futuro'],
    level: 'intermediate',
    track: 'ai',
    isLive: false,
    eventDay: 1,
    registrationRequired: false,
    order: 2,
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '3',
    event: 'csweek2025',
    title: 'Coffee Break & Networking',
    description: 'Pausa para café y oportunidad de networking entre participantes.',
    type: 'break',
    startTime: '2025-03-10T10:45:00Z',
    endTime: '2025-03-10T11:15:00Z',
    date: '2025-03-10',
    room: 'Hall Principal',
    eventSpeakers: [],
    tags: ['networking', 'coffee', 'break'],
    level: 'beginner',
    track: 'general',
    isLive: false,
    eventDay: 1,
    registrationRequired: false,
    order: 3,
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '4',
    event: 'csweek2025',
    title: 'React 19: Nuevas Características y Mejores Prácticas',
    description: 'Exploración de las últimas características de React 19 y cómo implementarlas en proyectos reales.',
    type: 'talk',
    startTime: '2025-03-10T11:15:00Z',
    endTime: '2025-03-10T12:00:00Z',
    date: '2025-03-10',
    room: 'Sala Frontend',
    eventSpeakers: ['3'], // Senior Engineer de Meta
    tags: ['react', 'frontend', 'javascript', 'web development'],
    level: 'intermediate',
    track: 'frontend',
    isLive: false,
    eventDay: 1,
    registrationRequired: false,
    order: 4,
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '5',
    event: 'csweek2025',
    title: 'Microservicios con Node.js y Docker',
    description: 'Arquitectura de microservicios moderna utilizando Node.js, Docker y Kubernetes.',
    type: 'talk',
    startTime: '2025-03-10T11:15:00Z',
    endTime: '2025-03-10T12:00:00Z',
    date: '2025-03-10',
    room: 'Sala Backend',
    eventSpeakers: ['4'], // Principal Engineer de AWS
    tags: ['microservicios', 'nodejs', 'docker', 'kubernetes'],
    level: 'advanced',
    track: 'backend',
    isLive: false,
    eventDay: 1,
    registrationRequired: false,
    order: 5,
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '6',
    event: 'csweek2025',
    title: 'Workshop: Desarrollo de Apps con React Native',
    description: 'Taller práctico para crear aplicaciones móviles multiplataforma con React Native.',
    type: 'workshop',
    startTime: '2025-03-10T14:00:00Z',
    endTime: '2025-03-10T16:00:00Z',
    date: '2025-03-10',
    room: 'Lab Mobile',
    eventSpeakers: ['5'], // Mobile Lead de GitHub
    tags: ['react native', 'mobile', 'workshop', 'hands-on'],
    level: 'intermediate',
    track: 'mobile',
    isLive: false,
    eventDay: 1,
    registrationRequired: true,
    order: 6,
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  
  // DÍA 2 - Martes 11 de Marzo 2025
  {
    id: '7',
    event: 'csweek2025',
    title: 'DevOps en la Era de la Nube',
    description: 'Estrategias modernas de DevOps para equipos que trabajan en entornos cloud-native.',
    type: 'keynote',
    startTime: '2025-03-11T09:00:00Z',
    endTime: '2025-03-11T09:45:00Z',
    date: '2025-03-11',
    room: 'Auditorio Principal',
    eventSpeakers: ['6'], // DevOps Expert de Platzi
    tags: ['devops', 'cloud', 'automation', 'ci/cd'],
    level: 'intermediate',
    track: 'devops',
    isLive: false,
    eventDay: 2,
    registrationRequired: false,
    order: 7,
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '8',
    event: 'csweek2025',
    title: 'Panel: Mujeres en Tecnología',
    description: 'Panel de discusión sobre diversidad, inclusión y el futuro de las mujeres en la industria tech.',
    type: 'panel',
    startTime: '2025-03-11T10:00:00Z',
    endTime: '2025-03-11T11:00:00Z',
    date: '2025-03-11',
    room: 'Auditorio Principal',
    eventSpeakers: ['7', '8'], // Líderes de Women in Tech
    tags: ['diversidad', 'mujeres', 'inclusión', 'liderazgo'],
    level: 'beginner',
    track: 'general',
    isLive: false,
    eventDay: 2,
    registrationRequired: false,
    order: 8,
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '9',
    event: 'csweek2025',
    title: 'Machine Learning en Producción',
    description: 'Cómo llevar modelos de ML desde el laboratorio hasta producción de manera escalable.',
    type: 'talk',
    startTime: '2025-03-11T11:30:00Z',
    endTime: '2025-03-11T12:15:00Z',
    date: '2025-03-11',
    room: 'Sala AI/ML',
    eventSpeakers: ['9'], // ML Engineer
    tags: ['machine learning', 'mlops', 'producción', 'escalabilidad'],
    level: 'advanced',
    track: 'ai',
    isLive: false,
    eventDay: 2,
    registrationRequired: false,
    order: 9,
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '10',
    event: 'csweek2025',
    title: 'Workshop: CI/CD con GitHub Actions',
    description: 'Taller práctico para implementar pipelines de CI/CD usando GitHub Actions.',
    type: 'workshop',
    startTime: '2025-03-11T14:00:00Z',
    endTime: '2025-03-11T16:30:00Z',
    date: '2025-03-11',
    room: 'Lab DevOps',
    eventSpeakers: ['10'], // DevOps Engineer
    tags: ['ci/cd', 'github actions', 'automation', 'workshop'],
    level: 'intermediate',
    track: 'devops',
    isLive: false,
    eventDay: 2,
    registrationRequired: true,
    order: 10,
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  
  // DÍA 3 - Miércoles 12 de Marzo 2025
  {
    id: '11',
    event: 'csweek2025',
    title: 'El Futuro del Desarrollo Web',
    description: 'Tendencias emergentes en desarrollo web: WebAssembly, Edge Computing y más.',
    type: 'keynote',
    startTime: '2025-03-12T09:00:00Z',
    endTime: '2025-03-12T09:45:00Z',
    date: '2025-03-12',
    room: 'Auditorio Principal',
    eventSpeakers: ['11'], // Web Platform Expert
    tags: ['web development', 'webassembly', 'edge computing', 'futuro'],
    level: 'intermediate',
    track: 'frontend',
    isLive: false,
    eventDay: 3,
    registrationRequired: false,
    order: 11,
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '12',
    event: 'csweek2025',
    title: 'Networking Lunch',
    description: 'Almuerzo de networking con todos los participantes, speakers y sponsors.',
    type: 'networking',
    startTime: '2025-03-12T12:00:00Z',
    endTime: '2025-03-12T13:30:00Z',
    date: '2025-03-12',
    room: 'Terraza Principal',
    eventSpeakers: [],
    tags: ['networking', 'almuerzo', 'conexiones'],
    level: 'beginner',
    track: 'general',
    isLive: false,
    eventDay: 3,
    registrationRequired: false,
    order: 12,
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '13',
    event: 'csweek2025',
    title: 'Clausura y Próximos Pasos',
    description: 'Ceremonia de clausura del evento y anuncio de CS WEEK 2026.',
    type: 'keynote',
    startTime: '2025-03-12T17:00:00Z',
    endTime: '2025-03-12T17:30:00Z',
    date: '2025-03-12',
    room: 'Auditorio Principal',
    eventSpeakers: ['1'], // Organizadores
    tags: ['clausura', 'agradecimientos', 'cs week 2026'],
    level: 'beginner',
    track: 'general',
    isLive: false,
    eventDay: 3,
    registrationRequired: false,
    order: 13,
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
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
    let sortedSessions = [...mockSessions];
    
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