import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Twitter, 
  Linkedin, 
  Github, 
  Globe, 
  MapPin, 
  Award,
  Star
} from 'lucide-react';
import { EventSpeaker } from '../types/event-speaker.types';
import { eventSpeakersUtils } from '../services/event-speakers.service';
import { cn } from '@/lib/utils';

interface EventSpeakerCardProps {
  speaker: EventSpeaker;
  variant?: 'default' | 'featured' | 'compact';
  showBio?: boolean;
  showSocial?: boolean;
  onSpeakerClick?: (speaker: EventSpeaker) => void;
  className?: string;
}

export const EventSpeakerCard: React.FC<EventSpeakerCardProps> = ({
  speaker,
  variant = 'default',
  showBio = true,
  showSocial = true,
  onSpeakerClick,
  className
}) => {
  const socialLinks = eventSpeakersUtils.getValidSocialLinks(speaker);
  const trackColor = eventSpeakersUtils.getTrackColor(speaker.track);
  const truncatedBio = eventSpeakersUtils.getTruncatedBio(speaker, variant === 'compact' ? 80 : 150);
  
  const getSocialIcon = (platform: string) => {
    const iconProps = { size: 16, className: 'text-muted-foreground hover:text-primary transition-colors' };
    
    switch (platform) {
      case 'twitter': return <Twitter {...iconProps} />;
      case 'linkedin': return <Linkedin {...iconProps} />;
      case 'github': return <Github {...iconProps} />;
      case 'website': return <Globe {...iconProps} />;
      default: return <Globe {...iconProps} />;
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  
  const handleCardClick = () => {
    if (onSpeakerClick) {
      onSpeakerClick(speaker);
    }
  };
  
  return (
    <Card 
      className={cn(
        'group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
        variant === 'featured' && 'border-primary/50 bg-gradient-to-br from-primary/5 to-secondary/5',
        variant === 'compact' && 'h-full',
        className
      )}
      onClick={handleCardClick}
    >
      <CardContent className={cn(
        'p-6',
        variant === 'compact' && 'p-4'
      )}>
        {/* Header con avatar y badges */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <Avatar className={cn(
              'border-2 border-background shadow-md',
              variant === 'featured' && 'w-16 h-16',
              variant === 'compact' && 'w-12 h-12',
              variant === 'default' && 'w-14 h-14'
            )}>
              <AvatarImage 
                src={speaker.avatar} 
                alt={speaker.name}
                className="object-cover bg-white"
              />
              {getInitials(speaker.name)}
            </Avatar>
            
            {/* Badges de estado */}
            <div className="absolute -top-1 -right-1 flex flex-col gap-1">
              {speaker.featured && (
                <Badge 
                  variant="secondary" 
                  className="text-xs px-1 py-0 bg-yellow-100 text-yellow-800 border-yellow-200"
                >
                  <Star size={10} className="mr-1" />
                  Featured
                </Badge>
              )}
              {speaker.keynote && (
                <Badge 
                  variant="secondary" 
                  className="text-xs px-1 py-0 bg-purple-100 text-purple-800 border-purple-200"
                >
                  <Award size={10} className="mr-1" />
                  Keynote
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            {/* Nombre y título */}
            <h3 className={cn(
              'font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1',
              variant === 'featured' && 'text-lg',
              variant === 'compact' && 'text-sm',
              variant === 'default' && 'text-base'
            )}>
              {speaker.name}
            </h3>
            
            <p className={cn(
              'text-muted-foreground line-clamp-1',
              variant === 'compact' && 'text-xs',
              variant === 'default' && 'text-sm'
            )}>
              {eventSpeakersUtils.getFullTitle(speaker)}
            </p>
            
            {/* Track badge */}
            <Badge 
              variant="outline" 
              className={cn(
                'mt-2 text-xs',
                variant === 'compact' && 'text-xs px-2 py-0'
              )}
              style={{ borderColor: trackColor, color: trackColor }}
            >
              {speaker.track.toUpperCase()}
            </Badge>
          </div>
        </div>
        
        {/* Bio */}
        {showBio && speaker.bio && (
          <p className={cn(
            'text-muted-foreground mb-4 line-clamp-3 text-center',
            variant === 'compact' && 'text-xs line-clamp-2',
            variant === 'default' && 'text-sm'
          )}>
            {truncatedBio}
          </p>
        )}
        
        {/* Redes sociales */}
        {showSocial && socialLinks.length > 0 && (
          <div className="flex items-center gap-3 pt-3 border-t border-border/50">
            <span className="text-xs text-muted-foreground font-medium">Connect:</span>
            <div className="flex gap-2">
              {socialLinks.map(({ platform, url }) => (
                <Button
                  key={platform}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-primary/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(url, '_blank', 'noopener,noreferrer');
                  }}
                >
                  {getSocialIcon(platform)}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {/* Event badge si existe */}
        {speaker.eventBadge && (
          <div className="mt-3 pt-3 border-t border-border/50">
            <Badge variant="secondary" className="text-xs">
              <MapPin size={10} className="mr-1" />
              {speaker.eventBadge}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};