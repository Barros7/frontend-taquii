'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './ServiceForm.module.css';

interface ServiceFormProps {
  initialData?: {
    id?: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    category: string;
  };
  onSubmit: (data: object) => Promise<void>;
  isEditing?: boolean;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ initialData, onSubmit, isEditing = false }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    category: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        price: initialData.price.toString(),
        duration: initialData.duration.toString(),
        category: initialData.category
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = {
        ...formData,
        price: parseFloat(formData.price),
        duration: parseInt(formData.duration)
      };

      await onSubmit(data);
      router.refresh();
      router.push('/admin/services');
    } catch (err) {
      setError('Erro ao salvar serviço. Tente novamente.');
      console.error('Error saving service:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>{isEditing ? 'Editar Serviço' : 'Novo Serviço'}</h2>
      
      {error && <div className={styles.error}>{error}</div>}
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nome do Serviço</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.input}
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
            className={styles.textarea}
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="price">Preço (R$)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className={styles.input}
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
              min="15"
              step="15"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="category">Categoria</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className={styles.select}
          >
            <option value="">Selecione uma categoria</option>
            <option value="HAIR">Cabelo</option>
            <option value="NAIL">Unhas</option>
            <option value="SKIN">Pele</option>
            <option value="MASSAGE">Massagem</option>
            <option value="MAKEUP">Maquiagem</option>
            <option value="OTHER">Outros</option>
          </select>
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="button"
            onClick={() => router.back()}
            className={styles.cancelButton}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? 'Salvando...' : isEditing ? 'Atualizar' : 'Criar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm; 