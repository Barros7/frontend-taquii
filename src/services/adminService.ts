import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export interface AdminStats {
  totalAppointments: number;
  activeUsers: number;
  totalRevenue: string;
  pendingPayments: number;
  totalClients: number;
  completedServices: number;
}

export interface RecentActivity {
  id: string;
  type: 'appointment' | 'payment' | 'user';
  description: string;
  time: string;
  createdAt: string;
}

export const adminService = {
  // Get admin dashboard statistics
  getStats: async (): Promise<AdminStats> => {
    const response = await axios.get(`${API_URL}/admin/stats`);
    return response.data;
  },

  // Get recent activities
  getRecentActivities: async (): Promise<RecentActivity[]> => {
    const response = await axios.get(`${API_URL}/admin/activities`);
    return response.data;
  },

  // Get provider dashboard statistics
  getProviderStats: async (providerId: string): Promise<{
    todayAppointments: number;
    weeklyAppointments: number;
    monthlyRevenue: string;
    customerRating: number;
  }> => {
    const response = await axios.get(`${API_URL}/admin/provider/${providerId}/stats`);
    return response.data;
  }
}; 