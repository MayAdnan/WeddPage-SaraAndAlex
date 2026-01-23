import apiClient from './apiClient';
import type { WeddingInfo } from '../types';

export const weddingApi = {
  // Public: Get wedding info
  getInfo: async (): Promise<WeddingInfo> => {
    const response = await apiClient.get<WeddingInfo>('/wedding/info');
    return response.data;
  },
};

