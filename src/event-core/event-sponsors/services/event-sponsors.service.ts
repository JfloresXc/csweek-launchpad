import { 
  EventSponsorsResponse, 
  EventSponsor, 
  EventSponsorsQueryParams,
  FeaturedEventSponsor,
  SponsorTier,
  SponsorCategory,
  SponsorTierInfo,
  EventSponsorsStats,
  SponsorshipPackage
} from '../types/event-sponsor.types';

// API Base URL - should come from environment
const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export class EventSponsorsService {
  private static instance: EventSponsorsService;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = `${API_BASE_URL}/sponsors`;
  }

  public static getInstance(): EventSponsorsService {
    if (!EventSponsorsService.instance) {
      EventSponsorsService.instance = new EventSponsorsService();
    }
    return EventSponsorsService.instance;
  }

  /**
   * Obtener todos los sponsors con paginación y filtros
   */
  async getEventSponsors(params: EventSponsorsQueryParams = {}): Promise<EventSponsorsResponse> {
    const queryParams = new URLSearchParams();
    
    // Parámetros por defecto
    queryParams.append('limit', (params.limit || 10).toString());
    queryParams.append('page', (params.page || 1).toString());
    queryParams.append('sort', params.sort || 'tier');
    
    // Filtros opcionales
    if (params.tier) queryParams.append('tier', params.tier);
    if (params.category) queryParams.append('category', params.category);
    if (params.featured !== undefined) queryParams.append('featured', params.featured.toString());
    if (params.search) queryParams.append('search', params.search);

    const response = await fetch(`${this.baseUrl}?${queryParams}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching sponsors: ${response.statusText}`);
    }
    
    return response.json();
  }

  /**
   * Obtener un sponsor específico por ID
   */
  async getEventSponsorById(id: string): Promise<EventSponsor> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching sponsor: ${response.statusText}`);
    }
    
    return response.json();
  }

  /**
   * Obtener sponsors destacados
   */
  async getFeaturedEventSponsors(): Promise<FeaturedEventSponsor[]> {
    const response = await fetch(`${this.baseUrl}/featured`);
    
    if (!response.ok) {
      throw new Error(`Error fetching featured sponsors: ${response.statusText}`);
    }
    
    return response.json();
  }

  /**
   * Obtener sponsors por tier
   */
  async getEventSponsorsByTier(tier: SponsorTier): Promise<EventSponsor[]> {
    const response = await fetch(`${this.baseUrl}/tier/${tier}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching sponsors by tier: ${response.statusText}`);
    }
    
    return response.json();
  }

  /**
   * Obtener sponsors por categoría
   */
  async getEventSponsorsByCategory(category: SponsorCategory): Promise<EventSponsor[]> {
    const response = await fetch(`${this.baseUrl}/category/${category}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching sponsors by category: ${response.statusText}`);
    }
    
    return response.json();
  }

  /**
   * Buscar sponsors
   */
  async searchEventSponsors(query: string, params: Omit<EventSponsorsQueryParams, 'search'> = {}): Promise<EventSponsorsResponse> {
    return this.getEventSponsors({ ...params, search: query });
  }

  /**
   * Obtener estadísticas de sponsors
   */
  async getEventSponsorsStats(): Promise<EventSponsorsStats> {
    const response = await fetch(`${this.baseUrl}/stats`);
    
    if (!response.ok) {
      throw new Error(`Error fetching sponsors stats: ${response.statusText}`);
    }
    
    return response.json();
  }

  /**
   * Obtener paquetes de sponsorship disponibles
   */
  async getSponsorshipPackages(): Promise<SponsorshipPackage[]> {
    const response = await fetch(`${this.baseUrl}/packages`);
    
    if (!response.ok) {
      throw new Error(`Error fetching sponsorship packages: ${response.statusText}`);
    }
    
    return response.json();
  }
}

// Utilidades para sponsors
export const eventSponsorsUtils = {
  /**
   * Obtener información del tier
   */
  getTierInfo: (tier: SponsorTier): SponsorTierInfo => {
    const tierInfoMap: Record<SponsorTier, SponsorTierInfo> = {
      platinum: {
        name: 'Platinum',
        color: '#E5E7EB',
        benefits: [
          'Logo prominente en todos los materiales',
          'Booth premium en ubicación estratégica',
          'Sesión de keynote dedicada',
          'Acceso VIP a networking',
          'Menciones en redes sociales'
        ],
        maxSponsors: 2,
        minValue: 50000,
        displayOrder: 1
      },
      gold: {
        name: 'Gold',
        color: '#FCD34D',
        benefits: [
          'Logo en materiales principales',
          'Booth en área principal',
          'Sesión de charla técnica',
          'Acceso a networking',
          'Menciones en comunicaciones'
        ],
        maxSponsors: 4,
        minValue: 25000,
        displayOrder: 2
      },
      silver: {
        name: 'Silver',
        color: '#9CA3AF',
        benefits: [
          'Logo en materiales seleccionados',
          'Booth estándar',
          'Workshop o demo',
          'Acceso a eventos de networking'
        ],
        maxSponsors: 8,
        minValue: 10000,
        displayOrder: 3
      },
      bronze: {
        name: 'Bronze',
        color: '#CD7C2F',
        benefits: [
          'Logo en sitio web',
          'Booth básico',
          'Menciones en programa'
        ],
        maxSponsors: 15,
        minValue: 5000,
        displayOrder: 4
      },
      community: {
        name: 'Community',
        color: '#10B981',
        benefits: [
          'Logo en sección de comunidad',
          'Espacio para materiales',
          'Reconocimiento en evento'
        ],
        minValue: 1000,
        displayOrder: 5
      },
      media: {
        name: 'Media Partner',
        color: '#8B5CF6',
        benefits: [
          'Logo como media partner',
          'Acceso para cobertura',
          'Contenido exclusivo'
        ],
        minValue: 0,
        displayOrder: 6
      }
    };
    
    return tierInfoMap[tier];
  },

  /**
   * Obtener color del tier
   */
  getTierColor: (tier: SponsorTier): string => {
    return eventSponsorsUtils.getTierInfo(tier).color;
  },

  /**
   * Obtener color de la categoría
   */
  getCategoryColor: (category: SponsorCategory): string => {
    const categoryColors: Record<SponsorCategory, string> = {
      technology: '#3B82F6',
      education: '#10B981',
      startup: '#F59E0B',
      enterprise: '#6366F1',
      nonprofit: '#EF4444',
      government: '#8B5CF6',
      media: '#EC4899',
      community: '#14B8A6'
    };
    
    return categoryColors[category];
  },

  /**
   * Formatear valor de sponsorship
   */
  formatSponsorshipValue: (value: number): string => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    } else {
      return `$${value}`;
    }
  },

  /**
   * Ordenar sponsors por tier
   */
  sortSponsorsByTier: (sponsors: EventSponsor[]): EventSponsor[] => {
    return sponsors.sort((a, b) => {
      const tierOrderA = eventSponsorsUtils.getTierInfo(a.tier).displayOrder;
      const tierOrderB = eventSponsorsUtils.getTierInfo(b.tier).displayOrder;
      return tierOrderA - tierOrderB;
    });
  },

  /**
   * Agrupar sponsors por tier
   */
  groupSponsorsByTier: (sponsors: EventSponsor[]): Record<SponsorTier, EventSponsor[]> => {
    return sponsors.reduce((acc, sponsor) => {
      if (!acc[sponsor.tier]) {
        acc[sponsor.tier] = [];
      }
      acc[sponsor.tier].push(sponsor);
      return acc;
    }, {} as Record<SponsorTier, EventSponsor[]>);
  },

  /**
   * Verificar si un sponsor está activo
   */
  isSponsorActive: (sponsor: EventSponsor): boolean => {
    const now = new Date();
    const startDate = new Date(sponsor.startDate);
    const endDate = new Date(sponsor.endDate);
    
    return sponsor.isActive && now >= startDate && now <= endDate;
  },

  /**
   * Obtener sponsors por tier con límite
   */
  getSponsorsByTierWithLimit: (sponsors: EventSponsor[], tier: SponsorTier, limit?: number): EventSponsor[] => {
    const tierSponsors = sponsors.filter(sponsor => sponsor.tier === tier);
    return limit ? tierSponsors.slice(0, limit) : tierSponsors;
  }
};

// Instancia singleton del servicio
export const eventSponsorsService = EventSponsorsService.getInstance();