import { 
  EventCommunitiesResponse, 
  EventCommunity, 
  EventCommunitiesQueryParams,
  FeaturedEventCommunity,
  CommunityType,
  CommunityCategory,
  CommunityTypeInfo,
  EventCommunitiesStats,
  CommunityPartnership,
  PartnershipLevel
} from '../types/event-community.types';

// API Base URL - should come from environment
const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export class EventCommunitiesService {
  private static instance: EventCommunitiesService;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = `${API_BASE_URL}/communities`;
  }

  public static getInstance(): EventCommunitiesService {
    if (!EventCommunitiesService.instance) {
      EventCommunitiesService.instance = new EventCommunitiesService();
    }
    return EventCommunitiesService.instance;
  }

  /**
   * Obtener todas las comunidades con paginación y filtros
   */
  async getEventCommunities(params: EventCommunitiesQueryParams = {}): Promise<EventCommunitiesResponse> {
    const queryParams = new URLSearchParams();
    
    // Parámetros por defecto
    queryParams.append('limit', (params.limit || 10).toString());
    queryParams.append('page', (params.page || 1).toString());
    queryParams.append('sort', params.sort || 'memberCount');
    
    // Filtros opcionales
    if (params.type) queryParams.append('type', params.type);
    if (params.category) queryParams.append('category', params.category);
    if (params.location) queryParams.append('location', params.location);
    if (params.featured !== undefined) queryParams.append('featured', params.featured.toString());
    if (params.isRemote !== undefined) queryParams.append('isRemote', params.isRemote.toString());
    if (params.search) queryParams.append('search', params.search);

    const response = await fetch(`${this.baseUrl}?${queryParams}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching communities: ${response.statusText}`);
    }
    
    return response.json();
  }

  /**
   * Obtener una comunidad específica por ID
   */
  async getEventCommunityById(id: string): Promise<EventCommunity> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching community: ${response.statusText}`);
    }
    
    return response.json();
  }

  /**
   * Obtener comunidades destacadas
   */
  async getFeaturedEventCommunities(): Promise<FeaturedEventCommunity[]> {
    const response = await fetch(`${this.baseUrl}/featured`);
    
    if (!response.ok) {
      throw new Error(`Error fetching featured communities: ${response.statusText}`);
    }
    
    return response.json();
  }

  /**
   * Obtener comunidades por tipo
   */
  async getEventCommunitiesByType(type: CommunityType): Promise<EventCommunity[]> {
    const response = await fetch(`${this.baseUrl}/type/${type}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching communities by type: ${response.statusText}`);
    }
    
    return response.json();
  }

  /**
   * Obtener comunidades por categoría
   */
  async getEventCommunitiesByCategory(category: CommunityCategory): Promise<EventCommunity[]> {
    const response = await fetch(`${this.baseUrl}/category/${category}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching communities by category: ${response.statusText}`);
    }
    
    return response.json();
  }

  /**
   * Obtener comunidades por ubicación
   */
  async getEventCommunitiesByLocation(location: string): Promise<EventCommunity[]> {
    const response = await fetch(`${this.baseUrl}/location/${encodeURIComponent(location)}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching communities by location: ${response.statusText}`);
    }
    
    return response.json();
  }

  /**
   * Buscar comunidades
   */
  async searchEventCommunities(query: string, params: Omit<EventCommunitiesQueryParams, 'search'> = {}): Promise<EventCommunitiesResponse> {
    return this.getEventCommunities({ ...params, search: query });
  }

  /**
   * Obtener estadísticas de comunidades
   */
  async getEventCommunitiesStats(): Promise<EventCommunitiesStats> {
    const response = await fetch(`${this.baseUrl}/stats`);
    
    if (!response.ok) {
      throw new Error(`Error fetching communities stats: ${response.statusText}`);
    }
    
    return response.json();
  }

  /**
   * Obtener partnerships disponibles
   */
  async getCommunityPartnerships(): Promise<CommunityPartnership[]> {
    const response = await fetch(`${this.baseUrl}/partnerships`);
    
    if (!response.ok) {
      throw new Error(`Error fetching community partnerships: ${response.statusText}`);
    }
    
    return response.json();
  }
}

// Utilidades para comunidades
export const eventCommunitiesUtils = {
  /**
   * Obtener información del tipo de comunidad
   */
  getTypeInfo: (type: CommunityType): CommunityTypeInfo => {
    const typeInfoMap: Record<CommunityType, CommunityTypeInfo> = {
      tech_community: {
        name: 'Comunidad Tech',
        description: 'Comunidades tecnológicas locales',
        color: '#3B82F6',
        icon: 'Users'
      },
      university: {
        name: 'Universidad',
        description: 'Instituciones educativas superiores',
        color: '#10B981',
        icon: 'GraduationCap'
      },
      bootcamp: {
        name: 'Bootcamp',
        description: 'Programas intensivos de formación',
        color: '#F59E0B',
        icon: 'Zap'
      },
      company: {
        name: 'Empresa',
        description: 'Empresas tecnológicas',
        color: '#6366F1',
        icon: 'Building2'
      },
      nonprofit: {
        name: 'ONG',
        description: 'Organizaciones sin fines de lucro',
        color: '#EF4444',
        icon: 'Heart'
      },
      government: {
        name: 'Gobierno',
        description: 'Instituciones gubernamentales',
        color: '#8B5CF6',
        icon: 'Landmark'
      },
      startup_hub: {
        name: 'Hub de Startups',
        description: 'Incubadoras y aceleradoras',
        color: '#EC4899',
        icon: 'Rocket'
      },
      coworking: {
        name: 'Coworking',
        description: 'Espacios de trabajo colaborativo',
        color: '#14B8A6',
        icon: 'Coffee'
      }
    };
    
    return typeInfoMap[type];
  },

  /**
   * Obtener color del tipo
   */
  getTypeColor: (type: CommunityType): string => {
    return eventCommunitiesUtils.getTypeInfo(type).color;
  },

  /**
   * Obtener color de la categoría
   */
  getCategoryColor: (category: CommunityCategory): string => {
    const categoryColors: Record<CommunityCategory, string> = {
      programming: '#3B82F6',
      data_science: '#10B981',
      ai_ml: '#F59E0B',
      cybersecurity: '#EF4444',
      mobile_dev: '#6366F1',
      web_dev: '#8B5CF6',
      devops: '#EC4899',
      blockchain: '#14B8A6',
      game_dev: '#F97316',
      ux_ui: '#84CC16',
      general_tech: '#6B7280',
      entrepreneurship: '#DC2626'
    };
    
    return categoryColors[category];
  },

  /**
   * Obtener información del nivel de partnership
   */
  getPartnershipInfo: (level: PartnershipLevel) => {
    const partnershipInfoMap: Record<PartnershipLevel, { name: string; color: string; benefits: string[] }> = {
      platinum: {
        name: 'Platinum Partner',
        color: '#E5E7EB',
        benefits: [
          'Logo prominente en todos los materiales',
          'Sesión dedicada en el evento',
          'Acceso VIP para miembros',
          'Menciones especiales en redes sociales'
        ]
      },
      gold: {
        name: 'Gold Partner',
        color: '#FCD34D',
        benefits: [
          'Logo en materiales principales',
          'Workshop o charla técnica',
          'Acceso preferencial para miembros',
          'Menciones en comunicaciones'
        ]
      },
      silver: {
        name: 'Silver Partner',
        color: '#9CA3AF',
        benefits: [
          'Logo en sitio web y materiales',
          'Espacio para networking',
          'Descuentos para miembros'
        ]
      },
      bronze: {
        name: 'Bronze Partner',
        color: '#CD7C2F',
        benefits: [
          'Logo en sitio web',
          'Reconocimiento en evento',
          'Acceso a networking'
        ]
      },
      community: {
        name: 'Community Partner',
        color: '#10B981',
        benefits: [
          'Intercambio de eventos',
          'Promoción cruzada',
          'Colaboración en contenido'
        ]
      },
      academic: {
        name: 'Academic Partner',
        color: '#8B5CF6',
        benefits: [
          'Programas educativos especiales',
          'Descuentos para estudiantes',
          'Colaboración en investigación'
        ]
      }
    };
    
    return partnershipInfoMap[level];
  },

  /**
   * Formatear número de miembros
   */
  formatMemberCount: (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    } else {
      return count.toString();
    }
  },

  /**
   * Obtener ubicación formateada
   */
  formatLocation: (community: EventCommunity): string => {
    if (community.location.isRemote) {
      return 'Remoto';
    }
    
    const { city, country, region } = community.location;
    if (region) {
      return `${city}, ${region}, ${country}`;
    }
    return `${city}, ${country}`;
  },

  /**
   * Verificar si una comunidad está activa
   */
  isCommunityActive: (community: EventCommunity): boolean => {
    if (!community.isActive) return false;
    
    // Verificar si el partnership está vigente
    const now = new Date();
    const startDate = new Date(community.partnership.startDate);
    const endDate = community.partnership.endDate ? new Date(community.partnership.endDate) : null;
    
    return now >= startDate && (!endDate || now <= endDate);
  },

  /**
   * Agrupar comunidades por tipo
   */
  groupCommunitiesByType: (communities: EventCommunity[]): Record<CommunityType, EventCommunity[]> => {
    return communities.reduce((acc, community) => {
      if (!acc[community.type]) {
        acc[community.type] = [];
      }
      acc[community.type].push(community);
      return acc;
    }, {} as Record<CommunityType, EventCommunity[]>);
  },

  /**
   * Agrupar comunidades por ubicación
   */
  groupCommunitiesByLocation: (communities: EventCommunity[]): Record<string, EventCommunity[]> => {
    return communities.reduce((acc, community) => {
      const location = eventCommunitiesUtils.formatLocation(community);
      if (!acc[location]) {
        acc[location] = [];
      }
      acc[location].push(community);
      return acc;
    }, {} as Record<string, EventCommunity[]>);
  },

  /**
   * Ordenar comunidades por número de miembros
   */
  sortCommunitiesByMembers: (communities: EventCommunity[], ascending: boolean = false): EventCommunity[] => {
    return communities.sort((a, b) => {
      return ascending ? a.memberCount - b.memberCount : b.memberCount - a.memberCount;
    });
  },

  /**
   * Filtrar comunidades por tecnologías
   */
  filterCommunitiesByTechnology: (communities: EventCommunity[], technology: string): EventCommunity[] => {
    return communities.filter(community => 
      community.technologies.some(tech => 
        tech.toLowerCase().includes(technology.toLowerCase())
      )
    );
  }
};

// Instancia singleton del servicio
export const eventCommunitiesService = EventCommunitiesService.getInstance();