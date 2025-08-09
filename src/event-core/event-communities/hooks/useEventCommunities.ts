import { useQuery, useInfiniteQuery, UseQueryResult, UseInfiniteQueryResult } from '@tanstack/react-query';
import { useState } from 'react';
import { 
  EventCommunitiesResponse, 
  EventCommunity, 
  EventCommunitiesQueryParams,
  FeaturedEventCommunity,
  CommunityType,
  CommunityCategory,
  EventCommunitiesStats,
  CommunityPartnership,
  EventCommunitiesPageData
} from '../types/event-community.types';
import { eventCommunitiesService } from '../services/event-communities.service';

// Query Keys
export const eventCommunitiesKeys = {
  all: ['event-communities'] as const,
  lists: () => [...eventCommunitiesKeys.all, 'list'] as const,
  list: (params: EventCommunitiesQueryParams) => [...eventCommunitiesKeys.lists(), params] as const,
  details: () => [...eventCommunitiesKeys.all, 'detail'] as const,
  detail: (id: string) => [...eventCommunitiesKeys.details(), id] as const,
  featured: () => [...eventCommunitiesKeys.all, 'featured'] as const,
  type: (type: CommunityType) => [...eventCommunitiesKeys.all, 'type', type] as const,
  category: (category: CommunityCategory) => [...eventCommunitiesKeys.all, 'category', category] as const,
  location: (location: string) => [...eventCommunitiesKeys.all, 'location', location] as const,
  search: (query: string) => [...eventCommunitiesKeys.all, 'search', query] as const,
  stats: () => [...eventCommunitiesKeys.all, 'stats'] as const,
  partnerships: () => [...eventCommunitiesKeys.all, 'partnerships'] as const,
};

/**
 * Hook para obtener comunidades con paginación
 */
export const useEventCommunities = (
  params: EventCommunitiesQueryParams = {}
): UseQueryResult<EventCommunitiesResponse, Error> => {
  return useQuery({
    queryKey: eventCommunitiesKeys.list(params),
    queryFn: () => eventCommunitiesService.getEventCommunities(params),
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  });
};

/**
 * Hook para scroll infinito de comunidades
 */
export const useInfiniteEventCommunities = (
  params: Omit<EventCommunitiesQueryParams, 'page'> = {}
): UseInfiniteQueryResult<EventCommunitiesResponse, Error> => {
  return useInfiniteQuery({
    queryKey: eventCommunitiesKeys.list(params),
    queryFn: ({ pageParam = 1 }) => 
      eventCommunitiesService.getEventCommunities({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => 
      lastPage.pagination.hasNext ? lastPage.pagination.page + 1 : undefined,
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

/**
 * Hook para obtener una comunidad específica
 */
export const useEventCommunity = (
  id: string
): UseQueryResult<EventCommunity, Error> => {
  return useQuery({
    queryKey: eventCommunitiesKeys.detail(id),
    queryFn: () => eventCommunitiesService.getEventCommunityById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
  });
};

/**
 * Hook para obtener comunidades destacadas
 */
export const useFeaturedEventCommunities = (): UseQueryResult<FeaturedEventCommunity[], Error> => {
  return useQuery({
    queryKey: eventCommunitiesKeys.featured(),
    queryFn: () => eventCommunitiesService.getFeaturedEventCommunities(),
    staleTime: 10 * 60 * 1000, // 10 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
  });
};

/**
 * Hook para obtener comunidades por tipo
 */
export const useEventCommunitiesByType = (
  type: CommunityType
): UseQueryResult<EventCommunity[], Error> => {
  return useQuery({
    queryKey: eventCommunitiesKeys.type(type),
    queryFn: () => eventCommunitiesService.getEventCommunitiesByType(type),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

/**
 * Hook para obtener comunidades por categoría
 */
export const useEventCommunitiesByCategory = (
  category: CommunityCategory
): UseQueryResult<EventCommunity[], Error> => {
  return useQuery({
    queryKey: eventCommunitiesKeys.category(category),
    queryFn: () => eventCommunitiesService.getEventCommunitiesByCategory(category),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

/**
 * Hook para obtener comunidades por ubicación
 */
export const useEventCommunitiesByLocation = (
  location: string
): UseQueryResult<EventCommunity[], Error> => {
  return useQuery({
    queryKey: eventCommunitiesKeys.location(location),
    queryFn: () => eventCommunitiesService.getEventCommunitiesByLocation(location),
    enabled: !!location,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

/**
 * Hook para buscar comunidades
 */
export const useSearchEventCommunities = (
  query: string,
  params: Omit<EventCommunitiesQueryParams, 'search'> = {},
  enabled: boolean = true
): UseQueryResult<EventCommunitiesResponse, Error> => {
  return useQuery({
    queryKey: eventCommunitiesKeys.search(query),
    queryFn: () => eventCommunitiesService.searchEventCommunities(query, params),
    enabled: enabled && query.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutos para búsquedas
    gcTime: 5 * 60 * 1000, // 5 minutos
  });
};

/**
 * Hook para obtener estadísticas de comunidades
 */
export const useEventCommunitiesStats = (): UseQueryResult<EventCommunitiesStats, Error> => {
  return useQuery({
    queryKey: eventCommunitiesKeys.stats(),
    queryFn: () => eventCommunitiesService.getEventCommunitiesStats(),
    staleTime: 15 * 60 * 1000, // 15 minutos
    gcTime: 60 * 60 * 1000, // 1 hora
  });
};

/**
 * Hook para obtener partnerships de comunidades
 */
export const useCommunityPartnerships = (): UseQueryResult<CommunityPartnership[], Error> => {
  return useQuery({
    queryKey: eventCommunitiesKeys.partnerships(),
    queryFn: () => eventCommunitiesService.getCommunityPartnerships(),
    staleTime: 30 * 60 * 1000, // 30 minutos
    gcTime: 2 * 60 * 60 * 1000, // 2 horas
  });
};

/**
 * Hook combinado para página de comunidades
 */
export const useEventCommunitiesPage = (
  params: EventCommunitiesQueryParams = {}
): EventCommunitiesPageData => {
  const {
    data: communitiesData,
    isLoading: communitiesLoading,
    isError: communitiesError
  } = useEventCommunities(params);
  
  const {
    data: featuredCommunities,
    isLoading: featuredLoading,
    isError: featuredError
  } = useFeaturedEventCommunities();
  
  const {
    data: stats,
    isLoading: statsLoading,
    isError: statsError
  } = useEventCommunitiesStats();
  
  const {
    data: partnerships,
    isLoading: partnershipsLoading,
    isError: partnershipsError
  } = useCommunityPartnerships();
  
  // Agrupar comunidades por tipo y ubicación
  const communitiesByType = communitiesData?.communities 
    ? eventCommunitiesService.groupCommunitiesByType(communitiesData.communities)
    : {} as Record<CommunityType, EventCommunity[]>;
    
  const communitiesByLocation = communitiesData?.communities 
    ? eventCommunitiesService.groupCommunitiesByLocation(communitiesData.communities)
    : {} as Record<string, EventCommunity[]>;
  
  return {
    communities: communitiesData?.communities || [],
    featuredCommunities: featuredCommunities || [],
    communitiesByType,
    communitiesByLocation,
    stats: stats || {
      totalCommunities: 0,
      communitiesByType: {} as Record<CommunityType, number>,
      communitiesByCategory: {} as Record<CommunityCategory, number>,
      communitiesByLocation: {} as Record<string, number>,
      totalMembers: 0,
      featuredCommunities: 0,
      activeCommunities: 0,
      averageMemberCount: 0
    },
    partnerships: partnerships || [],
    isLoading: communitiesLoading || featuredLoading || statsLoading || partnershipsLoading,
    isError: communitiesError || featuredError || statsError || partnershipsError,
    pagination: communitiesData?.pagination || {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
      hasNext: false,
      hasPrev: false
    }
  };
};

/**
 * Hook para manejar filtros de comunidades
 */
export const useEventCommunitiesFilters = () => {
  const [filters, setFilters] = useState<EventCommunitiesQueryParams>({
    limit: 12,
    page: 1,
    sort: 'memberCount'
  });
  
  const updateFilter = (key: keyof EventCommunitiesQueryParams, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: key !== 'page' ? 1 : value // Reset page when other filters change
    }));
  };
  
  const resetFilters = () => {
    setFilters({
      limit: 12,
      page: 1,
      sort: 'memberCount'
    });
  };
  
  const clearFilter = (key: keyof EventCommunitiesQueryParams) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return {
        ...newFilters,
        page: 1 // Reset page when clearing filters
      };
    });
  };
  
  return {
    filters,
    updateFilter,
    resetFilters,
    clearFilter,
    setFilters
  };
};

/**
 * Hook para obtener comunidades locales (por ubicación del usuario)
 */
export const useLocalEventCommunities = (
  userLocation?: string,
  params: Omit<EventCommunitiesQueryParams, 'location'> = {}
): UseQueryResult<EventCommunity[], Error> => {
  return useQuery({
    queryKey: eventCommunitiesKeys.location(userLocation || 'unknown'),
    queryFn: () => eventCommunitiesService.getEventCommunitiesByLocation(userLocation!),
    enabled: !!userLocation,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

/**
 * Hook para obtener comunidades recomendadas basadas en intereses
 */
export const useRecommendedEventCommunities = (
  userInterests: CommunityCategory[] = [],
  params: EventCommunitiesQueryParams = {}
): UseQueryResult<EventCommunitiesResponse, Error> => {
  // Si el usuario tiene intereses, filtrar por la primera categoría
  const category = userInterests.length > 0 ? userInterests[0] : undefined;
  
  return useQuery({
    queryKey: eventCommunitiesKeys.list({ ...params, category, featured: true }),
    queryFn: () => eventCommunitiesService.getEventCommunities({ 
      ...params, 
      category,
      featured: true,
      limit: params.limit || 6
    }),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

// Re-export service utilities
export { eventCommunitiesService } from '../services/event-communities.service';