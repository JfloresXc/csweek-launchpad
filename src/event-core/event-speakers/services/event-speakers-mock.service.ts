import {
  EventSpeakersResponse,
  EventSpeaker,
  EventSpeakersQueryParams,
  FeaturedEventSpeaker,
  KeynoteEventSpeaker
} from '../types/event-speaker.types';

// Datos mockeados de speakers para CS WEEK 2025
const mockSpeakers: EventSpeaker[] = [
  {
    id: '1',
    event: 'csweek-2025',
    name: 'Ana García',
    title: 'Senior Frontend Developer',
    company: 'Google',
    bio: 'Experta en React y arquitecturas frontend modernas. Ha liderado equipos de desarrollo en múltiples startups exitosas y contribuye activamente a proyectos open source.',
    avatar: '/placeholder.svg',
    social: {
      twitter: 'https://twitter.com/anagarcia',
      linkedin: 'https://linkedin.com/in/anagarcia',
      github: 'https://github.com/anagarcia'
    },
    featured: true,
    keynote: false,
    track: 'frontend',
    experienceLevel: 'advanced',
    eventBadge: 'Keynote Speaker',
    order: 1,
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    event: 'csweek-2025',
    name: 'Carlos Mendoza',
    title: 'AI Research Scientist',
    company: 'Microsoft',
    bio: 'Investigador especializado en Machine Learning y Deep Learning. PhD en Computer Science con más de 50 publicaciones en conferencias internacionales.',
    avatar: '/placeholder.svg',
    social: {
      twitter: 'https://twitter.com/carlosmendoza',
      linkedin: 'https://linkedin.com/in/carlosmendoza',
      website: 'https://carlosmendoza.dev'
    },
    featured: true,
    keynote: true,
    track: 'ai',
    experienceLevel: 'advanced',
    eventBadge: 'AI Expert',
    order: 2,
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '3',
    event: 'csweek-2025',
    name: 'María Rodriguez',
    title: 'DevOps Engineer',
    company: 'Amazon',
    bio: 'Especialista en infraestructura cloud y automatización. Experta en AWS, Kubernetes y CI/CD pipelines. Mentora activa en comunidades tech.',
    avatar: '/placeholder.svg',
    social: {
      linkedin: 'https://linkedin.com/in/mariarodriguez',
      github: 'https://github.com/mariarodriguez',
      website: 'https://mariarodriguez.tech'
    },
    featured: false,
    keynote: false,
    track: 'devops',
    experienceLevel: 'advanced',
    order: 3,
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '4',
    event: 'csweek-2025',
    name: 'Diego Fernández',
    title: 'Mobile App Developer',
    company: 'Spotify',
    bio: 'Desarrollador móvil con experiencia en React Native y Flutter. Ha creado aplicaciones con millones de descargas y es speaker regular en conferencias.',
    avatar: '/placeholder.svg',
    social: {
      twitter: 'https://twitter.com/diegofernandez',
      linkedin: 'https://linkedin.com/in/diegofernandez',
      github: 'https://github.com/diegofernandez'
    },
    featured: false,
    keynote: false,
    track: 'mobile',
    experienceLevel: 'advanced',
    order: 4,
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '5',
    event: 'csweek-2025',
    name: 'Laura Jiménez',
    title: 'Backend Architect',
    company: 'Netflix',
    bio: 'Arquitecta de software especializada en sistemas distribuidos y microservicios. Lidera la arquitectura de plataformas que manejan millones de usuarios.',
    avatar: '/placeholder.svg',
    social: {
      linkedin: 'https://linkedin.com/in/laurajimenez',
      github: 'https://github.com/laurajimenez',
      website: 'https://laurajimenez.dev'
    },
    featured: true,
    keynote: false,
    track: 'backend',
    experienceLevel: 'advanced',
    eventBadge: 'Architecture Expert',
    order: 5,
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '6',
    event: 'csweek-2025',
    name: 'Roberto Silva',
    title: 'Cybersecurity Specialist',
    company: 'Tesla',
    bio: 'Especialista en ciberseguridad con más de 10 años de experiencia. Experto en ethical hacking y seguridad de aplicaciones web.',
    avatar: '/placeholder.svg',
    social: {
      twitter: 'https://twitter.com/robertosilva',
      linkedin: 'https://linkedin.com/in/robertosilva'
    },
    featured: false,
    keynote: false,
    track: 'general',
    experienceLevel: 'advanced',
    order: 6,
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  }
];

// Servicio mock para speakers del evento
export class EventSpeakersMockService {
  // Simular delay de red
  private static delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Obtener lista de speakers del evento
  static async getEventSpeakers(params: EventSpeakersQueryParams = {}): Promise<EventSpeakersResponse> {
    await this.delay();

    const { limit = 10, page = 1, sort = 'name' } = params;

    // Aplicar ordenamiento
    let sortedSpeakers = [...mockSpeakers];
    switch (sort) {
      case 'name':
        sortedSpeakers.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case '-name':
        sortedSpeakers.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'featured':
        sortedSpeakers.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case '-featured':
        sortedSpeakers.sort((a, b) => (a.featured ? 1 : 0) - (b.featured ? 1 : 0));
        break;
    }

    // Aplicar paginación
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedSpeakers = sortedSpeakers.slice(startIndex, endIndex);

    const totalDocs = mockSpeakers.length;
    const totalPages = Math.ceil(totalDocs / limit);

    return {
      docs: paginatedSpeakers,
      totalDocs,
      limit,
      totalPages,
      page,
      pagingCounter: startIndex + 1,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null
    };
  }

  // Obtener speaker específico por ID
  static async getEventSpeakerById(id: string): Promise<EventSpeaker> {
    await this.delay();

    const speaker = mockSpeakers.find(s => s.id === id);
    if (!speaker) {
      throw new Error(`Speaker with ID ${id} not found`);
    }

    return speaker;
  }

  // Obtener speakers destacados
  static async getFeaturedEventSpeakers(): Promise<FeaturedEventSpeaker[]> {
    await this.delay();

    return mockSpeakers
      .filter(speaker => speaker.featured)
      .map(speaker => ({
        ...speaker,
        featured: true as const,
        highlightText: 'Speaker Destacado',
        ctaText: 'Ver Perfil'
      }));
  }

  // Obtener keynote speakers
  static async getKeynoteEventSpeakers(): Promise<KeynoteEventSpeaker[]> {
    await this.delay();

    return mockSpeakers
      .filter(speaker => speaker.keynote)
      .map(speaker => ({
        ...speaker,
        keynote: true as const,
        keynoteTitle: 'Keynote: El Futuro de la IA',
        keynoteDescription: 'Una visión profunda sobre las tendencias emergentes en inteligencia artificial'
      }));
  }

  // Buscar speakers por término
  static async searchEventSpeakers(searchTerm: string, params: EventSpeakersQueryParams = {}): Promise<EventSpeakersResponse> {
    await this.delay();

    const filteredSpeakers = mockSpeakers.filter(speaker =>
      speaker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      speaker.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      speaker.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      speaker.bio.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const { limit = 10, page = 1 } = params;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedSpeakers = filteredSpeakers.slice(startIndex, endIndex);

    const totalDocs = filteredSpeakers.length;
    const totalPages = Math.ceil(totalDocs / limit);

    return {
      docs: paginatedSpeakers,
      totalDocs,
      limit,
      totalPages,
      page,
      pagingCounter: startIndex + 1,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null
    };
  }
}