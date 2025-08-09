import {
  EventSponsorsResponse,
  EventSponsor,
  EventSponsorsQueryParams,
  FeaturedEventSponsor,
  SponsorTier,
  SponsorCategory,
  EventSponsorsStats,
  SponsorshipPackage
} from '../types/event-sponsor.types';

// Datos mockeados de sponsors para CS WEEK 2025
const mockSponsors: EventSponsor[] = [
  {
    id: '1',
    name: 'JoeDayz Academy',
    description: 'Academia de tecnología fundada por José Díaz, primer Java Champion de Perú. Especializada en cursos de programación Java, desarrollo web y tecnologías cloud como AWS, Azure y GCP. Con más de 16 años de experiencia en desarrollo de software empresarial y presencia en eventos internacionales.',
    logo: '/assets/sponsors/joedayz.png',
    website: 'https://joedayz.pe',
    tier: 'gold',
    category: 'education',
    featured: true,
    benefits: [
      'Stand educativo premium',
      'Workshop técnico de Java y Cloud',
      'Logo en materiales del evento',
      'Acceso para representantes',
      'Sesión de networking con desarrolladores'
    ],
    socialLinks: {
      twitter: 'https://twitter.com/jamdiazdiaz',
      linkedin: 'https://linkedin.com/in/jamdiazdiaz',
      github: 'https://github.com/joedayz'
    },
    contact: {
      email: 'info@joedayz.pe',
      representative: 'José Díaz'
    },
    booth: {
      number: 'A1',
      location: 'Zona educación',
      size: '4x4 metros'
    },
    sponsorshipValue: 25000,
    startDate: '2025-03-01T00:00:00Z',
    endDate: '2025-03-31T23:59:59Z',
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  }
];

// Servicio mock para sponsors del evento
export class EventSponsorsMockService {
  // Simular delay de red
  private static delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Obtener lista de sponsors del evento
  static async getEventSponsors(params: EventSponsorsQueryParams = {}): Promise<EventSponsorsResponse> {
    await this.delay();
    
    const { limit = 10, page = 1, sort = 'tier', tier, category, featured, search } = params;
    
    // Aplicar filtros
    let filteredSponsors = [...mockSponsors];
    
    if (tier) {
      filteredSponsors = filteredSponsors.filter(sponsor => sponsor.tier === tier);
    }
    
    if (category) {
      filteredSponsors = filteredSponsors.filter(sponsor => sponsor.category === category);
    }
    
    if (featured !== undefined) {
      filteredSponsors = filteredSponsors.filter(sponsor => sponsor.featured === featured);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredSponsors = filteredSponsors.filter(sponsor => 
        sponsor.name.toLowerCase().includes(searchLower) ||
        sponsor.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Aplicar ordenamiento
    const tierOrder: Record<SponsorTier, number> = {
      platinum: 1,
      gold: 2,
      silver: 3,
      bronze: 4,
      community: 5,
      media: 6
    };
    
    switch (sort) {
      case 'name':
        filteredSponsors.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'tier':
        filteredSponsors.sort((a, b) => tierOrder[a.tier] - tierOrder[b.tier]);
        break;
      case 'sponsorshipValue':
        filteredSponsors.sort((a, b) => b.sponsorshipValue - a.sponsorshipValue);
        break;
      case 'featured':
        filteredSponsors.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    // Aplicar paginación
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedSponsors = filteredSponsors.slice(startIndex, endIndex);
    
    const total = filteredSponsors.length;
    const totalPages = Math.ceil(total / limit);
    
    // Calcular estadísticas
    const sponsorsByTier = mockSponsors.reduce((acc, sponsor) => {
      acc[sponsor.tier] = (acc[sponsor.tier] || 0) + 1;
      return acc;
    }, {} as Record<SponsorTier, number>);
    
    return {
      sponsors: paginatedSponsors,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      },
      meta: {
        totalSponsors: mockSponsors.length,
        sponsorsByTier,
        featuredSponsors: mockSponsors.filter(s => s.featured).length
      }
    };
  }
  
  // Obtener sponsor específico por ID
  static async getEventSponsorById(id: string): Promise<EventSponsor> {
    await this.delay();
    
    const sponsor = mockSponsors.find(s => s.id === id);
    if (!sponsor) {
      throw new Error(`Sponsor with ID ${id} not found`);
    }
    
    return sponsor;
  }
  
  // Obtener sponsors destacados
  static async getFeaturedEventSponsors(): Promise<FeaturedEventSponsor[]> {
    await this.delay();
    
    return mockSponsors
      .filter(sponsor => sponsor.featured)
      .map(sponsor => ({
        ...sponsor,
        featured: true as const,
        highlightMessage: 'Sponsor Oficial CS WEEK 2025',
        specialOffer: 'Descuentos especiales para participantes del evento'
      }));
  }
  
  // Obtener sponsors por tier
  static async getEventSponsorsByTier(tier: SponsorTier): Promise<EventSponsor[]> {
    await this.delay();
    
    return mockSponsors.filter(sponsor => sponsor.tier === tier);
  }
  
  // Obtener estadísticas de sponsors
  static async getEventSponsorsStats(): Promise<EventSponsorsStats> {
    await this.delay();
    
    const sponsorsByTier = mockSponsors.reduce((acc, sponsor) => {
      acc[sponsor.tier] = (acc[sponsor.tier] || 0) + 1;
      return acc;
    }, {} as Record<SponsorTier, number>);
    
    const sponsorsByCategory = mockSponsors.reduce((acc, sponsor) => {
      acc[sponsor.category] = (acc[sponsor.category] || 0) + 1;
      return acc;
    }, {} as Record<SponsorCategory, number>);
    
    return {
      totalSponsors: mockSponsors.length,
      sponsorsByTier,
      sponsorsByCategory,
      totalSponsorshipValue: mockSponsors.reduce((sum, sponsor) => sum + sponsor.sponsorshipValue, 0),
      featuredSponsors: mockSponsors.filter(s => s.featured).length,
      activeSponsors: mockSponsors.filter(s => s.isActive).length
    };
  }
}