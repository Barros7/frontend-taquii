"use client"

import React, { useEffect, useState } from 'react';
import styles from './clients.module.css';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalAppointments: number;
  lastVisit: string;
  favoriteServices: string[];
  status: 'ativo' | 'inativo';
}

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>();
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (client: Client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedClient(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchClients = async () => {
      const response = await fetch(`/clients`);
      const data = await response.json();
      setClients(data);
    };

    fetchClients();
  }, []);

  return (
    <div className={styles.clientsPage}>
      <div className={styles.header}>
        <h1>Clientes</h1>
        <div className={styles.searchBar}>
          <input 
            type="text" 
            placeholder="Buscar clientes..." 
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.clientsGrid}>
        {clients?.map(client => (
          <div key={client.id} className={styles.clientCard}>
            <div className={styles.clientHeader}>
              <h3>{client.name}</h3>
              <span className={`${styles.status} ${styles[client.status]}`}>
                {client.status}
              </span>
            </div>
            <div className={styles.clientInfo}>
              <div className={styles.infoRow}>
                <span className={styles.label}>Email:</span>
                <span className={styles.value}>{client.email}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Telefone:</span>
                <span className={styles.value}>{client.phone}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Total de Visitas:</span>
                <span className={styles.value}>{client.totalAppointments}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>Última Visita:</span>
                <span className={styles.value}>{client.lastVisit}</span>
              </div>
            </div>
            <div className={styles.clientActions}>
              <button 
                onClick={() => handleViewDetails(client)}
                className={styles.viewButton}
              >
                Ver Detalhes
              </button>
              <button className={styles.scheduleButton}>
                Agendar
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedClient && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Detalhes do Cliente</h2>
              <button onClick={handleCloseModal} className={styles.closeButton}>
                ×
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.clientDetails}>
                <div className={styles.detailGroup}>
                  <h3>Informações Pessoais</h3>
                  <div className={styles.detailRow}>
                    <span className={styles.label}>Nome:</span>
                    <span className={styles.value}>{selectedClient.name}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.label}>Email:</span>
                    <span className={styles.value}>{selectedClient.email}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.label}>Telefone:</span>
                    <span className={styles.value}>{selectedClient.phone}</span>
                  </div>
                </div>

                <div className={styles.detailGroup}>
                  <h3>Histórico</h3>
                  <div className={styles.detailRow}>
                    <span className={styles.label}>Total de Visitas:</span>
                    <span className={styles.value}>{selectedClient.totalAppointments}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.label}>Última Visita:</span>
                    <span className={styles.value}>{selectedClient.lastVisit}</span>
                  </div>
                </div>

                <div className={styles.detailGroup}>
                  <h3>Serviços Favoritos</h3>
                  <div className={styles.favoriteServices}>
                    {selectedClient.favoriteServices.map((service, index) => (
                      <span key={index} className={styles.serviceTag}>
                        {service}
                      </span>
                    ))}
                  </div>
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

export default ClientsPage; 