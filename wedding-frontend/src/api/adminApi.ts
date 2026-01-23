import apiClient from './apiClient';
import type { 
  AdminLoginRequest, 
  AdminLoginResponse, 
  RsvpResponse, 
  RsvpStats, 
  WeddingInfo, 
  WeddingInfoUpdate 
} from '../types';

export const adminApi = {
  // Login
  login: async (credentials: AdminLoginRequest): Promise<AdminLoginResponse> => {
    const response = await apiClient.post<AdminLoginResponse>('/admin/login', credentials);
    return response.data;
  },

  // Get all RSVPs
  getRsvps: async (): Promise<RsvpResponse[]> => {
    const response = await apiClient.get<RsvpResponse[]>('/admin/rsvps');
    return response.data;
  },

  // Get RSVP stats
  getRsvpStats: async (): Promise<RsvpStats> => {
    const response = await apiClient.get<RsvpStats>('/admin/rsvps/stats');
    return response.data;
  },

  // Get wedding info (admin)
  getWeddingInfo: async (): Promise<WeddingInfo> => {
    const response = await apiClient.get<WeddingInfo>('/admin/wedding/info');
    return response.data;
  },

  // Update wedding info
  updateWeddingInfo: async (data: WeddingInfoUpdate): Promise<WeddingInfo> => {
    const response = await apiClient.put<WeddingInfo>('/admin/wedding/info', data);
    return response.data;
  },
};

