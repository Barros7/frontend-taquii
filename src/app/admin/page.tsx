"use client"
import React from 'react';
import Link from 'next/link';
import styles from './dashboard.module.css';

const DashboardPage = () => {
  // Mock data - In a real application, this would come from an API
  const stats = {
    totalAppointments: 156,
    activeUsers: 45,
    totalRevenue: '125.990 Kz',
    pendingPayments: 12,
  };

  const recentActivities = [
    { id: 1, type: 'appointment', description: 'Novo agendamento criado', time: '5 min atrás' },
    { id: 2, type: 'payment', description: 'Pagamento recebido', time: '15 min atrás' },
    { id: 3, type: 'user', description: 'Novo usuário registrado', time: '1 hora atrás' },
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total de Agendamentos</h3>
          <p className={styles.statValue}>{stats.totalAppointments}</p>
          <Link href="/admin/appointements" className={styles.statLink}>
            Ver detalhes →
          </Link>
        </div>
        <div className={styles.statCard}>
          <h3>Usuários Ativos</h3>
          <p className={styles.statValue}>{stats.activeUsers}</p>
          <Link href="/admin/users" className={styles.statLink}>
            Ver detalhes →
          </Link>
        </div>
        <div className={styles.statCard}>
          <h3>Receita Total</h3>
          <p className={styles.statValue}>{stats.totalRevenue}</p>
          <Link href="/admin/payments" className={styles.statLink}>
            Ver detalhes →
          </Link>
        </div>
        <div className={styles.statCard}>
          <h3>Pagamentos Pendentes</h3>
          <p className={styles.statValue}>{stats.pendingPayments}</p>
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
  );
};

export default DashboardPage;