'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/header/Header';
import { apiService, Appointment, PaymentQRCodeResponse } from '@/services/apiService';
import Image from 'next/image';
import { Spinner } from '@/components/Spinner';
import styles from '../Pagamento.module.css';

const metodos = [
  { key: 'reference', label: 'Por Referência' },
  { key: 'qrcode', label: 'E-Kwanza (QR Code)' },
  { key: 'express', label: 'Multicaixa Express' },
];

export default function PagamentoPage({ params }: { params: Promise<{ appointmentId: string }> }) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [metodo, setMetodo] = useState<'reference' | 'qrcode' | 'express'>('qrcode');
  const [dadosPagamento, setDadosPagamento] = useState<{
    entity: string;
    reference: string;
    montante: string;
    valor: string;
    qrCode: string | null;
  } | null>(null);
  const [telefone, setTelefone] = useState('');
  
  // Estados para dados da API
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [appointmentId, setAppointmentId] = useState<string>('');

  // Aguardar params e verificar autenticação
  useEffect(() => {
    const initParams = async () => {
      const resolvedParams = await params;
      setAppointmentId(resolvedParams.appointmentId);
    };
    
    initParams();
  }, [params]);

  // Verificar se usuário está autenticado
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [authLoading, user, router]);

  // Buscar dados do agendamento
  useEffect(() => {
    if (authLoading || !appointmentId) return; // Aguardar autenticação e appointmentId
    
    const fetchAppointment = async () => {
      try {
        setLoading(true);
        setError(null);

        const appointmentData = await apiService.getAppointment(appointmentId);
        setAppointment(appointmentData);
        
      } catch (err: unknown) {
        console.error('Erro ao carregar dados do agendamento:', err);
        setError(err instanceof Error ? err.message : 'Erro ao carregar dados do agendamento');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [appointmentId, authLoading]);

  // Gerar QR Code quando método for selecionado
  const generateQRCode = useCallback(async () => {
    if (!appointment) return;

    try {
      setSubmitting(true);
      
      // Dados para gerar QR Code
      const paymentData = {
        clientId: appointment.clientId,
        providerId: appointment.providerId,
        serviceId: appointment.serviceId,
        appointmentId: appointment.id,
        date: appointment.date,
        location: appointment.location,
      };

      // Criar pagamento com QR Code via API
      const response = await fetch(`/api/v1/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        const errorDetail = await response.json().catch(() => ({ message: response.statusText || 'Erro desconhecido' }));
        // Tratamento específico para pagamento duplicado
        if (
          response.status === 409 ||
          (errorDetail.message && errorDetail.message.toLowerCase().includes('já existe um pagamento'))
        ) {
          throw new Error('Já existe um pagamento registrado para este agendamento.');
        }
        throw new Error(`Erro ao gerar QR Code: ${response.status} - ${errorDetail.message}`);
      }

      const result: PaymentQRCodeResponse = await response.json();
      // Atualizar dados de pagamento com QR Code
      setDadosPagamento({
        qrCode: result.data?.QRCode ? `data:image/png;base64,${result.data.QRCode}` : null,
        reference: result.data?.Code,
        entity: '',
        montante: `${appointment.service.price} Kz`,
        valor: `${appointment.service.price} Kz`,
      });

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao gerar QR Code');
    } finally {
      setSubmitting(false);
    }
  }, [appointment]);

  // Gerar código de referência quando método for selecionado
  const generateReferenceCode = useCallback(async () => {
    if (!appointment) return;

    try {
      setSubmitting(true);
      
      // Dados para gerar código de referência
      const paymentData = {
        clientId: appointment.clientId,
        providerId: appointment.providerId,
        serviceId: appointment.serviceId,
        appointmentId: appointment.id,
      };

      // Criar pagamento com código de referência via API
      const response = await fetch(`/api/v1/payments/createReferenceCode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        const errorDetail = await response.json().catch(() => ({ message: response.statusText || 'Erro desconhecido' }));
        // Tratamento específico para pagamento duplicado
        if (
          response.status === 409 ||
          (errorDetail.message && errorDetail.message.toLowerCase().includes('já existe um pagamento'))
        ) {
          throw new Error('Já existe um pagamento registrado para este agendamento.');
        }
        throw new Error(`Erro ao gerar código de referência: ${response.status} - ${errorDetail.message}`);
      }

      const result = await response.json();
      console.log('Entity capturada:', result.responseStatus?.reference?.entity);
      // Atualizar dados de pagamento com informações da referência
      setDadosPagamento({
        entity: result.responseStatus?.reference?.entity,
        reference: result.responseStatus?.reference?.referenceNumber,
        montante: `${appointment.service.price} Kz`,
        valor: `${appointment.service.price} Kz`,
        qrCode: null,
      });
      console.log('Estado dadosPagamento atualizado:', {
        entity: result.responseStatus?.reference?.entity,
        reference: result.responseStatus?.reference?.referenceNumber,
        montante: `${appointment.service.price} Kz`,
      });

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao gerar código de referência');
    } finally {
      setSubmitting(false);
    }
  }, [appointment]);

  useEffect(() => {
    if (metodo === 'qrcode' && appointment && !dadosPagamento?.qrCode) {
      // Limpar dados de referência se existirem
      if (dadosPagamento?.reference) {
        setDadosPagamento(null);
      }
      generateQRCode();
    }
  }, [metodo, appointment, generateQRCode, dadosPagamento?.qrCode, dadosPagamento?.reference]);

  useEffect(() => {
    if (metodo === 'reference' && appointment && !dadosPagamento?.entity) {
      if (dadosPagamento?.qrCode) {
        setDadosPagamento(null);
      }
      generateReferenceCode();
    }
  }, [metodo, appointment, generateReferenceCode, dadosPagamento?.entity, dadosPagamento?.qrCode]);

  // Debug: monitorar mudanças no estado dadosPagamento
  useEffect(() => {
    if (dadosPagamento) {
      console.log('Estado dadosPagamento mudou:', dadosPagamento);
    }
  }, [dadosPagamento]);

  if (authLoading || loading) {
    return (
      <>
        <Header />
        <div className={styles.pagamentoBg} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Spinner />
        </div>
      </>
    );
  }

  if (error && !appointment) {
    return (
      <>
        <Header />
        <div className={styles.pagamentoBg} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ color: '#ef4444', fontSize: 18, textAlign: 'center' }}>
            <div style={{ marginBottom: 16 }}>Erro ao carregar dados</div>
            <div style={{ fontSize: 14, color: '#94a3b8' }}>{error}</div>
            <button 
              onClick={() => window.location.reload()} 
              style={{ 
                marginTop: 16, 
                background: '#4F46E5', 
                color: '#fff', 
                padding: '8px 16px', 
                borderRadius: 6, 
                border: 'none', 
                cursor: 'pointer' 
              }}
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className={styles.pagamentoBg}>
        {/* Stepper */}
        <div className={styles.stepper}>
          <div className={styles.step}>
            <div className={styles.stepCircle}>1</div>
            <span>Agendamento</span>
          </div>
          <div className={styles.stepLine} />
          <div className={`${styles.step} ${styles.active}`}> 
            <div className={styles.stepCircle}>2</div>
            <span>Pagamento</span>
          </div>
          <div className={styles.stepLine} />
          <div className={styles.step}>
            <div className={styles.stepCircle}>3</div>
            <span>Confirmação</span>
          </div>
        </div>

        <div className="row g-4 flex-column flex-md-row">
          {/* Coluna de pagamento */}
          <div className="col-12 col-md-6">
            <div className={styles.cardForm}>
              <h2 style={{ marginBottom: 16, color: '#4F46E5', fontWeight: 800 }}>Forma de Pagamento</h2>
              <span style={{ color: '#6b7280', fontSize: 14 }}>Escolha a forma de pagamento (E-Kwanza, Referência)</span>
              <div style={{ margin: '24px 0' }}>
                <div className={`d-flex flex-row gap-3 ${styles.paymentMethodsGrid}`} style={{flexWrap: 'nowrap'}}>
                  {metodos.map(m => (
                    <label
                      key={m.key}
                      className={
                        styles.paymentMethodCard +
                        (metodo === m.key ? ' ' + styles.selected : '')
                      }
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={m.key}
                        checked={metodo === m.key}
                        onChange={() => setMetodo(m.key as 'reference' | 'qrcode' | 'express')}
                        className={styles.radio}
                      />
                      {/* Substitua por <img src=...> se quiser ícones reais */}
                      <span className={styles.iconPlaceholder}></span>
                      <span className={styles.label}>{m.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Renderização dinâmica do método */}
              {metodo === 'reference' && dadosPagamento && (
                <div style={{ marginTop: 24 }}>
                  <h3 style={{ color: '#4F46E5' }}>Pagamento por Referência</h3>
                  <div style={{ margin: '16px 0', background: '#f3f4f6', borderRadius: 8, padding: 16 }}>
                    <div>Entidade: <b>{dadosPagamento.entity}</b></div>
                    <div>Referência: <b>{dadosPagamento.reference}</b></div>
                    <div>Montante: <b>{dadosPagamento.montante}</b></div>
                  </div>
                </div>
              )}
              {metodo === 'qrcode' && dadosPagamento && (
                <div style={{ marginTop: 24 }}>
                  <h3 style={{ color: '#4F46E5' }}>E-Kwanza</h3>
                  <span style={{ color: '#6b7280' }}>Escaneie o Código Qr no Aplicativo</span>
                  <div style={{ margin: '16px 0', background: '#f3f4f6', borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {submitting ? (
                      <div style={{ color: '#6b7280', padding: 20 }}>Gerando QR Code...</div>
                    ) : dadosPagamento.qrCode ? (
                      <Image src={dadosPagamento.qrCode} alt="QR Code" width={200} height={200} />
                    ) : (
                      <div style={{ color: '#6b7280', padding: 20 }}>QR Code não disponível</div>
                    )}
                    <div style={{ marginTop: 12 }}>Valor: <b>{dadosPagamento.valor}</b></div>
                  </div>
                </div>
              )}
              {metodo === 'express' && (
                <div style={{ marginTop: 24 }}>
                  <h3 style={{ color: '#4F46E5' }}>Multicaixa Express</h3>
                  <label>Número de telefone:</label>
                  <input
                    type="tel"
                    required
                    value={telefone}
                    onChange={e => setTelefone(e.target.value)}
                    className={styles.input}
                    placeholder="Ex: 923000000"
                  />
                </div>
              )}

              {error && (
                <div style={{ background: '#dc2626', color: '#fff', padding: 12, borderRadius: 6, marginBottom: 16 }}>
                  {error}
                </div>
              )}

              <div style={{ display: 'flex', gap: 16, marginTop: 32 }}>
                <button 
                  type="button" 
                  onClick={() => router.back()} 
                  disabled={submitting}
                  style={{ 
                    flex: 1, 
                    background: submitting ? '#6b7280' : '#ef4444', 
                    color: '#fff', 
                    padding: 14, 
                    borderRadius: 8, 
                    border: 'none', 
                    fontWeight: 600, 
                    fontSize: 18,
                    cursor: submitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  Voltar
                </button>
                <button 
                  type="submit" 
                  disabled={submitting}
                  className={styles.submitBtn}
                >
                  {submitting ? 'Processando...' : 'Continuar'}
                </button>
              </div>
            </div>
          </div>
          {/* Coluna de resumo */}
          <div className="col-12 col-md-6">
            <div className={styles.cardResumo}>
              <h3 style={{ marginBottom: 16, color: '#4F46E5', fontWeight: 700 }}>Resumo do agendamento</h3>
              <span style={{ color: '#6b7280', fontSize: 14 }}>Detalhes do seu agendamento</span>
              {appointment && (
                <div style={{ marginTop: 24, background: '#f3f4f6', borderRadius: 8, padding: 16 }}>
                  <div>{appointment.service.title}</div>
                  <div style={{ margin: '8px 0' }}>{appointment.provider.name}<br />Profissional</div>
                  <div>{new Date(appointment.date).toLocaleDateString('pt-BR')}</div>
                  <div>{new Date(appointment.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</div>
                  <div style={{ marginTop: 16, fontWeight: 700, fontSize: 20 }}>Total: <span style={{ color: '#4F46E5' }}>{appointment.service.price} Kz</span></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 