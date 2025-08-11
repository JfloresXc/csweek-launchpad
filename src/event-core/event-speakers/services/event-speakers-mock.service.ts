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
    "id": "1",
    "event": "csweek-2025",
    "name": "Luz Alicia Acevedo Avila",
    "title": "Project/Product Manager",
    "company": "UNT",
    "bio": "Project/Product Manager, Docente & Speaker: Gestión de proyectos, producto y procesos | UNT",
    "avatar": "/assets/speakers/Alicia-Acevedo.jpg",
    "social": {
      "twitter": "https://twitter.com/luzacevedo",
      "linkedin": "https://linkedin.com/in/luzacevedo",
      "github": "https://github.com/luzacevedo"
    },
    "featured": false,
    "keynote": false,
    "track": "product",
    "experienceLevel": "advanced",
    "order": 1,
    "isActive": true,
    "createdAt": "2025-08-01T10:00:00Z",
    "updatedAt": "2025-08-01T10:00:00Z"
  },
  {
    "id": "2",
    "event": "csweek-2025",
    "name": "Carlos Lenon",
    "title": "Frontend Engineer",
    "company": "React dev",
    "bio": "Frontend Engineer | React dev | In my free time play with | React Native/Expo | Figma | Video Editing",
    "avatar": "/assets/speakers/Carlos-Lenon.png",
    "social": {
      "twitter": "https://twitter.com/carloslenon",
      "linkedin": "https://linkedin.com/in/carloslenon",
      "github": "https://github.com/carloslenon"
    },
    "featured": false,
    "keynote": false,
    "track": "frontend",
    "experienceLevel": "intermediate",
    "order": 2,
    "isActive": true,
    "createdAt": "2025-08-01T10:00:00Z",
    "updatedAt": "2025-08-01T10:00:00Z"
  },
  {
    "id": "3",
    "event": "csweek-2025",
    "name": "Daniel Eduardo Ibañez Garcia",
    "title": "Backend Developer",
    "company": "Laboral.AI",
    "bio": "Ingeniería de Software | Backend Developer | Laboral Hero en Laboral.AI | Content Creator | UTP",
    "avatar": "/assets/speakers/Daniel-Ibañez.jpg",
    "social": {
      "twitter": "https://twitter.com/danielibañez",
      "linkedin": "https://linkedin.com/in/danielibañez",
      "github": "https://github.com/danielibañez"
    },
    "featured": false,
    "keynote": false,
    "track": "backend",
    "experienceLevel": "intermediate",
    "order": 3,
    "isActive": true,
    "createdAt": "2025-08-01T10:00:00Z",
    "updatedAt": "2025-08-01T10:00:00Z"
  },
  {
    "id": "4",
    "event": "csweek-2025",
    "name": "Deyvid Piero Tolentino Isidro",
    "title": "Mentor HealthTech",
    "company": "UNHEVAL",
    "bio": "Mentor HealthTech | Odontólogo | Investigador | UNHEVAL",
    "avatar": "/assets/speakers/Deyvid-Piero-Tolentino-Isidro.png",
    "social": {
      "twitter": "https://twitter.com/deyvidtolentino",
      "linkedin": "https://linkedin.com/in/deyvidtolentino",
      "github": "https://github.com/deyvidtolentino"
    },
    "featured": false,
    "keynote": false,
    "track": "healthtech",
    "experienceLevel": "advanced",
    "order": 4,
    "isActive": true,
    "createdAt": "2025-08-01T10:00:00Z",
    "updatedAt": "2025-08-01T10:00:00Z"
  },
  {
    "id": "5",
    "event": "csweek-2025",
    "name": "Elvis Geovanny Batzibal",
    "title": "DevOps Engineer",
    "company": "OpenShareTech",
    "bio": "DevOps Engineer | Gen AI Specialist | IA Cloud Advocate | OpenShareTech",
    "avatar": "/assets/speakers/Elvis-Batzibal.png",
    "social": {
      "twitter": "https://twitter.com/elvisbatzibal",
      "linkedin": "https://linkedin.com/in/elvisbatzibal",
      "github": "https://github.com/elvisbatzibal"
    },
    "featured": false,
    "keynote": false,
    "track": "devops",
    "experienceLevel": "advanced",
    "order": 5,
    "isActive": true,
    "createdAt": "2025-08-01T10:00:00Z",
    "updatedAt": "2025-08-01T10:00:00Z"
  },
  {
    "id": "6",
    "event": "csweek-2025",
    "name": "Henry Luis Callupe",
    "title": "Ingeniero de Sistemas",
    "company": "UPN",
    "bio": "Ingeniero de Sistemas | Desarrollo de Software & Automatización | UPN",
    "avatar": "/assets/speakers/Henry-Callupe.jpeg",
    "social": {
      "twitter": "https://twitter.com/henrycallupe",
      "linkedin": "https://linkedin.com/in/henrycallupe",
      "github": "https://github.com/henrycallupe"
    },
    "featured": false,
    "keynote": false,
    "track": "backend",
    "experienceLevel": "intermediate",
    "order": 6,
    "isActive": true,
    "createdAt": "2025-08-01T10:00:00Z",
    "updatedAt": "2025-08-01T10:00:00Z"
  },
  {
    "id": "7",
    "event": "csweek-2025",
    "name": "Jackson Merma",
    "title": "Software Engineer en Data Arch",
    "company": "UNSA",
    "bio": "Software Engineer en Data Arch | UNSA",
    "avatar": "/assets/speakers/Jackson-Merma.jpeg",
    "social": {
      "twitter": "https://twitter.com/jacksonmerma",
      "linkedin": "https://linkedin.com/in/jacksonmerma",
      "github": "https://github.com/jacksonmerma"
    },
    "featured": false,
    "keynote": false,
    "track": "data",
    "experienceLevel": "intermediate",
    "order": 7,
    "isActive": true,
    "createdAt": "2025-08-01T10:00:00Z",
    "updatedAt": "2025-08-01T10:00:00Z"
  },
  {
    "id": "8",
    "event": "csweek-2025",
    "name": "Jazmin Reyes",
    "title": "Web Developer",
    "company": "UNT",
    "bio": "Ciencias de la Computación | Web Developer | Analista de Datos | UNT",
    "avatar": "/assets/speakers/jazmin-reyes.png",
    "social": {
      "twitter": "https://twitter.com/jazminreyes",
      "linkedin": "https://linkedin.com/in/jazminreyes",
      "github": "https://github.com/jazminreyes"
    },
    "featured": false,
    "keynote": false,
    "track": "frontend",
    "experienceLevel": "intermediate",
    "order": 8,
    "isActive": true,
    "createdAt": "2025-08-01T10:00:00Z",
    "updatedAt": "2025-08-01T10:00:00Z"
  },
  {
    "id": "9",
    "event": "csweek-2025",
    "name": "Jimy Dolores",
    "title": "Software Architect",
    "company": "Codea Bien",
    "bio": "Software Architect | Founder Angular Perú | CEO Codea Bien",
    "avatar": "/assets/speakers/jimy-dolores.jpeg",
    "social": {
      "twitter": "https://twitter.com/jimydolores",
      "linkedin": "https://linkedin.com/in/jimydolores",
      "github": "https://github.com/jimydolores"
    },
    "featured": true,
    "keynote": false,
    "track": "frontend",
    "experienceLevel": "advanced",
    "order": 9,
    "isActive": true,
    "createdAt": "2025-08-01T10:00:00Z",
    "updatedAt": "2025-08-01T10:00:00Z"
  },
  {
    "id": "10",
    "event": "csweek-2025",
    "name": "Jose Flores Chamba",
    "title": "Front-End Developer",
    "company": "UNTELS",
    "bio": "Front-End Developer | GDG Open Lima | Ingeniero de Sistemas | UNTELS",
    "avatar": "/assets/speakers/jose-flores-chamba.png",
    "social": {
      "twitter": "https://twitter.com/joseflores",
      "linkedin": "https://linkedin.com/in/joseflores",
      "github": "https://github.com/joseflores"
    },
    "featured": false,
    "keynote": false,
    "track": "frontend",
    "experienceLevel": "intermediate",
    "order": 10,
    "isActive": true,
    "createdAt": "2025-08-01T10:00:00Z",
    "updatedAt": "2025-08-01T10:00:00Z"
  },
  {
    "id": "11",
    "event": "csweek-2025",
    "name": "Maribel Maza",
    "title": "Software Engineer",
    "company": "NTT DATA Perú",
    "bio": "Software Engineer en NTT DATA Perú | AI & GenAI Solutions | UPC",
    "avatar": "/assets/speakers/maribel-maza.jpg",
    "social": {
      "twitter": "https://twitter.com/maribelmaza",
      "linkedin": "https://linkedin.com/in/maribelmaza",
      "github": "https://github.com/maribelmaza"
    },
    "featured": false,
    "keynote": false,
    "track": "data",
    "experienceLevel": "intermediate",
    "order": 11,
    "isActive": true,
    "createdAt": "2025-08-01T10:00:00Z",
    "updatedAt": "2025-08-01T10:00:00Z"
  },
  {
    "id": "12",
    "event": "csweek-2025",
    "name": "Mariluisa Harumi Pereda Pascal",
    "title": "Análisis y pruebas funcionales",
    "company": "OECE",
    "bio": "Análisis y pruebas funcionales en el OECE | UNTELS",
    "avatar": "/assets/speakers/Mariluisa-Harumi-Pereda-Pascal.jpeg",
    "social": {
      "twitter": "https://twitter.com/mariluisapereda",
      "linkedin": "https://linkedin.com/in/mariluisapereda",
      "github": "https://github.com/mariluisapereda"
    },
    "featured": false,
    "keynote": false,
    "track": "qa",
    "experienceLevel": "intermediate",
    "order": 12,
    "isActive": true,
    "createdAt": "2025-08-01T10:00:00Z",
    "updatedAt": "2025-08-01T10:00:00Z"
  },
  {
    "id": "13",
    "event": "csweek-2025",
    "name": "Renzo Cienfuegos (SUDOJUNG)",
    "title": "Scientific Computing Student",
    "company": "UNMSM",
    "bio": "Scientific Computing Student | Self-taught in Cybersecurity and Quantum Computing | UNMSM",
    "avatar": "/assets/speakers/Renzo-Cienfuegos-SudoJung.jpg",
    "social": {
      "twitter": "https://twitter.com/renzocienfuegos",
      "linkedin": "https://linkedin.com/in/renzocienfuegos",
      "github": "https://github.com/renzocienfuegos"
    },
    "featured": false,
    "keynote": false,
    "track": "cybersecurity",
    "experienceLevel": "intermediate",
    "order": 13,
    "isActive": true,
    "createdAt": "2025-08-01T10:00:00Z",
    "updatedAt": "2025-08-01T10:00:00Z"
  },
  {
    "id": "14",
    "event": "csweek-2025",
    "name": "Jose Amadeo Diaz Diaz",
    "title": "Cloud Architect",
    "company": "PUCP",
    "bio": "Cloud Architect | Java Champion | PeruJUG Founder | PUCP",
    "avatar": "/assets/speakers/Jose-Amadeo-Diaz-Diaz.png",
    "social": {
      "twitter": "https://twitter.com/joseadiaz",
      "linkedin": "https://linkedin.com/in/joseadiaz",
      "github": "https://github.com/joseadiaz"
    },
    "featured": true,
    "keynote": true,
    "track": "backend",
    "experienceLevel": "advanced",
    "order": 14,
    "isActive": true,
    "createdAt": "2025-08-01T10:00:00Z",
    "updatedAt": "2025-08-01T10:00:00Z"
  },
  {
    "id": "15",
    "event": "csweek-2025",
    "name": "Goblin Slay3r",
    "title": "Pentester",
    "company": "Cibersecurity Red Team",
    "bio": "Cibersecurity Red Team | Pentester",
    "avatar": "/assets/speakers/Goblin-Slay3r.png",
    "social": {
      "twitter": "https://twitter.com/goblinslay3r",
      "linkedin": "https://linkedin.com/in/goblinslay3r",
      "github": "https://github.com/goblinslay3r"
    },
    "featured": false,
    "keynote": false,
    "track": "cybersecurity",
    "experienceLevel": "advanced",
    "order": 15,
    "isActive": true,
    "createdAt": "2025-08-01T10:00:00Z",
    "updatedAt": "2025-08-01T10:00:00Z"
  },
  {
    "id": "16",
    "event": "csweek-2025",
    "name": "Juan Alberto Contreras Flores",
    "title": "Founder & CEO",
    "company": "Help Business Peru Unidos",
    "bio": "Founder & CEO Help Business Peru Unidos | Auditor en Sistemas de seguridad y redes | UTP",
    "avatar": "/assets/speakers/Juan-Alberto-Contreras-Flores.png",
    "social": {
      "twitter": "https://twitter.com/juancontreras",
      "linkedin": "https://linkedin.com/in/juancontreras",
      "github": "https://github.com/juancontreras"
    },
    "featured": true,
    "keynote": false,
    "track": "cybersecurity",
    "experienceLevel": "advanced",
    "order": 16,
    "isActive": true,
    "createdAt": "2025-08-01T10:00:00Z",
    "updatedAt": "2025-08-01T10:00:00Z"
  },
  {
    "id": "17",
    "event": "csweek-2025",
    "name": "Renzo Roca",
    "title": "Software Developer",
    "company": "Tech Company",
    "bio": "Software Developer especializado en desarrollo web y tecnologías modernas",
    "avatar": "/assets/speakers/renzo-roca.png",
    "social": {
      "twitter": "https://twitter.com/renzoroca",
      "linkedin": "https://linkedin.com/in/renzoroca",
      "github": "https://github.com/renzoroca"
    },
    "featured": false,
    "keynote": false,
    "track": "frontend",
    "experienceLevel": "intermediate",
    "order": 17,
    "isActive": true,
    "createdAt": "2025-08-01T10:00:00Z",
    "updatedAt": "2025-08-01T10:00:00Z"
  },
  {
    "id": "18",
    "event": "csweek-2025",
    "name": "Andrés David Escobar Villa",
    "title": "Full Stack Developer",
    "company": "Tech Solutions",
    "bio": "Full Stack Developer con experiencia en desarrollo web y aplicaciones móviles",
    "avatar": "/assets/speakers/Andrés-David-Escobar-Villa.png",
    "social": {
      "twitter": "https://twitter.com/andresescobarvilla",
      "linkedin": "https://linkedin.com/in/andresescobarvilla",
      "github": "https://github.com/andresescobarvilla"
    },
    "featured": false,
    "keynote": false,
    "track": "fullstack",
    "experienceLevel": "intermediate",
    "order": 18,
    "isActive": true,
    "createdAt": "2025-08-01T10:00:00Z",
    "updatedAt": "2025-08-01T10:00:00Z"
  },
  {
    "id": "19",
    "event": "csweek-2025",
    "name": "Giancarlos Enrique Sandoval Tume",
    "title": "Software Engineer",
    "company": "Innovation Labs",
    "bio": "Software Engineer especializado en arquitectura de software y desarrollo backend",
    "avatar": "/assets/speakers/Giancarlos Enrique Sandoval Tume.png",
    "social": {
      "twitter": "https://twitter.com/giancarlosandoval",
      "linkedin": "https://linkedin.com/in/giancarlosandoval",
      "github": "https://github.com/giancarlosandoval"
    },
    "featured": false,
    "keynote": false,
    "track": "backend",
    "experienceLevel": "intermediate",
    "order": 19,
    "isActive": true,
    "createdAt": "2025-08-01T10:00:00Z",
    "updatedAt": "2025-08-01T10:00:00Z"
  },
  {
    "id": "20",
    "event": "csweek-2025",
    "name": "Jose Miranda",
    "title": "DevOps Engineer",
    "company": "Cloud Solutions",
    "bio": "DevOps Engineer especializado en infraestructura cloud y automatización",
    "avatar": "/assets/speakers/jose-miranda.png",
    "social": {
      "twitter": "https://twitter.com/josemiranda",
      "linkedin": "https://linkedin.com/in/josemiranda",
      "github": "https://github.com/josemiranda"
    },
    "featured": false,
    "keynote": false,
    "track": "devops",
    "experienceLevel": "intermediate",
    "order": 20,
    "isActive": true,
    "createdAt": "2025-08-01T10:00:00Z",
    "updatedAt": "2025-08-01T10:00:00Z"
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
    const sortedSpeakers = [...mockSpeakers];
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