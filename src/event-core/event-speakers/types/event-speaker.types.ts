import { EventTrack, ExperienceLevel } from '../../event-config/event.config';

// Estructura de respuesta de la API de speakers
export interface EventSpeakersResponse {
  docs: EventSpeaker[];
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

// Interfaz principal del speaker del evento
export interface EventSpeaker {
  id: string;
  event: string; // ID del evento
  name: string;
  title: string;
  company: string;
  bio: string;
  avatar: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  featured: boolean;
  keynote: boolean;
  track: EventTrack;
  experienceLevel: ExperienceLevel;
  eventBadge?: string; // Badge especial para el evento
  order?: number; // Orden de visualización
  isActive?: boolean; // Si está activo
  createdAt: string; // Fecha de creación
  updatedAt: string; // Fecha de actualización
}

// Parámetros de consulta para speakers
export interface EventSpeakersQueryParams {
  limit?: number;
  page?: number;
  sort?: 'name' | '-name' | 'featured' | '-featured';
}

// Estados de carga para speakers
export interface EventSpeakersState {
  speakers: EventSpeaker[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
  totalPages: number;
}

// Filtros para speakers
export interface EventSpeakersFilters {
  track?: EventTrack;
  experienceLevel?: ExperienceLevel;
  featured?: boolean;
  keynote?: boolean;
}

// Speaker destacado para hero section
export interface FeaturedEventSpeaker extends EventSpeaker {
  featured: true;
  highlightText?: string;
  ctaText?: string;
}

// Keynote speaker
export interface KeynoteEventSpeaker extends EventSpeaker {
  keynote: true;
  keynoteTitle?: string;
  keynoteDescription?: string;
}