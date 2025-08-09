import {
  EventCommunitiesResponse,
  EventCommunity,
  EventCommunitiesQueryParams,
  FeaturedEventCommunity,
  CommunityType,
  CommunityCategory,
  PartnershipLevel,
  EventCommunitiesStats,
  CommunityPartnership
} from '../types/event-community.types';

// Datos mockeados de comunidades para CS WEEK 2025
const mockCommunities: EventCommunity[] = [
  {
    id: '1',
    name: 'Lima Tech Community',
    description: 'La comunidad tecnológica más grande de Lima, conectando desarrolladores, diseñadores y emprendedores tech.',
    logo: '/placeholder.svg',
    website: 'https://limatech.community',
    type: 'tech_community',
    category: 'general_tech',
    location: {
      city: 'Lima',
      country: 'Perú',
      region: 'América Latina',
      isRemote: false
    },
    featured: true,
    memberCount: 5200,
    foundedYear: 2018,
    technologies: ['JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'Docker'],
    socialLinks: {
      twitter: 'https://twitter.com/limatechcommunity',
      linkedin: 'https://linkedin.com/company/lima-tech-community',
      discord: 'https://discord.gg/limatech',
      instagram: 'https://instagram.com/limatechcommunity'
    },
    contact: {
      email: 'hola@limatech.community',
      representative: 'Carlos Mendoza',
      phone: '+51 999 888 777'
    },
    events: {
      monthlyMeetups: true,
      workshops: true,
      hackathons: true,
      conferences: true,
      onlineEvents: true
    },
    partnership: {
      level: 'platinum',
      benefits: [
        'Stand premium en el evento',
        'Sesión de networking exclusiva',
        'Logo destacado en materiales',
        'Acceso VIP para organizadores',
        'Promoción en redes sociales'
      ],
      startDate: '2025-01-01T00:00:00Z',
      endDate: '2025-12-31T23:59:59Z'
    },
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Python Perú',
    description: 'Comunidad oficial de Python en Perú, promoviendo el uso y desarrollo del lenguaje Python.',
    logo: '/placeholder.svg',
    website: 'https://python.pe',
    type: 'tech_community',
    category: 'programming',
    location: {
      city: 'Lima',
      country: 'Perú',
      region: 'América Latina',
      isRemote: true
    },
    featured: true,
    memberCount: 3800,
    foundedYear: 2015,
    technologies: ['Python', 'Django', 'Flask', 'FastAPI', 'Data Science', 'Machine Learning'],
    socialLinks: {
      twitter: 'https://twitter.com/pythonperu',
      linkedin: 'https://linkedin.com/company/python-peru',
      github: 'https://github.com/pythonperu',
      telegram: 'https://t.me/pythonperu'
    },
    contact: {
      email: 'contacto@python.pe',
      representative: 'Ana Rodriguez'
    },
    events: {
      monthlyMeetups: true,
      workshops: true,
      hackathons: false,
      conferences: true,
      onlineEvents: true
    },
    partnership: {
      level: 'gold',
      benefits: [
        'Stand en zona premium',
        'Charla técnica de 30 minutos',
        'Workshop especializado',
        'Promoción en comunidad'
      ],
      startDate: '2025-01-01T00:00:00Z',
      endDate: '2025-12-31T23:59:59Z'
    },
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '3',
    name: 'JavaScript Lima',
    description: 'Comunidad de desarrolladores JavaScript en Lima, enfocada en tecnologías web modernas.',
    logo: '/placeholder.svg',
    website: 'https://jslima.dev',
    type: 'tech_community',
    category: 'web_dev',
    location: {
      city: 'Lima',
      country: 'Perú',
      region: 'América Latina',
      isRemote: false
    },
    featured: false,
    memberCount: 2100,
    foundedYear: 2019,
    technologies: ['JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 'Node.js'],
    socialLinks: {
      twitter: 'https://twitter.com/jslima',
      linkedin: 'https://linkedin.com/company/javascript-lima',
      discord: 'https://discord.gg/jslima'
    },
    contact: {
      email: 'hola@jslima.dev',
      representative: 'Diego Silva'
    },
    events: {
      monthlyMeetups: true,
      workshops: true,
      hackathons: true,
      conferences: false,
      onlineEvents: true
    },
    partnership: {
      level: 'silver',
      benefits: [
        'Stand estándar',
        'Lightning talk de 15 minutos',
        'Networking con desarrolladores'
      ],
      startDate: '2025-01-01T00:00:00Z'
    },
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '4',
    name: 'Universidad Nacional de Ingeniería',
    description: 'Facultad de Ingeniería de Sistemas e Informática de la UNI, formando ingenieros de excelencia.',
    logo: '/placeholder.svg',
    website: 'https://fisi.uni.edu.pe',
    type: 'university',
    category: 'general_tech',
    location: {
      city: 'Lima',
      country: 'Perú',
      region: 'América Latina',
      isRemote: false
    },
    featured: true,
    memberCount: 1500,
    foundedYear: 1955,
    technologies: ['Java', 'C++', 'Python', 'SQL', 'Algorithms', 'Data Structures'],
    socialLinks: {
      linkedin: 'https://linkedin.com/school/uni-peru',
      facebook: 'https://facebook.com/fisi.uni'
    },
    contact: {
      email: 'fisi@uni.edu.pe',
      representative: 'Dr. Roberto Fernandez'
    },
    events: {
      monthlyMeetups: false,
      workshops: true,
      hackathons: true,
      conferences: true,
      onlineEvents: false
    },
    partnership: {
      level: 'academic',
      benefits: [
        'Participación estudiantil',
        'Proyectos de investigación',
        'Becas para estudiantes destacados',
        'Colaboración académica'
      ],
      startDate: '2025-01-01T00:00:00Z'
    },
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '5',
    name: 'Women in Tech Perú',
    description: 'Comunidad que promueve la participación de mujeres en tecnología y ciencias de la computación.',
    logo: '/placeholder.svg',
    website: 'https://womenintech.pe',
    type: 'nonprofit',
    category: 'general_tech',
    location: {
      city: 'Lima',
      country: 'Perú',
      region: 'América Latina',
      isRemote: true
    },
    featured: true,
    memberCount: 1200,
    foundedYear: 2020,
    technologies: ['Diversity', 'Leadership', 'Programming', 'Data Science', 'UX/UI'],
    socialLinks: {
      twitter: 'https://twitter.com/womenintech_pe',
      linkedin: 'https://linkedin.com/company/women-in-tech-peru',
      instagram: 'https://instagram.com/womenintech.pe'
    },
    contact: {
      email: 'contacto@womenintech.pe',
      representative: 'Maria Gonzalez'
    },
    events: {
      monthlyMeetups: true,
      workshops: true,
      hackathons: false,
      conferences: true,
      onlineEvents: true
    },
    partnership: {
      level: 'gold',
      benefits: [
        'Sesión sobre diversidad en tech',
        'Networking para mujeres',
        'Mentoring especializado',
        'Promoción de inclusión'
      ],
      startDate: '2025-01-01T00:00:00Z'
    },
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '6',
    name: 'DevOps Perú',
    description: 'Comunidad de profesionales DevOps, SRE y Cloud en Perú, compartiendo mejores prácticas.',
    logo: '/placeholder.svg',
    website: 'https://devops.pe',
    type: 'tech_community',
    category: 'devops',
    location: {
      city: 'Lima',
      country: 'Perú',
      region: 'América Latina',
      isRemote: true
    },
    featured: false,
    memberCount: 800,
    foundedYear: 2021,
    technologies: ['Docker', 'Kubernetes', 'AWS', 'Azure', 'Terraform', 'Jenkins'],
    socialLinks: {
      linkedin: 'https://linkedin.com/company/devops-peru',
      slack: 'https://devopsperu.slack.com',
      github: 'https://github.com/devops-peru'
    },
    contact: {
      email: 'info@devops.pe',
      representative: 'Luis Martinez'
    },
    events: {
      monthlyMeetups: true,
      workshops: true,
      hackathons: false,
      conferences: false,
      onlineEvents: true
    },
    partnership: {
      level: 'bronze',
      benefits: [
        'Charla sobre DevOps',
        'Demo de herramientas',
        'Networking técnico'
      ],
      startDate: '2025-01-01T00:00:00Z'
    },
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '7',
    name: 'Laboratoria',
    description: 'Bootcamp que transforma la vida de mujeres jóvenes de América Latina a través de la educación en tecnología.',
    logo: '/placeholder.svg',
    website: 'https://laboratoria.la',
    type: 'bootcamp',
    category: 'web_dev',
    location: {
      city: 'Lima',
      country: 'Perú',
      region: 'América Latina',
      isRemote: false
    },
    featured: true,
    memberCount: 2500,
    foundedYear: 2014,
    technologies: ['JavaScript', 'React', 'Node.js', 'UX/UI', 'Data Analytics'],
    socialLinks: {
      twitter: 'https://twitter.com/laboratoriala',
      linkedin: 'https://linkedin.com/company/laboratoria',
      instagram: 'https://instagram.com/laboratoriala',
      youtube: 'https://youtube.com/laboratoria'
    },
    contact: {
      email: 'hola@laboratoria.la',
      representative: 'Claudia Alfaro'
    },
    events: {
      monthlyMeetups: false,
      workshops: true,
      hackathons: true,
      conferences: false,
      onlineEvents: true
    },
    partnership: {
      level: 'gold',
      benefits: [
        'Showcase de graduadas',
        'Taller de empleabilidad',
        'Networking con empresas',
        'Promoción de diversidad'
      ],
      startDate: '2025-01-01T00:00:00Z'
    },
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '8',
    name: 'Arequipa Tech',
    description: 'Comunidad tecnológica de Arequipa, conectando el talento tech del sur del Perú.',
    logo: '/placeholder.svg',
    website: 'https://arequipatech.dev',
    type: 'tech_community',
    category: 'general_tech',
    location: {
      city: 'Arequipa',
      country: 'Perú',
      region: 'América Latina',
      isRemote: false
    },
    featured: false,
    memberCount: 650,
    foundedYear: 2020,
    technologies: ['PHP', 'Laravel', 'Vue.js', 'MySQL', 'WordPress'],
    socialLinks: {
      facebook: 'https://facebook.com/arequipatech',
      instagram: 'https://instagram.com/arequipatech',
      telegram: 'https://t.me/arequipatech'
    },
    contact: {
      email: 'contacto@arequipatech.dev',
      representative: 'Pedro Ramirez'
    },
    events: {
      monthlyMeetups: true,
      workshops: true,
      hackathons: true,
      conferences: false,
      onlineEvents: false
    },
    partnership: {
      level: 'community',
      benefits: [
        'Representación regional',
        'Networking descentralizado',
        'Promoción del evento'
      ],
      startDate: '2025-01-01T00:00:00Z'
    },
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  }
];

// Servicio mock para comunidades del evento
export class EventCommunitiesMockService {
  // Simular delay de red
  private static delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Obtener lista de comunidades del evento
  static async getEventCommunities(params: EventCommunitiesQueryParams = {}): Promise<EventCommunitiesResponse> {
    await this.delay();

    const { limit = 10, page = 1, sort = 'memberCount', type, category, location, featured, isRemote, search } = params;

    // Aplicar filtros
    let filteredCommunities = [...mockCommunities];

    if (type) {
      filteredCommunities = filteredCommunities.filter(community => community.type === type);
    }

    if (category) {
      filteredCommunities = filteredCommunities.filter(community => community.category === category);
    }

    if (location) {
      filteredCommunities = filteredCommunities.filter(community =>
        community.location.city.toLowerCase().includes(location.toLowerCase()) ||
        community.location.country.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (featured !== undefined) {
      filteredCommunities = filteredCommunities.filter(community => community.featured === featured);
    }

    if (isRemote !== undefined) {
      filteredCommunities = filteredCommunities.filter(community => community.location.isRemote === isRemote);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredCommunities = filteredCommunities.filter(community =>
        community.name.toLowerCase().includes(searchLower) ||
        community.description.toLowerCase().includes(searchLower) ||
        community.technologies.some(tech => tech.toLowerCase().includes(searchLower))
      );
    }

    // Aplicar ordenamiento
    switch (sort) {
      case 'name':
        filteredCommunities.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'memberCount':
        filteredCommunities.sort((a, b) => b.memberCount - a.memberCount);
        break;
      case 'foundedYear':
        filteredCommunities.sort((a, b) => (b.foundedYear || 0) - (a.foundedYear || 0));
        break;
      case 'featured':
        filteredCommunities.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case 'createdAt':
        filteredCommunities.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    // Aplicar paginación
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCommunities = filteredCommunities.slice(startIndex, endIndex);

    const total = filteredCommunities.length;
    const totalPages = Math.ceil(total / limit);

    // Calcular estadísticas
    const communitiesByType = mockCommunities.reduce((acc, community) => {
      acc[community.type] = (acc[community.type] || 0) + 1;
      return acc;
    }, {} as Record<CommunityType, number>);

    const communitiesByLocation = mockCommunities.reduce((acc, community) => {
      const location = `${community.location.city}, ${community.location.country}`;
      acc[location] = (acc[location] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      communities: paginatedCommunities,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      },
      meta: {
        totalCommunities: mockCommunities.length,
        communitiesByType,
        communitiesByLocation,
        featuredCommunities: mockCommunities.filter(c => c.featured).length,
        activeCommunities: mockCommunities.filter(c => c.isActive).length
      }
    };
  }

  // Obtener comunidad específica por ID
  static async getEventCommunityById(id: string): Promise<EventCommunity> {
    await this.delay();

    const community = mockCommunities.find(c => c.id === id);
    if (!community) {
      throw new Error(`Community with ID ${id} not found`);
    }

    return community;
  }

  // Obtener comunidades destacadas
  static async getFeaturedEventCommunities(): Promise<FeaturedEventCommunity[]> {
    await this.delay();

    return mockCommunities
      .filter(community => community.featured)
      .map(community => ({
        ...community,
        featured: true as const,
        highlightMessage: 'Comunidad Aliada Oficial CS WEEK 2025',
        specialProgram: 'Programa especial de networking y colaboración'
      }));
  }

  // Obtener comunidades por tipo
  static async getEventCommunitiesByType(type: CommunityType): Promise<EventCommunity[]> {
    await this.delay();

    return mockCommunities.filter(community => community.type === type);
  }

  // Obtener estadísticas de comunidades
  static async getEventCommunitiesStats(): Promise<EventCommunitiesStats> {
    await this.delay();

    const communitiesByType = mockCommunities.reduce((acc, community) => {
      acc[community.type] = (acc[community.type] || 0) + 1;
      return acc;
    }, {} as Record<CommunityType, number>);

    const communitiesByCategory = mockCommunities.reduce((acc, community) => {
      acc[community.category] = (acc[community.category] || 0) + 1;
      return acc;
    }, {} as Record<CommunityCategory, number>);

    const communitiesByLocation = mockCommunities.reduce((acc, community) => {
      const location = `${community.location.city}, ${community.location.country}`;
      acc[location] = (acc[location] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const totalMembers = mockCommunities.reduce((sum, community) => sum + community.memberCount, 0);

    return {
      totalCommunities: mockCommunities.length,
      communitiesByType,
      communitiesByCategory,
      communitiesByLocation,
      totalMembers,
      featuredCommunities: mockCommunities.filter(c => c.featured).length,
      activeCommunities: mockCommunities.filter(c => c.isActive).length,
      averageMemberCount: Math.round(totalMembers / mockCommunities.length)
    };
  }
}