import axios from 'axios';
import { 
  EventScheduleResponse, 
  EventSession, 
  EventScheduleQueryParams,
  EventDaySchedule,
  EventSessionWithSpeakers,
  EventScheduleStats
} from '../types/event-schedule.types';

// Configuración base de la API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.csweek2025.com';

// Cliente HTTP configurado
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Servicio para schedule del evento
export class EventScheduleService {
  // Obtener agenda completa del evento
  static async getEventSchedule(params: EventScheduleQueryParams = {}): Promise<EventScheduleResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      // Parámetros por defecto
      const { limit = 10, page = 1, sort = 'startTime' } = params;
      
      queryParams.append('limit', limit.toString());
      queryParams.append('page', page.toString());
      queryParams.append('sort', sort);
      
      const response = await apiClient.get(`/api/event/schedule?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching event schedule:', error);
      throw new Error('Failed to fetch event schedule');
    }
  }
  
  // Obtener agenda por día específico
  static async getEventScheduleByDay(date: string): Promise<EventSession[]> {
    try {
      const response = await apiClient.get(`/api/event/schedule/day/${date}`);
      return response.data.docs || response.data;
    } catch (error) {
      console.error(`Error fetching schedule for day ${date}:`, error);
      throw new Error(`Failed to fetch schedule for day: ${date}`);
    }
  }
  
  // Obtener sesión específica por ID
  static async getEventSessionById(id: string): Promise<EventSessionWithSpeakers> {
    try {
      const response = await apiClient.get(`/api/event/sessions/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching session ${id}:`, error);
      throw new Error(`Failed to fetch session with ID: ${id}`);
    }
  }
  
  // Obtener sesiones por track tecnológico
  static async getEventScheduleByTrack(track: string): Promise<EventSession[]> {
    try {
      const response = await apiClient.get(`/api/event/schedule/track/${track}`);
      return response.data.docs || response.data;
    } catch (error) {
      console.error(`Error fetching schedule for track ${track}:`, error);
      throw new Error(`Failed to fetch schedule for track: ${track}`);
    }
  }
  
  // Obtener sesiones en vivo
  static async getLiveEventSessions(): Promise<EventSession[]> {
    try {
      const response = await apiClient.get('/api/event/schedule/live');
      return response.data.docs || response.data;
    } catch (error) {
      console.error('Error fetching live sessions:', error);
      throw new Error('Failed to fetch live sessions');
    }
  }
  
  // Buscar sesiones
  static async searchEventSessions(searchTerm: string, params: EventScheduleQueryParams = {}): Promise<EventScheduleResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      const { limit = 10, page = 1, sort = 'startTime' } = params;
      
      queryParams.append('search', searchTerm);
      queryParams.append('limit', limit.toString());
      queryParams.append('page', page.toString());
      queryParams.append('sort', sort);
      
      const response = await apiClient.get(`/api/event/schedule?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error searching sessions:', error);
      throw new Error('Failed to search sessions');
    }
  }
}

// Funciones de utilidad para schedule
export const eventScheduleUtils = {
  // Formatear hora
  formatTime: (timeString: string): string => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('es-PE', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  },
  
  // Formatear fecha
  formatDate: (dateString: string): string => {
    // Agregar 'T00:00:00' para evitar problemas de zona horaria
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('es-PE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },
  
  // Obtener duración de la sesión
  getSessionDuration: (session: EventSession): number => {
    const start = new Date(session.startTime);
    const end = new Date(session.endTime);
    return Math.round((end.getTime() - start.getTime()) / (1000 * 60)); // en minutos
  },
  
  // Verificar si la sesión está en vivo
  isSessionLive: (session: EventSession): boolean => {
    const now = new Date();
    const start = new Date(session.startTime);
    const end = new Date(session.endTime);
    return now >= start && now <= end;
  },
  
  // Verificar si la sesión es próxima (en las próximas 2 horas)
  isSessionUpcoming: (session: EventSession): boolean => {
    const now = new Date();
    const start = new Date(session.startTime);
    const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    return start > now && start <= twoHoursFromNow;
  },
  
  // Agrupar sesiones por día
  groupSessionsByDay: (sessions: EventSession[]): EventDaySchedule[] => {
    const grouped = sessions.reduce((acc, session) => {
      const date = session.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(session);
      return acc;
    }, {} as Record<string, EventSession[]>);
    
    return Object.entries(grouped)
      .map(([date, sessions]) => ({
        date,
        day: sessions[0]?.eventDay || 1,
        dayName: eventScheduleUtils.formatDate(date),
        sessions: sessions.sort((a, b) => 
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        )
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  },
  
  // Obtener color del tipo de sesión
  getSessionTypeColor: (type: string): string => {
    const typeColors: Record<string, string> = {
      keynote: '#8b5cf6',
      talk: '#3b82f6',
      workshop: '#10b981',
      panel: '#f59e0b',
      networking: '#ef4444',
      break: '#6b7280'
    };
    return typeColors[type] || typeColors.talk;
  },
  
  // Obtener color del track
  getTrackColor: (track: string): string => {
    const trackColors: Record<string, string> = {
      frontend: '#3b82f6',
      backend: '#10b981',
      mobile: '#f59e0b',
      ai: '#8b5cf6',
      devops: '#ef4444',
      general: '#6b7280'
    };
    return trackColors[track] || trackColors.general;
  },
  
  // Obtener nivel de dificultad con color
  getLevelInfo: (level: string): { color: string; label: string } => {
    const levelInfo: Record<string, { color: string; label: string }> = {
      beginner: { color: '#10b981', label: 'Principiante' },
      intermediate: { color: '#f59e0b', label: 'Intermedio' },
      advanced: { color: '#ef4444', label: 'Avanzado' }
    };
    return levelInfo[level] || levelInfo.beginner;
  }
};