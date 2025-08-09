/**
 * Módulo Event Registration - CS WEEK 2025
 * 
 * Este módulo maneja todas las funcionalidades relacionadas con el registro al evento,
 * incluyendo formularios, validación, confirmación y gestión de participantes.
 * 
 * Características principales:
 * - Formulario de registro multi-paso con validación
 * - Componentes CTA para promover el registro
 * - Gestión de tipos de tickets y precios
 * - Verificación y confirmación de registros
 * - Check-in de participantes
 * - Estadísticas de registro
 * - Integración con APIs para datos dinámicos
 */

// Componentes
export {
  EventRegistrationForm,
  EventRegistrationCTA
} from './components';

// Hooks
export {
  useEventRegistration,
  useRegistrationVerification,
  useRegistrationDetails,
  useUpdateRegistration,
  useCancelRegistration,
  useRegistrationStats,
  useTicketPricing,
  useRegistrationValidation,
  useCheckIn,
  useRegistrationsList,
  useResendConfirmation,
  useRegistrationPage,
  useRegistrationForm,
  useRegistrationFilters
} from './hooks/useEventRegistration';

// Servicios
export {
  EventRegistrationService,
  eventRegistrationUtils
} from './services/event-registration.service';

// Tipos
export type {
  EventRegistrationResponse,
  EventRegistration,
  EventRegistrationFormData,
  EventRegistrationQueryParams,
  EventRegistrationState,
  EventRegistrationStats,
  RegistrationValidation,
  TicketPricing,
  EventRegistrationPageData,
  RegistrationVerificationResponse,
  CheckInData,
  CheckInResponse,
  RegistrationStatus,
  TicketType,
  ExperienceLevel,
  DietaryRestriction,
  TShirtSize,
  EventRegistrationFormProps,
  EventRegistrationCTAProps
} from './types/event-registration.types';