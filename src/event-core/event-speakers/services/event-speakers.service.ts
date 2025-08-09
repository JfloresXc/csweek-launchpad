import axios from 'axios';
import { 
  EventSpeakersResponse, 
  EventSpeaker, 
  EventSpeakersQueryParams,
  FeaturedEventSpeaker,
  KeynoteEventSpeaker
} from '../types/event-speaker.types';

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

// Servicio para speakers del evento
export class EventSpeakersService {
  // Obtener lista de speakers del evento
  static async getEventSpeakers(params: EventSpeakersQueryParams = {}): Promise<EventSpeakersResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      // Parámetros por defecto
      const { limit = 10, page = 1, sort = 'name' } = params;
      
      queryParams.append('limit', limit.toString());
      queryParams.append('page', page.toString());
      queryParams.append('sort', sort);
      
      const response = await apiClient.get(`/api/event/speakers?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching event speakers:', error);
      throw new Error('Failed to fetch event speakers');
    }
  }
  
  // Obtener speaker específico por ID
  static async getEventSpeakerById(id: string): Promise<EventSpeaker> {
    try {
      const response = await apiClient.get(`/api/event/speakers/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching speaker ${id}:`, error);
      throw new Error(`Failed to fetch speaker with ID: ${id}`);
    }
  }
  
  // Obtener speakers destacados
  static async getFeaturedEventSpeakers(): Promise<FeaturedEventSpeaker[]> {
    try {
      const response = await apiClient.get('/api/event/speakers/featured');
      return response.data.docs || response.data;
    } catch (error) {
      console.error('Error fetching featured speakers:', error);
      throw new Error('Failed to fetch featured speakers');
    }
  }
  
  // Obtener keynote speakers
  static async getKeynoteEventSpeakers(): Promise<KeynoteEventSpeaker[]> {
    try {
      const response = await apiClient.get('/api/event/speakers/keynote');
      return response.data.docs || response.data;
    } catch (error) {
      console.error('Error fetching keynote speakers:', error);
      throw new Error('Failed to fetch keynote speakers');
    }
  }
  
  // Buscar speakers por término
  static async searchEventSpeakers(searchTerm: string, params: EventSpeakersQueryParams = {}): Promise<EventSpeakersResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      const { limit = 10, page = 1, sort = 'name' } = params;
      
      queryParams.append('search', searchTerm);
      queryParams.append('limit', limit.toString());
      queryParams.append('page', page.toString());
      queryParams.append('sort', sort);
      
      const response = await apiClient.get(`/api/event/speakers?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error searching speakers:', error);
      throw new Error('Failed to search speakers');
    }
  }
}

// Funciones de utilidad
export const eventSpeakersUtils = {
  // Formatear nombre completo del speaker
  getFullName: (speaker: EventSpeaker): string => {
    return speaker.name;
  },
  
  // Obtener título completo (nombre + posición + empresa)
  getFullTitle: (speaker: EventSpeaker): string => {
    return `${speaker.title} at ${speaker.company}`;
  },
  
  // Verificar si el speaker tiene redes sociales
  hasSocialLinks: (speaker: EventSpeaker): boolean => {
    return Object.values(speaker.social).some(link => link && link.length > 0);
  },
  
  // Obtener enlaces de redes sociales válidos
  getValidSocialLinks: (speaker: EventSpeaker) => {
    return Object.entries(speaker.social)
      .filter(([_, url]) => url && url.length > 0)
      .map(([platform, url]) => ({ platform, url }));
  },
  
  // Formatear bio con límite de caracteres
  getTruncatedBio: (speaker: EventSpeaker, maxLength: number = 150): string => {
    if (speaker.bio.length <= maxLength) return speaker.bio;
    return speaker.bio.substring(0, maxLength).trim() + '...';
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
  }
};