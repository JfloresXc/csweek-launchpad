import axios from 'axios';
import {
  EventRegistrationResponse,
  EventRegistration,
  EventRegistrationFormData,
  EventRegistrationQueryParams,
  EventRegistrationStats,
  RegistrationValidation,
  TicketPricing,
  RegistrationVerificationResponse,
  CheckInData,
  CheckInResponse
} from '../types/event-registration.types';

// Configuración base de la API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.csweek2025.com';

// Cliente HTTP configurado
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // Timeout más largo para registros
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Servicio para manejar el registro de eventos
 * Implementa el patrón Singleton para garantizar una única instancia
 */
export class EventRegistrationService {
  private static instance: EventRegistrationService;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = `${API_BASE_URL}/api/event/registration`;
  }

  /**
   * Obtener instancia singleton del servicio
   */
  static getInstance(): EventRegistrationService {
    if (!EventRegistrationService.instance) {
      EventRegistrationService.instance = new EventRegistrationService();
    }
    return EventRegistrationService.instance;
  }

  /**
   * Registrar un nuevo participante
   */
  async registerForEvent(formData: EventRegistrationFormData): Promise<EventRegistrationResponse> {
    try {
      const response = await apiClient.post(this.baseUrl, formData);
      return response.data;
    } catch (error) {
      console.error('Error registering for event:', error);
      throw new Error('Failed to register for event');
    }
  }

  /**
   * Verificar un registro existente
   */
  async verifyRegistration(confirmationCode: string): Promise<RegistrationVerificationResponse> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/verify/${confirmationCode}`);
      return response.data;
    } catch (error) {
      console.error('Error verifying registration:', error);
      throw new Error('Failed to verify registration');
    }
  }

  /**
   * Obtener detalles de un registro por ID
   */
  async getRegistrationById(registrationId: string): Promise<EventRegistration> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/${registrationId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching registration:', error);
      throw new Error('Failed to fetch registration details');
    }
  }

  /**
   * Actualizar un registro existente
   */
  async updateRegistration(
    registrationId: string, 
    updateData: Partial<EventRegistrationFormData>
  ): Promise<EventRegistration> {
    try {
      const response = await apiClient.put(`${this.baseUrl}/${registrationId}`, updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating registration:', error);
      throw new Error('Failed to update registration');
    }
  }

  /**
   * Cancelar un registro
   */
  async cancelRegistration(registrationId: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await apiClient.delete(`${this.baseUrl}/${registrationId}`);
      return response.data;
    } catch (error) {
      console.error('Error canceling registration:', error);
      throw new Error('Failed to cancel registration');
    }
  }

  /**
   * Obtener estadísticas de registro
   */
  async getRegistrationStats(): Promise<EventRegistrationStats> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/stats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching registration stats:', error);
      throw new Error('Failed to fetch registration statistics');
    }
  }

  /**
   * Obtener información de precios de tickets
   */
  async getTicketPricing(): Promise<TicketPricing[]> {
    try {
      const response = await apiClient.get(`${this.baseUrl}/pricing`);
      return response.data;
    } catch (error) {
      console.error('Error fetching ticket pricing:', error);
      throw new Error('Failed to fetch ticket pricing');
    }
  }

  /**
   * Validar datos de registro
   */
  async validateRegistrationData(formData: EventRegistrationFormData): Promise<RegistrationValidation> {
    try {
      const response = await apiClient.post(`${this.baseUrl}/validate`, formData);
      return response.data;
    } catch (error) {
      console.error('Error validating registration data:', error);
      throw new Error('Failed to validate registration data');
    }
  }

  /**
   * Realizar check-in de un participante
   */
  async checkInParticipant(checkInData: CheckInData): Promise<CheckInResponse> {
    try {
      const response = await apiClient.post(`${this.baseUrl}/checkin`, checkInData);
      return response.data;
    } catch (error) {
      console.error('Error checking in participant:', error);
      throw new Error('Failed to check in participant');
    }
  }

  /**
   * Obtener lista de registros (para administradores)
   */
  async getRegistrations(params: EventRegistrationQueryParams = {}): Promise<{
    registrations: EventRegistration[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  }> {
    try {
      const queryParams = new URLSearchParams();
      
      const { limit = 10, page = 1, sort = '-registrationDate', status, type, ticketType } = params;
      
      queryParams.append('limit', limit.toString());
      queryParams.append('page', page.toString());
      queryParams.append('sort', sort);
      
      if (status) queryParams.append('status', status);
      if (type) queryParams.append('type', type);
      if (ticketType) queryParams.append('ticketType', ticketType);
      
      const response = await apiClient.get(`${this.baseUrl}?${queryParams.toString()}`);
      return {
        registrations: response.data.docs,
        pagination: {
          page: response.data.page,
          limit: response.data.limit,
          total: response.data.totalDocs,
          totalPages: response.data.totalPages,
          hasNext: response.data.hasNextPage,
          hasPrev: response.data.hasPrevPage
        }
      };
    } catch (error) {
      console.error('Error fetching registrations:', error);
      throw new Error('Failed to fetch registrations');
    }
  }

  /**
   * Enviar email de confirmación
   */
  async resendConfirmationEmail(registrationId: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await apiClient.post(`${this.baseUrl}/${registrationId}/resend-confirmation`);
      return response.data;
    } catch (error) {
      console.error('Error resending confirmation email:', error);
      throw new Error('Failed to resend confirmation email');
    }
  }
}

// Utilidades para registration
export const eventRegistrationUtils = {
  /**
   * Formatear nombre completo
   */
  formatFullName: (registration: EventRegistration): string => {
    return `${registration.firstName} ${registration.lastName}`;
  },

  /**
   * Obtener estado del registro
   */
  getRegistrationStatus: (registration: EventRegistration): {
    status: 'confirmed' | 'pending' | 'cancelled' | 'checked_in';
    label: string;
    color: string;
  } => {
    if (!registration.isActive) {
      return {
        status: 'cancelled',
        label: 'Cancelado',
        color: '#EF4444'
      };
    }
    
    if (registration.checkedIn) {
      return {
        status: 'checked_in',
        label: 'Check-in Realizado',
        color: '#10B981'
      };
    }
    
    if (registration.paymentStatus === 'pending') {
      return {
        status: 'pending',
        label: 'Pago Pendiente',
        color: '#F59E0B'
      };
    }
    
    return {
      status: 'confirmed',
      label: 'Confirmado',
      color: '#3B82F6'
    };
  },

  /**
   * Formatear tipo de ticket
   */
  formatTicketType: (ticketType: string): string => {
    const typeMap: Record<string, string> = {
      free: 'Gratuito',
      early_bird: 'Early Bird',
      regular: 'Regular',
      premium: 'Premium'
    };
    return typeMap[ticketType] || ticketType;
  },

  /**
   * Formatear nivel de experiencia
   */
  formatExperienceLevel: (level: string): string => {
    const levelMap: Record<string, string> = {
      student: 'Estudiante',
      junior: 'Junior',
      mid: 'Mid-Level',
      senior: 'Senior',
      expert: 'Experto'
    };
    return levelMap[level] || level;
  },

  /**
   * Validar email
   */
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validar teléfono
   */
  isValidPhone: (phone: string): boolean => {
    const phoneRegex = /^[+]?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone.replace(/[\s-()]/g, ''));
  },

  /**
   * Calcular días hasta el evento
   */
  getDaysUntilEvent: (eventDate: string): number => {
    const today = new Date();
    const event = new Date(eventDate);
    const diffTime = event.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  },

  /**
   * Verificar si el registro está dentro del plazo
   */
  isRegistrationOpen: (deadline?: string): boolean => {
    if (!deadline) return true;
    const now = new Date();
    const deadlineDate = new Date(deadline);
    return now <= deadlineDate;
  },

  /**
   * Generar código QR para el registro
   */
  generateQRCodeUrl: (confirmationCode: string): string => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(confirmationCode)}`;
  },

  /**
   * Obtener color por tipo de registro
   */
  getRegistrationTypeColor: (type: string): string => {
    const colorMap: Record<string, string> = {
      general: '#3B82F6',
      student: '#10B981',
      speaker: '#8B5CF6',
      sponsor: '#F59E0B',
      vip: '#EF4444'
    };
    return colorMap[type] || '#6B7280';
  }
};

// Instancia singleton del servicio
export const eventRegistrationService = EventRegistrationService.getInstance();