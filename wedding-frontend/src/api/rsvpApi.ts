import apiClient from './apiClient';
import type { RsvpRequest, RsvpResponse } from '../types';

export const rsvpApi = {
  // Public: Submit RSVP
  submit: async (data: RsvpRequest): Promise<RsvpResponse> => {
    const response = await apiClient.post<RsvpResponse>('/rsvp', data);
    return response.data;
  },
};

