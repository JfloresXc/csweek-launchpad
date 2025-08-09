import { EventTrack, SessionType } from '../../event-config/event.config';

// Estructura de respuesta de la API de schedule
export interface EventScheduleResponse {
  docs: EventSession[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

// Interfaz principal de la sesión del evento
export interface EventSession {
  id: string;
  event: string; // ID del evento
  title: string;
  description: string;
  type: SessionType;
  startTime: string;
  endTime: string;
  date: string;
  room: string;
  eventSpeakers: string[]; // IDs de speakers del evento
  tags: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
  track: EventTrack;
  isLive: boolean;
  eventDay: 1 | 2 | 3 | 4 | 5; // Día del evento
  registrationRequired: boolean;
  order?: number; // Orden en la agenda
  isActive?: boolean; // Si está activa
  createdAt: string; // Fecha de creación
  updatedAt: string; // Fecha de actualización
}

// Parámetros de consulta para schedule
export interface EventScheduleQueryParams {
  limit?: number;
  page?: number;
  sort?: 'startTime' | '-startTime' | 'title' | '-title';
}

// Estados de carga para schedule
export interface EventScheduleState {
  sessions: EventSession[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
  totalPages: number;
}

// Filtros para schedule
export interface EventScheduleFilters {
  track?: EventTrack;
  type?: SessionType;
  level?: 'beginner' | 'intermediate' | 'advanced';
  day?: 1 | 2 | 3;
  date?: string;
  isLive?: boolean;
}

// Sesión agrupada por día
export interface EventDaySchedule {
  date: string;
  day: number;
  dayName: string;
  sessions: EventSession[];
}

// Timeline de sesiones
export interface EventSessionTimeline {
  timeSlot: string;
  sessions: EventSession[];
}

// Sesión con información de speakers
export interface EventSessionWithSpeakers extends EventSession {
  speakers?: {
    id: string;
    name: string;
    avatar: string;
    title: string;
    company: string;
  }[];
}

// Estadísticas del schedule
export interface EventScheduleStats {
  totalSessions: number;
  totalDays: number;
  sessionsByType: Record<SessionType, number>;
  sessionsByTrack: Record<EventTrack, number>;
  sessionsByLevel: Record<string, number>;
  liveSessions: number;
}

// Configuración de horarios
export interface EventTimeConfig {
  timezone: string;
  startHour: number;
  endHour: number;
  slotDuration: number; // en minutos
  breakDuration: number; // en minutos
}