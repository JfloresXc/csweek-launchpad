// Event Communities Types

export interface EventCommunitiesResponse {
  communities: EventCommunity[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  meta: {
    totalCommunities: number;
    communitiesByType: Record<CommunityType, number>;
    communitiesByLocation: Record<string, number>;
    featuredCommunities: number;
    activeCommunities: number;
  };
}

export interface EventCommunity {
  id: string;
  name: string;
  description: string;
  logo: string;
  website?: string;
  type: CommunityType;
  category: CommunityCategory;
  location: {
    city: string;
    country: string;
    region?: string;
    isRemote: boolean;
  };
  featured: boolean;
  memberCount: number;
  foundedYear?: number;
  technologies: string[];
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
    discord?: string;
    slack?: string;
    telegram?: string;
    github?: string;
  };
  contact: {
    email?: string;
    representative?: string;
    phone?: string;
  };
  events: {
    monthlyMeetups: boolean;
    workshops: boolean;
    hackathons: boolean;
    conferences: boolean;
    onlineEvents: boolean;
  };
  partnership: {
    level: PartnershipLevel;
    benefits: string[];
    startDate: string;
    endDate?: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CommunityType = 
  | 'tech_community' 
  | 'university' 
  | 'bootcamp' 
  | 'company' 
  | 'nonprofit' 
  | 'government' 
  | 'startup_hub' 
  | 'coworking';

export type CommunityCategory = 
  | 'programming' 
  | 'data_science' 
  | 'ai_ml' 
  | 'cybersecurity' 
  | 'mobile_dev' 
  | 'web_dev' 
  | 'devops' 
  | 'blockchain' 
  | 'game_dev' 
  | 'ux_ui' 
  | 'general_tech' 
  | 'entrepreneurship';

export type PartnershipLevel = 
  | 'platinum' 
  | 'gold' 
  | 'silver' 
  | 'bronze' 
  | 'community' 
  | 'academic';

export interface EventCommunitiesQueryParams {
  limit?: number;
  page?: number;
  sort?: 'name' | 'memberCount' | 'foundedYear' | 'createdAt' | 'featured';
  type?: CommunityType;
  category?: CommunityCategory;
  location?: string;
  featured?: boolean;
  isRemote?: boolean;
  search?: string;
}

export interface EventCommunitiesState {
  communities: EventCommunity[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  filters: EventCommunitiesFilters;
}

export interface EventCommunitiesFilters {
  type?: CommunityType;
  category?: CommunityCategory;
  location?: string;
  featured?: boolean;
  isRemote?: boolean;
  search?: string;
}

export interface FeaturedEventCommunity extends EventCommunity {
  featured: true;
  highlightMessage?: string;
  specialProgram?: string;
}

export interface CommunityTypeInfo {
  name: string;
  description: string;
  color: string;
  icon: string;
}

export interface EventCommunitiesStats {
  totalCommunities: number;
  communitiesByType: Record<CommunityType, number>;
  communitiesByCategory: Record<CommunityCategory, number>;
  communitiesByLocation: Record<string, number>;
  totalMembers: number;
  featuredCommunities: number;
  activeCommunities: number;
  averageMemberCount: number;
}

export interface CommunityPartnership {
  id: string;
  level: PartnershipLevel;
  name: string;
  benefits: string[];
  requirements: string[];
  available: boolean;
  popular?: boolean;
}

export interface EventCommunitiesPageData {
  communities: EventCommunity[];
  featuredCommunities: FeaturedEventCommunity[];
  communitiesByType: Record<CommunityType, EventCommunity[]>;
  communitiesByLocation: Record<string, EventCommunity[]>;
  stats: EventCommunitiesStats;
  partnerships: CommunityPartnership[];
  isLoading: boolean;
  isError: boolean;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'meetup' | 'workshop' | 'hackathon' | 'conference' | 'online';
  location?: string;
  isOnline: boolean;
  registrationUrl?: string;
  communityId: string;
}

export interface CommunityMember {
  id: string;
  name: string;
  role: 'organizer' | 'member' | 'volunteer' | 'speaker';
  avatar?: string;
  bio?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  joinedAt: string;
}