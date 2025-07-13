"use client";
import React, { useEffect, useState } from "react";
import styles from "./payments.module.css";

interface Payment {
  id: string;
  amount: number;
  paymentMethod: string;
  status: string;
  referenceId: string;
  createdAt: string;
  appointment: {
    client: {
      name: string;
      email: string;
      phone: string;
    };
    provider: {
      name: string;
      email: string;
      phone: string;
    };
    service: {
      title: string;
      price: number;
    };
  };
}

interface PaymentsResponse {
  data: Payment[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('');

  const fetchPayments = async (page = 1, status = '') => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: '10'
      });
      
      if (status) {
        params.append('status', status);
      }

      const response = await fetch(`/api/sysadmin/payments?${params}`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Falha ao carregar pagamentos');
      }

      const data: PaymentsResponse = await response.json();
      setPayments(data.data);
      setTotalPages(data.totalPages);
      setCurrentPage(data.page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments(currentPage, statusFilter);
  }, [currentPage, statusFilter]);

  const handleStatusFilterChange = (newStatus: string) => {
    setStatusFilter(newStatus);
    setCurrentPage(1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString('pt-BR')} Kz`;
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return styles.pago;
      case 'PENDING':
        return styles.pendente;
      case 'FAILED':
        return styles.falhou;
      default:
        return '';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'Pago';
      case 'PENDING':
        return 'Pendente';
      case 'FAILED':
        return 'Falhou';
      default:
        return status;
    }
  };

  if (loading) {
    return <div className={styles.container}>Carregando...</div>;
  }

  if (error) {
    return <div className={styles.container}>Erro: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>Pagamentos</span>
        <div className={styles.controls}>
          <select 
            value={statusFilter} 
            onChange={(e) => handleStatusFilterChange(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="">Todos os Status</option>
            <option value="COMPLETED">Pagos</option>
            <option value="PENDING">Pendentes</option>
            <option value="FAILED">Falhados</option>
          </select>
        </div>
      </div>
      
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Prestador</th>
            <th>Serviço</th>
            <th>Valor</th>
            <th>Método</th>
            <th>Data</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.id.slice(0, 8)}...</td>
              <td>
                <div>
                  <div>{payment.appointment.client.name}</div>
                  <small>{payment.appointment.client.email}</small>
                </div>
              </td>
              <td>
                <div>
                  <div>{payment.appointment.provider.name}</div>
                  <small>{payment.appointment.provider.email}</small>
                </div>
              </td>
              <td>{payment.appointment.service.title}</td>
              <td>{formatCurrency(payment.amount)}</td>
              <td>{payment.paymentMethod}</td>
              <td>{formatDate(payment.createdAt)}</td>
              <td>
                <span className={`${styles.status} ${getStatusClass(payment.status)}`}>
                  {getStatusText(payment.status)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button 
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles.pageButton}
          >
            Anterior
          </button>
          <span className={styles.pageInfo}>
            Página {currentPage} de {totalPages}
          </span>
          <button 
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={styles.pageButton}
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
} 