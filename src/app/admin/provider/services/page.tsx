"use client"

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import styles from './services.module.css';

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  averageRating: number;
  providerId: string;
}

const ServicesPage = () => {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: ''
  });

  useEffect(() => {
    if (!user?.id) return;

    const fetchServices = async () => {
      try {
        const response = await fetch(`/api/v1/services?providerId=${user?.id}`);
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, [user, apiUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const serviceData = {
        ...formData,
        price: parseFloat(formData.price),
        duration: parseInt(formData.duration),
        providerId: user?.id
      };

      const url = selectedService 
        ? `${apiUrl}/services/${selectedService.id}`
        : '${apiUrl}/services';
      
      const method = selectedService ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to save service');
      }

      handleCloseModal();
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setFormData({
      title: service.title,
      description: service.description,
      price: service.price.toString(),
      duration: service.duration.toString()
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este serviço?')) {
      return;
    }

    try {
      const response = await fetch(`/api/v1/services/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to delete service');
      }

    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const handleCloseModal = () => {
    setSelectedService(null);
    setFormData({
      title: '',
      description: '',
      price: '',
      duration: ''
    });
    setIsModalOpen(false);
  };

  return (
    <div className={styles.servicesPage}>
      <div className={styles.header}>
        <h1>Meus Serviços</h1>
        <button 
          className={styles.addButton}
          onClick={() => setIsModalOpen(true)}
        >
          Adicionar Serviço
        </button>
      </div>

      <div className={styles.servicesGrid}>
        {services.map(service => (
          <div key={service.id} className={styles.serviceCard}>
            <div className={styles.serviceHeader}>
              <h3>{service.title}</h3>
              <div className={styles.rating}>
                <i className="fas fa-star"></i>
                <span>{service.averageRating.toFixed(1)}</span>
              </div>
            </div>
            <p className={styles.description}>{service.description}</p>
            <div className={styles.serviceInfo}>
              <div className={styles.infoItem}>
                <i className="fas fa-dollar-sign"></i>
                <span>{service.price.toFixed(2)}</span>
              </div>
              <div className={styles.infoItem}>
                <i className="fas fa-clock"></i>
                <span>{service.duration} min</span>
              </div>
            </div>
            <div className={styles.serviceActions}>
              <button 
                onClick={() => handleEdit(service)}
                className={styles.editButton}
              >
                Editar
              </button>
              <button 
                onClick={() => handleDelete(service.id)}
                className={styles.deleteButton}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>{selectedService ? 'Editar Serviço' : 'Novo Serviço'}</h2>
              <button onClick={handleCloseModal} className={styles.closeButton}>
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="title">Título</label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="description">Descrição</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="price">Preço</label>
                  <input
                    type="number"
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    step="0.01"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="duration">Duração (minutos)</label>
                  <input
                    type="number"
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className={styles.formActions}>
                <button type="button" onClick={handleCloseModal} className={styles.cancelButton}>
                  Cancelar
                </button>
                <button type="submit" className={styles.saveButton}>
                  {selectedService ? 'Salvar' : 'Criar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesPage; 