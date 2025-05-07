"use client"

import React, { useState } from 'react';
import styles from './reports.module.css';

const ReportsPage = () => {
  const [dateRange, setDateRange] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const metrics = {
    revenue: {
      title: 'Receita Total',
      value: 'AOA 45.000',
      change: '+12.5%',
      trend: 'up'
    },
    appointments: {
      title: 'Total de Agendamentos',
      value: '156',
      change: '+8.2%',
      trend: 'up'
    },
    clients: {
      title: 'Novos Clientes',
      value: '24',
      change: '-3.1%',
      trend: 'down'
    },
    averageTicket: {
      title: 'Ticket Médio',
      value: 'AOA 2.500',
      change: '+5.7%',
      trend: 'up'
    }
  };

  const topServices = [
    { name: 'Corte de Cabelo', revenue: 'AOA 15.000', appointments: 45 },
    { name: 'Manicure', revenue: 'AOA 12.000', appointments: 38 },
    { name: 'Barba', revenue: 'AOA 8.000', appointments: 32 },
    { name: 'Pedicure', revenue: 'AOA 6.000', appointments: 25 },
    { name: 'Coloração', revenue: 'AOA 4.000', appointments: 16 }
  ];

  const clientRetention = [
    { month: 'Jan', rate: 85 },
    { month: 'Fev', rate: 82 },
    { month: 'Mar', rate: 88 },
    { month: 'Abr', rate: 90 },
    { month: 'Mai', rate: 87 },
    { month: 'Jun', rate: 92 }
  ];

  return (
    <div className={styles.reportsPage}>
      <div className={styles.header}>
        <h1>Relatórios</h1>
        <div className={styles.filters}>
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className={styles.dateRangeSelect}
          >
            <option value="week">Última Semana</option>
            <option value="month">Último Mês</option>
            <option value="quarter">Último Trimestre</option>
            <option value="year">Último Ano</option>
          </select>
        </div>
      </div>

      <div className={styles.metricsGrid}>
        {Object.entries(metrics).map(([key, metric]) => (
          <div 
            key={key}
            className={`${styles.metricCard} ${selectedMetric === key ? styles.selected : ''}`}
            onClick={() => setSelectedMetric(key)}
          >
            <h3>{metric.title}</h3>
            <div className={styles.metricValue}>{metric.value}</div>
            <div className={`${styles.metricChange} ${styles[metric.trend]}`}>
              {metric.change}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.chartsSection}>
        <div className={styles.chartCard}>
          <h2>Receita por Serviço</h2>
          <div className={styles.chartContent}>
            {topServices.map((service, index) => (
              <div key={index} className={styles.serviceBar}>
                <div className={styles.serviceInfo}>
                  <span className={styles.serviceName}>{service.name}</span>
                  <span className={styles.serviceRevenue}>{service.revenue}</span>
                </div>
                <div className={styles.barContainer}>
                  <div 
                    className={styles.bar}
                    style={{ 
                      width: `${(parseInt(service.revenue.replace(/[^0-9]/g, '')) / 15000) * 100}%` 
                    }}
                  />
                </div>
                <span className={styles.appointments}>{service.appointments} agendamentos</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.chartCard}>
          <h2>Taxa de Retenção de Clientes</h2>
          <div className={styles.chartContent}>
            <div className={styles.retentionChart}>
              {clientRetention.map((data, index) => (
                <div key={index} className={styles.retentionBar}>
                  <div 
                    className={styles.retentionValue}
                    style={{ height: `${data.rate}%` }}
                  />
                  <span className={styles.monthLabel}>{data.month}</span>
                </div>
              ))}
            </div>
            <div className={styles.retentionLabels}>
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.exportSection}>
        <button className={styles.exportButton}>
          Exportar Relatório
        </button>
      </div>
    </div>
  );
};

export default ReportsPage; 