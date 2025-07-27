export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  providerId: string;
  provider: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
}

export interface Appointment {
  id: string;
  clientId: string;
  providerId: string;
  serviceId: string;
  date: string;
  location: string;
  amount: number;
  status: string;
  service: Service;
  provider: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  client: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
}

export interface CreateAppointmentData {
  clientId: string;
  providerId: string;
  serviceId: string;
  date: string;
  location: string;
  amount: number;
  referenceCode: string;
  mobileNumber: string;
}

export interface Payment {
  id: string;
  appointmentId: string;
  amount: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  appointment: Appointment;
}

export interface PaymentQRCodeResponse {
  data: {
    Code: string;
    QRCode: string;
    Range: unknown;
  };
  status: number;
  statusText: string;
}

export const apiService = {
  // Buscar serviço por ID
  getService: async (serviceId: string): Promise<Service> => {
    try {
      const response = await fetch(`/api/v1/services/${serviceId}`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorDetail = await response.json().catch(() => ({ message: response.statusText || 'Erro desconhecido' }));
        throw new Error(`Erro ao buscar serviço: ${response.status} - ${errorDetail.message}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro em getService:', error);
      throw error;
    }
  },

  // Buscar horários ocupados para um provedor em uma data específica
  getBookedSlots: async (providerId: string, date: string): Promise<string[]> => {
    try {
      const response = await fetch(`/api/v1/appointments/booked-slots?providerId=${providerId}&date=${date}`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorDetail = await response.json().catch(() => ({ message: response.statusText || 'Erro desconhecido' }));
        throw new Error(`Erro ao buscar horários ocupados: ${response.status} - ${errorDetail.message}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro em getBookedSlots:', error);
      throw error;
    }
  },

  // Criar agendamento
  createAppointment: async (appointmentData: CreateAppointmentData): Promise<Appointment> => {
    try {
      const response = await fetch(`/api/v1/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorDetail = await response.json().catch(() => ({ message: response.statusText || 'Erro desconhecido' }));
        throw new Error(`Erro ao criar agendamento: ${response.status} - ${errorDetail.message}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro em createAppointment:', error);
      throw error;
    }
  },

  // Buscar agendamento por ID
  getAppointment: async (appointmentId: string): Promise<Appointment> => {
    try {
      const response = await fetch(`/api/v1/appointments/${appointmentId}`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorDetail = await response.json().catch(() => ({ message: response.statusText || 'Erro desconhecido' }));
        throw new Error(`Erro ao buscar agendamento: ${response.status} - ${errorDetail.message}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro em getAppointment:', error);
      throw error;
    }
  },

  // Buscar pagamento por ID do agendamento
  getPaymentByAppointmentId: async (appointmentId: string): Promise<Payment> => {
    try {
      const response = await fetch(`/api/v1/appointments/${appointmentId}/payment`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorDetail = await response.json().catch(() => ({ message: response.statusText || 'Erro desconhecido' }));
        throw new Error(`Erro ao buscar pagamento: ${response.status} - ${errorDetail.message}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro em getPaymentByAppointmentId:', error);
      throw error;
    }
  },

  // Atualizar status do pagamento
  updatePaymentStatus: async (paymentId: string, status: string): Promise<Payment> => {
    try {
      const response = await fetch(`/api/v1/payments/${paymentId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorDetail = await response.json().catch(() => ({ message: response.statusText || 'Erro desconhecido' }));
        throw new Error(`Erro ao atualizar status do pagamento: ${response.status} - ${errorDetail.message}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro em updatePaymentStatus:', error);
      throw error;
    }
  },
}; 