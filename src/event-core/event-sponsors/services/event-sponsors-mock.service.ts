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
    name: 'Google',
    description: 'Líder mundial en tecnología e innovación. Comprometidos con el desarrollo de la próxima generación de desarrolladores.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    website: 'https://google.com',
    tier: 'platinum',
    category: 'technology',
    featured: true,
    benefits: [
      'Stand premium en ubicación principal',
      'Sesión keynote de 45 minutos',
      'Logo en todos los materiales del evento',
      'Acceso VIP para 10 representantes',
      'Networking exclusivo con speakers'
    ],
    socialLinks: {
      twitter: 'https://twitter.com/google',
      linkedin: 'https://linkedin.com/company/google',
      youtube: 'https://youtube.com/google'
    },
    contact: {
      email: 'events@google.com',
      representative: 'Sarah Johnson'
    },
    booth: {
      number: 'A1',
      location: 'Entrada principal',
      size: '6x6 metros'
    },
    sponsorshipValue: 50000,
    startDate: '2025-03-01T00:00:00Z',
    endDate: '2025-03-31T23:59:59Z',
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Microsoft',
    description: 'Empoderando a cada persona y organización del planeta para lograr más a través de la tecnología.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg',
    website: 'https://microsoft.com',
    tier: 'platinum',
    category: 'technology',
    featured: true,
    benefits: [
      'Stand premium en ubicación estratégica',
      'Workshop técnico de 2 horas',
      'Logo destacado en materiales',
      'Acceso VIP para 8 representantes',
      'Sesión de reclutamiento'
    ],
    socialLinks: {
      twitter: 'https://twitter.com/microsoft',
      linkedin: 'https://linkedin.com/company/microsoft'
    },
    contact: {
      email: 'events@microsoft.com',
      representative: 'Carlos Mendez'
    },
    booth: {
      number: 'A2',
      location: 'Zona central',
      size: '6x6 metros'
    },
    sponsorshipValue: 45000,
    startDate: '2025-03-01T00:00:00Z',
    endDate: '2025-03-31T23:59:59Z',
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '3',
    name: 'Amazon Web Services',
    description: 'La plataforma de nube más adoptada y completa del mundo, ofreciendo más de 200 servicios.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
    website: 'https://aws.amazon.com',
    tier: 'gold',
    category: 'technology',
    featured: true,
    benefits: [
      'Stand en zona premium',
      'Charla técnica de 30 minutos',
      'Logo en materiales principales',
      'Acceso para 6 representantes',
      'Demo de productos'
    ],
    socialLinks: {
      twitter: 'https://twitter.com/awscloud',
      linkedin: 'https://linkedin.com/company/amazon-web-services'
    },
    contact: {
      email: 'events@aws.amazon.com',
      representative: 'Ana Rodriguez'
    },
    booth: {
      number: 'B1',
      location: 'Zona tecnología',
      size: '4x4 metros'
    },
    sponsorshipValue: 25000,
    startDate: '2025-03-01T00:00:00Z',
    endDate: '2025-03-31T23:59:59Z',
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '4',
    name: 'Meta',
    description: 'Construyendo tecnologías que ayudan a las personas a conectarse, encontrar comunidades y hacer crecer negocios.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
    website: 'https://meta.com',
    tier: 'gold',
    category: 'technology',
    featured: false,
    benefits: [
      'Stand en zona visible',
      'Presentación de 20 minutos',
      'Logo en materiales',
      'Acceso para 4 representantes'
    ],
    socialLinks: {
      twitter: 'https://twitter.com/meta',
      linkedin: 'https://linkedin.com/company/meta'
    },
    contact: {
      email: 'events@meta.com',
      representative: 'Diego Silva'
    },
    booth: {
      number: 'B2',
      location: 'Zona innovación',
      size: '4x4 metros'
    },
    sponsorshipValue: 20000,
    startDate: '2025-03-01T00:00:00Z',
    endDate: '2025-03-31T23:59:59Z',
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '5',
    name: 'GitHub',
    description: 'La plataforma de desarrollo colaborativo donde más de 100 millones de desarrolladores dan forma al futuro del software.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg',
    website: 'https://github.com',
    tier: 'silver',
    category: 'technology',
    featured: false,
    benefits: [
      'Stand estándar',
      'Lightning talk de 10 minutos',
      'Logo en materiales digitales',
      'Acceso para 3 representantes'
    ],
    socialLinks: {
      twitter: 'https://twitter.com/github',
      linkedin: 'https://linkedin.com/company/github'
    },
    contact: {
      email: 'events@github.com',
      representative: 'Laura Martinez'
    },
    booth: {
      number: 'C1',
      location: 'Zona desarrollo',
      size: '3x3 metros'
    },
    sponsorshipValue: 10000,
    startDate: '2025-03-01T00:00:00Z',
    endDate: '2025-03-31T23:59:59Z',
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '6',
    name: 'Platzi',
    description: 'La plataforma de educación online más grande de Latinoamérica, formando a la próxima generación de profesionales tech.',
    logo: 'https://static.platzi.com/media/platzi-logo.png',
    website: 'https://platzi.com',
    tier: 'silver',
    category: 'education',
    featured: true,
    benefits: [
      'Stand educativo',
      'Taller práctico de 1 hora',
      'Becas para estudiantes',
      'Acceso para 3 representantes'
    ],
    socialLinks: {
      twitter: 'https://twitter.com/platzi',
      linkedin: 'https://linkedin.com/company/platzi'
    },
    contact: {
      email: 'eventos@platzi.com',
      representative: 'Roberto Fernandez'
    },
    booth: {
      number: 'C2',
      location: 'Zona educación',
      size: '3x3 metros'
    },
    sponsorshipValue: 8000,
    startDate: '2025-03-01T00:00:00Z',
    endDate: '2025-03-31T23:59:59Z',
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '7',
    name: 'Startup Perú',
    description: 'Programa del gobierno peruano que impulsa el emprendimiento y la innovación tecnológica en el país.',
    logo: 'https://www.gob.pe/uploads/document/file/1234567/startup-peru-logo.png',
    website: 'https://startupperu.pe',
    tier: 'bronze',
    category: 'government',
    featured: false,
    benefits: [
      'Stand institucional',
      'Presentación de programas',
      'Networking con emprendedores'
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/startup-peru'
    },
    contact: {
      email: 'info@startupperu.pe',
      representative: 'Maria Gonzalez'
    },
    booth: {
      number: 'D1',
      location: 'Zona emprendimiento',
      size: '2x2 metros'
    },
    sponsorshipValue: 5000,
    startDate: '2025-03-01T00:00:00Z',
    endDate: '2025-03-31T23:59:59Z',
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '8',
    name: 'TechStars Lima',
    description: 'Aceleradora global de startups con presencia en Lima, conectando emprendedores con mentores e inversores.',
    logo: 'https://www.techstars.com/content/uploads/2019/05/techstars-logo.png',
    website: 'https://techstars.com/accelerators/lima',
    tier: 'community',
    category: 'startup',
    featured: false,
    benefits: [
      'Stand comunitario',
      'Sesión de mentoring',
      'Networking con startups'
    ],
    socialLinks: {
      twitter: 'https://twitter.com/techstars',
      linkedin: 'https://linkedin.com/company/techstars'
    },
    contact: {
      email: 'lima@techstars.com',
      representative: 'Pedro Ramirez'
    },
    sponsorshipValue: 2000,
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