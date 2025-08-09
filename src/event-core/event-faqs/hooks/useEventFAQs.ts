import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import { eventFAQsService, eventFAQsUtils } from '../services/event-faqs.service';
import {
  EventFAQsResponse,
  EventFAQ,
  EventFAQQueryParams,
  EventFAQStats,
  EventFAQPageData,
  FAQSearchResult,
  FAQFeedbackData,
  FAQFeedbackResponse,
  FAQSuggestion,
  FAQSuggestionResponse,
  FAQCategory,
  FAQFilters
} from '../types/event-faq.types';

// Query Keys
export const faqQueryKeys = {
  all: ['event-faqs'] as const,
  lists: () => [...faqQueryKeys.all, 'list'] as const,
  list: (params: EventFAQQueryParams) => [...faqQueryKeys.lists(), params] as const,
  details: () => [...faqQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...faqQueryKeys.details(), id] as const,
  featured: () => [...faqQueryKeys.all, 'featured'] as const,
  category: (category: FAQCategory) => [...faqQueryKeys.all, 'category', category] as const,
  search: (query: string) => [...faqQueryKeys.all, 'search', query] as const,
  stats: () => [...faqQueryKeys.all, 'stats'] as const,
  pageData: () => [...faqQueryKeys.all, 'page-data'] as const,
  popular: () => [...faqQueryKeys.all, 'popular'] as const,
  recent: () => [...faqQueryKeys.all, 'recent'] as const,
  related: (id: string) => [...faqQueryKeys.all, 'related', id] as const,
  suggestions: (query: string) => [...faqQueryKeys.all, 'suggestions', query] as const
};

/**
 * Hook para obtener FAQs del evento con paginación
 */
export const useEventFAQs = (params: EventFAQQueryParams = {}) => {
  return useQuery({
    queryKey: faqQueryKeys.list(params),
    queryFn: () => eventFAQsService.getEventFAQs(params),
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  });
};

/**
 * Hook para obtener una FAQ específica por ID
 */
export const useFAQDetails = (faqId: string) => {
  return useQuery({
    queryKey: faqQueryKeys.detail(faqId),
    queryFn: () => eventFAQsService.getFAQById(faqId),
    enabled: !!faqId,
    staleTime: 10 * 60 * 1000, // 10 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
  });
};

/**
 * Hook para obtener FAQs destacadas
 */
export const useFeaturedFAQs = () => {
  return useQuery({
    queryKey: faqQueryKeys.featured(),
    queryFn: () => eventFAQsService.getFeaturedFAQs(),
    staleTime: 10 * 60 * 1000, // 10 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
  });
};

/**
 * Hook para obtener FAQs por categoría
 */
export const useFAQsByCategory = (category: FAQCategory) => {
  return useQuery({
    queryKey: faqQueryKeys.category(category),
    queryFn: () => eventFAQsService.getFAQsByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 15 * 60 * 1000, // 15 minutos
  });
};

/**
 * Hook para buscar FAQs
 */
export const useFAQSearch = (query: string, params: Partial<EventFAQQueryParams> = {}) => {
  return useQuery({
    queryKey: faqQueryKeys.search(query),
    queryFn: () => eventFAQsService.searchFAQs(query, params),
    enabled: !!query && query.length >= 2,
    staleTime: 2 * 60 * 1000, // 2 minutos
    gcTime: 5 * 60 * 1000, // 5 minutos
  });
};

/**
 * Hook para obtener estadísticas de FAQs
 */
export const useFAQStats = () => {
  return useQuery({
    queryKey: faqQueryKeys.stats(),
    queryFn: () => eventFAQsService.getFAQStats(),
    staleTime: 15 * 60 * 1000, // 15 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
  });
};

/**
 * Hook para obtener FAQs relacionadas
 */
export const useRelatedFAQs = (faqId: string) => {
  return useQuery({
    queryKey: faqQueryKeys.related(faqId),
    queryFn: () => eventFAQsService.getRelatedFAQs(faqId),
    enabled: !!faqId,
    staleTime: 10 * 60 * 1000, // 10 minutos
    gcTime: 20 * 60 * 1000, // 20 minutos
  });
};

/**
 * Hook para enviar feedback sobre una FAQ
 */
export const useFAQFeedback = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (feedbackData: FAQFeedbackData) => 
      eventFAQsService.submitFAQFeedback(feedbackData),
    onSuccess: (data, variables) => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: faqQueryKeys.detail(variables.faqId) });
      queryClient.invalidateQueries({ queryKey: faqQueryKeys.stats() });
    },
  });
};

/**
 * Hook para sugerir una nueva FAQ
 */
export const useFAQSuggestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (suggestion: FAQSuggestion) => 
      eventFAQsService.suggestFAQ(suggestion),
    onSuccess: () => {
      // Invalidar estadísticas para reflejar nueva sugerencia
      queryClient.invalidateQueries({ queryKey: faqQueryKeys.stats() });
    },
  });
};

/**
 * Hook para obtener datos completos de la página de FAQs
 */
export const useFAQPageData = () => {
  return useQuery({
    queryKey: faqQueryKeys.pageData(),
    queryFn: () => eventFAQsService.getFAQPageData(),
    staleTime: 10 * 60 * 1000, // 10 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
  });
};

/**
 * Hook para obtener sugerencias de búsqueda
 */
export const useSearchSuggestions = (query: string) => {
  return useQuery({
    queryKey: faqQueryKeys.suggestions(query),
    queryFn: () => eventFAQsService.getSearchSuggestions(query),
    enabled: !!query && query.length >= 2,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  });
};

/**
 * Hook para obtener FAQs populares
 */
export const usePopularFAQs = (limit: number = 5) => {
  return useQuery({
    queryKey: faqQueryKeys.popular(),
    queryFn: () => eventFAQsService.getPopularFAQs(limit),
    staleTime: 15 * 60 * 1000, // 15 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
  });
};

/**
 * Hook para obtener FAQs actualizadas recientemente
 */
export const useRecentlyUpdatedFAQs = (limit: number = 5) => {
  return useQuery({
    queryKey: faqQueryKeys.recent(),
    queryFn: () => eventFAQsService.getRecentlyUpdatedFAQs(limit),
    staleTime: 10 * 60 * 1000, // 10 minutos
    gcTime: 20 * 60 * 1000, // 20 minutos
  });
};

/**
 * Hook combinado para la página principal de FAQs
 * Obtiene múltiples conjuntos de datos necesarios para la página
 */
export const useFAQsPage = () => {
  const featuredFAQs = useFeaturedFAQs();
  const popularFAQs = usePopularFAQs();
  const recentFAQs = useRecentlyUpdatedFAQs();
  const stats = useFAQStats();

  return {
    featuredFAQs,
    popularFAQs,
    recentFAQs,
    stats,
    isLoading: featuredFAQs.isLoading || popularFAQs.isLoading || recentFAQs.isLoading || stats.isLoading,
    isError: featuredFAQs.isError || popularFAQs.isError || recentFAQs.isError || stats.isError,
    error: featuredFAQs.error || popularFAQs.error || recentFAQs.error || stats.error
  };
};

/**
 * Hook para manejar el estado de búsqueda de FAQs
 */
export const useFAQSearchState = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState<FAQFilters>({
    categories: [],
    sortBy: 'relevance',
    showFeaturedOnly: false
  });
  const [isSearching, setIsSearching] = useState(false);

  // Búsqueda con debounce
  const searchResults = useFAQSearch(searchQuery, {
    categories: searchFilters.categories,
    sort: searchFilters.sortBy,
    featured: searchFilters.showFeaturedOnly
  });

  // Sugerencias de búsqueda
  const suggestions = useSearchSuggestions(searchQuery);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(!!query);
  };

  const handleFilterChange = (filters: Partial<FAQFilters>) => {
    setSearchFilters(prev => ({ ...prev, ...filters }));
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    setSearchFilters({
      categories: [],
      sortBy: 'relevance',
      showFeaturedOnly: false
    });
  };

  return {
    searchQuery,
    searchFilters,
    isSearching,
    searchResults: searchResults.data,
    suggestions: suggestions.data || [],
    isLoadingSearch: searchResults.isLoading,
    isLoadingSuggestions: suggestions.isLoading,
    searchError: searchResults.error,
    handleSearch,
    handleFilterChange,
    clearSearch
  };
};

/**
 * Hook para manejar filtros de FAQs
 */
export const useFAQFilters = () => {
  const [filters, setFilters] = useState<FAQFilters>({
    categories: [],
    sortBy: 'priority',
    showFeaturedOnly: false
  });

  const updateFilter = (key: keyof FAQFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleCategory = (category: FAQCategory) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      sortBy: 'priority',
      showFeaturedOnly: false
    });
  };

  const hasActiveFilters = useMemo(() => {
    return filters.categories.length > 0 || 
           filters.showFeaturedOnly || 
           filters.sortBy !== 'priority';
  }, [filters]);

  return {
    filters,
    updateFilter,
    toggleCategory,
    clearFilters,
    hasActiveFilters
  };
};

/**
 * Hook para manejar FAQs agrupadas por categoría
 */
export const useFAQsByCategories = (params: EventFAQQueryParams = {}) => {
  const { data: faqsResponse, ...queryResult } = useEventFAQs(params);

  const groupedFAQs = useMemo(() => {
    if (!faqsResponse?.docs) return {};
    return eventFAQsUtils.groupFAQsByCategory(faqsResponse.docs);
  }, [faqsResponse?.docs]);

  const categoriesWithCounts = useMemo(() => {
    const categories: FAQCategory[] = [
      'general', 'registration', 'schedule', 'location', 'speakers',
      'networking', 'technical', 'accommodation', 'food', 'certificates',
      'sponsors', 'accessibility', 'covid', 'contact'
    ];

    return categories.map(category => ({
      ...eventFAQsUtils.getCategoryInfo(category),
      count: groupedFAQs[category]?.length || 0
    })).filter(cat => cat.count > 0);
  }, [groupedFAQs]);

  return {
    ...queryResult,
    groupedFAQs,
    categoriesWithCounts,
    totalFAQs: faqsResponse?.totalDocs || 0
  };
};

/**
 * Hook para manejar el estado de feedback de FAQs
 */
export const useFAQFeedbackState = () => {
  const [feedbackStates, setFeedbackStates] = useState<Record<string, {
    hasVoted: boolean;
    voteType: 'helpful' | 'not-helpful' | null;
  }>>({});

  const feedbackMutation = useFAQFeedback();

  const submitFeedback = async (faqId: string, isHelpful: boolean, comment?: string) => {
    try {
      await feedbackMutation.mutateAsync({
        faqId,
        isHelpful,
        comment
      });

      // Actualizar estado local
      setFeedbackStates(prev => ({
        ...prev,
        [faqId]: {
          hasVoted: true,
          voteType: isHelpful ? 'helpful' : 'not-helpful'
        }
      }));

      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const getFeedbackState = (faqId: string) => {
    return feedbackStates[faqId] || {
      hasVoted: false,
      voteType: null
    };
  };

  return {
    submitFeedback,
    getFeedbackState,
    isSubmitting: feedbackMutation.isPending
  };
};

/**
 * Hook para manejar sugerencias de FAQs
 */
export const useFAQSuggestionState = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const suggestionMutation = useFAQSuggestion();

  const submitSuggestion = async (suggestion: Omit<FAQSuggestion, 'id' | 'createdAt'>) => {
    try {
      const result = await suggestionMutation.mutateAsync({
        ...suggestion,
        id: '', // Se generará en el servidor
        createdAt: new Date().toISOString()
      });

      setIsModalOpen(false);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error };
    }
  };

  return {
    isModalOpen,
    setIsModalOpen,
    submitSuggestion,
    isSubmitting: suggestionMutation.isPending,
    error: suggestionMutation.error
  };
};

/**
 * Hook para obtener FAQs con funcionalidades avanzadas
 */
export const useAdvancedFAQs = (initialParams: EventFAQQueryParams = {}) => {
  const [params, setParams] = useState<EventFAQQueryParams>(initialParams);
  const { filters, updateFilter, toggleCategory, clearFilters, hasActiveFilters } = useFAQFilters();
  const { searchQuery, handleSearch, clearSearch, isSearching } = useFAQSearchState();

  // Combinar parámetros con filtros
  const combinedParams = useMemo(() => ({
    ...params,
    categories: filters.categories.length > 0 ? filters.categories : undefined,
    sort: filters.sortBy,
    featured: filters.showFeaturedOnly || undefined
  }), [params, filters]);

  const faqsQuery = useEventFAQs(combinedParams);
  const searchQuery_results = useFAQSearch(searchQuery, combinedParams);

  // Determinar qué datos mostrar
  const activeData = isSearching ? searchQuery_results.data : faqsQuery.data;
  const isLoading = isSearching ? searchQuery_results.isLoading : faqsQuery.isLoading;
  const error = isSearching ? searchQuery_results.error : faqsQuery.error;

  const updateParams = (newParams: Partial<EventFAQQueryParams>) => {
    setParams(prev => ({ ...prev, ...newParams }));
  };

  const resetAll = () => {
    setParams(initialParams);
    clearFilters();
    clearSearch();
  };

  return {
    // Datos
    faqs: activeData?.docs || [],
    totalFAQs: activeData?.totalDocs || 0,
    pagination: {
      page: activeData?.page || 1,
      totalPages: activeData?.totalPages || 1,
      hasNextPage: activeData?.hasNextPage || false,
      hasPrevPage: activeData?.hasPrevPage || false
    },
    
    // Estados
    isLoading,
    error,
    isSearching,
    hasActiveFilters,
    
    // Filtros y búsqueda
    filters,
    searchQuery,
    updateFilter,
    toggleCategory,
    clearFilters,
    handleSearch,
    clearSearch,
    
    // Parámetros
    params,
    updateParams,
    resetAll
  };
};