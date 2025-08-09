import { EventTrack } from '../../event-config/event.config';

// Estructura de respuesta de la API de registration
export interface EventRegistrationResponse {
  success: boolean;
  message: string;
  registrationId?: string;
  confirmationCode?: string;
  qrCode?: string;
  ticketUrl?: string;
}

// Interfaz principal del registro del evento
export interface EventRegistration {
  id: string;
  event: string; // ID del evento
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  experienceLevel: 'student' | 'junior' | 'mid' | 'senior' | 'expert';
  interests: EventTrack[];
  dietaryRestrictions?: string;
  accessibilityNeeds?: string;
  tshirtSize?: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  marketingConsent: boolean;
  termsAccepted: boolean;
  registrationType: 'general' | 'student' | 'speaker' | 'sponsor' | 'vip';
  ticketType: 'free' | 'early_bird' | 'regular' | 'premium';
  paymentStatus?: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod?: 'free' | 'credit_card' | 'bank_transfer' | 'paypal';
  registrationDate: string;
  confirmationCode: string;
  qrCode?: string;
  checkedIn?: boolean;
  checkedInAt?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Datos del formulario de registro
export interface EventRegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  experienceLevel: 'student' | 'junior' | 'mid' | 'senior' | 'expert';
  interests: EventTrack[];
  dietaryRestrictions?: string;
  accessibilityNeeds?: string;
  tshirtSize?: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  marketingConsent: boolean;
  termsAccepted: boolean;
  registrationType?: 'general' | 'student' | 'speaker' | 'sponsor' | 'vip';
  ticketType?: 'free' | 'early_bird' | 'regular' | 'premium';
}

// Parámetros de consulta para registration
export interface EventRegistrationQueryParams {
  limit?: number;
  page?: number;
  sort?: 'registrationDate' | '-registrationDate' | 'lastName' | '-lastName';
  status?: 'active' | 'inactive' | 'all';
  type?: 'general' | 'student' | 'speaker' | 'sponsor' | 'vip';
  ticketType?: 'free' | 'early_bird' | 'regular' | 'premium';
}

// Estados de carga para registration
export interface EventRegistrationState {
  registrations: EventRegistration[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
  totalPages: number;
}

// Estadísticas de registro
export interface EventRegistrationStats {
  totalRegistrations: number;
  registrationsByType: Record<string, number>;
  registrationsByTicketType: Record<string, number>;
  registrationsByExperienceLevel: Record<string, number>;
  registrationsByDay: Record<string, number>;
  checkedInCount: number;
  pendingPayments: number;
  completedPayments: number;
  conversionRate: number;
}

// Información de validación del registro
export interface RegistrationValidation {
  isValid: boolean;
  errors: Record<string, string[]>;
  warnings: Record<string, string[]>;
}

// Configuración de precios
export interface TicketPricing {
  ticketType: 'free' | 'early_bird' | 'regular' | 'premium';
  price: number;
  currency: string;
  description: string;
  features: string[];
  availableUntil?: string;
  maxQuantity?: number;
  soldOut: boolean;
}

// Datos de la página de registro
export interface EventRegistrationPageData {
  stats: EventRegistrationStats;
  pricing: TicketPricing[];
  isRegistrationOpen: boolean;
  registrationDeadline?: string;
  availableSpots?: number;
  totalCapacity: number;
  waitlistAvailable: boolean;
}

// Respuesta de verificación de registro
export interface RegistrationVerificationResponse {
  isValid: boolean;
  registration?: EventRegistration;
  message: string;
  canCheckIn: boolean;
}

// Datos para check-in
export interface CheckInData {
  registrationId: string;
  confirmationCode?: string;
  qrCode?: string;
  checkInTime: string;
  checkInLocation?: string;
}

// Respuesta de check-in
export interface CheckInResponse {
  success: boolean;
  message: string;
  registration: EventRegistration;
  welcomePackage?: {
    badge: string;
    materials: string[];
    schedule: string;
  };
}