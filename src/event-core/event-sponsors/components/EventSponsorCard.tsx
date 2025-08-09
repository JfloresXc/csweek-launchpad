import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ExternalLink, 
  Star, 
  MapPin, 
  Users, 
  Award,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Youtube
} from 'lucide-react';
import { EventSponsor, SponsorTier } from '../types/event-sponsor.types';
import { eventSponsorsUtils } from '../services/event-sponsors.service';
import { cn } from '@/lib/utils';

interface EventSponsorCardProps {
  sponsor: EventSponsor;
  variant?: 'default' | 'featured' | 'compact' | 'minimal';
  showDescription?: boolean;
  showBenefits?: boolean;
  showSocial?: boolean;
  showBooth?: boolean;
  onClick?: (sponsor: EventSponsor) => void;
  className?: string;
}

export const EventSponsorCard: React.FC<EventSponsorCardProps> = ({
  sponsor,
  variant = 'default',
  showDescription = true,
  showBenefits = false,
  showSocial = true,
  showBooth = true,
  onClick,
  className
}) => {
  const tierInfo = eventSponsorsUtils.getTierInfo(sponsor.tier);
  const categoryColor = eventSponsorsUtils.getCategoryColor(sponsor.category);
  const isActive = eventSponsorsUtils.isSponsorActive(sponsor);
  
  const handleClick = () => {
    if (onClick) {
      onClick(sponsor);
    }
  };
  
  const handleWebsiteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(sponsor.website, '_blank', 'noopener,noreferrer');
  };
  
  const handleSocialClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  
  // Renderizado según variante
  if (variant === 'minimal') {
    return (
      <div 
        className={cn(
          'flex items-center gap-3 p-3 rounded-lg border bg-background hover:bg-accent/50 transition-colors cursor-pointer',
          !isActive && 'opacity-60',
          className
        )}
        onClick={handleClick}
      >
        <img 
          src={sponsor.logo} 
          alt={`${sponsor.name} logo`}
          className="w-12 h-12 object-contain rounded"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground truncate">{sponsor.name}</h4>
          <Badge 
            variant="outline" 
            className="text-xs mt-1"
            style={{ borderColor: tierInfo.color, color: tierInfo.color }}
          >
            {tierInfo.name}
          </Badge>
        </div>
        {sponsor.website && (
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={handleWebsiteClick}
            className="shrink-0"
          >
            <ExternalLink size={14} />
          </Button>
        )}
      </div>
    );
  }
  
  if (variant === 'compact') {
    return (
      <Card 
        className={cn(
          'group cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1',
          sponsor.featured && 'ring-2 ring-primary/20',
          !isActive && 'opacity-60',
          className
        )}
        onClick={handleClick}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <img 
              src={sponsor.logo} 
              alt={`${sponsor.name} logo`}
              className="w-16 h-16 object-contain rounded-lg border bg-white p-2"
            />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {sponsor.name}
                </h3>
                {sponsor.featured && (
                  <Star className="text-yellow-500 shrink-0 ml-2" size={16} fill="currentColor" />
                )}
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <Badge 
                  variant="secondary"
                  className="text-xs"
                  style={{ backgroundColor: `${tierInfo.color}20`, color: tierInfo.color }}
                >
                  {tierInfo.name}
                </Badge>
                
                <Badge 
                  variant="outline"
                  className="text-xs"
                  style={{ borderColor: categoryColor, color: categoryColor }}
                >
                  {sponsor.category}
                </Badge>
              </div>
              
              {showDescription && sponsor.description && (
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {sponsor.description}
                </p>
              )}
              
              {showBooth && sponsor.booth && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                  <MapPin size={12} />
                  <span>Booth {sponsor.booth.number} - {sponsor.booth.location}</span>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                {showSocial && (
                  <SocialLinks sponsor={sponsor} onSocialClick={handleSocialClick} size="sm" />
                )}
                
                {sponsor.website && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={handleWebsiteClick}
                    className="ml-auto"
                  >
                    <ExternalLink size={14} className="mr-1" />
                    Visitar
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Variantes default y featured
  return (
    <Card 
      className={cn(
        'group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-2',
        variant === 'featured' && 'ring-2 ring-primary/30 bg-gradient-to-br from-primary/5 to-background',
        sponsor.featured && variant !== 'featured' && 'ring-2 ring-yellow-500/20',
        !isActive && 'opacity-60',
        className
      )}
      onClick={handleClick}
    >
      <CardContent className="p-6">
        {/* Header con logo y badges */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={sponsor.logo} 
                alt={`${sponsor.name} logo`}
                className="w-20 h-20 object-contain rounded-lg border-2 bg-white p-2"
                style={{ borderColor: tierInfo.color }}
              />
              {sponsor.featured && (
                <div className="absolute -top-2 -right-2">
                  <Star className="text-yellow-500" size={20} fill="currentColor" />
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                {sponsor.name}
              </h3>
              
              <div className="flex items-center gap-2">
                <Badge 
                  className="text-sm font-medium"
                  style={{ backgroundColor: tierInfo.color, color: 'white' }}
                >
                  <Award size={12} className="mr-1" />
                  {tierInfo.name}
                </Badge>
                
                <Badge 
                  variant="outline"
                  className="text-sm"
                  style={{ borderColor: categoryColor, color: categoryColor }}
                >
                  {sponsor.category}
                </Badge>
              </div>
            </div>
          </div>
          
          {variant === 'featured' && (
            <Badge className="bg-primary text-primary-foreground">
              Destacado
            </Badge>
          )}
        </div>
        
        {/* Descripción */}
        {showDescription && sponsor.description && (
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {sponsor.description}
          </p>
        )}
        
        {/* Beneficios */}
        {showBenefits && sponsor.benefits.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-foreground mb-2">Beneficios:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {sponsor.benefits.slice(0, 3).map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{benefit}</span>
                </li>
              ))}
              {sponsor.benefits.length > 3 && (
                <li className="text-xs text-muted-foreground/70">
                  +{sponsor.benefits.length - 3} más...
                </li>
              )}
            </ul>
          </div>
        )}
        
        {/* Información del booth */}
        {showBooth && sponsor.booth && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 p-3 bg-accent/30 rounded-lg">
            <MapPin size={16} className="text-primary" />
            <div>
              <span className="font-medium">Booth {sponsor.booth.number}</span>
              <span className="mx-2">•</span>
              <span>{sponsor.booth.location}</span>
              <span className="mx-2">•</span>
              <span>{sponsor.booth.size}</span>
            </div>
          </div>
        )}
        
        {/* Footer con redes sociales y botón */}
        <div className="flex items-center justify-between pt-4 border-t">
          {showSocial && (
            <SocialLinks sponsor={sponsor} onSocialClick={handleSocialClick} />
          )}
          
          <div className="flex gap-2 ml-auto">
            {sponsor.website && (
              <Button 
                variant="outline" 
                onClick={handleWebsiteClick}
                className="group-hover:border-primary group-hover:text-primary"
              >
                <ExternalLink size={16} className="mr-2" />
                Visitar Sitio
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Componente para enlaces sociales
interface SocialLinksProps {
  sponsor: EventSponsor;
  onSocialClick: (e: React.MouseEvent, url: string) => void;
  size?: 'sm' | 'md';
}

const SocialLinks: React.FC<SocialLinksProps> = ({ sponsor, onSocialClick, size = 'md' }) => {
  const iconSize = size === 'sm' ? 14 : 16;
  const buttonSize = size === 'sm' ? 'sm' : 'sm';
  
  const socialIcons = [
    { key: 'twitter', icon: Twitter, url: sponsor.socialLinks.twitter },
    { key: 'linkedin', icon: Linkedin, url: sponsor.socialLinks.linkedin },
    { key: 'facebook', icon: Facebook, url: sponsor.socialLinks.facebook },
    { key: 'instagram', icon: Instagram, url: sponsor.socialLinks.instagram },
    { key: 'youtube', icon: Youtube, url: sponsor.socialLinks.youtube },
  ].filter(social => social.url);
  
  if (socialIcons.length === 0) {
    return null;
  }
  
  return (
    <div className="flex items-center gap-1">
      {socialIcons.map(({ key, icon: Icon, url }) => (
        <Button
          key={key}
          size={buttonSize}
          variant="ghost"
          onClick={(e) => onSocialClick(e, url!)}
          className="text-muted-foreground hover:text-primary"
        >
          <Icon size={iconSize} />
        </Button>
      ))}
    </div>
  );
};

export default EventSponsorCard;