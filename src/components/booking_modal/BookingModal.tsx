"use client";
import React, { useEffect, useState } from 'react';
import './BookingModal.css';
import 'bootstrap/dist/css/bootstrap.min.css';

type Service = {
  id: string;
  name: string;
  descricao?: string;
};

const horarios = {
  manhã: ['07:00', '08:00', '09:00', '10:00', '11:00'],
  tarde: ['12:00', '14:00', '15:00', '16:00', '17:00'],
  noite: ['18:00', '19:00', '20:00', '21:00', '22:00'],
};

const agendaExemplo = {
  '07/04/2025': {
    manhã: [{ hora: '09:00', nome: 'Helena Pedro' }],
    tarde: [
      { hora: '12:00', nome: 'Helena Pedro' },
      { hora: '14:00', nome: 'Barros Bongo' },
      { hora: '17:00', nome: 'Agar Jorge' },
    ],
    noite: [
      { hora: '18:00', nome: 'Helena Pedro' },
      { hora: '19:00', nome: 'Helena Pedro' },
    ],
  },
};

interface BookingModalProps {
  service: Service | null; // Service can be null initially
  show: boolean; // Controls if the modal is shown
  onClose: () => void; // Function to call when the modal should close
}

const BookingModal: React.FC<BookingModalProps> = ({ service, show, onClose }) => {
  const [showModal, setShowModal] = useState(true);
  const [data, setData] = useState('2025-04-07');
  const [atendimento, setAtendimento] = useState<'estabelecimento' | 'casa'>('estabelecimento');
  const [horaSelecionada, setHoraSelecionada] = useState('');

  const renderAgenda = (periodo: 'manhã' | 'tarde' | 'noite') => {
    return agendaExemplo['07/04/2025'][periodo].map((item, index) => (
      <div key={index} className="border-b py-1">
        <strong>{item.hora}</strong> - {item.nome}
      </div>
    ));
  };

  // Effect to handle body scroll when modal is open/closed (optional but good UX)
  useEffect(() => {
    if (show) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    // Clean up the class when the component unmounts
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [show]); // Rerun effect when 'show' changes

  const handleAgendar = () => {
    if (service && horaSelecionada) {
      alert(`Agendado o serviço "${service.name}" para ${data} às ${horaSelecionada} (${atendimento})`);
      onClose(); // Close the modal after booking
    } else {
      alert('Por favor, selecione um horário.');
    }
  };

  // If service is null or modal is not supposed to be shown, return null
  if (!show || !service) {
    return null;
  }

  // Handle backdrop click to close modal
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
          onClose();
      }
  };
  
  return (
    <div className="container-booking-modal">
      {showModal && (
        <div className="container-booking text-white">
          <div className="container-booking-header d-flex justify-content-between align-items-center">
            <p className="title-booking">{service.name}</p>
            <button
              type="button"
              className="btn-close btn-close-white"
              aria-label="Close"
              onClick={onClose} // Call the onClose prop when clicked
            ></button>
          </div>
          <div className="row">
            <div className="col-5 container-booking-left">
              <div className="p-4 rounded-xl">
                <h2 className="title-booking text-lg mb-1">Agende o seu atendimento</h2>
                <p className="subtitle-booking">Selecione a data, hora e o local de atendimento.</p>

                <label className="labels-input-modal block mb-2">Data</label><br />
                <input
                  type="date"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  className="input-calendary mb-4"
                />

                <div className="mb-3">
                  <label className="labels-input-modal">Atendimento</label>
                  <div className="radio-group">
                    <div className="radio-item">
                      <label className="radio-label">
                        <input
                          type="radio"
                          checked={atendimento === 'estabelecimento'}
                          onChange={() => setAtendimento('estabelecimento')}
                          className="me-2"
                        />
                        No estabelecimento
                      </label>
                    </div>
                    <div className="radio-item">
                      <label className="radio-label">
                        <input
                          type="radio"
                          checked={atendimento === 'casa'}
                          onChange={() => setAtendimento('casa')}
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
                            }`}
                            onClick={() => setHoraSelecionada(hora)}
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
                >
                  Agendar
                </button>
              </div>
            </div>

            <div className="col-7">
              <div className="bg-[#1B263B] p-4 rounded-xl">
                <h2 className="title-container-my-booking">Sua agenda</h2>
                <p className="description-container-my-bookings">Consulte aqui toda sua agenda</p>
                <hr />
                <div className="p-2">
                  <p className="block mb-2">Manhã (08h-12h)</p>
                  <span>
                    {renderAgenda('manhã')}
                  </span>
                </div>
                <hr />

                <div className="p-2">
                  <p className="block mb-2">Tarde (12h-18h)</p>
                  <span>
                    {renderAgenda('tarde')}
                  </span>
                </div>
                <hr />

                <div className="p-2">
                  <p className="block mb-2">Noite (18h-21h)</p>
                  <span>
                    {renderAgenda('noite')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingModal;
