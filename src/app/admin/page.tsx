"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './dashboard.module.css';
import { adminService, type AdminStats, type RecentActivity } from '@/services/adminService';
import ProtectedRoute from '@/components/ProtectedRoute';

const DashboardPage = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [s, a] = await Promise.all([
          adminService.getStats(),
          adminService.getRecentActivities(),
        ]);
        setStats(s);
        setRecentActivities(a);
      } catch (err) {
        console.error('Erro ao carregar dashboard:', err);
        setError('Falha ao carregar dados do dashboard');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className={styles.dashboard}>Carregando...</div>;
  if (error) return <div className={styles.dashboard}>{error}</div>;

  return (
    <ProtectedRoute allowedTypes={['ADMIN']}>
    <div className={styles.dashboard}>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total de Agendamentos</h3>
          <p className={styles.statValue}>{stats?.totalAppointments ?? 0}</p>
          <Link href="/admin/appointements" className={styles.statLink}>
            Ver detalhes →
          </Link>
        </div>
        <div className={styles.statCard}>
          <h3>Usuários Ativos</h3>
          <p className={styles.statValue}>{stats?.activeUsers ?? 0}</p>
          <Link href="/admin/users" className={styles.statLink}>
            Ver detalhes →
          </Link>
        </div>
        <div className={styles.statCard}>
          <h3>Receita Total</h3>
          <p className={styles.statValue}>{stats?.totalRevenue ?? '0 Kz'}</p>
          <Link href="/admin/payments" className={styles.statLink}>
            Ver detalhes →
          </Link>
        </div>
        <div className={styles.statCard}>
          <h3>Pagamentos Pendentes</h3>
          <p className={styles.statValue}>{stats?.pendingPayments ?? 0}</p>
          <Link href="/admin/payments" className={styles.statLink}>
            Ver detalhes →
          </Link>
        </div>
      </div>

      <div className={styles.recentActivity}>
        <h2>Atividades Recentes</h2>
        <div className={styles.activityList}>
          {recentActivities.map((activity) => (
            <div key={activity.id} className={styles.activityItem}>
              <div className={styles.activityIcon}>
                {activity.type === 'appointment' && '📅'}
                {activity.type === 'payment' && '💰'}
                {activity.type === 'user' && '👤'}
              </div>
              <div className={styles.activityContent}>
                <p>{activity.description}</p>
                <span className={styles.activityTime}>{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.quickActions}>
        <h2>Ações Rápidas</h2>
        <div className={styles.actionButtons}>
          <Link href="/admin/appointements/new" className={styles.actionButton}>
            Novo Agendamento
          </Link>
          <Link href="/admin/services/new" className={styles.actionButton}>
            Adicionar Serviço
          </Link>
          <Link href="/admin/users/new" className={styles.actionButton}>
            Novo Usuário
          </Link>
          <Link href="/admin/reports" className={styles.actionButton}>
            Gerar Relatório
          </Link>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;