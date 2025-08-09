import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { EventScheduleService } from '../services/event-schedule.service';
import { 
  EventScheduleQueryParams, 
  EventSession,
  EventDaySchedule,
  EventSessionWithSpeakers
} from '../types/event-schedule.types';
import { eventScheduleUtils } from '../services/event-schedule.service';

// Hook para obtener schedule del evento con paginación
export const useEventSchedule = (params: EventScheduleQueryParams = {}) => {
  return useQuery({
    queryKey: ['event-schedule', params],
    queryFn: () => EventScheduleService.getEventSchedule(params),
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Hook para obtener schedule con scroll infinito
export const useInfiniteEventSchedule = (params: Omit<EventScheduleQueryParams, 'page'> = {}) => {
  return useInfiniteQuery({
    queryKey: ['event-schedule-infinite', params],
    queryFn: ({ pageParam = 1 }) => 
      EventScheduleService.getEventSchedule({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.nextPage : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Hook para obtener schedule por día
export const useEventScheduleByDay = (date: string) => {
  return useQuery({
    queryKey: ['event-schedule-day', date],
    queryFn: () => EventScheduleService.getEventScheduleByDay(date),
    enabled: !!date,
    staleTime: 10 * 60 * 1000, // 10 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
    retry: 3,
  });
};

// Hook para obtener una sesión específica
export const useEventSession = (id: string) => {
  return useQuery({
    queryKey: ['event-session', id],
    queryFn: () => EventScheduleService.getEventSessionById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
    retry: 3,
  });
};

// Hook para obtener schedule por track
export const useEventScheduleByTrack = (track: string) => {
  return useQuery({
    queryKey: ['event-schedule-track', track],
    queryFn: () => EventScheduleService.getEventScheduleByTrack(track),
    enabled: !!track,
    staleTime: 10 * 60 * 1000, // 10 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
    retry: 3,
  });
};

// Hook para obtener sesiones en vivo
export const useLiveEventSessions = () => {
  return useQuery({
    queryKey: ['live-event-sessions'],
    queryFn: () => EventScheduleService.getLiveEventSessions(),
    staleTime: 1 * 60 * 1000, // 1 minuto (más frecuente para sesiones en vivo)
    gcTime: 5 * 60 * 1000, // 5 minutos
    retry: 3,
    refetchInterval: 2 * 60 * 1000, // Refetch cada 2 minutos para sesiones en vivo
  });
};

// Hook para buscar sesiones
export const useSearchEventSessions = (searchTerm: string, params: EventScheduleQueryParams = {}) => {
  return useQuery({
    queryKey: ['search-event-sessions', searchTerm, params],
    queryFn: () => EventScheduleService.searchEventSessions(searchTerm, params),
    enabled: searchTerm.length >= 2, // Solo buscar si hay al menos 2 caracteres
    staleTime: 2 * 60 * 1000, // 2 minutos
    gcTime: 5 * 60 * 1000, // 5 minutos
    retry: 2,
  });
};

// Hook combinado para la página de schedule
export const useEventSchedulePage = (params: EventScheduleQueryParams = {}) => {
  const scheduleQuery = useEventSchedule(params);
  const liveSessionsQuery = useLiveEventSessions();
  
  // Procesar datos para agrupar por días
  const daySchedules = React.useMemo(() => {
    if (!scheduleQuery.data?.docs) return [];
    return eventScheduleUtils.groupSessionsByDay(scheduleQuery.data.docs);
  }, [scheduleQuery.data]);
  
  return {
    // Datos
    sessions: scheduleQuery.data?.docs || [],
    liveSessions: liveSessionsQuery.data || [],
    daySchedules,
    
    // Paginación
    pagination: scheduleQuery.data ? {
      page: scheduleQuery.data.page,
      totalPages: scheduleQuery.data.totalPages,
      totalDocs: scheduleQuery.data.totalDocs,
      hasNextPage: scheduleQuery.data.hasNextPage,
      hasPrevPage: scheduleQuery.data.hasPrevPage,
    } : null,
    
    // Estados
    isLoading: scheduleQuery.isLoading || liveSessionsQuery.isLoading,
    isError: scheduleQuery.isError || liveSessionsQuery.isError,
    error: scheduleQuery.error || liveSessionsQuery.error,
    
    // Funciones de refetch
    refetch: () => {
      scheduleQuery.refetch();
      liveSessionsQuery.refetch();
    },
    
    // Estados individuales para control granular
    scheduleState: {
      isLoading: scheduleQuery.isLoading,
      isError: scheduleQuery.isError,
      error: scheduleQuery.error,
    },
    liveState: {
      isLoading: liveSessionsQuery.isLoading,
      isError: liveSessionsQuery.isError,
      error: liveSessionsQuery.error,
    },
  };
};

// Hook para estadísticas del schedule
export const useEventScheduleStats = () => {
  const { data: scheduleData } = useEventSchedule({ limit: 1000 }); // Obtener todas las sesiones
  
  return React.useMemo(() => {
    if (!scheduleData?.docs) return null;
    
    const sessions = scheduleData.docs;
    
    return {
      totalSessions: sessions.length,
      totalDays: new Set(sessions.map(s => s.date)).size,
      sessionsByType: sessions.reduce((acc, session) => {
        acc[session.type] = (acc[session.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      sessionsByTrack: sessions.reduce((acc, session) => {
        acc[session.track] = (acc[session.track] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      sessionsByLevel: sessions.reduce((acc, session) => {
        acc[session.level] = (acc[session.level] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      liveSessions: sessions.filter(s => eventScheduleUtils.isSessionLive(s)).length,
      upcomingSessions: sessions.filter(s => eventScheduleUtils.isSessionUpcoming(s)).length,
    };
  }, [scheduleData]);
};

// Importar React para useMemo
import React from 'react';