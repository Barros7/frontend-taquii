'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import styles from './profile.module.css';
import { Spinner } from '@/components/Spinner';
import type { Appointment } from '@/services/apiService';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Limpar erro automaticamente após 5 segundos
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error]);
  
  const fetchProfile = useCallback(async () => {
    try {
      const response = await fetch(`/api/v1/users/profile`, { credentials: 'include' });
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
      setError('Erro ao carregar perfil');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAppointments = useCallback(async () => {
    try {
      const response = await fetch(`/api/v1/appointments?clientId=${user?.id}`);
      if (!response.ok) throw new Error('Falha ao carregar agendamentos');
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
    }
  }, [user?.id]);
  
  useEffect(() => {
    if (!user) {
      const current = window.location.pathname + window.location.search;
      router.push(`/login?callbackUrl=${encodeURIComponent(current)}`);
    } else {
      fetchProfile();
      fetchAppointments();
    }
  }, [user, router, fetchProfile, fetchAppointments]);

  if(!user) {
    console.log("Não tem sessão iniciada.");
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        city: formData.get('city'),
        state: formData.get('state'),
        zipCode: formData.get('zipCode')
      };

      const response = await fetch(`/api/v1/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
      });
      
      if (!response.ok) throw new Error('Failed to update profile');
      
      setSuccess('Perfil atualizado com sucesso!');
      await fetchProfile();
    } catch (err) {
      setError('Erro ao atualizar perfil');
      console.error('Error updating profile:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}><Spinner /></div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        <h1 className={styles.title}>Meu Perfil</h1>

        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nome Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={profile?.name}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={profile?.email}
              disabled
              className={`${styles.input} ${styles.disabled}`}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">Telefone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              defaultValue={profile?.phone}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="address">Endereço</label>
            <input
              type="text"
              id="address"
              name="address"
              defaultValue={profile?.address}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="city">Cidade</label>
              <input
                type="text"
                id="city"
                name="city"
                defaultValue={profile?.city}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="state">Estado</label>
              <input
                type="text"
                id="state"
                name="state"
                defaultValue={profile?.state}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="zipCode">CEP</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                defaultValue={profile?.zipCode}
                required
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="submit"
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
      <div className={styles.profileCard}>
        <h2 className={styles.subtitle}>Meus Agendamentos</h2>
        {appointments.length === 0 ? (
          <p>Nenhum agendamento encontrado.</p>
        ) : (
          <ul className={styles.appointmentList}>
            {appointments.map((appt) => (
              <li key={appt.id} className={styles.appointmentItem}>
                <div>
                  <strong>{appt.service.title}</strong> — {new Date(appt.date).toLocaleString('pt-PT')}
                </div>
                <div>
                  Status: {appt.status} • Prestador: {appt.provider.name}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 