export interface User {
  id: string;
  email: string;
  name: string;
  userType: 'CUSTOMER' | 'PROVIDER' | 'ADMIN';
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  name: string;
  duration: number;
  status: 'Disponível' | 'Indisponível';
  description: string;
  price: string;
  category: string;
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  services: Service[];
  rating: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  userId: string;
  providerId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  providerId: string;
  date: Date;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
} 