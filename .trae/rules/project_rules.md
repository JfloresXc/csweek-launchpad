# CS WEEK 2025 - Landing Page Project Rules

## 🎯 Objetivo del Proyecto

**Propósito Principal**: Crear una landing page moderna y atractiva para el evento CS WEEK 2025, consumiendo APIs externas para obtener información dinámica de speakers, sponsors, communities, schedule y eventos.

**Audiencia Objetivo**:

- **Participantes**: Estudiantes y profesionales de ciencias de la computación
- **Speakers**: Ponentes y expertos en tecnología
- **Sponsors**: Empresas patrocinadoras del evento
- **Comunidades Tech**: Grupos y organizaciones tecnológicas
- **Visitantes**: Personas interesadas en el evento

**Resultados Esperados**:

- **Landing Page Atractiva**: Diseño moderno y responsive
- **Información Dinámica**: Contenido actualizado desde APIs
- **Registro Eficiente**: Sistema de registro integrado
- **Performance Óptima**: Carga rápida y experiencia fluida
- **SEO Optimizado**: Máxima visibilidad en buscadores

## 🏗️ Arquitectura y Tecnologías

**Stack Tecnológico**:

- **Frontend**: React 18+ con TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **HTTP Client**: Axios para consumo de APIs
- **State Management**: React Query (TanStack Query) para manejo de estado del servidor
- **Forms**: React Hook Form + Zod para validación
- **Deployment**: Vercel / Netlify
- **Version Control**: Git + GitHub

**Patrones de Diseño**:

- **Screaming Architecture**: La estructura del proyecto debe gritar claramente su propósito (CS WEEK 2025 Event Landing Page)
- **Component-Based Architecture**: Componentes reutilizables y modulares
- **Atomic Design**: Organización de componentes en átomos, moléculas y organismos
- **Mobile-First Design**: Diseño responsivo priorizando dispositivos móviles
- **Progressive Enhancement**: Funcionalidad básica garantizada, mejoras progresivas
- **API-First Architecture**: Separación clara entre frontend y backend
- **Event-Driven Architecture**: Toda la estructura orientada al evento CS WEEK 2025

## 📁 Estructura del Proyecto (Screaming Architecture)

### 🎯 Concepto: Screaming Architecture para CS WEEK 2025

La estructura del proyecto debe "gritar" claramente que es una **Landing Page para CS WEEK 2025**. Cada directorio y archivo debe reflejar inmediatamente el dominio del evento y sus funcionalidades principales.

### 🏛️ Principios de Screaming Architecture Aplicados

**1. El Propósito es Evidente**: Al ver la estructura, inmediatamente se entiende que es para CS WEEK 2025
**2. Dominio Primero**: Los directorios principales reflejan los conceptos del dominio del evento
**3. Casos de Uso Visibles**: Cada carpeta representa una funcionalidad específica del evento
**4. Independencia de Frameworks**: La lógica del evento no depende de React, solo la implementación
**5. Testeable**: Cada dominio puede ser probado independientemente

### Estructura Orientada al Evento

```
event-launchpad/
├── public/
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── robots.txt
│   ├── event-logo.svg           # 🎯 EVENTO: Logo específico del evento
│   └── event-assets/            # 🎯 EVENTO: Assets específicos del evento
│       ├── event-images/         # Imágenes del evento
│       ├── speaker-photos/       # Fotos de speakers
│       ├── sponsor-logos/        # Logos de patrocinadores
│       ├── community-logos/      # Logos de comunidades
│       └── event-backgrounds/    # Fondos temáticos del evento
├── src/
│   ├── event-core/              # 🎯 CORE: Todo relacionado al evento principal
│   │   ├── event-config/        # Configuración específica del evento
│   │   │   ├── event.config.ts  # Configuración principal del evento
│   │   │   ├── event-theme.ts   # Tema visual del evento
│   │   │   ├── event-dates.ts   # Fechas y horarios
│   │   │   └── event-location.ts# Ubicación y venue
│   │   ├── event-speakers/      # 🎯 DOMINIO: Speakers del evento
│   │   │   ├── components/
│   │   │   │   ├── EventSpeakerCard.tsx
│   │   │   │   ├── EventSpeakerGrid.tsx
│   │   │   │   ├── EventSpeakerModal.tsx
│   │   │   │   └── EventFeaturedSpeakers.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useEventSpeakers.ts
│   │   │   │   └── useSpeakerDetails.ts
│   │   │   ├── services/
│   │   │   │   └── event-speakers.service.ts
│   │   │   └── types/
│   │   │       └── event-speaker.types.ts
│   │   ├── event-schedule/      # 🎯 DOMINIO: Agenda del evento
│   │   │   ├── components/
│   │   │   │   ├── EventScheduleCard.tsx
│   │   │   │   ├── EventScheduleTimeline.tsx
│   │   │   │   ├── EventSessionDetails.tsx
│   │   │   │   └── EventDaySchedule.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useEventSchedule.ts
│   │   │   │   └── useSessionDetails.ts
│   │   │   ├── services/
│   │   │   │   └── event-schedule.service.ts
│   │   │   └── types/
│   │   │       └── event-schedule.types.ts
│   │   ├── event-sponsors/      # 🎯 DOMINIO: Patrocinadores del evento
│   │   │   ├── components/
│   │   │   │   ├── EventSponsorCard.tsx
│   │   │   │   ├── EventSponsorGrid.tsx
│   │   │   │   ├── EventSponsorTiers.tsx
│   │   │   │   └── EventSponsorShowcase.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useEventSponsors.ts
│   │   │   ├── services/
│   │   │   │   └── event-sponsors.service.ts
│   │   │   └── types/
│   │   │       └── event-sponsor.types.ts
│   │   ├── event-communities/   # 🎯 DOMINIO: Comunidades participantes
│   │   │   ├── components/
│   │   │   │   ├── EventCommunityCard.tsx
│   │   │   │   ├── EventCommunityGrid.tsx
│   │   │   │   └── EventCommunityShowcase.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useEventCommunities.ts
│   │   │   ├── services/
│   │   │   │   └── event-communities.service.ts
│   │   │   └── types/
│   │   │       └── event-community.types.ts
│   │   ├── event-registration/   # 🎯 DOMINIO: Registro al evento
│   │   │   ├── components/
│   │   │   │   ├── EventRegistrationForm.tsx
│   │   │   │   ├── EventRegistrationModal.tsx
│   │   │   │   ├── EventRegistrationSuccess.tsx
│   │   │   │   └── EventRegistrationCTA.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useEventRegistration.ts
│   │   │   │   └── useRegistrationValidation.ts
│   │   │   ├── services/
│   │   │   │   └── event-registration.service.ts
│   │   │   └── types/
│   │   │       └── event-registration.types.ts
│   │   ├── event-faqs/          # 🎯 DOMINIO: Preguntas frecuentes del evento
│   │   │   ├── components/
│   │   │   │   ├── EventFAQCard.tsx
│   │   │   │   ├── EventFAQList.tsx
│   │   │   │   ├── EventFAQAccordion.tsx
│   │   │   │   └── EventFAQSearch.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useEventFAQs.ts
│   │   │   │   └── useFAQSearch.ts
│   │   │   ├── services/
│   │   │   │   └── event-faqs.service.ts
│   │   │   └── types/
│   │   │       └── event-faq.types.ts
│   │   └── event-landing/       # 🎯 DOMINIO: Landing page del evento
│   │       ├── sections/        # Secciones principales de la landing
│   │       │   ├── EventHeroSection.tsx
│   │       │   ├── EventAboutSection.tsx
│   │       │   ├── EventSpeakersSection.tsx
│   │       │   ├── EventScheduleSection.tsx
│   │       │   ├── EventSponsorsSection.tsx
│   │       │   ├── EventCommunitiesSection.tsx
│   │       │   ├── EventRegistrationSection.tsx
│   │       │   └── EventFAQsSection.tsx
│   │       ├── pages/           # Páginas específicas del evento
│   │       │   ├── EventHomePage.tsx
│   │       │   ├── EventSpeakersPage.tsx
│   │       │   ├── EventSpeakerDetailPage.tsx
│   │       │   ├── EventSchedulePage.tsx
│   │       │   ├── EventSponsorsPage.tsx
│   │       │   ├── EventCommunitiesPage.tsx
│   │       │   ├── EventRegisterPage.tsx
│   │       │   ├── EventFAQsPage.tsx
│   │       │   └── EventNotFoundPage.tsx
│   │       └── layouts/
│   │           ├── EventMainLayout.tsx
│   │           ├── EventPageLayout.tsx
│   │           └── EventLayout.tsx
│   ├── shared/         # Componentes y utilidades compartidas
│   │   ├── ui/                  # shadcn/ui components base
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── Layout.tsx
│   │   ├── common/
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Button.tsx
│   │   │   └── Toast.tsx
│   │   ├── hooks/
│   │   │   ├── useApi.ts
│   │   │   ├── useScrollAnimation.ts
│   │   │   └── useLocalStorage.ts
│   │   ├── services/
│   │   │   ├── api.service.ts
│   │   │   └── analytics.service.ts
│   │   ├── types/
│   │   │   ├── api.types.ts
│   │   │   └── common.types.ts
│   │   └── lib/
│   │       ├── utils.ts
│   │       ├── constants.ts
│   │       ├── validations.ts
│   │       ├── formatters.ts
│   │       └── api-client.ts
│   ├── config/         # Configuración de la plataforma
│   │   ├── env.ts
│   │   ├── api.config.ts
│   │   └── app.config.ts
│   ├── styles/         # Estilos globales
│   │   ├── globals.css
│   │   ├── components.css
│   │   ├── event-theme.css      # 🎯 EVENTO: Tema específico del evento
│   │   └── animations.css
│   ├── App.tsx
│   ├── main.tsx
│   └── router.tsx
├── .trae/
│   └── rules/
│       └── project_rules.md
├── docs/
│   ├── README.md
│   ├── API.md
│   └── DEPLOYMENT.md
├── .env.local
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

## 🌐 Sistema de Rutas (Screaming Architecture)

### 🎯 Rutas Simplificadas

```typescript
// Rutas básicas del proyecto
/                           -> Landing page principal del evento (EventHomePage)
/404                        -> Página no encontrada (EventNotFoundPage)
```

### 🏗️ Arquitectura de Rutas Simplificada

Por el momento, el proyecto mantendrá una estructura de rutas mínima:

- **`/`** → Landing page principal con todas las secciones integradas
- **`/404`** → Página de error para rutas no encontradas

**Nota**: Las rutas específicas para speakers, schedule, sponsors, communities y register podrán ser implementadas en el futuro según las necesidades del proyecto.

## 🔌 Integración con APIs Externas

**Arquitectura API-First**:

- **Separación de Responsabilidades**: Frontend consume APIs, no maneja datos directamente
- **Estado del Servidor**: React Query para cache, sincronización y estado
- **Error Handling**: Manejo robusto de errores de red y API
- **Loading States**: Estados de carga para mejor UX
- **Offline Support**: Cache local para funcionalidad básica sin conexión

**APIs a Consumir**:

### 1. **Event Speakers API**

```typescript
// Endpoints para speakers del evento
GET /api/event/speakers              -> Lista de speakers del evento
GET /api/event/speakers/:id          -> Detalle de speaker específico
GET /api/event/speakers/featured     -> Speakers destacados
GET /api/event/speakers/keynote      -> Keynote speakers

// Query Parameters para /api/event/speakers
// ?limit=10                          -> Límite de resultados (por defecto: 10)
// ?sort=name                         -> Ordenamiento (name, -name, featured, -featured)
// ?page=1                            -> Número de página (por defecto: 1)

// Estructura de respuesta de la API
interface EventSpeakersResponse {
  docs: EventSpeaker[];
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

interface EventSpeaker {
  id: string;
  event: string;                    // ID del evento
  name: string;
  title: string;
  company: string;
  bio: string;
  avatar: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  featured: boolean;
  keynote: boolean;
  track: 'frontend' | 'backend' | 'mobile' | 'ai' | 'devops' | 'general';
  experienceLevel: 'junior' | 'mid' | 'senior' | 'expert';
  eventBadge?: string; // Badge especial para el evento
  order?: number;                   // Orden de visualización
  isActive?: boolean;               // Si está activo
  createdAt: string;                // Fecha de creación
  updatedAt: string;                // Fecha de actualización
}
```

### 2. **Event Schedule API**

```typescript
// Endpoints para agenda del evento
GET /api/event/schedule              -> Agenda completa del evento
GET /api/event/schedule/day/:date    -> Agenda por día específico
GET /api/event/sessions/:id          -> Detalle de sesión específica
GET /api/event/schedule/track/:track -> Sesiones por track tecnológico
GET /api/event/schedule/live         -> Sesiones en vivo ahora

// Query Parameters para /api/event/schedule
// ?limit=10                          -> Límite de resultados (por defecto: 10)
// ?sort=startTime                    -> Ordenamiento (startTime, -startTime, title, -title)
// ?page=1                            -> Número de página (por defecto: 1)

// Estructura de respuesta de la API
interface EventScheduleResponse {
  docs: EventSession[];
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

interface EventSession {
  id: string;
  event: string;                    // ID del evento
  title: string;
  description: string;
  type: 'keynote' | 'talk' | 'workshop' | 'panel' | 'networking' | 'break';
  startTime: string;
  endTime: string;
  date: string;
  room: string;
  eventSpeakers: string[]; // IDs de speakers del evento
  tags: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
  track: 'frontend' | 'backend' | 'mobile' | 'ai' | 'devops' | 'general';
  isLive: boolean;
  eventDay: 1 | 2 | 3; // Día del evento
  registrationRequired: boolean;
  order?: number;                   // Orden en la agenda
  isActive?: boolean;               // Si está activa
  createdAt: string;                // Fecha de creación
  updatedAt: string;                // Fecha de actualización
}
```

### 3. **Event Sponsors API**

```typescript
// Endpoints para sponsors del evento
GET /api/event/sponsors              -> Lista de sponsors del evento
GET /api/event/sponsors/tier/:tier   -> Sponsors por nivel
GET /api/event/sponsors/featured     -> Sponsors destacados

// Query Parameters para /api/event/sponsors
// ?limit=10                          -> Límite de resultados (por defecto: 10)
// ?sort=tier                         -> Ordenamiento (tier, -tier, name, -name)
// ?page=1                            -> Número de página (por defecto: 1)

// Estructura de respuesta de la API
interface EventSponsorsResponse {
  docs: EventSponsor[];
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

interface EventSponsor {
  id: string;
  event: string;                    // ID del evento
  name: string;
  logo: string;
  website: string;
  description: string;
  tier: 'title' | 'platinum' | 'gold' | 'silver' | 'bronze' | 'community';
  benefits: string[];
  eventBooth?: string; // Ubicación del booth en el evento
  eventTalks?: string[]; // IDs de charlas patrocinadas
  featured: boolean;
  logoVariants: {
    light: string;
    dark: string;
    square: string;
  };
  contactInfo?: {
    email: string;
    recruiter?: string;
  };
  order?: number;                   // Orden dentro del tier
  isActive?: boolean;               // Si está activo
  createdAt: string;                // Fecha de creación
  updatedAt: string;                // Fecha de actualización
}
```

### 4. **Event Communities API**

```typescript
// Endpoints para comunidades del evento
GET /api/event/communities           -> Lista de comunidades del evento
GET /api/event/communities/featured  -> Comunidades destacadas
GET /api/event/communities/local     -> Comunidades locales participantes

// Query Parameters para /api/event/communities
// ?limit=10                          -> Límite de resultados (por defecto: 10)
// ?sort=name                         -> Ordenamiento (name, -name, type, -type)
// ?page=1                            -> Número de página (por defecto: 1)

// Estructura de respuesta de la API
interface EventCommunitiesResponse {
  docs: EventCommunity[];
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

interface EventCommunity {
  id: string;
  event: string;                    // ID del evento
  name: string;
  logo: string;
  description: string;
  website: string;
  social: {
    twitter?: string;
    linkedin?: string;
    discord?: string;
    telegram?: string;
    instagram?: string;
    youtube?: string;
  };
  memberCount: number;
  eventRole: 'organizer' | 'sponsor' | 'partner' | 'participant';
  featured: boolean;
  local: boolean;
  eventActivities?: string[]; // Actividades en el evento
  establishedYear?: number;
  focus: string[]; // Áreas de enfoque tecnológico
  order?: number;                   // Orden de visualización
  isActive?: boolean;               // Si está activa
  createdAt: string;                // Fecha de creación
  updatedAt: string;                // Fecha de actualización
}
```

### 5. **Event Registration API**

```typescript
// Endpoints para el evento y registro
GET /api/event/info                 -> Información general del evento
POST /api/event/registrations        -> Crear nuevo registro
GET /api/event/registrations         -> Obtener registros (admin)
GET /api/event/registrations/stats   -> Estadísticas públicas
GET /api/event/countdown       -> Countdown hasta el evento
GET /api/event/live-status     -> Estado en vivo del evento

// Query Parameters para /api/event/registrations
// ?limit=10                          -> Límite de resultados (por defecto: 10)
// ?sort=-registeredAt                -> Ordenamiento (-registeredAt, registeredAt, email, -email)
// ?page=1                            -> Número de página (por defecto: 1)

// Estructura de respuesta para POST /api/event/registrations
interface EventRegistrationResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    event: string;                  // ID del evento
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    company?: string;
    role?: string;
    experience: 'student' | 'junior' | 'mid' | 'senior' | 'expert';
    interests: string[]; // Tracks de interés
    motivation?: string; // Por qué quiere asistir al evento
    dietaryRestrictions?: string;
    tshirtSize?: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
    agreeToCodeOfConduct: boolean;
    agreeToPhotography: boolean;
    wantsNetworking: boolean;
    linkedin?: string;
    github?: string;
    confirmationCode: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    registeredAt: string;
    createdAt: string;
    updatedAt: string;
  };
  errors?: string[];
}

// Estructura de respuesta para GET /api/event/registrations
interface EventRegistrationsResponse {
  docs: EventRegistration[];
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

// Estructura de datos para el evento
interface EventInfo {
  id: string;
  name: string;
  description: string;
  tagline: string;
  startDate: string;
  endDate: string;
  location: {
    venue: string;
    address: string;
    city: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  registrationOpen: boolean;
  maxAttendees: number;
  currentAttendees: number;
  edition: number; // Edición del evento
  tracks: string[]; // Tracks tecnológicos disponibles
  days: number; // Duración en días
  isLive: boolean;
  streamingUrl?: string;
  socialHashtag: string;
}

interface EventRegistration {
  id: string;
  event: string;                    // ID del evento
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  role?: string;
  experience: 'student' | 'junior' | 'mid' | 'senior' | 'expert';
  interests: string[]; // Tracks de interés
  motivation?: string; // Por qué quiere asistir al evento
  dietaryRestrictions?: string;
  tshirtSize?: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  agreeToCodeOfConduct: boolean;
  agreeToPhotography: boolean;
  wantsNetworking: boolean;
  linkedin?: string;
  github?: string;
  confirmationCode: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  registeredAt: string;
  createdAt: string;
  updatedAt: string;
}
```

### 6. **Event FAQs API**

```typescript
// Endpoints para preguntas frecuentes del evento
GET /api/event/faqs                  -> Lista de FAQs del evento
GET /api/event/faqs/search           -> Búsqueda en FAQs
GET /api/event/faqs/category/:cat    -> FAQs por categoría

// Query Parameters para /api/event/faqs
// ?limit=10                          -> Límite de resultados (por defecto: 10)
// ?sort=order                        -> Ordenamiento (order, -order, question, -question)
// ?page=1                            -> Número de página (por defecto: 1)

// Estructura de respuesta de la API
interface EventFAQsResponse {
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

interface EventFAQ {
  id: string;
  event: string;                    // ID del evento
  question: string;                 // Pregunta
  answer: string;                   // Respuesta
  category?: string;                // Categoría (registro, evento, logística, etc.)
  order?: number;                   // Orden de visualización
  isActive?: boolean;               // Si está activa
  createdAt: string;                // Fecha de creación
  updatedAt: string;                // Fecha de actualización
}

// Ejemplo de respuesta de la API
/*
{
  "docs": [
    {
      "id": "674607fea27a06b25060f40b",
      "event": "6719a838b36f370612d35463",
      "question": "¿Necesito llevar mi entrada impresa?",
      "answer": "No es necesario llevar la entrada impresa, te recomendamos bajar el app del eventbrite y podrás mostrar tu entrada mediante el QR.",
      "category": "registro",
      "order": 1,
      "isActive": true,
      "createdAt": "2024-11-26T17:40:14.464Z",
      "updatedAt": "2024-11-26T17:40:14.464Z"
    }
  ],
  "totalDocs": 7,
  "limit": 7,
  "totalPages": 1,
  "page": 1,
  "pagingCounter": 1,
  "hasPrevPage": false,
  "hasNextPage": false,
  "prevPage": null,
  "nextPage": null
}
*/
```

## 🎯 Funcionalidades que Gritan el Evento Principal (Screaming Architecture)

### 🏛️ Características Específicas del Evento

**Landing Page Principal**:

- **Event Hero Section**: Countdown dinámico hasta el evento
- **Event Speakers Showcase**: Grid de speakers con badges específicos del evento
- **Event Schedule Timeline**: Agenda visual con tracks tecnológicos
- **Event Sponsors Spotlight**: Showcase de patrocinadores con tiers específicos
- **Event Communities Hub**: Comunidades participantes y organizadoras
- **Event Registration CTA**: Call-to-action prominente para registro

**Página Principal del Evento**:

- **Landing Page Única**: Todas las secciones integradas en una sola página
  - **Sección Speakers**: Grid de speakers destacados con información esencial
  - **Sección Schedule**: Vista previa de la agenda con sesiones principales
  - **Sección Sponsors**: Showcase de patrocinadores organizados por tiers
  - **Sección Communities**: Showcase de comunidades participantes
  - **Sección Register**: Formulario de registro integrado o modal

**Componentes que Gritan el Dominio**:

- **`EventCountdown`**: Contador regresivo hasta el evento
- **`EventLiveStatus`**: Indicador de estado en vivo durante el evento
- **`EventSpeakerCard`**: Tarjeta de speaker con información específica
- **`EventSessionCard`**: Tarjeta de sesión con tracks y niveles
- **`EventSponsorTier`**: Componente de tier de patrocinador
- **`EventRegistrationForm`**: Formulario específico con validaciones del evento

**Hooks Específicos del Evento**:

- **`useEventSpeakers()`**: Manejo de estado de speakers
- **`useEventSchedule()`**: Manejo de agenda y sesiones
- **`useEventRegistration()`**: Manejo del proceso de registro
- **`useEventCountdown()`**: Lógica del countdown
- **`useEventLiveStatus()`**: Estado en vivo del evento
- **`useEventFAQs()`**: Hook para obtener preguntas frecuentes
- **`useFAQSearch()`**: Hook para búsqueda en FAQs

**Servicios del Dominio**:

- **`event-speakers.service.ts`**: Lógica de negocio de speakers
- **`event-schedule.service.ts`**: Lógica de agenda y sesiones
- **`event-registration.service.ts`**: Lógica de registro
- **`event-faqs.service.ts`**: Servicio de preguntas frecuentes
- **`event-analytics.service.ts`**: Analytics específicos del evento

## 🎨 Diseño y Tema

**Tema**: Dark mode como tema principal con opción de tema claro.

**Paleta de Colores**:

- **Primario**: Amarillo/Dorado (#FFC700) - Para CTAs y elementos destacados
- **Secundario**: Azul vibrante (#0052CC) - Para enlaces y elementos interactivos
- **Fondo**: Azul oscuro (#0A0A1A) - Fondo principal
- **Superficie**: Gris oscuro (#1A1A2E) - Cards y contenedores
- **Texto Principal**: Blanco (#FFFFFF)
- **Texto Secundario**: Gris claro (#A1A1AA)
- **Éxito**: Verde (#10B981)
- **Error**: Rojo (#EF4444)
- **Advertencia**: Naranja (#F97316)

**Tipografía**:

- **Principal**: "Inter" - Para texto general
- **Títulos**: "Poppins" - Para headings
- **Código**: "JetBrains Mono" - Para elementos de código

**Componentes de Diseño**:

- **Cards**: Bordes redondeados, sombras sutiles
- **Botones**: Estados hover y focus claros
- **Formularios**: Validación visual en tiempo real
- **Navegación**: Sticky header con scroll suave
- **Animaciones**: Transiciones fluidas y naturales

## 📱 Funcionalidades Específicas

**Landing Page Principal (`/`)**:

1. **Hero Section**:

   - Título principal "CS WEEK 2025"
   - Fechas del evento
   - Botón CTA de registro
   - Video/imagen de fondo

2. **About Section**:

   - Descripción del evento
   - Objetivos y temáticas
   - Estadísticas (speakers, asistentes, etc.)

3. **Featured Speakers**:

   - Grid de speakers
   - Enlace a página completa de speakers

4. **Schedule Preview**:

   - Resumen de la agenda
   - Sesiones destacadas
   - Enlace a agenda completa

5. **Sponsors Section**:

   - Logos por tiers
   - Reconocimiento de patrocinadores

6. **Communities Section**:

   - Comunidades participantes
   - Enlaces a redes sociales

7. **Registration CTA**:
   - Formulario de registro rápido
   - Contador de cupos disponibles

**Secciones Integradas en la Landing Page**:

- **Hero Section**: Información principal del evento con CTA de registro
- **Speakers Section**: Grid de speakers destacados con información esencial
- **Schedule Section**: Vista previa de la agenda con sesiones principales
- **Sponsors Section**: Showcase de patrocinadores organizados por tiers
- **Communities Section**: Showcase de comunidades participantes
- **Registration Section**: Formulario de registro integrado o modal

**Secciones Integradas en la Landing Page**:

- **Hero Section**: Información principal del evento con CTA de registro
- **Speakers Section**: Grid de speakers destacados con información esencial
- **Schedule Section**: Vista previa de la agenda con sesiones principales
- **Sponsors Section**: Showcase de patrocinadores organizados por tiers
- **Communities Section**: Showcase de comunidades participantes
- **FAQs Section**: Preguntas frecuentes con búsqueda y acordeón interactivo
- **Registration Section**: Formulario de registro integrado o modal

**Funcionalidades del Sistema**:

- **Responsive Design**: Mobile-first, optimizado para todos los dispositivos
- **Progressive Web App**: Instalable, funciona offline
- **SEO Optimizado**: Meta tags dinámicos, structured data
- **Performance**: Lazy loading, code splitting, optimización de imágenes
- **Accessibility**: WCAG 2.1 AA compliance
- **Analytics**: Google Analytics 4 integrado
- **Error Handling**: Páginas de error personalizadas
- **Loading States**: Skeletons y spinners para mejor UX

## 🔧 Configuración y Variables de Entorno

```bash
# .env.local
VITE_API_BASE_URL=https://api.csweek2025.com
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
VITE_SENTRY_DSN=https://xxx@sentry.io/xxx
VITE_APP_NAME="CS WEEK 2025"
```

## 🧪 Testing y Calidad

**Estrategia de Testing**:

- **Unit Tests**: Obligatorios para lógica de negocio y componentes individuales

  - Framework: Jest + React Testing Library
  - Cobertura: Componentes, hooks, servicios y utilidades
  - Mocking: APIs externas usando MSW (Mock Service Worker)

- **Integration Tests**: Para asegurar que los módulos interactúan correctamente

  - Testing de flujos completos entre componentes
  - Validación de integración con APIs mockeadas
  - Testing de estado global y context providers

- **End-to-End (E2E) Tests**: Para simular flujos completos de usuario

  - Framework: Cypress
  - Scenarios: Registro, navegación, interacciones principales
  - Testing en múltiples navegadores y dispositivos

- **Visual Tests**: Chromatic para regression testing
- **API Mocking Strategy**:
  - MSW para interceptar y mockear todas las llamadas a APIs
  - Datos de prueba realistas y consistentes
  - Simulación de estados de error y loading
  - Testing offline y manejo de errores de red

**Testing Tools Stack**:

- **Jest**: Test runner y framework de testing
- **React Testing Library**: Testing de componentes React
- **MSW (Mock Service Worker)**: Mocking de APIs
- **Cypress**: Testing E2E
- **@testing-library/jest-dom**: Matchers adicionales para DOM
- **Chromatic**: Visual regression testing

**Code Coverage**: Objetivo mínimo del 80% de cobertura de código

**Herramientas de Calidad**:

- **ESLint**: Configuración estricta con reglas de React/TypeScript
- **Prettier**: Formateo automático
- **TypeScript**: Strict mode habilitado
- **Husky**: Pre-commit hooks
- **Lighthouse**: Auditorías de performance

### 🎭 Configuración de Mocks para Testing

**Estructura de Mocks**:

```
src/
├── __mocks__/                  # Mocks globales
│   ├── api/                    # Mocks de APIs externas
│   │   ├── event-speakers.mock.ts
│   │   ├── event-schedule.mock.ts
│   │   ├── event-sponsors.mock.ts
│   │   ├── event-communities.mock.ts
│   │   ├── event-registration.mock.ts
│   │   └── event-faqs.mock.ts
│   ├── data/                   # Datos de prueba
│   │   ├── speakers.data.ts
│   │   ├── schedule.data.ts
│   │   ├── sponsors.data.ts
│   │   ├── communities.data.ts
│   │   ├── registration.data.ts
│   │   └── faqs.data.ts
│   └── handlers/               # MSW handlers
│       ├── speakers.handlers.ts
│       ├── schedule.handlers.ts
│       ├── sponsors.handlers.ts
│       ├── communities.handlers.ts
│       ├── registration.handlers.ts
│       └── faqs.handlers.ts
├── test-utils/                 # Utilidades de testing
│   ├── test-providers.tsx      # Providers para testing
│   ├── mock-server.ts          # Configuración MSW
│   ├── custom-render.tsx       # Render personalizado
│   └── test-helpers.ts         # Helpers de testing
```

**Mock Data Examples**:

```typescript
// src/__mocks__/data/speakers.data.ts
export const mockEventSpeakers: EventSpeaker[] = [
  {
    id: "speaker-1",
    name: "Ana García",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    bio: "Experta en React y TypeScript con 8 años de experiencia...",
    avatar:
      "https://drive.google.com/drive/folders/1LYSWoFxdKCZTOcVQRjb-XiVCpxAdYYEZ",
    social: {
      twitter: "@anagarcia_dev",
      linkedin: "ana-garcia-dev",
      github: "anagarcia",
    },
    featured: true,
    keynote: false,
    track: "frontend",
    experienceLevel: "senior",
    eventBadge: "CS WEEK 2025 Speaker",
  },
  // ... más speakers mock
];

// src/__mocks__/data/faqs.data.ts
export const mockEventFAQs: EventFAQsResponse = {
  docs: [
    {
      id: "674607fea27a06b25060f40b",
      event: "6719a838b36f370612d35463",
      question: "¿Necesito llevar mi entrada impresa?",
      answer:
        "No es necesario llevar la entrada impresa, te recomendamos bajar el app del eventbrite y podrás mostrar tu entrada mediante el QR.",
      category: "registro",
      order: 1,
      isActive: true,
      createdAt: "2024-11-26T17:40:14.464Z",
      updatedAt: "2024-11-26T17:40:14.464Z",
    },
    {
      id: "674607dda27a06b25060f3d3",
      event: "6719a838b36f370612d35463",
      question: "¿Necesito llevar mi DNI para acceder al evento?",
      answer:
        "Sí, se requiere presentar un documento de identidad válido para acceder al evento.",
      category: "acceso",
      order: 2,
      isActive: true,
      createdAt: "2024-11-26T17:39:41.779Z",
      updatedAt: "2024-11-26T17:39:41.779Z",
    },
    {
      id: "674607c8a27a06b25060f39b",
      event: "6719a838b36f370612d35463",
      question: "¿Hay estacionamiento disponible?",
      answer:
        "Sí, el venue cuenta con estacionamiento gratuito para los asistentes.",
      category: "logistica",
      order: 3,
      isActive: true,
      createdAt: "2024-11-26T17:39:20.123Z",
      updatedAt: "2024-11-26T17:39:20.123Z",
    },
  ],
  totalDocs: 7,
  limit: 7,
  totalPages: 1,
  page: 1,
  pagingCounter: 1,
  hasPrevPage: false,
  hasNextPage: false,
  prevPage: null,
  nextPage: null,
};

// src/__mocks__/api/event-speakers.mock.ts
import { mockEventSpeakers } from "../data/speakers.data";

export const eventSpeakersApiMock = {
  getAllSpeakers: jest.fn().mockResolvedValue(mockEventSpeakers),
  getSpeakerById: jest
    .fn()
    .mockImplementation((id: string) =>
      Promise.resolve(mockEventSpeakers.find((s) => s.id === id))
    ),
  getFeaturedSpeakers: jest
    .fn()
    .mockResolvedValue(mockEventSpeakers.filter((s) => s.featured)),
  getKeynoteSpeakers: jest
    .fn()
    .mockResolvedValue(mockEventSpeakers.filter((s) => s.keynote)),
};

// src/__mocks__/api/event-faqs.mock.ts
import { mockEventFAQs } from "../data/faqs.data";

export const eventFAQsApiMock = {
  getAllFAQs: jest.fn().mockResolvedValue(mockEventFAQs),
  searchFAQs: jest.fn().mockImplementation((query: string) => {
    const filteredDocs = mockEventFAQs.docs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query.toLowerCase()) ||
        faq.answer.toLowerCase().includes(query.toLowerCase())
    );
    return Promise.resolve({
      ...mockEventFAQs,
      docs: filteredDocs,
      totalDocs: filteredDocs.length,
    });
  }),
  getFAQsByCategory: jest.fn().mockImplementation((category: string) => {
    const filteredDocs = mockEventFAQs.docs.filter(
      (faq) => faq.category === category
    );
    return Promise.resolve({
      ...mockEventFAQs,
      docs: filteredDocs,
      totalDocs: filteredDocs.length,
    });
  }),
};
```

**MSW (Mock Service Worker) Setup**:

```typescript
// src/test-utils/mock-server.ts
import { setupServer } from "msw/node";
import { speakersHandlers } from "../__mocks__/handlers/speakers.handlers";
import { scheduleHandlers } from "../__mocks__/handlers/schedule.handlers";
import { sponsorsHandlers } from "../__mocks__/handlers/sponsors.handlers";
import { communitiesHandlers } from "../__mocks__/handlers/communities.handlers";
import { registrationHandlers } from "../__mocks__/handlers/registration.handlers";
import { faqsHandlers } from "../__mocks__/handlers/faqs.handlers";

export const server = setupServer(
  ...speakersHandlers,
  ...scheduleHandlers,
  ...sponsorsHandlers,
  ...communitiesHandlers,
  ...registrationHandlers,
  ...faqsHandlers
);

// src/__mocks__/handlers/speakers.handlers.ts
import { rest } from "msw";
import { mockEventSpeakers } from "../data/speakers.data";

export const speakersHandlers = [
  rest.get("/api/event/speakers", (req, res, ctx) => {
    return res(ctx.json(mockEventSpeakers));
  }),

  rest.get("/api/event/speakers/:id", (req, res, ctx) => {
    const { id } = req.params;
    const speaker = mockEventSpeakers.find((s) => s.id === id);

    if (!speaker) {
      return res(ctx.status(404), ctx.json({ error: "Speaker not found" }));
    }

    return res(ctx.json(speaker));
  }),

  rest.get("/api/event/speakers/featured", (req, res, ctx) => {
    const featured = mockEventSpeakers.filter((s) => s.featured);
    return res(ctx.json(featured));
  }),
];

// src/__mocks__/handlers/faqs.handlers.ts
import { rest } from "msw";
import { mockEventFAQs } from "../data/faqs.data";

export const faqsHandlers = [
  rest.get("/api/event/faqs", (req, res, ctx) => {
    const url = new URL(req.url);
    const search = url.searchParams.get("search");
    const category = url.searchParams.get("category");

    let filteredDocs = mockEventFAQs.docs;

    if (search) {
      filteredDocs = filteredDocs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(search.toLowerCase()) ||
          faq.answer.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filteredDocs = filteredDocs.filter((faq) => faq.category === category);
    }

    return res(
      ctx.json({
        ...mockEventFAQs,
        docs: filteredDocs,
        totalDocs: filteredDocs.length,
      })
    );
  }),

  rest.get("/api/event/faqs/search", (req, res, ctx) => {
    const url = new URL(req.url);
    const query = url.searchParams.get("q") || "";

    const filteredDocs = mockEventFAQs.docs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query.toLowerCase()) ||
        faq.answer.toLowerCase().includes(query.toLowerCase())
    );

    return res(
      ctx.json({
        ...mockEventFAQs,
        docs: filteredDocs,
        totalDocs: filteredDocs.length,
      })
    );
  }),

  rest.get("/api/event/faqs/category/:category", (req, res, ctx) => {
    const { category } = req.params;

    const filteredDocs = mockEventFAQs.docs.filter(
      (faq) => faq.category === category
    );

    if (filteredDocs.length === 0) {
      return res(
        ctx.status(404),
        ctx.json({ error: "No FAQs found for this category" })
      );
    }

    return res(
      ctx.json({
        ...mockEventFAQs,
        docs: filteredDocs,
        totalDocs: filteredDocs.length,
      })
    );
  }),
];
```

**Testing Configuration**:

```typescript
// jest.config.js
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/test-utils/jest.setup.ts"],
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/test-utils/**",
    "!src/__mocks__/**",
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

// src/test-utils/jest.setup.ts
import "@testing-library/jest-dom";
import { server } from "./mock-server";

// Establecer MSW
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

**Custom Render para Testing**:

```typescript
// src/test-utils/custom-render.tsx
import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
```

## 🚀 Deployment y DevOps

**Ambientes**:

- **Development**: Local con Vite dev server
- **Staging**: Preview deployments en Vercel
- **Production**: Deployment automático desde main branch

**CI/CD Pipeline**:

- **GitHub Actions**: Testing, building, deployment
- **Vercel**: Hosting y preview deployments
- **Performance Monitoring**: Core Web Vitals tracking

**Optimizaciones**:

- **Bundle Analysis**: Webpack Bundle Analyzer
- **Image Optimization**: Next.js Image component o similar
- **Caching**: Service Worker para assets estáticos
- **CDN**: Vercel Edge Network

## 📊 Métricas y Monitoreo

**KPIs del Proyecto**:

- **Performance**: Core Web Vitals > 90
- **Conversión**: % de visitantes que se registran
- **Engagement**: Tiempo promedio en página
- **Bounce Rate**: < 40%
- **Mobile Usage**: % de tráfico móvil

**Herramientas de Monitoreo**:

- **Google Analytics 4**: Comportamiento de usuarios
- **Vercel Analytics**: Performance y vitals
- **Sentry**: Error tracking y monitoring
- **Hotjar**: Heatmaps y user recordings (opcional)

## 🔒 Seguridad y Best Practices

**Seguridad**:

- **Input Validation**: Zod schemas para validación
- **XSS Protection**: Sanitización de contenido
- **HTTPS**: Forzar conexiones seguras
- **CSP Headers**: Content Security Policy
- **Rate Limiting**: En formularios de registro

**Best Practices**:

- **Code Splitting**: Por rutas y componentes
- **Lazy Loading**: Imágenes y componentes
- **Error Boundaries**: Manejo de errores de React
- **Semantic HTML**: Estructura accesible
- **Progressive Enhancement**: Funcionalidad básica sin JS

## 🎯 Sugerencias de Mejoras y Capacitación

### 📚 **Áreas de Capacitación Recomendadas**:

1. **React Query (TanStack Query)**:

   - Manejo de estado del servidor
   - Cache strategies y invalidación
   - Optimistic updates
   - Background refetching

2. **TypeScript Avanzado**:

   - Utility types y generics
   - Type guards y narrowing
   - Module augmentation
   - Conditional types

3. **Performance Optimization**:

   - React.memo y useMemo
   - Code splitting strategies
   - Bundle analysis
   - Image optimization

4. **Testing Strategies**:

   - Testing Library best practices
   - MSW para API mocking
   - E2E testing con Cypress
   - Visual regression testing

5. **Accessibility (A11y)**:
   - ARIA patterns
   - Keyboard navigation
   - Screen reader testing
   - Color contrast y focus management

### 🚀 **Mejoras Sugeridas para el Proyecto**:

1. **Funcionalidades Adicionales**:

   - **PWA Features**: Notificaciones push, instalación
   - **Offline Mode**: Cache de contenido crítico
   - **Social Sharing**: Open Graph optimizado
   - **Multi-language**: i18n para español/inglés
   - **Dark/Light Theme**: Toggle de tema

2. **Integraciones Avanzadas**:

   - **Calendar Integration**: Agregar evento a calendario
   - **QR Codes**: Para registro rápido
   - **Live Chat**: Soporte en tiempo real
   - **Newsletter**: Integración con Mailchimp/ConvertKit
   - **Social Login**: OAuth con Google/GitHub

3. **Analytics Avanzados**:

   - **Conversion Funnels**: Tracking de registro
   - **Heatmaps**: Análisis de comportamiento
   - **A/B Testing**: Optimización de conversión
   - **Real User Monitoring**: Performance en producción

4. **Optimizaciones Técnicas**:
   - **Server-Side Rendering**: Mejor SEO con Next.js
   - **Edge Functions**: API routes optimizadas
   - **Image CDN**: Optimización automática
   - **Micro-frontends**: Escalabilidad futura

### 🎓 **Plan de Aprendizaje Sugerido**:

**Semana 1-2**: Fundamentos

- React Query básico
- TypeScript intermedio
- Testing con React Testing Library

**Semana 3-4**: Intermedio

- Performance optimization
- Accessibility fundamentals
- API integration patterns

**Semana 5-6**: Avanzado

- Advanced React patterns
- E2E testing
- Deployment strategies

**Recursos Recomendados**:

- [React Query Documentation](https://tanstack.com/query/latest)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Testing Library Docs](https://testing-library.com/docs/)
- [Web.dev Performance](https://web.dev/performance/)
- [A11y Project](https://www.a11yproject.com/)

---

**Versión**: 1.7.0  
**Proyecto**: Event Landing Page Template - Screaming Architecture  
**Enfoque**: Arquitectura que Grita el Dominio del Evento (Reutilizable)  
**Última Actualización**: Simplificación de Query Parameters y Configuración de Paginación por Defecto
