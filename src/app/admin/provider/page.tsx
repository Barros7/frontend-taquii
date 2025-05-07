"use client"

import React from 'react';
import Link from 'next/link';
import styles from './provider.module.css';

const ProviderDashboard = () => {
  // Mock data - In a real application, this would come from an API
  const businessStats = {
    todayAppointments: 8,
    weeklyAppointments: 45,
    monthlyRevenue: '45.990 Kz',
    customerRating: 4.8,
  };

  const todaySchedule = [
    { id: 1, time: '09:00', client: 'Maria Silva', service: 'Corte de Cabelo', status: 'confirmado' },
    { id: 2, time: '10:30', client: 'João Santos', service: 'Barba', status: 'pendente' },
    { id: 3, time: '13:00', client: 'Ana Oliveira', service: 'Manicure', status: 'confirmado' },
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.welcomeSection}>
        <h1>Bem-vindo(a), Estabelecimento</h1>
        <p>Gerencie seus agendamentos e serviços de forma eficiente</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Agendamentos Hoje</h3>
          <p className={styles.statValue}>{businessStats.todayAppointments}</p>
          <Link href="/provider/schedule" className={styles.statLink}>
            Ver agenda →
          </Link>
        </div>
        <div className={styles.statCard}>
          <h3>Agendamentos da Semana</h3>
          <p className={styles.statValue}>{businessStats.weeklyAppointments}</p>
          <Link href="/provider/schedule" className={styles.statLink}>
            Ver agenda →
          </Link>
        </div>
        <div className={styles.statCard}>
          <h3>Receita Mensal</h3>
          <p className={styles.statValue}>{businessStats.monthlyRevenue}</p>
          <Link href="/provider/financial" className={styles.statLink}>
            Ver detalhes →
          </Link>
        </div>
        <div className={styles.statCard}>
          <h3>Avaliação dos Clientes</h3>
          <p className={styles.statValue}>{businessStats.customerRating} ⭐</p>
          <Link href="/provider/reviews" className={styles.statLink}>
            Ver avaliações →
          </Link>
        </div>
      </div>

      <div className={styles.scheduleSection}>
        <div className={styles.sectionHeader}>
          <h2>Agenda de Hoje</h2>
          <Link href="/provider/schedule/new" className={styles.newButton}>
            Novo Agendamento
          </Link>
        </div>
        <div className={styles.scheduleList}>
          {todaySchedule.map((appointment) => (
            <div key={appointment.id} className={styles.scheduleItem}>
              <div className={styles.timeColumn}>
                <span className={styles.time}>{appointment.time}</span>
              </div>
              <div className={styles.detailsColumn}>
                <h4>{appointment.client}</h4>
                <p>{appointment.service}</p>
              </div>
              <div className={styles.statusColumn}>
                <span className={`${styles.status} ${styles[appointment.status]}`}>
                  {appointment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.quickActions}>
        <h2>Ações Rápidas</h2>
        <div className={styles.actionButtons}>
          <Link href="/provider/services" className={styles.actionButton}>
            Gerenciar Serviços
          </Link>
          <Link href="/provider/profile" className={styles.actionButton}>
            Editar Perfil
          </Link>
          <Link href="/provider/schedule" className={styles.actionButton}>
            Ver Agenda Completa
          </Link>
          <Link href="/provider/reports" className={styles.actionButton}>
            Relatórios
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard; 