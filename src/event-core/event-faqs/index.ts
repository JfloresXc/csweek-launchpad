/**
 * Módulo Event FAQs - CS WEEK 2025
 * 
 * Este módulo maneja todas las funcionalidades relacionadas con las preguntas frecuentes del evento,
 * incluyendo componentes para mostrar, buscar, filtrar y gestionar FAQs.
 * 
 * Características principales:
 * - Componentes para mostrar FAQs individuales y listas
 * - Búsqueda avanzada con autocompletado y sugerencias
 * - Acordeón organizado por categorías
 * - Sistema de feedback y valoraciones
 * - Filtrado por categorías y características
 * - Integración con APIs para datos dinámicos
 */

// Componentes
export {
  EventFAQCard,
  EventFAQList,
  EventFAQAccordion,
  EventFAQSearch
} from './components';

// Hooks
export {
  useEventFAQs,
  useEventFAQById,
  useFeaturedFAQs,
  useFAQsByCategory,
  useSearchFAQs,
  useFAQStats,
  useRelatedFAQs,
  useFAQFeedback,
  useFAQSuggestion,
  useFAQPage,
  useFAQSearchSuggestions,
  usePopularFAQs,
  useRecentFAQs,
  useFAQsPage,
  useFAQSearchState,
  useFAQFiltersState,
  useFAQFeedbackState,
  useFAQSuggestionState,
  useAdvancedFAQs,
  useAdvancedFAQSearch,
  useFAQsByCategories
} from './hooks/useEventFAQs';

// Servicios
export {
  EventFAQsService,
  eventFAQsUtils
} from './services/event-faqs.service';

// Tipos
export type {
  EventFAQsResponse,
  EventFAQ,
  FAQCategory,
  EventFAQQueryParams,
  EventFAQStats,
  EventFAQPageData,
  FAQSearchResult,
  FAQFeedbackResponse,
  FAQFeedbackData,
  FAQSuggestion,
  FAQSuggestionResponse,
  FAQFilters,
  FAQCategoryInfo,
  EventFAQUtils,
  EventFAQCardProps,
  EventFAQListProps,
  EventFAQSearchProps,
  EventFAQAccordionProps,
  FAQSortOption,
  FAQViewMode
} from './types/event-faq.types';