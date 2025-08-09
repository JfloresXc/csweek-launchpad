/**
 * Exportaciones de componentes del módulo Event Registration
 * Componentes para registro, formularios y CTAs del evento
 */

export { EventRegistrationForm } from './EventRegistrationForm';
export { EventRegistrationCTA } from './EventRegistrationCTA';

// Re-exportar tipos relacionados con componentes
export type {
  EventRegistrationFormProps,
  EventRegistrationCTAProps
} from '../types/event-registration.types';