import React, { useEffect, useState } from 'react';
import styles from './users.module.css';

interface User {
  name: string;
  email: string;
  phone: string;
  type: string;
  status: string;
}

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userData: Partial<User>) => Promise<void>;
  user?: User;
  mode: 'create' | 'edit';
}

export default function UserModal({ isOpen, onClose, onSubmit, user, mode }: UserModalProps) {
  const [formData, setFormData] = useState<Partial<User>>({
    name: '',
    email: '',
    phone: '',
    type: 'client',
    status: 'active'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user && mode === 'edit') {
      setFormData(user);
    }
  }, [user, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar usuário');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>{mode === 'create' ? 'Novo Usuário' : 'Editar Usuário'}</h2>
          <button onClick={onClose} className={styles.closeButton}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Telefone</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="type">Tipo</label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              required
            >
              <option value="client">Cliente</option>
              <option value="provider">Prestador</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              required
            >
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
            </select>
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.modalFooter}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancelar
            </button>
            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 