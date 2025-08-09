/**
 * Event Core - CS WEEK 2025
 * 
 * Módulo principal que agrupa todas las funcionalidades relacionadas con el evento CS WEEK 2025.
 * Implementa una arquitectura "Screaming Architecture" donde la estructura del proyecto
 * grita claramente su propósito: una landing page para CS WEEK 2025.
 * 
 * Módulos incluidos:
 * - event-config: Configuración del evento (fechas, ubicación, tema)
 * - event-speakers: Gestión de speakers y ponentes
 * - event-schedule: Agenda y horarios del evento
 * - event-sponsors: Patrocinadores y colaboradores
 * - event-communities: Comunidades participantes
 * - event-registration: Sistema de registro al evento
 * - event-faqs: Preguntas frecuentes
 * - event-landing: Páginas y secciones de la landing page
 */

// Módulo de configuración del evento
export * from './event-config';

// Módulo de speakers
export * from './event-speakers';

// Módulo de agenda/horarios
export * from './event-schedule';

// Módulo de patrocinadores
export * from './event-sponsors';

// Módulo de comunidades
export * from './event-communities';

// Módulo de registro
export * from './event-registration';

// Módulo de FAQs
export * from './event-faqs';

// Módulo de landing page
export * from './event-landing';

// Re-exportaciones específicas para facilitar el uso
// Componentes más utilizados
export {
  // Speakers
  EventSpeakerCard,
  EventSpeakerGrid,
  EventFeaturedSpeakers
} from './event-speakers';

export {
  // Schedule
  EventScheduleCard,
  EventScheduleTimeline,
  EventDaySchedule
} from './event-schedule';

export {
  // Sponsors
  EventSponsorCard,
  EventSponsorGrid,
  EventSponsorShowcase
} from './event-sponsors';

export {
  // Communities
  EventCommunityCard,
  EventCommunityGrid,
  EventCommunityShowcase
} from './event-communities';

export {
  // Registration
  EventRegistrationForm,
  EventRegistrationCTA
} from './event-registration';

export {
  // FAQs
  EventFAQCard,
  EventFAQList,
  EventFAQAccordion,
  EventFAQSearch
} from './event-faqs';

// Hooks más utilizados
export {
  // Speakers
  useEventSpeakers,
  useSpeakerDetails
} from './event-speakers';

export {
  // Schedule
  useEventSchedule,
  useSessionDetails
} from './event-schedule';

export {
  // Sponsors
  useEventSponsors
} from './event-sponsors';

export {
  // Communities
  useEventCommunities
} from './event-communities';

export {
  // Registration
  useEventRegistration,
  useRegistrationForm
} from './event-registration';

export {
  // FAQs
  useEventFAQs,
  useAdvancedFAQs,
  useFAQSearch
} from './event-faqs';

// Servicios principales
export {
  EventSpeakersService,
  eventSpeakersUtils
} from './event-speakers';

export {
  EventScheduleService,
  eventScheduleUtils
} from './event-schedule';

export {
  EventSponsorsService,
  eventSponsorsUtils
} from './event-sponsors';

export {
  EventCommunitiesService,
  eventCommunitiesUtils
} from './event-communities';

export {
  EventRegistrationService,
  eventRegistrationUtils
} from './event-registration';

export {
  EventFAQsService,
  eventFAQsUtils
} from './event-faqs';