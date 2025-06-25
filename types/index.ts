export interface Artist {
  id: string;
  name: string;
  bio: string;
  categories: string[];
  languages: string[];
  feeRange: string;
  location: string;
  image?: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface FilterOptions {
  categories: string[];
  locations: string[];
  feeRanges: string[];
}

export interface FormData {
  name: string;
  bio: string;
  categories: string[];
  languages: string[];
  feeRange: string;
  location: string;
  image?: File;
}