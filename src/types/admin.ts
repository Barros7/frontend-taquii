export type UserType = 'ADMIN' | 'PROVIDER';

export interface MenuItem {
  path: string;
  label: string;
  icon: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  userType: UserType;
  avatar?: string;
}

export interface AdminStats {
  totalAppointments?: number;
  activeUsers?: number;
  totalRevenue?: string;
  pendingPayments?: number;
  totalClients?: number;
  completedServices?: number;
}

export interface RecentActivity {
  id: number;
  type: 'appointment' | 'payment' | 'user' | 'service';
  description: string;
  time: string;
  icon: string;
} 