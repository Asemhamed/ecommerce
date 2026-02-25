export interface BrandResponse {
  results: number;
  metadata: BrandMetadata;
  data: Brand[];
}

export interface BrandMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number; 
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}