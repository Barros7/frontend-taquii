"use client";
import React, { useEffect, useState } from "react";
import styles from "./services.module.css";
import { Spinner } from '@/components/Spinner';

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  averageRating: number;
  providerId: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    providerId: ''
  });
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Limpar erros automaticamente após 5 segundos
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (formError) {
      const timer = setTimeout(() => {
        setFormError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [formError]);

  useEffect(() => {
    if (deleteError) {
      const timer = setTimeout(() => {
        setDeleteError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [deleteError]);

  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/v1/services", { credentials: "include" });
      if (!response.ok) throw new Error("Erro ao buscar serviços");
      const data = await response.json();
      setServices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpenModal = (service?: Service) => {
    if (service) {
      setEditId(service.id);
      setFormData({
        title: service.title,
        description: service.description,
        price: service.price.toString(),
        duration: service.duration.toString(),
        providerId: service.providerId
      });
    } else {
      setEditId(null);
      setFormData({ title: '', description: '', price: '', duration: '', providerId: '' });
    }
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormError(null);
    setEditId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setCreating(true);
    try {
      if (!formData.title || !formData.description || !formData.price || !formData.duration || !formData.providerId) {
        setFormError('Preencha todos os campos.');
        setCreating(false);
        return;
      }
      const payload = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        duration: parseInt(formData.duration),
        providerId: formData.providerId
      };
      let response;
      if (editId) {
        response = await fetch(`/api/v1/services/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(payload)
        });
      } else {
        response = await fetch('/api/v1/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(payload)
        });
      }
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || 'Erro ao salvar serviço');
      }
      await fetchServices();
      setIsModalOpen(false);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setCreating(false);
      setEditId(null);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    setDeleteError(null);
    try {
      const response = await fetch(`/api/v1/services/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || 'Erro ao deletar serviço');
      }
      await fetchServices();
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>Serviços</span>
        <button className={styles.button} onClick={() => handleOpenModal()}>Novo Serviço</button>
      </div>
      {loading ? (
        <div><Spinner /></div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Duração</th>
              <th>Provider</th>
              <th>Rating</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.id}>
                <td>{service.id}</td>
                <td>{service.title}</td>
                <td>{service.description}</td>
                <td>{service.price.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}</td>
                <td>{service.duration} min</td>
                <td>{service.providerId}</td>
                <td>{service.averageRating?.toFixed(1) ?? '-'}</td>
                <td>
                  <button className={styles.editButton} onClick={() => handleOpenModal(service)}>
                    Editar
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => {
                      if (window.confirm('Tem certeza que deseja excluir este serviço?')) handleDelete(service.id);
                    }}
                    disabled={deletingId === service.id}
                  >
                    {deletingId === service.id ? 'Excluindo...' : 'Excluir'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>{editId ? 'Editar Serviço' : 'Novo Serviço'}</h2>
              <button onClick={handleCloseModal} className={styles.closeButton}>×</button>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="title">Título</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="description">Descrição</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="price">Preço</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="duration">Duração (minutos)</label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="providerId">ID do Provider</label>
                <input
                  type="text"
                  id="providerId"
                  name="providerId"
                  value={formData.providerId}
                  onChange={handleChange}
                  required
                />
              </div>
              {formError && <div style={{ color: 'red', marginBottom: 8 }}>{formError}</div>}
              <div className={styles.formActions}>
                <button type="button" onClick={handleCloseModal} className={styles.cancelButton} disabled={creating}>
                  Cancelar
                </button>
                <button type="submit" className={styles.saveButton} disabled={creating}>
                  {creating ? (editId ? 'Salvando...' : 'Criando...') : (editId ? 'Salvar' : 'Criar')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {deleteError && <div style={{ color: 'red', marginTop: 8 }}>{deleteError}</div>}
    </div>
  );
} 