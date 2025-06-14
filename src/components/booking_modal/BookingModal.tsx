// components/booking_modal/BookingModal.tsx
"use client";
import React, { useEffect, useState, useCallback } from 'react';
import './BookingModal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// Importe um hook para autenticação, por exemplo useSession de next-auth
// import { useSession } from 'next-auth/react'; // Exemplo para NextAuth.js

// Definir horários fixos
const horarios = {
  manhã: ['07:00', '08:00', '09:00', '10:00', '11:00'],
  tarde: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'], // Adicionado 13:00
  noite: ['18:00', '19:00', '20:00', '21:00', '22:00'],
};

// Tipos para as enums do seu schema
type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
type AppointmentLocation = 'HOME' | 'ESTABLISHMENT';
type PaymentStatus = 'PENDING' | 'AUTHORIZED' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'REFUNDED' | 'PARTIALLY_REFUNDED' | 'DISPUTED' | 'CHARGEBACKED';

type Service = {
  id: string;
  title: string;
  description?: string;
  duration: number; // Duração do serviço em minutos ou horas? Assumindo minutos.
  price: number;
  providerId: string;
};

interface BookingModalProps {
  service: Service | null;
  show: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ service, show, onClose }) => {
  const [data, setData] = useState(new Date().toISOString().split('T')[0]);
  const [atendimento, setAtendimento] = useState<AppointmentLocation>('ESTABLISHMENT'); // Altere para usar o tipo da enum
  const [horaSelecionada, setHoraSelecionada] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]); // Array de horários ocupados ('HH:MM')

  // Exemplo de como obter o ID do cliente (adaptar para sua solução de autenticação)
  // const { data: session } = useSession();
  // const clientId = session?.user?.id; // Supondo que o ID do usuário está na sessão
  const clientId = 'CLIE-NTID-FAKE-PARA-TESTE'; // REMOVA OU SUBSTITUA POR LÓGICA REAL!

  const fetchAvailableSlots = useCallback(async () => {
    if (!service || !data) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // Passa providerId e date como query params para GET
      const response = await fetch(`http://localhost:8000/api/appointments/booked-slots?providerId="877f630b-fc53-4ca3-afba-b2d482dd93ed"&date=${data}`);
      
      if (!response.ok) {
        throw new Error(`Erro ao buscar horários: ${response.statusText}`);
      }
      const bookedTimes = await response.json();
      setBookedSlots(bookedTimes);
    } catch (err: unknown) {
      console.error('Erro ao buscar horários disponíveis:', err);
      setError('Não foi possível carregar os horários disponíveis.');
      setBookedSlots([]); // Limpa os slots em caso de erro
    } finally {
      setLoading(false);
    }
  }, [data, service]);

  // Busca horários ao montar o componente e quando a data ou serviço mudam
  useEffect(() => {
    if (show && service) { // Apenas busca se o modal estiver visível e tiver um serviço
      fetchAvailableSlots();
    }
  }, [show, service, data, fetchAvailableSlots]);

  // Função para verificar se um slot de tempo está disponível
  const isTimeSlotAvailable = (time: string) => {
    // Verifica se a hora está na lista de horários ocupados
    return !bookedSlots.includes(time);
  };

  const handleAgendar = async () => {
    if (!service || !horaSelecionada) {
      setError('Por favor, selecione um horário.');
      return;
    }
/*
    if (!clientId || clientId === 'CLIE-NTID-FAKE-PARA-TESTE') { // Verifique se o cliente está logado
      setError('Por favor, faça login para agendar um serviço.');
      return;
    }
*/
    setLoading(true);
    setError(null);

    try {
      // Combine data e hora para criar um objeto Date ISO 8601
      const appointmentDateTime = new Date(`${data}T${horaSelecionada}:00`); // Adicione segundos

      const appointmentData = {
        date: appointmentDateTime.toISOString(),
        serviceId: service.id,
        providerId: "877f630b-fc53-4ca3-afba-b2d482dd93ed",
        clientId: "471ea78e-2ba4-4a6b-b415-80b1744ea266",
        status: 'PENDING' as AppointmentStatus,
        location: atendimento,
        paymentMethod: 'Dinheiro no local',
        paymentStatus: 'PENDING' as PaymentStatus,
        amount: service.price
      };

      const response = await fetch('http://localhost:8000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointmentData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao realizar agendamento.');
      }

      alert('Agendamento realizado com sucesso!');
      onClose(); // Fecha o modal
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao realizar agendamento. Tente novamente.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Effect para controlar o scroll do body (boa prática de UX)
  useEffect(() => {
    if (show) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
      // Resetar estados quando o modal fecha para garantir que ele esteja limpo na próxima abertura
      setData(new Date().toISOString().split('T')[0]);
      setAtendimento('ESTABLISHMENT');
      setHoraSelecionada('');
      setBookedSlots([]);
      setError(null);
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [show]);

  if (!show || !service) {
    return null;
  }

  return (
    <div className="container-booking-modal my-responsive-container">
      <div className="container-booking text-white">
        <div className="container-booking-header d-flex justify-content-between align-items-center">
          <p className="title-booking">{service.title}</p>
          <button
            type="button"
            className="btn-close btn-close-white"
            aria-label="Close"
            onClick={onClose}
          ></button>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-5 container-booking-left">
            <div className="p-4 rounded-xl">
              <h2 className="title-booking text-lg mb-1">Agende o seu atendimento</h2>
              <p className="subtitle-booking">Selecione a data, hora e o local de atendimento.</p>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              {loading && <div className="alert alert-info">Carregando horários...</div>}

              <label className="labels-input-modal block mb-2">Data</label><br />
              <input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="input-calendary mb-4"
                min={new Date().toISOString().split('T')[0]}
              />

              <div className="mb-3">
                <label className="labels-input-modal">Atendimento</label>
                <div className="radio-group">
                  <div className="radio-item">
                    <label className="radio-label">
                      <input
                        type="radio"
                        checked={atendimento === 'ESTABLISHMENT'}
                        onChange={() => setAtendimento('ESTABLISHMENT')}
                        className="me-2"
                      />
                      No estabelecimento
                    </label>
                  </div>
                  <div className="radio-item">
                    <label className="radio-label">
                      <input
                        type="radio"
                        checked={atendimento === 'HOME'}
                        onChange={() => setAtendimento('HOME')}
                        className="me-2"
                      />
                      Em casa
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="labels-input-modal">Horário</label>
                {Object.entries(horarios).map(([periodo, horas]) => (
                  <div key={periodo} className="mb-2">
                    <label className="labels-input-modal capitalize mb-1">{periodo}</label>
                    <div className="radio-group">
                      {horas.map((hora) => (
                        <button
                          key={hora}
                          className={`buttons-booking ${
                            horaSelecionada === hora ? 'bg-blue-500' : 'bg-gray-600'
                          } ${!isTimeSlotAvailable(hora) ? 'opacity-50 cursor-not-allowed' : ''}`}
                          onClick={() => isTimeSlotAvailable(hora) && setHoraSelecionada(hora)}
                          disabled={!isTimeSlotAvailable(hora) || loading} // Desabilita se estiver carregando
                        >
                          {hora}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleAgendar}
                className="buttons-booking buttons-booking-confirm w-100 my-3"
                disabled={loading || !horaSelecionada || !clientId}
              >
                {loading ? 'Agendando...' : 'Confirmar Agenda'}
              </button>
            </div>
          </div>

          <div className="col-xs-12 col-sm-7">
            <div className="p-4 rounded-xl">
              <h2 className="title-container-my-booking">Horários Disponíveis</h2>
              <p className="description-container-my-bookings">Consulte os horários disponíveis para {data}</p>
              <hr />
              {loading ? (
                <p>A carregar horários...</p>
              ) : error ? (
                <p className="text-danger">{error}</p>
              ) : (
                Object.entries(horarios).map(([periodo, horas]) => (
                  <div key={periodo} className="p-2">
                    <p className="block mb-2">{periodo.charAt(0).toUpperCase() + periodo.slice(1)} ({horas[0]}-{horas[horas.length - 1]})</p>
                    <div className="d-flex flex-wrap gap-2">
                      {horas.map((hora) => (
                        <span
                          key={hora}
                          className={`badge ${isTimeSlotAvailable(hora) ? 'bg-success' : 'bg-danger'}`}
                        >
                          {hora}
                        </span>
                      ))}
                    </div>
                    <hr />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;