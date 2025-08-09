/**
 * Tipos de datos para el módulo de Event FAQs
 * Maneja preguntas frecuentes del evento CS WEEK 2025
 */

// Respuesta de la API para FAQs
export interface EventFAQsResponse {
  docs: EventFAQ[];
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

// FAQ individual del evento
export interface EventFAQ {
  id: string;
  event: string;                    // ID del evento
  question: string;
  answer: string;
  category: FAQCategory;
  tags: string[];
  priority: number;                 // Orden de importancia (1 = más importante)
  featured: boolean;                // Si aparece en sección destacada
  helpful: number;                  // Contador de "útil"
  notHelpful: number;              // Contador de "no útil"
  relatedFAQs: string[];           // IDs de FAQs relacionadas
  lastUpdated: string;             // Fecha de última actualización
  isActive: boolean;               // Si está activa
  createdAt: string;               // Fecha de creación
  updatedAt: string;               // Fecha de actualización
}

// Categorías de FAQs
export type FAQCategory = 
  | 'general'           // Información general del evento
  | 'registration'      // Registro y tickets
  | 'schedule'          // Agenda y horarios
  | 'location'          // Ubicación y venue
  | 'speakers'          // Speakers y charlas
  | 'networking'        // Networking y actividades
  | 'technical'         // Aspectos técnicos
  | 'accommodation'     // Alojamiento y viaje
  | 'food'              // Comida y catering
  | 'certificates'      // Certificados y reconocimientos
  | 'sponsors'          // Patrocinadores
  | 'accessibility'     // Accesibilidad
  | 'covid'             // Medidas sanitarias
  | 'contact';          // Contacto y soporte

// Parámetros de consulta para FAQs
export interface EventFAQQueryParams {
  limit?: number;                   // Límite de resultados (por defecto: 10)
  page?: number;                    // Número de página (por defecto: 1)
  sort?: string;                    // Ordenamiento (priority, -priority, question, -question)
  category?: FAQCategory;           // Filtrar por categoría
  featured?: boolean;               // Solo FAQs destacadas
  search?: string;                  // Búsqueda en pregunta y respuesta
  tags?: string[];                  // Filtrar por tags
}

// Estadísticas de FAQs
export interface EventFAQStats {
  totalFAQs: number;
  faqsByCategory: Record<FAQCategory, number>;
  mostHelpfulFAQs: EventFAQ[];
  recentlyUpdated: EventFAQ[];
  searchTrends: {
    query: string;
    count: number;
  }[];
  categoryPopularity: {
    category: FAQCategory;
    views: number;
    helpfulVotes: number;
  }[];
}

// Datos para la página de FAQs
export interface EventFAQPageData {
  featuredFAQs: EventFAQ[];
  faqsByCategory: Record<FAQCategory, EventFAQ[]>;
  stats: EventFAQStats;
  categories: {
    category: FAQCategory;
    name: string;
    description: string;
    icon: string;
    count: number;
  }[];
}

// Resultado de búsqueda de FAQs
export interface FAQSearchResult {
  faqs: EventFAQ[];
  totalResults: number;
  searchQuery: string;
  suggestions: string[];
  categories: FAQCategory[];
  relatedQuestions: string[];
}

// Respuesta de feedback de FAQ
export interface FAQFeedbackResponse {
  success: boolean;
  message: string;
  faqId: string;
  newHelpfulCount: number;
  newNotHelpfulCount: number;
}

// Datos para enviar feedback
export interface FAQFeedbackData {
  faqId: string;
  helpful: boolean;
  comment?: string;
  userAgent?: string;
}

// Sugerencia de nueva FAQ
export interface FAQSuggestion {
  question: string;
  category: FAQCategory;
  userEmail?: string;
  context?: string;
}

// Respuesta de sugerencia de FAQ
export interface FAQSuggestionResponse {
  success: boolean;
  message: string;
  suggestionId: string;
}

// Estado de filtros de FAQs
export interface FAQFilters {
  category: FAQCategory | 'all';
  searchQuery: string;
  featured: boolean;
  sortBy: 'priority' | 'helpful' | 'recent' | 'alphabetical';
  tags: string[];
}

// Información de categoría de FAQ
export interface FAQCategoryInfo {
  category: FAQCategory;
  name: string;
  description: string;
  icon: string;
  color: string;
  count: number;
  featured: boolean;
}

// Utilidades para FAQs
export interface EventFAQUtils {
  // Formateo
  formatCategory: (category: FAQCategory) => string;
  formatLastUpdated: (date: string) => string;
  formatHelpfulCount: (helpful: number, notHelpful: number) => string;
  
  // Validaciones
  isValidCategory: (category: string) => category is FAQCategory;
  isRecentlyUpdated: (date: string) => boolean;
  
  // Búsqueda y filtrado
  searchFAQs: (faqs: EventFAQ[], query: string) => EventFAQ[];
  filterByCategory: (faqs: EventFAQ[], category: FAQCategory) => EventFAQ[];
  sortFAQs: (faqs: EventFAQ[], sortBy: string) => EventFAQ[];
  
  // Información de categorías
  getCategoryInfo: (category: FAQCategory) => FAQCategoryInfo;
  getCategoryColor: (category: FAQCategory) => string;
  getCategoryIcon: (category: FAQCategory) => string;
  
  // Análisis
  getPopularFAQs: (faqs: EventFAQ[]) => EventFAQ[];
  getRelatedFAQs: (faq: EventFAQ, allFAQs: EventFAQ[]) => EventFAQ[];
  calculateHelpfulnessRatio: (helpful: number, notHelpful: number) => number;
  
  // Agrupación
  groupFAQsByCategory: (faqs: EventFAQ[]) => Record<FAQCategory, EventFAQ[]>;
  getFeaturedFAQs: (faqs: EventFAQ[]) => EventFAQ[];
  
  // Sugerencias
  generateSearchSuggestions: (query: string, faqs: EventFAQ[]) => string[];
  findSimilarQuestions: (question: string, faqs: EventFAQ[]) => EventFAQ[];
}

// Props para componentes de FAQ
export interface EventFAQCardProps {
  faq: EventFAQ;
  variant?: 'default' | 'compact' | 'detailed';
  showCategory?: boolean;
  showFeedback?: boolean;
  showRelated?: boolean;
  onFeedback?: (faqId: string, helpful: boolean) => void;
  className?: string;
}

export interface EventFAQListProps {
  faqs: EventFAQ[];
  variant?: 'grid' | 'list' | 'accordion';
  showCategories?: boolean;
  showSearch?: boolean;
  showFilters?: boolean;
  onFAQClick?: (faq: EventFAQ) => void;
  className?: string;
}

export interface EventFAQSearchProps {
  onSearch: (query: string) => void;
  onCategoryFilter: (category: FAQCategory | 'all') => void;
  placeholder?: string;
  showFilters?: boolean;
  initialQuery?: string;
  className?: string;
}

export interface EventFAQAccordionProps {
  faqs: EventFAQ[];
  allowMultiple?: boolean;
  showCategory?: boolean;
  showFeedback?: boolean;
  defaultOpen?: string[];  // IDs de FAQs abiertas por defecto
  onFeedback?: (faqId: string, helpful: boolean) => void;
  className?: string;
}