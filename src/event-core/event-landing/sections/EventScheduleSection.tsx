import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  ArrowRight,
  Play,
  Star,
  Zap,
  ChevronRight,
  X,
  Tag,
  ExternalLink
} from 'lucide-react';
import { EventSession, EventScheduleByDay } from '../../event-schedule/types/event-schedule.types';
import { EventScheduleMockService } from '../../event-schedule/services/event-schedule-mock.service';
import { cn } from '@/lib/utils';

// Mapeo de speakers para mostrar nombres reales
const speakersMap: Record<string, string> = {
  'deyvid-piero-tolentino-isidro': 'Deyvid Piero Tolentino Isidro',
  'renzo-roca': 'Renzo Roca',
  'renzo-cienfuegos': 'Renzo Cienfuegos',
  'henry-luis-callupe-ancco': 'Henry Luis Callupe Ancco',
  'goblin-slay3r': 'Goblin Slay3r',
  'jackson-merma': 'Jackson Merma',
  'jimy-dolores': 'Jimy Dolores',
  'jazmin-reyes': 'Jazmín Reyes',
  'juan-alberto-contreras-flores': 'Juan Alberto Contreras Flores',
  'mariluisa-harumi-pereda-pascal': 'Mariluisa Harumi Pereda Pascal',
  'juan-jose-miranda': 'Juan José Miranda',
  'luz-alicia-acevedo-avila': 'Luz Alicia Acevedo Ávila',
  'jose-amadeo-diaz-diaz': 'José Amadeo Díaz Díaz',
  'elvis-geovanny-batzibal': 'Elvis Geovanny Batzibal',
  'jose-flores-chamba': 'Jose Flores Chamba',
  'carlos-lenon': 'Carlos Lenon',
  'maribel-maza': 'Maribel Maza',
  'daniel-eduardo-ibanez-garcia': 'Daniel Eduardo Ibáñez García',
  'andres-david-escobar-villa': 'Andrés David Escobar Villa',
  'giancarlos-enrique-sandoval-tume': 'Giancarlos Enrique Sandoval Tume'
};

// Función para obtener nombres de speakers
const getSpeakerNames = (speakerIds: string[]): string => {
  if (!speakerIds || speakerIds.length === 0) return 'Por confirmar';
  
  const names = speakerIds.map(id => speakersMap[id] || id).join(', ');
  return names;
};

interface EventScheduleSectionProps {
  className?: string;
  maxSessions?: number;
  showViewAll?: boolean;
  onViewAll?: () => void;
  onSessionClick?: (session: EventSession) => void;
}

export const EventScheduleSection: React.FC<EventScheduleSectionProps> = ({
  className,
  maxSessions = 6,
  showViewAll = true,
  onViewAll,
  onSessionClick
}) => {
  const [scheduleByDay, setScheduleByDay] = useState<EventScheduleByDay[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedSession, setSelectedSession] = useState<EventSession | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        
        const response = await EventScheduleMockService.getAllEventDays();
        
        setScheduleByDay(response);
        
        // Seleccionar el primer día por defecto
        if (response.length > 0) {
          setSelectedDay(response[0].date);
        }
      } catch (error) {
        console.error('Error fetching schedule:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  const handleViewAll = () => {
    if (onViewAll) {
      onViewAll();
    } else {
      // Scroll suave a la sección de schedule completo
      const scheduleSection = document.getElementById('schedule-full');
      if (scheduleSection) {
        scheduleSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSessionClick = (session: EventSession) => {
    setSelectedSession(session);
    setIsModalOpen(true);
    if (onSessionClick) {
      onSessionClick(session);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSession(null);
  };

  const getSelectedDaySchedule = () => {
    return scheduleByDay.find(day => day.date === selectedDay);
  };

  const getDisplaySessions = () => {
    const selectedDaySchedule = getSelectedDaySchedule();
    if (!selectedDaySchedule) return [];
    
    return selectedDaySchedule.sessions.slice(0, maxSessions);
  };

  const formatDate = (dateString: string) => {
    // Agregar 'T00:00:00' para evitar problemas de zona horaria
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('es-ES', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const getSessionTypeConfig = (type: string) => {
    const configs = {
      keynote: {
        color: 'bg-gradient-hero',
        textColor: 'text-white',
        icon: Star,
        label: 'Keynote'
      },
      talk: {
        color: 'bg-csweek-primary',
        textColor: 'text-white',
        icon: Users,
        label: 'Charla'
      },
      workshop: {
        color: 'bg-csweek-success',
        textColor: 'text-white',
        icon: Zap,
        label: 'Workshop'
      },
      panel: {
        color: 'bg-csweek-warning',
        textColor: 'text-white',
        icon: Users,
        label: 'Panel'
      },
      networking: {
        color: 'bg-csweek-secondary',
        textColor: 'text-white',
        icon: Users,
        label: 'Networking'
      },
      break: {
        color: 'bg-muted',
        textColor: 'text-muted-foreground',
        icon: Clock,
        label: 'Descanso'
      }
    };
    
    return configs[type as keyof typeof configs] || configs.talk;
  };

  if (isLoading) {
    return (
      <section className={cn('py-16 bg-gradient-hero', className)}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-muted rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-96 mx-auto animate-pulse"></div>
          </div>
          
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 bg-muted rounded-lg w-32 animate-pulse"></div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gradient-card rounded-xl p-6 shadow-card animate-pulse">
                <div className="h-4 bg-muted rounded w-20 mb-3"></div>
                <div className="h-6 bg-muted rounded w-full mb-2"></div>
                <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className={cn('py-16 bg-gradient-hero', className)}>
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-destructive mb-4">
              <Calendar className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Error al cargar la agenda
            </h3>
            <p className="text-muted-foreground mb-6">
              No pudimos cargar la información de la agenda. Por favor, intenta nuevamente.
            </p>
            <Button 
              onClick={() => window.location.reload()}
              variant="hero"
            >
              Reintentar
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="schedule" className={cn('py-16 bg-muted/10', className)}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-csweek-secondary/10 text-csweek-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Calendar className="w-4 h-4" />
            Agenda
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Agenda del <span className="text-yellow-500">Evento</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre las 
            <span className="text-primary"> charlas</span>
            , workshops y 
            <span className="text-primary"> actividades </span>
             que tenemos preparadas para ti durante CS WEEK 2025
          </p>
        </div>

        {/* Day Selector */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap gap-2 p-1 bg-gradient-card rounded-lg shadow-card border-border">
            {scheduleByDay.map((day) => {
              const isSelected = selectedDay === day.date;
              return (
                <button
                  key={day.date}
                  onClick={() => setSelectedDay(day.date)}
                  className={cn(
                    'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
                    isSelected
                      ? 'bg-csweek-primary text-white shadow-md'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {formatDate(day.date)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sessions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {getDisplaySessions().map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              onClick={() => handleSessionClick(session)}
            />
          ))}
        </div>

        {/* Session Detail Modal */}
        {isModalOpen && selectedSession && (
          <SessionDetailModal
            session={selectedSession}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        )}
      </div>
    </section>
  );
};

interface SessionCardProps {
  session: EventSession;
  onClick: () => void;
}

const SessionCard: React.FC<SessionCardProps> = ({ session, onClick }) => {
  const typeConfig = getSessionTypeConfig(session.type);
  const IconComponent = typeConfig.icon;

  const formatTime = (timeString: string) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const getLevelColor = (level: string) => {
    const colors = {
      beginner: 'bg-csweek-success/10 text-csweek-success',
      intermediate: 'bg-csweek-warning/10 text-csweek-warning',
      advanced: 'bg-destructive/10 text-destructive'
    };
    return colors[level as keyof typeof colors] || colors.intermediate;
  };

  const getLevelLabel = (level: string) => {
    const labels = {
      beginner: 'Principiante',
      intermediate: 'Intermedio',
      advanced: 'Avanzado'
    };
    return labels[level as keyof typeof labels] || level;
  };

  return (
    <Card 
      className="group cursor-pointer transition-all duration-200 hover:shadow-card hover:-translate-y-1 bg-gradient-card border-border"
      onClick={onClick}
    >
      <CardContent className="p-6">
        {/* Session Type Badge */}
        <div className="flex items-center justify-between mb-3">
          <Badge className={cn(typeConfig.color, typeConfig.textColor, 'px-3 py-1')}>
            <IconComponent className="h-3 w-3 mr-1" />
            {typeConfig.label}
          </Badge>
          <Badge className={cn('px-2 py-1 text-xs', getLevelColor(session.level))}>
            {getLevelLabel(session.level)}
          </Badge>
        </div>

        {/* Session Title */}
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-csweek-primary transition-colors line-clamp-2">
          {session.title}
        </h3>

        {/* Session Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {session.description}
        </p>

        {/* Session Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            <span>{formatTime(session.startTime)} - {formatTime(session.endTime)}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{session.room}</span>
          </div>

          {session.eventSpeakers && session.eventSpeakers.length > 0 && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-2" />
              <span>{getSpeakerNames(session.eventSpeakers)}</span>
            </div>
          )}
        </div>

        {/* Session Tags */}
        {session.tags && session.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {session.tags.slice(0, 3).map((tag, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs px-2 py-1 bg-muted text-muted-foreground"
              >
                {tag}
              </Badge>
            ))}
            {session.tags.length > 3 && (
              <Badge 
                variant="secondary" 
                className="text-xs px-2 py-1 bg-muted text-muted-foreground"
              >
                +{session.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* View Details */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-csweek-secondary group-hover:text-primary">
            Ver detalles
          </span>
          <ChevronRight className="h-4 w-4 text-csweek-secondary group-hover:text-primary group-hover:translate-x-1 transition-transform" />
        </div>
      </CardContent>
    </Card>
  );
};

const getSessionTypeConfig = (type: string) => {
  const configs = {
    keynote: {
      color: 'bg-gradient-hero',
      textColor: 'text-white',
      icon: Star,
      label: 'Keynote'
    },
    talk: {
      color: 'bg-csweek-primary',
      textColor: 'text-white',
      icon: Users,
      label: 'Charla'
    },
    workshop: {
      color: 'bg-csweek-success',
      textColor: 'text-white',
      icon: Zap,
      label: 'Workshop'
    },
    panel: {
      color: 'bg-csweek-warning',
      textColor: 'text-white',
      icon: Users,
      label: 'Panel'
    },
    networking: {
      color: 'bg-csweek-secondary',
      textColor: 'text-white',
      icon: Users,
      label: 'Networking'
    },
    break: {
      color: 'bg-muted',
      textColor: 'text-muted-foreground',
      icon: Clock,
      label: 'Descanso'
    }
  };
  
  return configs[type as keyof typeof configs] || configs.talk;
};

// Modal Component for Session Details
interface SessionDetailModalProps {
  session: EventSession;
  isOpen: boolean;
  onClose: () => void;
}

const SessionDetailModal: React.FC<SessionDetailModalProps> = ({ session, isOpen, onClose }) => {
  const typeConfig = getSessionTypeConfig(session.type);
  const IconComponent = typeConfig.icon;

  const formatTime = (timeString: string) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-background border border-border rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-csweek-primary/5 to-csweek-secondary/5 border-b border-border p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              <div className="flex items-center gap-3 mb-3">
                <div className={cn('p-2.5 rounded-xl shadow-sm', typeConfig.color)}>
                  <IconComponent className={cn('h-5 w-5', typeConfig.textColor)} />
                </div>
                <Badge variant="secondary" className="text-xs font-medium px-3 py-1">
                  {typeConfig.label}
                </Badge>
              </div>
              <h2 className="text-2xl font-bold text-foreground leading-tight">
                {session.title}
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground hover:bg-background/80 rounded-lg"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)] scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
          <div className="p-6 pb-8 space-y-6">
            {/* Date, Time and Room Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <Calendar className="h-5 w-5 text-csweek-primary" />
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Fecha</p>
                  <p className="text-sm font-semibold">{formatDate(session.date)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <Clock className="h-5 w-5 text-csweek-primary" />
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Horario</p>
                  <p className="text-sm font-semibold">{formatTime(session.startTime)} - {formatTime(session.endTime)}</p>
                </div>
              </div>
              {session.room && (
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <MapPin className="h-5 w-5 text-csweek-primary" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground font-medium">Sala</p>
                    {session.room === 'Google Meet' ? (
                      <button
                        onClick={() => window.open('https://meet.google.com/qfu-edsm-gii?authuser=0', '_blank')}
                        className="text-sm font-semibold text-csweek-primary hover:text-csweek-primary/80 transition-colors underline cursor-pointer"
                      >
                        {session.room}
                      </button>
                    ) : (
                      <p className="text-sm font-semibold">{session.room}</p>
                    )}
                  </div>
                  {session.room === 'Google Meet' && (
                    <ExternalLink className="h-4 w-4 text-csweek-primary" />
                  )}
                </div>
              )}
            </div>

            {/* Description */}
            {session.description && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <div className="w-1 h-6 bg-csweek-primary rounded-full"></div>
                  Descripción
                </h3>
                <div className="bg-muted/20 rounded-lg p-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {session.description}
                  </p>
                </div>
              </div>
            )}

            {/* Speakers */}
            {session.eventSpeakers && session.eventSpeakers.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <div className="w-1 h-6 bg-csweek-primary rounded-full"></div>
                  Speakers
                </h3>
                <div className="bg-muted/20 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-csweek-primary" />
                    <span className="font-medium">{getSpeakerNames(session.eventSpeakers)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tags and Track */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tags */}
              {session.tags && session.tags.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <div className="w-1 h-6 bg-csweek-primary rounded-full"></div>
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {session.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs font-medium px-3 py-1">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Track */}
              {session.track && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <div className="w-1 h-6 bg-csweek-primary rounded-full"></div>
                    Track
                  </h3>
                  <Badge variant="secondary" className="font-medium px-4 py-2">
                    {session.track}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};