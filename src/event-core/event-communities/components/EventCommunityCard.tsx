import React from 'react';
import { 
  EventCommunity, 
  CommunityType, 
  CommunityCategory,
  PartnershipLevel 
} from '../types/event-community.types';
import { eventCommunitiesService } from '../services/event-communities.service';

interface EventCommunityCardProps {
  community: EventCommunity;
  variant?: 'default' | 'featured' | 'compact' | 'minimal';
  showDescription?: boolean;
  showSocial?: boolean;
  showStats?: boolean;
  showPartnership?: boolean;
  className?: string;
  onClick?: (community: EventCommunity) => void;
}

interface SocialLinksProps {
  community: EventCommunity;
  variant?: 'default' | 'compact';
}

const SocialLinks: React.FC<SocialLinksProps> = ({ community, variant = 'default' }) => {
  const { socialLinks } = community;
  
  if (!socialLinks || Object.keys(socialLinks).length === 0) {
    return null;
  }
  
  const iconSize = variant === 'compact' ? 'w-4 h-4' : 'w-5 h-5';
  
  return (
    <div className="flex items-center gap-2">
      {socialLinks.website && (
        <a
          href={socialLinks.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-blue-600 transition-colors"
          aria-label="Website"
        >
          <svg className={iconSize} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
          </svg>
        </a>
      )}
      {socialLinks.twitter && (
        <a
          href={socialLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-blue-400 transition-colors"
          aria-label="Twitter"
        >
          <svg className={iconSize} fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        </a>
      )}
      {socialLinks.linkedin && (
        <a
          href={socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-blue-700 transition-colors"
          aria-label="LinkedIn"
        >
          <svg className={iconSize} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
          </svg>
        </a>
      )}
      {socialLinks.github && (
        <a
          href={socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-900 transition-colors"
          aria-label="GitHub"
        >
          <svg className={iconSize} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
          </svg>
        </a>
      )}
      {socialLinks.discord && (
        <a
          href={socialLinks.discord}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-indigo-600 transition-colors"
          aria-label="Discord"
        >
          <svg className={iconSize} fill="currentColor" viewBox="0 0 20 20">
            <path d="M16.942 4.556a16.3 16.3 0 00-4.126-1.3 12.04 12.04 0 00-.529 1.1 15.175 15.175 0 00-4.573 0 11.585 11.585 0 00-.535-1.1 16.274 16.274 0 00-4.129 1.3A17.392 17.392 0 00.182 13.218a15.785 15.785 0 004.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 01-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0010.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 001.084 1.785 16.46 16.46 0 005.064-2.595 17.286 17.286 0 00-2.973-8.72zM6.678 10.813a1.941 1.941 0 01-1.8-2.045 1.93 1.93 0 011.8-2.047 1.919 1.919 0 011.8 2.047 1.93 1.93 0 01-1.8 2.045zm6.644 0a1.94 1.94 0 01-1.8-2.045 1.93 1.93 0 011.8-2.047 1.918 1.918 0 011.8 2.047 1.93 1.93 0 01-1.8 2.045z" />
          </svg>
        </a>
      )}
      {socialLinks.telegram && (
        <a
          href={socialLinks.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-blue-500 transition-colors"
          aria-label="Telegram"
        >
          <svg className={iconSize} fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1010 10A10.011 10.011 0 0010 0zm4.638 7.094l-1.69 7.975c-.127.571-.462.713-.937.444L9.69 13.768l-1.174 1.13c-.13.13-.24.24-.492.24l.175-2.485L15.4 6.359c.175-.156-.038-.243-.272-.087L7.531 11.17l-2.68-.838c-.583-.182-.594-.583.121-.863l10.46-4.032c.487-.182.913.109.756.657z" />
          </svg>
        </a>
      )}
    </div>
  );
};

const EventCommunityCard: React.FC<EventCommunityCardProps> = ({
  community,
  variant = 'default',
  showDescription = true,
  showSocial = true,
  showStats = true,
  showPartnership = true,
  className = '',
  onClick
}) => {
  const typeInfo = eventCommunitiesService.getCommunityTypeInfo(community.type);
  const typeColor = eventCommunitiesService.getCommunityTypeColor(community.type);
  const categoryColor = eventCommunitiesService.getCommunityTypeColor(community.type); // Reutilizamos para categoría
  const partnershipInfo = community.partnership 
    ? eventCommunitiesService.getPartnershipInfo(community.partnership.level)
    : null;
  
  const formattedMemberCount = eventCommunitiesService.formatMemberCount(community.memberCount);
  const formattedLocation = eventCommunitiesService.formatLocation(community.location);
  
  const handleClick = () => {
    if (onClick) {
      onClick(community);
    }
  };
  
  const baseClasses = `
    bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200
    ${onClick ? 'cursor-pointer hover:border-gray-300' : ''}
    ${community.featured ? 'ring-2 ring-blue-500 ring-opacity-20' : ''}
    ${className}
  `;
  
  if (variant === 'minimal') {
    return (
      <div className={`${baseClasses} p-3`} onClick={handleClick}>
        <div className="flex items-center gap-3">
          {community.logo && (
            <img
              src={community.logo}
              alt={`${community.name} logo`}
              className="w-8 h-8 rounded object-cover flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 truncate">{community.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeColor.bg} ${typeColor.text}`}>
                {typeInfo.label}
              </span>
              {showStats && (
                <span>{formattedMemberCount} miembros</span>
              )}
            </div>
          </div>
          {community.featured && (
            <div className="flex-shrink-0">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                ⭐ Destacada
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  if (variant === 'compact') {
    return (
      <div className={`${baseClasses} p-4`} onClick={handleClick}>
        <div className="flex items-start gap-3">
          {community.logo && (
            <img
              src={community.logo}
              alt={`${community.name} logo`}
              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-gray-900 text-lg leading-tight">{community.name}</h3>
              {community.featured && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 flex-shrink-0">
                  ⭐ Destacada
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColor.bg} ${typeColor.text}`}>
                {typeInfo.label}
              </span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                {community.category}
              </span>
            </div>
            
            {showDescription && community.description && (
              <p className="text-gray-600 text-sm mt-2 line-clamp-2">{community.description}</p>
            )}
            
            <div className="flex items-center justify-between mt-3">
              {showStats && (
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formattedMemberCount}
                  </span>
                  {community.location && (
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {formattedLocation}
                    </span>
                  )}
                </div>
              )}
              
              {showSocial && (
                <SocialLinks community={community} variant="compact" />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (variant === 'featured') {
    return (
      <div className={`${baseClasses} p-6 relative overflow-hidden`} onClick={handleClick}>
        {/* Featured badge */}
        <div className="absolute top-0 right-0">
          <div className="bg-gradient-to-l from-yellow-400 to-yellow-500 text-yellow-900 px-3 py-1 text-xs font-bold rounded-bl-lg">
            ⭐ DESTACADA
          </div>
        </div>
        
        {/* Partnership badge */}
        {showPartnership && partnershipInfo && (
          <div className="absolute top-0 left-0">
            <div className={`${partnershipInfo.color.bg} ${partnershipInfo.color.text} px-3 py-1 text-xs font-bold rounded-br-lg`}>
              {partnershipInfo.label}
            </div>
          </div>
        )}
        
        <div className="flex items-start gap-4 mt-4">
          {community.logo && (
            <img
              src={community.logo}
              alt={`${community.name} logo`}
              className="w-16 h-16 rounded-xl object-cover flex-shrink-0 shadow-md"
            />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-xl text-gray-900 mb-2">{community.name}</h3>
            
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${typeColor.bg} ${typeColor.text}`}>
                {typeInfo.label}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                {community.category}
              </span>
            </div>
            
            {showDescription && community.description && (
              <p className="text-gray-600 mb-4 line-clamp-3">{community.description}</p>
            )}
            
            {showStats && (
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{formattedMemberCount}</div>
                  <div className="text-sm text-gray-500">Miembros</div>
                </div>
                {community.foundedYear && (
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{community.foundedYear}</div>
                    <div className="text-sm text-gray-500">Fundada</div>
                  </div>
                )}
              </div>
            )}
            
            <div className="flex items-center justify-between">
              {community.location && (
                <div className="flex items-center gap-1 text-gray-500">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">{formattedLocation}</span>
                </div>
              )}
              
              {showSocial && (
                <SocialLinks community={community} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Default variant
  return (
    <div className={`${baseClasses} p-5`} onClick={handleClick}>
      <div className="flex items-start gap-4">
        {community.logo && (
          <img
            src={community.logo}
            alt={`${community.name} logo`}
            className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-lg text-gray-900 leading-tight">{community.name}</h3>
            {community.featured && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 flex-shrink-0">
                ⭐ Destacada
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColor.bg} ${typeColor.text}`}>
              {typeInfo.label}
            </span>
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
              {community.category}
            </span>
            {showPartnership && partnershipInfo && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${partnershipInfo.color.bg} ${partnershipInfo.color.text}`}>
                {partnershipInfo.label}
              </span>
            )}
          </div>
          
          {showDescription && community.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{community.description}</p>
          )}
          
          {/* Technologies */}
          {community.technologies && community.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {community.technologies.slice(0, 3).map((tech, index) => (
                <span key={index} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded">
                  {tech}
                </span>
              ))}
              {community.technologies.length > 3 && (
                <span className="px-2 py-0.5 bg-gray-50 text-gray-500 text-xs rounded">
                  +{community.technologies.length - 3} más
                </span>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between">
            {showStats && (
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {formattedMemberCount} miembros
                </span>
                {community.location && (
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {formattedLocation}
                  </span>
                )}
                {community.foundedYear && (
                  <span>Desde {community.foundedYear}</span>
                )}
              </div>
            )}
            
            {showSocial && (
              <SocialLinks community={community} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCommunityCard;