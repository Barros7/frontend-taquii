import React, { useEffect, useState } from 'react';
import styles from './users.module.css';

interface User {
  name: string;
  email: string;
  phone: string;
  userType: 'CUSTOMER' | 'PROVIDER' | 'ADMIN';
  active: boolean;
  password?: string;
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
    userType: 'CUSTOMER',
    active: true,
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user && mode === 'edit') {
      setFormData({ ...user, password: '' });
    } else if (mode === 'create') {
      setFormData({ name: '', email: '', phone: '', userType: 'CUSTOMER', active: true, password: '' });
    }
  }, [user, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validação básica
    if (!formData.name || !formData.email || !formData.phone || !formData.userType) {
      setError('Preencha todos os campos obrigatórios.');
      setLoading(false);
      return;
    }
    if (mode === 'create' && !formData.password) {
      setError('A senha é obrigatória para novo usuário.');
      setLoading(false);
      return;
    }

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
            <label htmlFor="userType">Tipo</label>
            <select
              id="userType"
              value={formData.userType}
              onChange={(e) => setFormData({ ...formData, userType: e.target.value as User['userType'] })}
              required
            >
              <option value="CUSTOMER">Cliente</option>
              <option value="PROVIDER">Prestador</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="active">Ativo</label>
            <input
              type="checkbox"
              id="active"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
            />
          </div>
          {mode === 'create' && (
            <div className={styles.formGroup}>
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
          )}
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