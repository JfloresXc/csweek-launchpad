import { useQuery, useInfiniteQuery, UseQueryResult, UseInfiniteQueryResult } from '@tanstack/react-query';
import { 
  EventSponsorsResponse, 
  EventSponsor, 
  EventSponsorsQueryParams,
  FeaturedEventSponsor,
  SponsorTier,
  SponsorCategory,
  EventSponsorsStats,
  SponsorshipPackage,
  EventSponsorsPageData
} from '../types/event-sponsor.types';
import { eventSponsorsService } from '../services/event-sponsors.service';

// Query Keys
export const eventSponsorsKeys = {
  all: ['event-sponsors'] as const,
  lists: () => [...eventSponsorsKeys.all, 'list'] as const,
  list: (params: EventSponsorsQueryParams) => [...eventSponsorsKeys.lists(), params] as const,
  details: () => [...eventSponsorsKeys.all, 'detail'] as const,
  detail: (id: string) => [...eventSponsorsKeys.details(), id] as const,
  featured: () => [...eventSponsorsKeys.all, 'featured'] as const,
  tier: (tier: SponsorTier) => [...eventSponsorsKeys.all, 'tier', tier] as const,
  category: (category: SponsorCategory) => [...eventSponsorsKeys.all, 'category', category] as const,
  search: (query: string) => [...eventSponsorsKeys.all, 'search', query] as const,
  stats: () => [...eventSponsorsKeys.all, 'stats'] as const,
  packages: () => [...eventSponsorsKeys.all, 'packages'] as const,
};

/**
 * Hook para obtener sponsors con paginación
 */
export const useEventSponsors = (
  params: EventSponsorsQueryParams = {}
): UseQueryResult<EventSponsorsResponse, Error> => {
  return useQuery({
    queryKey: eventSponsorsKeys.list(params),
    queryFn: () => eventSponsorsService.getEventSponsors(params),
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  });
};

/**
 * Hook para scroll infinito de sponsors
 */
export const useInfiniteEventSponsors = (
  params: Omit<EventSponsorsQueryParams, 'page'> = {}
): UseInfiniteQueryResult<EventSponsorsResponse, Error> => {
  return useInfiniteQuery({
    queryKey: eventSponsorsKeys.list(params),
    queryFn: ({ pageParam = 1 }) => 
      eventSponsorsService.getEventSponsors({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => 
      lastPage.pagination.hasNext ? lastPage.pagination.page + 1 : undefined,
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

/**
 * Hook para obtener un sponsor específico
 */
export const useEventSponsor = (
  id: string
): UseQueryResult<EventSponsor, Error> => {
  return useQuery({
    queryKey: eventSponsorsKeys.detail(id),
    queryFn: () => eventSponsorsService.getEventSponsorById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
  });
};

/**
 * Hook para obtener sponsors destacados
 */
export const useFeaturedEventSponsors = (): UseQueryResult<FeaturedEventSponsor[], Error> => {
  return useQuery({
    queryKey: eventSponsorsKeys.featured(),
    queryFn: () => eventSponsorsService.getFeaturedEventSponsors(),
    staleTime: 10 * 60 * 1000, // 10 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
  });
};

/**
 * Hook para obtener sponsors por tier
 */
export const useEventSponsorsByTier = (
  tier: SponsorTier
): UseQueryResult<EventSponsor[], Error> => {
  return useQuery({
    queryKey: eventSponsorsKeys.tier(tier),
    queryFn: () => eventSponsorsService.getEventSponsorsByTier(tier),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

/**
 * Hook para obtener sponsors por categoría
 */
export const useEventSponsorsByCategory = (
  category: SponsorCategory
): UseQueryResult<EventSponsor[], Error> => {
  return useQuery({
    queryKey: eventSponsorsKeys.category(category),
    queryFn: () => eventSponsorsService.getEventSponsorsByCategory(category),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

/**
 * Hook para buscar sponsors
 */
export const useSearchEventSponsors = (
  query: string,
  params: Omit<EventSponsorsQueryParams, 'search'> = {},
  enabled: boolean = true
): UseQueryResult<EventSponsorsResponse, Error> => {
  return useQuery({
    queryKey: eventSponsorsKeys.search(query),
    queryFn: () => eventSponsorsService.searchEventSponsors(query, params),
    enabled: enabled && query.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutos para búsquedas
    gcTime: 5 * 60 * 1000, // 5 minutos
  });
};

/**
 * Hook para obtener estadísticas de sponsors
 */
export const useEventSponsorsStats = (): UseQueryResult<EventSponsorsStats, Error> => {
  return useQuery({
    queryKey: eventSponsorsKeys.stats(),
    queryFn: () => eventSponsorsService.getEventSponsorsStats(),
    staleTime: 15 * 60 * 1000, // 15 minutos
    gcTime: 60 * 60 * 1000, // 1 hora
  });
};

/**
 * Hook para obtener paquetes de sponsorship
 */
export const useSponsorshipPackages = (): UseQueryResult<SponsorshipPackage[], Error> => {
  return useQuery({
    queryKey: eventSponsorsKeys.packages(),
    queryFn: () => eventSponsorsService.getSponsorshipPackages(),
    staleTime: 30 * 60 * 1000, // 30 minutos
    gcTime: 2 * 60 * 60 * 1000, // 2 horas
  });
};

/**
 * Hook combinado para página de sponsors
 */
export const useEventSponsorsPage = (
  params: EventSponsorsQueryParams = {}
): EventSponsorsPageData => {
  const {
    data: sponsorsData,
    isLoading: sponsorsLoading,
    isError: sponsorsError
  } = useEventSponsors(params);
  
  const {
    data: featuredSponsors,
    isLoading: featuredLoading,
    isError: featuredError
  } = useFeaturedEventSponsors();
  
  const {
    data: stats,
    isLoading: statsLoading,
    isError: statsError
  } = useEventSponsorsStats();
  
  const {
    data: packages,
    isLoading: packagesLoading,
    isError: packagesError
  } = useSponsorshipPackages();
  
  // Agrupar sponsors por tier
  const sponsorsByTier = sponsorsData?.sponsors 
    ? eventSponsorsService.groupSponsorsByTier(sponsorsData.sponsors)
    : {} as Record<SponsorTier, EventSponsor[]>;
  
  return {
    sponsors: sponsorsData?.sponsors || [],
    featuredSponsors: featuredSponsors || [],
    sponsorsByTier,
    stats: stats || {
      totalSponsors: 0,
      sponsorsByTier: {} as Record<SponsorTier, number>,
      sponsorsByCategory: {} as Record<SponsorCategory, number>,
      totalSponsorshipValue: 0,
      featuredSponsors: 0,
      activeSponsors: 0
    },
    packages: packages || [],
    isLoading: sponsorsLoading || featuredLoading || statsLoading || packagesLoading,
    isError: sponsorsError || featuredError || statsError || packagesError,
    pagination: sponsorsData?.pagination || {
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
 * Hook para manejar filtros de sponsors
 */
export const useEventSponsorsFilters = () => {
  const [filters, setFilters] = useState<EventSponsorsQueryParams>({
    limit: 12,
    page: 1,
    sort: 'tier'
  });
  
  const updateFilter = (key: keyof EventSponsorsQueryParams, value: any) => {
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
      sort: 'tier'
    });
  };
  
  const clearFilter = (key: keyof EventSponsorsQueryParams) => {
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

// Re-export service utilities
export { eventSponsorsService } from '../services/event-sponsors.service';

// Import useState
import { useState } from 'react';