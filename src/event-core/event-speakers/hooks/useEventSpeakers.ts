import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { EventSpeakersService } from '../services/event-speakers.service';
import { 
  EventSpeakersQueryParams, 
  EventSpeaker,
  FeaturedEventSpeaker,
  KeynoteEventSpeaker
} from '../types/event-speaker.types';

// Hook para obtener speakers del evento con paginación
export const useEventSpeakers = (params: EventSpeakersQueryParams = {}) => {
  return useQuery({
    queryKey: ['event-speakers', params],
    queryFn: () => EventSpeakersService.getEventSpeakers(params),
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Hook para obtener speakers con scroll infinito
export const useInfiniteEventSpeakers = (params: Omit<EventSpeakersQueryParams, 'page'> = {}) => {
  return useInfiniteQuery({
    queryKey: ['event-speakers-infinite', params],
    queryFn: ({ pageParam = 1 }) => 
      EventSpeakersService.getEventSpeakers({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.nextPage : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Hook para obtener un speaker específico
export const useEventSpeaker = (id: string) => {
  return useQuery({
    queryKey: ['event-speaker', id],
    queryFn: () => EventSpeakersService.getEventSpeakerById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
    retry: 3,
  });
};

// Hook para obtener speakers destacados
export const useFeaturedEventSpeakers = () => {
  return useQuery({
    queryKey: ['featured-event-speakers'],
    queryFn: () => EventSpeakersService.getFeaturedEventSpeakers(),
    staleTime: 15 * 60 * 1000, // 15 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
    retry: 3,
  });
};

// Hook para obtener keynote speakers
export const useKeynoteEventSpeakers = () => {
  return useQuery({
    queryKey: ['keynote-event-speakers'],
    queryFn: () => EventSpeakersService.getKeynoteEventSpeakers(),
    staleTime: 15 * 60 * 1000, // 15 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
    retry: 3,
  });
};

// Hook para buscar speakers
export const useSearchEventSpeakers = (searchTerm: string, params: EventSpeakersQueryParams = {}) => {
  return useQuery({
    queryKey: ['search-event-speakers', searchTerm, params],
    queryFn: () => EventSpeakersService.searchEventSpeakers(searchTerm, params),
    enabled: searchTerm.length >= 2, // Solo buscar si hay al menos 2 caracteres
    staleTime: 2 * 60 * 1000, // 2 minutos
    gcTime: 5 * 60 * 1000, // 5 minutos
    retry: 2,
  });
};

// Hook combinado para la página de speakers
export const useEventSpeakersPage = (params: EventSpeakersQueryParams = {}) => {
  const speakersQuery = useEventSpeakers(params);
  const featuredQuery = useFeaturedEventSpeakers();
  const keynoteQuery = useKeynoteEventSpeakers();
  
  return {
    // Datos
    speakers: speakersQuery.data?.docs || [],
    featuredSpeakers: featuredQuery.data || [],
    keynoteSpeakers: keynoteQuery.data || [],
    
    // Paginación
    pagination: speakersQuery.data ? {
      page: speakersQuery.data.page,
      totalPages: speakersQuery.data.totalPages,
      totalDocs: speakersQuery.data.totalDocs,
      hasNextPage: speakersQuery.data.hasNextPage,
      hasPrevPage: speakersQuery.data.hasPrevPage,
    } : null,
    
    // Estados
    isLoading: speakersQuery.isLoading || featuredQuery.isLoading || keynoteQuery.isLoading,
    isError: speakersQuery.isError || featuredQuery.isError || keynoteQuery.isError,
    error: speakersQuery.error || featuredQuery.error || keynoteQuery.error,
    
    // Funciones de refetch
    refetch: () => {
      speakersQuery.refetch();
      featuredQuery.refetch();
      keynoteQuery.refetch();
    },
    
    // Estados individuales para control granular
    speakersState: {
      isLoading: speakersQuery.isLoading,
      isError: speakersQuery.isError,
      error: speakersQuery.error,
    },
    featuredState: {
      isLoading: featuredQuery.isLoading,
      isError: featuredQuery.isError,
      error: featuredQuery.error,
    },
    keynoteState: {
      isLoading: keynoteQuery.isLoading,
      isError: keynoteQuery.isError,
      error: keynoteQuery.error,
    },
  };
};