import axios from 'axios';
import {
  EventFAQsResponse,
  EventFAQ,
  EventFAQQueryParams,
  EventFAQStats,
  EventFAQPageData,
  FAQSearchResult,
  FAQFeedbackResponse,
  FAQFeedbackData,
  FAQSuggestion,
  FAQSuggestionResponse,
  FAQCategory,
  FAQCategoryInfo,
  EventFAQUtils
} from '../types/event-faq.types';

/**
 * Servicio para manejar las operaciones de Event FAQs
 * Proporciona métodos para obtener, buscar y gestionar FAQs del evento
 */
class EventFAQsService {
  private readonly baseURL = '/api/event/faqs';

  /**
   * Obtener todas las FAQs del evento con paginación
   */
  async getEventFAQs(params: EventFAQQueryParams = {}): Promise<EventFAQsResponse> {
    const response = await axios.get<EventFAQsResponse>(this.baseURL, { params });
    return response.data;
  }

  /**
   * Obtener una FAQ específica por ID
   */
  async getFAQById(faqId: string): Promise<EventFAQ> {
    const response = await axios.get<EventFAQ>(`${this.baseURL}/${faqId}`);
    return response.data;
  }

  /**
   * Obtener FAQs destacadas
   */
  async getFeaturedFAQs(): Promise<EventFAQ[]> {
    const response = await axios.get<EventFAQ[]>(`${this.baseURL}/featured`);
    return response.data;
  }

  /**
   * Obtener FAQs por categoría
   */
  async getFAQsByCategory(category: FAQCategory): Promise<EventFAQ[]> {
    const response = await axios.get<EventFAQ[]>(`${this.baseURL}/category/${category}`);
    return response.data;
  }

  /**
   * Buscar FAQs
   */
  async searchFAQs(query: string, params: Partial<EventFAQQueryParams> = {}): Promise<FAQSearchResult> {
    const searchParams = { ...params, search: query };
    const response = await axios.get<FAQSearchResult>(`${this.baseURL}/search`, { params: searchParams });
    return response.data;
  }

  /**
   * Obtener estadísticas de FAQs
   */
  async getFAQStats(): Promise<EventFAQStats> {
    const response = await axios.get<EventFAQStats>(`${this.baseURL}/stats`);
    return response.data;
  }

  /**
   * Obtener FAQs relacionadas
   */
  async getRelatedFAQs(faqId: string): Promise<EventFAQ[]> {
    const response = await axios.get<EventFAQ[]>(`${this.baseURL}/${faqId}/related`);
    return response.data;
  }

  /**
   * Enviar feedback sobre una FAQ
   */
  async submitFAQFeedback(feedbackData: FAQFeedbackData): Promise<FAQFeedbackResponse> {
    const response = await axios.post<FAQFeedbackResponse>(`${this.baseURL}/feedback`, feedbackData);
    return response.data;
  }

  /**
   * Sugerir una nueva FAQ
   */
  async suggestFAQ(suggestion: FAQSuggestion): Promise<FAQSuggestionResponse> {
    const response = await axios.post<FAQSuggestionResponse>(`${this.baseURL}/suggest`, suggestion);
    return response.data;
  }

  /**
   * Obtener datos completos para la página de FAQs
   */
  async getFAQPageData(): Promise<EventFAQPageData> {
    const response = await axios.get<EventFAQPageData>(`${this.baseURL}/page-data`);
    return response.data;
  }

  /**
   * Obtener sugerencias de búsqueda
   */
  async getSearchSuggestions(query: string): Promise<string[]> {
    const response = await axios.get<string[]>(`${this.baseURL}/search/suggestions`, {
      params: { q: query }
    });
    return response.data;
  }

  /**
   * Obtener FAQs populares
   */
  async getPopularFAQs(limit: number = 5): Promise<EventFAQ[]> {
    const response = await axios.get<EventFAQ[]>(`${this.baseURL}/popular`, {
      params: { limit }
    });
    return response.data;
  }

  /**
   * Obtener FAQs actualizadas recientemente
   */
  async getRecentlyUpdatedFAQs(limit: number = 5): Promise<EventFAQ[]> {
    const response = await axios.get<EventFAQ[]>(`${this.baseURL}/recent`, {
      params: { limit }
    });
    return response.data;
  }
}

// Instancia del servicio
export const eventFAQsService = new EventFAQsService();

/**
 * Utilidades para Event FAQs
 */
export const eventFAQsUtils: EventFAQUtils = {
  // Formateo
  formatCategory: (category: FAQCategory): string => {
    const categoryNames: Record<FAQCategory, string> = {
      general: 'General',
      registration: 'Registro',
      schedule: 'Agenda',
      location: 'Ubicación',
      speakers: 'Speakers',
      networking: 'Networking',
      technical: 'Técnico',
      accommodation: 'Alojamiento',
      food: 'Comida',
      certificates: 'Certificados',
      sponsors: 'Patrocinadores',
      accessibility: 'Accesibilidad',
      covid: 'Medidas Sanitarias',
      contact: 'Contacto'
    };
    return categoryNames[category] || category;
  },

  formatLastUpdated: (date: string): string => {
    const now = new Date();
    const updatedDate = new Date(date);
    const diffInHours = Math.floor((now.getTime() - updatedDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Hace menos de una hora';
    } else if (diffInHours < 24) {
      return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    } else if (diffInHours < 168) { // 7 días
      const days = Math.floor(diffInHours / 24);
      return `Hace ${days} día${days > 1 ? 's' : ''}`;
    } else {
      return updatedDate.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  },

  formatHelpfulCount: (helpful: number, notHelpful: number): string => {
    const total = helpful + notHelpful;
    if (total === 0) return 'Sin valoraciones';
    
    const percentage = Math.round((helpful / total) * 100);
    return `${percentage}% útil (${helpful}/${total})`;
  },

  // Validaciones
  isValidCategory: (category: string): category is FAQCategory => {
    const validCategories: FAQCategory[] = [
      'general', 'registration', 'schedule', 'location', 'speakers',
      'networking', 'technical', 'accommodation', 'food', 'certificates',
      'sponsors', 'accessibility', 'covid', 'contact'
    ];
    return validCategories.includes(category as FAQCategory);
  },

  isRecentlyUpdated: (date: string): boolean => {
    const now = new Date();
    const updatedDate = new Date(date);
    const diffInDays = Math.floor((now.getTime() - updatedDate.getTime()) / (1000 * 60 * 60 * 24));
    return diffInDays <= 7; // Consideramos reciente si fue actualizado en los últimos 7 días
  },

  // Búsqueda y filtrado
  searchFAQs: (faqs: EventFAQ[], query: string): EventFAQ[] => {
    if (!query.trim()) return faqs;
    
    const searchTerm = query.toLowerCase();
    return faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm) ||
      faq.answer.toLowerCase().includes(searchTerm) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  },

  filterByCategory: (faqs: EventFAQ[], category: FAQCategory): EventFAQ[] => {
    return faqs.filter(faq => faq.category === category);
  },

  sortFAQs: (faqs: EventFAQ[], sortBy: string): EventFAQ[] => {
    const sortedFAQs = [...faqs];
    
    switch (sortBy) {
      case 'priority':
        return sortedFAQs.sort((a, b) => a.priority - b.priority);
      case '-priority':
        return sortedFAQs.sort((a, b) => b.priority - a.priority);
      case 'helpful':
        return sortedFAQs.sort((a, b) => b.helpful - a.helpful);
      case 'recent':
        return sortedFAQs.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
      case 'alphabetical':
        return sortedFAQs.sort((a, b) => a.question.localeCompare(b.question));
      case 'question':
        return sortedFAQs.sort((a, b) => a.question.localeCompare(b.question));
      case '-question':
        return sortedFAQs.sort((a, b) => b.question.localeCompare(a.question));
      default:
        return sortedFAQs;
    }
  },

  // Información de categorías
  getCategoryInfo: (category: FAQCategory): FAQCategoryInfo => {
    const categoryInfoMap: Record<FAQCategory, Omit<FAQCategoryInfo, 'count'>> = {
      general: {
        category: 'general',
        name: 'General',
        description: 'Información general sobre el evento',
        icon: 'Info',
        color: 'blue',
        featured: true
      },
      registration: {
        category: 'registration',
        name: 'Registro',
        description: 'Proceso de registro y tickets',
        icon: 'UserPlus',
        color: 'green',
        featured: true
      },
      schedule: {
        category: 'schedule',
        name: 'Agenda',
        description: 'Horarios y programación',
        icon: 'Calendar',
        color: 'purple',
        featured: true
      },
      location: {
        category: 'location',
        name: 'Ubicación',
        description: 'Lugar del evento y direcciones',
        icon: 'MapPin',
        color: 'red',
        featured: true
      },
      speakers: {
        category: 'speakers',
        name: 'Speakers',
        description: 'Información sobre ponentes',
        icon: 'Users',
        color: 'orange',
        featured: false
      },
      networking: {
        category: 'networking',
        name: 'Networking',
        description: 'Actividades de networking',
        icon: 'Network',
        color: 'pink',
        featured: false
      },
      technical: {
        category: 'technical',
        name: 'Técnico',
        description: 'Aspectos técnicos del evento',
        icon: 'Settings',
        color: 'gray',
        featured: false
      },
      accommodation: {
        category: 'accommodation',
        name: 'Alojamiento',
        description: 'Hoteles y alojamiento',
        icon: 'Building',
        color: 'indigo',
        featured: false
      },
      food: {
        category: 'food',
        name: 'Comida',
        description: 'Catering y opciones alimentarias',
        icon: 'Coffee',
        color: 'yellow',
        featured: false
      },
      certificates: {
        category: 'certificates',
        name: 'Certificados',
        description: 'Certificados de participación',
        icon: 'Award',
        color: 'emerald',
        featured: false
      },
      sponsors: {
        category: 'sponsors',
        name: 'Patrocinadores',
        description: 'Información sobre sponsors',
        icon: 'Star',
        color: 'amber',
        featured: false
      },
      accessibility: {
        category: 'accessibility',
        name: 'Accesibilidad',
        description: 'Accesibilidad y necesidades especiales',
        icon: 'Heart',
        color: 'teal',
        featured: false
      },
      covid: {
        category: 'covid',
        name: 'Medidas Sanitarias',
        description: 'Protocolos de salud y seguridad',
        icon: 'Shield',
        color: 'cyan',
        featured: false
      },
      contact: {
        category: 'contact',
        name: 'Contacto',
        description: 'Información de contacto y soporte',
        icon: 'Phone',
        color: 'slate',
        featured: false
      }
    };
    
    return {
      ...categoryInfoMap[category],
      count: 0 // Se debe calcular dinámicamente
    };
  },

  getCategoryColor: (category: FAQCategory): string => {
    return eventFAQsUtils.getCategoryInfo(category).color;
  },

  getCategoryIcon: (category: FAQCategory): string => {
    return eventFAQsUtils.getCategoryInfo(category).icon;
  },

  // Análisis
  getPopularFAQs: (faqs: EventFAQ[]): EventFAQ[] => {
    return [...faqs]
      .sort((a, b) => b.helpful - a.helpful)
      .slice(0, 10);
  },

  getRelatedFAQs: (faq: EventFAQ, allFAQs: EventFAQ[]): EventFAQ[] => {
    // Buscar FAQs relacionadas por IDs
    const relatedByIds = allFAQs.filter(f => faq.relatedFAQs.includes(f.id));
    
    // Si no hay suficientes, buscar por categoría y tags
    if (relatedByIds.length < 3) {
      const relatedByCategory = allFAQs.filter(f => 
        f.id !== faq.id && 
        f.category === faq.category
      );
      
      const relatedByTags = allFAQs.filter(f => 
        f.id !== faq.id && 
        f.tags.some(tag => faq.tags.includes(tag))
      );
      
      const combined = [...relatedByIds, ...relatedByCategory, ...relatedByTags];
      const unique = combined.filter((faq, index, self) => 
        index === self.findIndex(f => f.id === faq.id)
      );
      
      return unique.slice(0, 5);
    }
    
    return relatedByIds;
  },

  calculateHelpfulnessRatio: (helpful: number, notHelpful: number): number => {
    const total = helpful + notHelpful;
    if (total === 0) return 0;
    return helpful / total;
  },

  // Agrupación
  groupFAQsByCategory: (faqs: EventFAQ[]): Record<FAQCategory, EventFAQ[]> => {
    const grouped = {} as Record<FAQCategory, EventFAQ[]>;
    
    faqs.forEach(faq => {
      if (!grouped[faq.category]) {
        grouped[faq.category] = [];
      }
      grouped[faq.category].push(faq);
    });
    
    return grouped;
  },

  getFeaturedFAQs: (faqs: EventFAQ[]): EventFAQ[] => {
    return faqs
      .filter(faq => faq.featured)
      .sort((a, b) => a.priority - b.priority);
  },

  // Sugerencias
  generateSearchSuggestions: (query: string, faqs: EventFAQ[]): string[] => {
    if (!query.trim()) return [];
    
    const searchTerm = query.toLowerCase();
    const suggestions = new Set<string>();
    
    faqs.forEach(faq => {
      // Buscar en preguntas
      if (faq.question.toLowerCase().includes(searchTerm)) {
        suggestions.add(faq.question);
      }
      
      // Buscar en tags
      faq.tags.forEach(tag => {
        if (tag.toLowerCase().includes(searchTerm)) {
          suggestions.add(tag);
        }
      });
    });
    
    return Array.from(suggestions).slice(0, 5);
  },

  findSimilarQuestions: (question: string, faqs: EventFAQ[]): EventFAQ[] => {
    const searchTerm = question.toLowerCase();
    const words = searchTerm.split(' ').filter(word => word.length > 2);
    
    return faqs
      .filter(faq => {
        const faqQuestion = faq.question.toLowerCase();
        return words.some(word => faqQuestion.includes(word));
      })
      .sort((a, b) => {
        // Ordenar por relevancia (número de palabras coincidentes)
        const aMatches = words.filter(word => a.question.toLowerCase().includes(word)).length;
        const bMatches = words.filter(word => b.question.toLowerCase().includes(word)).length;
        return bMatches - aMatches;
      })
      .slice(0, 5);
  }
};

export default EventFAQsService;