"use client"

import React, { useState } from 'react';
import styles from './notifications.module.css';

type NotificationType = 'appointment' | 'reminder' | 'review' | 'system' | 'payment';

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const NotificationsPage = () => {
  const [activeFilter, setActiveFilter] = useState<NotificationType | 'all'>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'appointment',
      title: 'Novo Agendamento',
      message: 'Maria Silva agendou um corte de cabelo para amanhã às 14:00',
      time: '5 minutos atrás',
      read: false
    },
    {
      id: 2,
      type: 'reminder',
      title: 'Lembrete de Agendamento',
      message: 'Você tem um agendamento com João Santos em 30 minutos',
      time: '15 minutos atrás',
      read: false
    },
    {
      id: 3,
      type: 'review',
      title: 'Nova Avaliação',
      message: 'Ana Oliveira deixou uma avaliação de 5 estrelas para seu serviço',
      time: '1 hora atrás',
      read: true
    },
    {
      id: 4,
      type: 'system',
      title: 'Atualização do Sistema',
      message: 'Nova funcionalidade disponível: Agendamento em lote',
      time: '2 horas atrás',
      read: true
    },
    {
      id: 5,
      type: 'payment',
      title: 'Pagamento Recebido',
      message: 'Você recebeu um pagamento de AOA 2.500 de Pedro Santos',
      time: '3 horas atrás',
      read: true
    }
  ]);

  const filters: Record<NotificationType | 'all', string> = {
    all: 'Todas',
    appointment: 'Agendamentos',
    reminder: 'Lembretes',
    review: 'Avaliações',
    system: 'Sistema',
    payment: 'Pagamentos'
  };

  const handleMarkAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const filteredNotifications = activeFilter === 'all'
    ? notifications
    : notifications.filter(notification => notification.type === activeFilter);

  return (
    <div className={styles.notificationsPage}>
      <div className={styles.header}>
        <h1>Notificações</h1>
        <div className={styles.actions}>
          <button 
            className={styles.markAllButton}
            onClick={handleMarkAllAsRead}
          >
            Marcar todas como lidas
          </button>
        </div>
      </div>

      <div className={styles.filters}>
        {Object.entries(filters).map(([key, label]) => (
          <button
            key={key}
            className={`${styles.filterButton} ${activeFilter === key ? styles.active : ''}`}
            onClick={() => setActiveFilter(key as NotificationType | 'all')}
          >
            {label}
          </button>
        ))}
      </div>

      <div className={styles.notificationsList}>
        {filteredNotifications.map(notification => (
          <div 
            key={notification.id}
            className={`${styles.notificationItem} ${notification.read ? styles.read : ''}`}
            onClick={() => handleMarkAsRead(notification.id)}
          >
            <div className={styles.notificationIcon}>
              {notification.type === 'appointment' && '📅'}
              {notification.type === 'reminder' && '⏰'}
              {notification.type === 'review' && '⭐'}
              {notification.type === 'system' && '⚙️'}
              {notification.type === 'payment' && '💰'}
            </div>
            <div className={styles.notificationContent}>
              <div className={styles.notificationHeader}>
                <h3>{notification.title}</h3>
                <span className={styles.time}>{notification.time}</span>
              </div>
              <p className={styles.message}>{notification.message}</p>
            </div>
            {!notification.read && (
              <div className={styles.unreadIndicator} />
            )}
          </div>
        ))}

        {filteredNotifications.length === 0 && (
          <div className={styles.emptyState}>
            <p>Nenhuma notificação encontrada</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage; 