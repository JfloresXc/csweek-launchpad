// Event Sponsors Types

export interface EventSponsorsResponse {
  sponsors: EventSponsor[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  meta: {
    totalSponsors: number;
    sponsorsByTier: Record<SponsorTier, number>;
    featuredSponsors: number;
  };
}

export interface EventSponsor {
  id: string;
  name: string;
  description: string;
  logo: string;
  website: string;
  tier: SponsorTier;
  category: SponsorCategory;
  featured: boolean;
  benefits: string[];
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
  contact: {
    email?: string;
    phone?: string;
    representative?: string;
  };
  booth?: {
    number: string;
    location: string;
    size: string;
  };
  sponsorshipValue: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type SponsorTier = 
  | 'platinum' 
  | 'gold' 
  | 'silver' 
  | 'bronze' 
  | 'community' 
  | 'media';

export type SponsorCategory = 
  | 'technology' 
  | 'education' 
  | 'startup' 
  | 'enterprise' 
  | 'nonprofit' 
  | 'government' 
  | 'media' 
  | 'community';

export interface EventSponsorsQueryParams {
  limit?: number;
  page?: number;
  sort?: 'name' | 'tier' | 'sponsorshipValue' | 'createdAt' | 'featured';
  tier?: SponsorTier;
  category?: SponsorCategory;
  featured?: boolean;
  search?: string;
}

export interface EventSponsorsState {
  sponsors: EventSponsor[];
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
  filters: EventSponsorsFilters;
}

export interface EventSponsorsFilters {
  tier?: SponsorTier;
  category?: SponsorCategory;
  featured?: boolean;
  search?: string;
}

export interface FeaturedEventSponsor extends EventSponsor {
  featured: true;
  highlightMessage?: string;
  specialOffer?: string;
}

export interface SponsorTierInfo {
  name: string;
  color: string;
  benefits: string[];
  maxSponsors?: number;
  minValue: number;
  displayOrder: number;
}

export interface EventSponsorsStats {
  totalSponsors: number;
  sponsorsByTier: Record<SponsorTier, number>;
  sponsorsByCategory: Record<SponsorCategory, number>;
  totalSponsorshipValue: number;
  featuredSponsors: number;
  activeSponsors: number;
}

export interface SponsorshipPackage {
  id: string;
  tier: SponsorTier;
  name: string;
  price: number;
  benefits: string[];
  maxSponsors?: number;
  available: boolean;
  popular?: boolean;
}

export interface EventSponsorsPageData {
  sponsors: EventSponsor[];
  featuredSponsors: FeaturedEventSponsor[];
  sponsorsByTier: Record<SponsorTier, EventSponsor[]>;
  stats: EventSponsorsStats;
  packages: SponsorshipPackage[];
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