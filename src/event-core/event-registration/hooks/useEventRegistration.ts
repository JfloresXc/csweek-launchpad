import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  EventRegistrationFormData,
  EventRegistrationQueryParams,
  EventRegistrationStats,
  TicketPricing,
  EventRegistrationPageData,
  CheckInData
} from '../types/event-registration.types';
import { eventRegistrationService } from '../services/event-registration.service';

// Claves de query para React Query
const QUERY_KEYS = {
  registrations: 'event-registrations',
  registration: 'event-registration',
  stats: 'event-registration-stats',
  pricing: 'event-registration-pricing',
  verification: 'event-registration-verification',
} as const;

/**
 * Hook para registrarse en el evento
 */
export const useEventRegistration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: EventRegistrationFormData) => 
      eventRegistrationService.registerForEvent(formData),
    onSuccess: () => {
      // Invalidar cache de estadísticas después de un registro exitoso
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.stats] });
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    }
  });
};

/**
 * Hook para verificar un registro
 */
export const useRegistrationVerification = (confirmationCode: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: [QUERY_KEYS.verification, confirmationCode],
    queryFn: () => eventRegistrationService.verifyRegistration(confirmationCode),
    enabled: enabled && !!confirmationCode,
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 2
  });
};

/**
 * Hook para obtener detalles de un registro
 */
export const useRegistrationDetails = (registrationId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: [QUERY_KEYS.registration, registrationId],
    queryFn: () => eventRegistrationService.getRegistrationById(registrationId),
    enabled: enabled && !!registrationId,
    staleTime: 10 * 60 * 1000, // 10 minutos
    retry: 2
  });
};

/**
 * Hook para actualizar un registro
 */
export const useUpdateRegistration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ registrationId, updateData }: {
      registrationId: string;
      updateData: Partial<EventRegistrationFormData>;
    }) => eventRegistrationService.updateRegistration(registrationId, updateData),
    onSuccess: (data, variables) => {
      // Actualizar cache del registro específico
      queryClient.setQueryData([QUERY_KEYS.registration, variables.registrationId], data);
      // Invalidar lista de registros
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.registrations] });
    }
  });
};

/**
 * Hook para cancelar un registro
 */
export const useCancelRegistration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (registrationId: string) => 
      eventRegistrationService.cancelRegistration(registrationId),
    onSuccess: (_, registrationId) => {
      // Invalidar cache del registro específico
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.registration, registrationId] });
      // Invalidar lista de registros y estadísticas
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.registrations] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.stats] });
    }
  });
};

/**
 * Hook para obtener estadísticas de registro
 */
export const useRegistrationStats = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.stats],
    queryFn: () => eventRegistrationService.getRegistrationStats(),
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchInterval: 10 * 60 * 1000, // Refetch cada 10 minutos
    retry: 2
  });
};

/**
 * Hook para obtener precios de tickets
 */
export const useTicketPricing = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.pricing],
    queryFn: () => eventRegistrationService.getTicketPricing(),
    staleTime: 30 * 60 * 1000, // 30 minutos
    retry: 2
  });
};

/**
 * Hook para validar datos de registro
 */
export const useRegistrationValidation = () => {
  return useMutation({
    mutationFn: (formData: EventRegistrationFormData) => 
      eventRegistrationService.validateRegistrationData(formData)
  });
};

/**
 * Hook para realizar check-in
 */
export const useCheckIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (checkInData: CheckInData) => 
      eventRegistrationService.checkInParticipant(checkInData),
    onSuccess: (data) => {
      // Actualizar cache del registro específico
      queryClient.setQueryData(
        [QUERY_KEYS.registration, data.registration.id], 
        data.registration
      );
      // Invalidar estadísticas
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.stats] });
    }
  });
};

/**
 * Hook para obtener lista de registros (administradores)
 */
export const useRegistrationsList = (params: EventRegistrationQueryParams = {}) => {
  return useQuery({
    queryKey: [QUERY_KEYS.registrations, params],
    queryFn: () => eventRegistrationService.getRegistrations(params),
    staleTime: 2 * 60 * 1000, // 2 minutos
    retry: 2
  });
};

/**
 * Hook para reenviar email de confirmación
 */
export const useResendConfirmation = () => {
  return useMutation({
    mutationFn: (registrationId: string) => 
      eventRegistrationService.resendConfirmationEmail(registrationId)
  });
};

/**
 * Hook combinado para página de registro
 */
export const useRegistrationPage = (): EventRegistrationPageData & {
  isLoading: boolean;
  isError: boolean;
} => {
  const {
    data: stats,
    isLoading: statsLoading,
    isError: statsError
  } = useRegistrationStats();
  
  const {
    data: pricing,
    isLoading: pricingLoading,
    isError: pricingError
  } = useTicketPricing();

  // Calcular datos derivados
  const isRegistrationOpen = stats ? 
    eventRegistrationService.isRegistrationOpen() : true;
  
  const availableSpots = stats ? 
    Math.max(0, 2000 - stats.totalRegistrations) : undefined; // Capacidad total del evento
  
  return {
    stats: stats || {
      totalRegistrations: 0,
      registrationsByType: {},
      registrationsByTicketType: {},
      registrationsByExperienceLevel: {},
      registrationsByDay: {},
      checkedInCount: 0,
      pendingPayments: 0,
      completedPayments: 0,
      conversionRate: 0
    },
    pricing: pricing || [],
    isRegistrationOpen,
    availableSpots,
    totalCapacity: 2000,
    waitlistAvailable: availableSpots === 0,
    isLoading: statsLoading || pricingLoading,
    isError: statsError || pricingError
  };
};

/**
 * Hook para manejar el estado del formulario de registro
 */
export const useRegistrationForm = () => {
  const registerMutation = useEventRegistration();
  const validateMutation = useRegistrationValidation();

  const submitRegistration = async (formData: EventRegistrationFormData) => {
    try {
      // Validar datos primero
      const validation = await validateMutation.mutateAsync(formData);
      
      if (!validation.isValid) {
        throw new Error('Datos de registro inválidos');
      }
      
      // Proceder con el registro
      const result = await registerMutation.mutateAsync(formData);
      return result;
    } catch (error) {
      console.error('Registration submission failed:', error);
      throw error;
    }
  };

  return {
    submitRegistration,
    isSubmitting: registerMutation.isPending || validateMutation.isPending,
    isSuccess: registerMutation.isSuccess,
    isError: registerMutation.isError || validateMutation.isError,
    error: registerMutation.error || validateMutation.error,
    data: registerMutation.data,
    reset: () => {
      registerMutation.reset();
      validateMutation.reset();
    }
  };
};

/**
 * Hook para manejar filtros de registros
 */
export const useRegistrationFilters = () => {
  const [filters, setFilters] = useState<EventRegistrationQueryParams>({
    limit: 10,
    page: 1,
    sort: '-registrationDate'
  });

  const updateFilters = (newFilters: Partial<EventRegistrationQueryParams>) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 })); // Reset page when filters change
  };

  const resetFilters = () => {
    setFilters({
      limit: 10,
      page: 1,
      sort: '-registrationDate'
    });
  };

  return {
    filters,
    updateFilters,
    resetFilters,
    setPage: (page: number) => setFilters(prev => ({ ...prev, page }))
  };
};

// Importar useState que faltaba
import { useState } from 'react';