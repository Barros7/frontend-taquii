"use client"

import React, { useState, useEffect, useCallback } from 'react'; // Adicionado useCallback
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import styles from './schedule.module.css';

interface Appointment {
  id: string;
  date: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  service: {
    id: string;
    title: string;
    duration: number;
    price: number;
  };
  client: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
}

const SchedulePage = () => {
  const { data: session } = useSession();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [view, setView] = useState('day'); // 'day', 'week', 'month'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Acessível aqui também

  // Função fetchAppointments memoizada com useCallback
  const fetchAppointments = useCallback(async () => {
    try {
      const response = await fetch(
        `${apiUrl}/appointments?providerId=${session?.user?.id}&date=${selectedDate}`,
        {
          credentials: 'include'
        }
      );
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  }, [session?.user?.id, selectedDate]); // As dependências da função fetchAppointments

  // useEffect que depende da função fetchAppointments memoizada
  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]); // Apenas a função memoizada é a dependência

  const handleStatusUpdate = async (appointmentId: string, newStatus: Appointment['status']) => {
    try {
      const response = await fetch(`${apiUrl}/appointments/${appointmentId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to update appointment status');
      }

      await fetchAppointments();
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  const handleCancel = async (appointmentId: string) => {
    if (!confirm('Tem certeza que deseja cancelar este agendamento?')) {
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/appointments/${appointmentId}/cancel`, {
        method: 'PUT',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to cancel appointment');
      }

      await fetchAppointments();
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  const handleViewDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedAppointment(null);
    setIsModalOpen(false);
  };

  const handlePreviousMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentMonth(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentMonth(newDate);
  };

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'PENDING':
        return styles.pending;
      case 'CONFIRMED':
        return styles.confirmed;
      case 'CANCELLED':
        return styles.cancelled;
      case 'COMPLETED':
        return styles.completed;
      default:
        return '';
    }
  };

  const getStatusText = (status: Appointment['status']) => {
    switch (status) {
      case 'PENDING':
        return 'Pendente';
      case 'CONFIRMED':
        return 'Confirmado';
      case 'CANCELLED':
        return 'Cancelado';
      case 'COMPLETED':
        return 'Concluído';
      default:
        return status;
    }
  };

  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 8; // Starting from 8 AM
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  return (
    <div className={styles.schedulePage}>
      <div className={styles.header}>
        <h1>Agenda</h1>
        <div className={styles.actions}>
          <select 
            value={view} 
            onChange={(e) => setView(e.target.value)}
            className={styles.viewSelector}
          >
            <option value="day">Dia</option>
            <option value="week">Semana</option>
            <option value="month">Mês</option>
          </select>
          <Link href="/admin/provider/schedule/new" className={styles.newButton}>
            Novo Agendamento
          </Link>
        </div>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className={styles.datePicker}
        />
      </div>

      <div className={styles.calendarSection}>
        <div className={styles.calendarHeader}>
          <button 
            className={styles.navButton}
            onClick={handlePreviousMonth}
          >
            ←
          </button>
          <h2>{currentMonth.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}</h2>
          <button 
            className={styles.navButton}
            onClick={handleNextMonth}
          >
            →
          </button>
        </div>

        <div className={styles.calendarGrid}>
          {view === 'day' && (
            <div className={styles.dayView}>
              <div className={styles.timeColumn}>
                {timeSlots.map(time => (
                  <div key={time} className={styles.timeSlot}>
                    {time}
                  </div>
                ))}
              </div>
              <div className={styles.appointmentsColumn}>
                {appointments.map(appointment => (
                  <div 
                    key={appointment.id}
                    className={`${styles.appointment} ${getStatusColor(appointment.status)}`}
                    style={{
                      top: `${(parseInt(appointment.date.split('T')[1].split(':')[0]) - 8) * 60}px`,
                      height: `${appointment.service.duration}px`
                    }}
                    onClick={() => handleViewDetails(appointment)}
                  >
                    <div className={styles.appointmentContent}>
                      <h4>{appointment.client.name}</h4>
                      <p>{appointment.service.title}</p>
                      <span className={styles.time}>
                        {new Date(appointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.appointmentsList}>
        {appointments.length === 0 ? (
          <p className={styles.noAppointments}>Nenhum agendamento para esta data</p>
        ) : (
          appointments.map(appointment => (
            <div key={appointment.id} className={styles.appointmentCard}>
              <div className={styles.appointmentHeader}>
                <div className={styles.timeInfo}>
                  <i className="fas fa-clock"></i>
                  <span>{new Date(appointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <span className={`${styles.status} ${getStatusColor(appointment.status)}`}>
                  {getStatusText(appointment.status)}
                </span>
              </div>

              <div className={styles.appointmentInfo}>
                <div className={styles.serviceInfo}>
                  <h3>{appointment.service.title}</h3>
                  <div className={styles.serviceDetails}>
                    <span>{appointment.service.duration} min</span>
                    <span>{appointment.service.price.toFixed(2)} Kz</span>
                  </div>
                </div>

                <div className={styles.clientInfo}>
                  <h4>Cliente</h4>
                  <p>{appointment.client.name}</p>
                  <p>{appointment.client.phone}</p>
                </div>
              </div>

              <div className={styles.appointmentActions}>
                <button
                  onClick={() => handleViewDetails(appointment)}
                  className={styles.viewButton}
                >
                  Ver Detalhes
                </button>

                {appointment.status === 'PENDING' && (
                  <>
                    <button
                      onClick={() => handleStatusUpdate(appointment.id, 'CONFIRMED')}
                      className={styles.confirmButton}
                    >
                      Confirmar
                    </button>
                    <button
                      onClick={() => handleCancel(appointment.id)}
                      className={styles.cancelButton}
                    >
                      Cancelar
                    </button>
                  </>
                )}

                {appointment.status === 'CONFIRMED' && (
                  <button
                    onClick={() => handleStatusUpdate(appointment.id, 'COMPLETED')}
                    className={styles.completeButton}
                  >
                    Concluir
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && selectedAppointment && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Detalhes do Agendamento</h2>
              <button onClick={handleCloseModal} className={styles.closeButton}>
                ×
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.detailGroup}>
                <h3>Informações do Serviço</h3>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Serviço:</span>
                  <span className={styles.value}>{selectedAppointment.service.title}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Duração:</span>
                  <span className={styles.value}>{selectedAppointment.service.duration} minutos</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Preço:</span>
                  <span className={styles.value}>{selectedAppointment.service.price.toFixed(2)} Kz</span>
                </div>
              </div>

              <div className={styles.detailGroup}>
                <h3>Informações do Cliente</h3>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Nome:</span>
                  <span className={styles.value}>{selectedAppointment.client.name}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Email:</span>
                  <span className={styles.value}>{selectedAppointment.client.email}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Telefone:</span>
                  <span className={styles.value}>{selectedAppointment.client.phone}</span>
                </div>
              </div>

              <div className={styles.detailGroup}>
                <h3>Informações do Agendamento</h3>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Data:</span>
                  <span className={styles.value}>
                    {new Date(selectedAppointment.date).toLocaleDateString()}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Horário:</span>
                  <span className={styles.value}>
                    {new Date(selectedAppointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Status:</span>
                  <span className={`${styles.value} ${getStatusColor(selectedAppointment.status)}`}>
                    {getStatusText(selectedAppointment.status)}
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button onClick={handleCloseModal} className={styles.closeModalButton}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulePage;