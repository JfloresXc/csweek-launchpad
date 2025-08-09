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
  ChevronRight
} from 'lucide-react';
import { EventSession, EventScheduleByDay } from '../../event-schedule/types/event-schedule.types';
import { EventScheduleMockService } from '../../event-schedule/services/event-schedule-mock.service';
import { cn } from '@/lib/utils';

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
    if (onSessionClick) {
      onSessionClick(session);
    }
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
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
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
              <span>{session.eventSpeakers.length} speaker{session.eventSpeakers.length > 1 ? 's' : ''}</span>
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