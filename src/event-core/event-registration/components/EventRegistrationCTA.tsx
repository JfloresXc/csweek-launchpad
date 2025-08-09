import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  ArrowRight, 
  CheckCircle,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { useRegistrationPage } from '../hooks/useEventRegistration';
import { eventRegistrationService } from '../services/event-registration.service';
import EventRegistrationForm from './EventRegistrationForm';

interface EventRegistrationCTAProps {
  variant?: 'hero' | 'section' | 'floating' | 'minimal';
  showStats?: boolean;
  showCountdown?: boolean;
  className?: string;
}

/**
 * Componente Call-to-Action para registro del evento
 */
export const EventRegistrationCTA: React.FC<EventRegistrationCTAProps> = ({
  variant = 'section',
  showStats = true,
  showCountdown = true,
  className = ''
}) => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const {
    stats,
    pricing,
    isRegistrationOpen,
    availableSpots,
    totalCapacity,
    waitlistAvailable,
    isLoading,
    isError
  } = useRegistrationPage();

  // Calcular días hasta el evento
  const daysUntilEvent = eventRegistrationService.getDaysUntilEvent();
  const isEventSoon = daysUntilEvent <= 7;
  const isEventToday = daysUntilEvent === 0;

  // Obtener precio del ticket más económico
  const getEarliestPrice = () => {
    if (!pricing || pricing.length === 0) return null;
    const sortedPricing = [...pricing].sort((a, b) => a.price - b.price);
    return sortedPricing[0];
  };

  const earliestTicket = getEarliestPrice();

  // Manejar apertura del formulario
  const handleRegisterClick = () => {
    if (isRegistrationOpen) {
      setShowRegistrationForm(true);
    }
  };

  // Renderizar estadísticas
  const renderStats = () => {
    if (!showStats || !stats) return null;

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-white mb-1">
            {stats.totalRegistrations}
          </div>
          <div className="text-sm text-gray-400">Registrados</div>
        </div>
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-1">
            {availableSpots || 0}
          </div>
          <div className="text-sm text-gray-400">Cupos Disponibles</div>
        </div>
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-green-400 mb-1">
            {stats.checkedInCount}
          </div>
          <div className="text-sm text-gray-400">Check-ins</div>
        </div>
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-1">
            {Math.round(stats.conversionRate * 100)}%
          </div>
          <div className="text-sm text-gray-400">Conversión</div>
        </div>
      </div>
    );
  };

  // Renderizar countdown
  const renderCountdown = () => {
    if (!showCountdown) return null;

    return (
      <div className="flex items-center justify-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-blue-400" />
        <span className="text-gray-300">
          {isEventToday ? (
            <span className="text-green-400 font-semibold">¡El evento es hoy!</span>
          ) : daysUntilEvent > 0 ? (
            <span>
              Faltan <span className="text-blue-400 font-semibold">{daysUntilEvent} días</span> para el evento
            </span>
          ) : (
            <span className="text-gray-500">El evento ya finalizó</span>
          )}
        </span>
      </div>
    );
  };

  // Renderizar según variante
  const renderContent = () => {
    switch (variant) {
      case 'hero':
        return (
          <div className="text-center py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <Badge className="bg-blue-600 text-white mb-4">
                  <Sparkles className="w-4 h-4 mr-1" />
                  CS WEEK 2025
                </Badge>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  ¡Únete al Evento
                  <span className="text-blue-400"> Más Grande</span>
                  <br />del Año!
                </h2>
                <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
                  Conecta con los mejores profesionales, aprende de expertos y 
                  descubre las últimas tendencias en tecnología.
                </p>
              </div>

              {renderCountdown()}
              {renderStats()}

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <div className="flex items-center gap-2 text-gray-300">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <span>15-17 Marzo 2025</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span>Lima, Perú</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span>+2000 Participantes</span>
                </div>
              </div>

              {isRegistrationOpen ? (
                <div className="space-y-4">
                  {earliestTicket && (
                    <div className="text-center mb-4">
                      <span className="text-gray-400">Desde </span>
                      <span className="text-3xl font-bold text-green-400">
                        {earliestTicket.price === 0 ? 'GRATIS' : `$${earliestTicket.price}`}
                      </span>
                      {earliestTicket.originalPrice && earliestTicket.originalPrice > earliestTicket.price && (
                        <span className="text-gray-500 line-through ml-2">
                          ${earliestTicket.originalPrice}
                        </span>
                      )}
                    </div>
                  )}
                  
                  <Button
                    onClick={handleRegisterClick}
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold"
                  >
                    Registrarse Ahora
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  
                  {isEventSoon && (
                    <p className="text-yellow-400 text-sm">
                      ⚡ ¡Últimos días para registrarse!
                    </p>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <Button disabled size="lg" className="px-8 py-4 text-lg">
                    {waitlistAvailable ? 'Unirse a Lista de Espera' : 'Registro Cerrado'}
                  </Button>
                  <p className="text-gray-400 text-sm mt-2">
                    {waitlistAvailable 
                      ? 'Te notificaremos si se abren nuevos cupos'
                      : 'El registro para este evento ha finalizado'
                    }
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        );

      case 'floating':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Card className="bg-gray-900 border-gray-700 shadow-2xl">
              <CardContent className="p-4">
                <div className="text-center">
                  <h3 className="text-white font-semibold mb-2">CS WEEK 2025</h3>
                  {renderCountdown()}
                  <Button
                    onClick={handleRegisterClick}
                    disabled={!isRegistrationOpen}
                    className="bg-blue-600 hover:bg-blue-700 w-full"
                  >
                    {isRegistrationOpen ? 'Registrarse' : 'Registro Cerrado'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      case 'minimal':
        return (
          <div className="text-center py-6">
            <h3 className="text-2xl font-bold text-white mb-4">
              ¿Listo para CS WEEK 2025?
            </h3>
            {renderCountdown()}
            <Button
              onClick={handleRegisterClick}
              disabled={!isRegistrationOpen}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isRegistrationOpen ? 'Registrarse Ahora' : 'Registro Cerrado'}
              {isRegistrationOpen && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        );

      default: // 'section'
        return (
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-8">
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Badge className="bg-blue-600 text-white mb-4">
                    <Sparkles className="w-4 h-4 mr-1" />
                    Registro Abierto
                  </Badge>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    ¡Asegura tu lugar en
                    <span className="text-blue-400"> CS WEEK 2025</span>!
                  </h2>
                  
                  <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
                    No te pierdas la oportunidad de ser parte del evento de tecnología 
                    más importante del año. Regístrate ahora y obtén acceso exclusivo.
                  </p>

                  {renderCountdown()}
                  {renderStats()}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="flex items-center justify-center gap-2 text-gray-300">
                      <Calendar className="w-5 h-5 text-blue-400" />
                      <span>15-17 Marzo 2025</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-gray-300">
                      <MapPin className="w-5 h-5 text-blue-400" />
                      <span>Lima, Perú</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-gray-300">
                      <Users className="w-5 h-5 text-blue-400" />
                      <span>+2000 Participantes</span>
                    </div>
                  </div>

                  {isRegistrationOpen ? (
                    <div className="space-y-4">
                      {earliestTicket && (
                        <div className="text-center mb-4">
                          <span className="text-gray-400">Desde </span>
                          <span className="text-2xl font-bold text-green-400">
                            {earliestTicket.price === 0 ? 'GRATIS' : `$${earliestTicket.price}`}
                          </span>
                          {earliestTicket.originalPrice && earliestTicket.originalPrice > earliestTicket.price && (
                            <span className="text-gray-500 line-through ml-2">
                              ${earliestTicket.originalPrice}
                            </span>
                          )}
                        </div>
                      )}
                      
                      <Button
                        onClick={handleRegisterClick}
                        size="lg"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
                      >
                        Registrarse Ahora
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                      
                      {isEventSoon && (
                        <p className="text-yellow-400 text-sm">
                          ⚡ ¡Últimos días para registrarse!
                        </p>
                      )}
                      
                      <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span>Acceso completo</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span>Networking</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span>Certificado</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Button disabled size="lg" className="px-8 py-3">
                        {waitlistAvailable ? 'Unirse a Lista de Espera' : 'Registro Cerrado'}
                      </Button>
                      <p className="text-gray-400 text-sm mt-2">
                        {waitlistAvailable 
                          ? 'Te notificaremos si se abren nuevos cupos'
                          : 'El registro para este evento ha finalizado'
                        }
                      </p>
                    </div>
                  )}
                </motion.div>
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
        <p className="text-gray-400">Cargando información del registro...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <p className="text-gray-400">Error al cargar la información del registro</p>
      </div>
    );
  }

  return (
    <>
      <div className={className}>
        {renderContent()}
      </div>
      
      {/* Modal de registro */}
      {showRegistrationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <EventRegistrationForm
              onSuccess={() => {
                setShowRegistrationForm(false);
                // Aquí podrías mostrar un toast de éxito
              }}
              onCancel={() => setShowRegistrationForm(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EventRegistrationCTA;