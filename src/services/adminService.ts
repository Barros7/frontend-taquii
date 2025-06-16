
const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
  // Obter estatísticas do dashboard de admin
  getStats: async (): Promise<AdminStats> => {
    try {
      const response = await fetch(`${API_URL}/admin/stats`); // Use API_URL aqui

      if (!response.ok) {
        const errorDetail = await response.json().catch(() => ({ message: response.statusText || 'Erro desconhecido' }));
        throw new Error(`Erro ao buscar estatísticas do admin: ${response.status} - ${errorDetail.message}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro em getStats:', error);
      throw error; // Re-lança o erro para ser tratado pelo chamador
    }
  },

  // Obter atividades recentes
  getRecentActivities: async (): Promise<RecentActivity[]> => {
    try {
      const response = await fetch(`${API_URL}/admin/activities`); // Use API_URL aqui

      if (!response.ok) {
        const errorDetail = await response.json().catch(() => ({ message: response.statusText || 'Erro desconhecido' }));
        throw new Error(`Erro ao buscar atividades recentes: ${response.status} - ${errorDetail.message}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro em getRecentActivities:', error);
      throw error;
    }
  },

  // Obter estatísticas do dashboard do provedor
  getProviderStats: async (providerId: string): Promise<{
    todayAppointments: number;
    weeklyAppointments: number;
    monthlyRevenue: string;
    customerRating: number;
  }> => {
    try {
      const response = await fetch(`${API_URL}/admin/provider/${providerId}/stats`); // Use API_URL aqui

      if (!response.ok) {
        const errorDetail = await response.json().catch(() => ({ message: response.statusText || 'Erro desconhecido' }));
        throw new Error(`Erro ao buscar estatísticas do provedor ${providerId}: ${response.status} - ${errorDetail.message}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro em getProviderStats:', error);
      throw error;
    }
  }
};