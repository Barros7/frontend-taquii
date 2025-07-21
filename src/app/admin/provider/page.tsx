"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './provider.module.css';
import { adminService } from '@/services/adminService';
import { useAuth } from '@/context/AuthContext';
import { Spinner } from '@/components/Spinner';

const ProviderDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const [stats, setStats] = useState({
    todayAppointments: 0,
    weeklyAppointments: 0,
    monthlyRevenue: '0 Kz',
    customerRating: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProviderStats = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const statsData = await adminService.getProviderStats(user.id);
        setStats(statsData);
      } catch (err) {
        setError('Erro ao carregar dados do dashboard. Tente novamente mais tarde.');
        console.error('Error fetching provider stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProviderStats();
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className={styles.dashboard}>
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden"><Spinner /></span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.dashboard}>
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.welcomeSection}>
        <h1>Bem-vindo, {user?.name || 'Prestador'}</h1>
        <p>Gerencie seus serviços e agendamentos</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Agendamentos Hoje</h3>
          <p className={styles.statValue}>{stats.todayAppointments}</p>
          <Link href="/admin/provider/schedule" className={styles.statLink}>
            Ver agenda →
          </Link>
        </div>
        <div className={styles.statCard}>
          <h3>Agendamentos da Semana</h3>
          <p className={styles.statValue}>{stats.weeklyAppointments}</p>
          <Link href="/admin/provider/schedule" className={styles.statLink}>
            Ver agenda →
          </Link>
        </div>
        <div className={styles.statCard}>
          <h3>Receita Mensal</h3>
          <p className={styles.statValue}>{stats.monthlyRevenue}</p>
          <Link href="/admin/provider/financial" className={styles.statLink}>
            Ver detalhes →
          </Link>
        </div>
        <div className={styles.statCard}>
          <h3>Avaliação dos Clientes</h3>
          <p className={styles.statValue}>{stats.customerRating} ⭐</p>
          <Link href="/admin/provider/reviews" className={styles.statLink}>
            Ver avaliações →
          </Link>
        </div>
      </div>

      <div className={styles.scheduleSection}>
        <div className={styles.sectionHeader}>
          <h2>Próximos Agendamentos</h2>
          <Link href="/admin/provider/schedule/new" className={styles.newButton}>
            Novo Agendamento
          </Link>
        </div>
        {/* Add your schedule list component here */}
      </div>
    </div>
  );
};

export default ProviderDashboard; 