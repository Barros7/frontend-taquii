"use client"

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import ErrorMessage from '@/components/ErrorMessage';
import Image from 'next/image';
import styles from './services.module.css';

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  averageRating: number;
  providerId: string;
  imageUrlService?: string;
}

const ServicesPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    categoryId: '',
    imageUrlService: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [categories, setCategories] = useState<Array<{id: string, name: string}>>([]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

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

    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/v1/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchServices();
    fetchCategories();
  }, [user, apiUrl]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/api/v1/services/upload-image', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Erro ao fazer upload da imagem');
    }

    const data = await response.json();
    return data.imageUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);
    
    try {
      let imageUrl = formData.imageUrlService;
      
      // Upload da imagem se houver arquivo novo
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      // Monta payload sem enviar categoryId vazio
      type ServicePayload = {
        title: string;
        description: string;
        price: number;
        duration: number;
        imageUrlService?: string;
        categoryId?: string;
      };

      const serviceData: ServicePayload = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        duration: parseInt(formData.duration),
        imageUrlService: imageUrl
      };
      if (formData.categoryId) {
        serviceData.categoryId = formData.categoryId;
      }

      const url = selectedService 
        ? `/api/v1/services/${selectedService.id}`
        : '/api/v1/services';
      
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
        const errorData = await response.json().catch(() => ({ message: 'Erro ao salvar serviço' }));
        let message = 'Erro ao salvar serviço';
          if (Array.isArray(errorData?.message)) {
          // Zod error array -> junta mensagens
            message = errorData.message.map((e: { message?: string }) => e.message || JSON.stringify(e)).join('; ');
        } else if (typeof errorData?.message === 'string') {
          message = errorData.message;
        }
        throw new Error(message);
      }

      // Recarregar lista de serviços
      const updatedResponse = await fetch(`/api/v1/services?providerId=${user?.id}`);
      const updatedData = await updatedResponse.json();
      setServices(updatedData);

      handleCloseModal();
    } catch (error) {
      console.error('Error saving service:', error);
      const message = error instanceof Error ? error.message : 'Erro ao salvar serviço';
      setFormError(message);
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setFormData({
      title: service.title,
      description: service.description,
      price: service.price.toString(),
      duration: service.duration.toString(),
      categoryId: '', // Será preenchido quando implementarmos a busca de categorias do serviço
      imageUrlService: service.imageUrlService || ''
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
        const errorData = await response.json().catch(() => ({}));
        const message = (errorData && errorData.message) ? errorData.message : `Failed to delete service (status ${response.status})`;
        throw new Error(message);
      }

      // Atualiza lista localmente sem refetch
      setServices(prev => prev.filter(s => s.id !== id));
    } catch (error) {
      console.error('Error deleting service:', error);
      setError(error instanceof Error ? error.message : 'Erro ao excluir serviço');
    }
  };

  const handleCloseModal = () => {
    setSelectedService(null);
    setFormData({
      title: '',
      description: '',
      price: '',
      duration: '',
      categoryId: '',
      imageUrlService: ''
    });
    setIsModalOpen(false);
    setImageFile(null);
    setImagePreview('');
  };

  // Verificar se usuário é prestador
  if (!loading && (!user || user.userType !== 'PROVIDER')) {
    router.push('/login');
    return null;
  }

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <ProtectedRoute allowedTypes={['PROVIDER']}>
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

      <ErrorMessage 
        error={error} 
        onClear={() => setError(null)}
      />

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
            {formError && (
              <div style={{
                margin: '0 24px',
                color: '#842029',
                background: '#f8d7da',
                border: '1px solid #f5c2c7',
                borderRadius: 6,
                padding: '10px 12px'
              }}>
                {formError}
              </div>
            )}
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
              <div className={styles.formGroup}>
                <label htmlFor="categoryId">Categoria</label>
                <select
                  id="categoryId"
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="image">Imagem do Serviço</label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <div style={{ marginTop: 10 }}>
                    <Image 
                      src={imagePreview} 
                      alt="Preview" 
                      width={100}
                      height={100}
                      style={{ objectFit: 'cover', borderRadius: 8 }}
                    />
                  </div>
                )}
              </div>
              <div className={styles.formActions}>
                <button type="button" onClick={handleCloseModal} className={styles.cancelButton}>
                  Cancelar
                </button>
                <button type="submit" className={styles.saveButton} disabled={submitting}>
                  {submitting ? 'Salvando...' : (selectedService ? 'Salvar' : 'Criar')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </ProtectedRoute>
  );
};

export default ServicesPage; 