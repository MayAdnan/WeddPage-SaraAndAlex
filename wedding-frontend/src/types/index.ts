// RSVP Types
export interface RsvpRequest {
  fullName: string;
  email: string;
  isAttending: boolean;
  numberOfGuests: number;
  dietaryRestrictions?: string;
}

export interface RsvpResponse {
  id: string;
  fullName: string;
  email: string;
  isAttending: boolean;
  numberOfGuests: number;
  dietaryRestrictions?: string;
  submittedAt: string;
}

export interface RsvpStats {
  totalResponses: number;
  attendingCount: number;
  notAttendingCount: number;
  totalGuests: number;
}

// Wedding Info Types
export interface WeddingInfo {
  brideName: string;
  groomName: string;
  weddingDate: string;
  ceremonyTime?: string;
  receptionTime?: string;
  venueName: string;
  venueAddress?: string;
  description?: string;
  dressCode?: string;
  contactEmail?: string;
  contactPhone?: string;
}

export interface WeddingInfoUpdate {
  brideName: string;
  groomName: string;
  weddingDate: string;
  ceremonyTime?: string;
  receptionTime?: string;
  venueName: string;
  venueAddress?: string;
  description?: string;
  dressCode?: string;
  contactEmail?: string;
  contactPhone?: string;
}

// Auth Types
export interface AdminLoginRequest {
  username: string;
  password: string;
}

export interface AdminLoginResponse {
  token: string;
  expiresAt: string;
}

// API Error
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}


