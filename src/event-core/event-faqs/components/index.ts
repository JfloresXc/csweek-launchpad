/**
 * Exportaciones de componentes del módulo Event FAQs
 * Componentes para mostrar, buscar y gestionar preguntas frecuentes del evento
 */

export { EventFAQCard } from './EventFAQCard';
export { EventFAQList } from './EventFAQList';
export { EventFAQAccordion } from './EventFAQAccordion';
export { EventFAQSearch } from './EventFAQSearch';

// Re-exportar tipos relacionados con componentes
export type {
  EventFAQCardProps,
  EventFAQListProps,
  EventFAQAccordionProps,
  EventFAQSearchProps
} from '../types/event-faq.types';