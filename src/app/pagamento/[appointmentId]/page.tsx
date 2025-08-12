'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/header/Header';
import { apiService, Appointment, PaymentQRCodeResponse, MulticaixaExpressResponse } from '@/services/apiService';
import Image from 'next/image';
// usaremos skeletons locais em vez de Spinner
import ErrorMessage from '@/components/ErrorMessage';
import styles from '../Pagamento.module.css';

const metodos = [
  { key: 'reference', label: 'Por Referência' },
  { key: 'qrcode', label: 'E-Kwanza (QR Code)' },
  { key: 'express', label: 'Multicaixa Express' },
];

export default function PagamentoPage({ params }: { params: Promise<{ appointmentId: string }> }) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [metodo, setMetodo] = useState<'reference' | 'qrcode' | 'express' | ''>('');
  const [dadosPagamento, setDadosPagamento] = useState<{
    entity: string;
    reference: string;
    montante: string;
    valor: string;
    qrCode: string | null;
    multicaixaId?: string;
    multicaixaStatus?: string;
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
      const current = window.location.pathname + window.location.search;
      router.push(`/login?callbackUrl=${encodeURIComponent(current)}`);
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

  // Gerar QR Code apenas quando solicitado
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

  // Gerar código de referência apenas quando solicitado
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

  // Processar pagamento por Multicaixa Express
  const processMulticaixaExpressPayment = useCallback(async () => {
    if (!appointment || !telefone.trim()) return;

    try {
      setSubmitting(true);
      setError(null);
      
      // Validar formato do telefone (deve ter 9 dígitos e começar com 9)
      const phoneRegex = /^9\d{8}$/;
      if (!phoneRegex.test(telefone.trim())) {
        setError('Número de telefone inválido. Deve ter 9 dígitos e começar com 9 (ex: 923000000)');
        return;
      }

      // Dados para processar pagamento Multicaixa Express
      const paymentData = {
        clientId: appointment.clientId,
        providerId: appointment.providerId,
        serviceId: appointment.serviceId,
        appointmentId: appointment.id,
        mobileNumber: telefone.trim(),
      };

      // Processar pagamento via API
      const result: MulticaixaExpressResponse = await apiService.processMulticaixaExpressPayment(paymentData);
      
      // Atualizar dados de pagamento com informações do Multicaixa Express
      setDadosPagamento({
        entity: 'Multicaixa Express',
        reference: result.data.id,
        montante: `${appointment.service.price} Kz`,
        valor: `${appointment.service.price} Kz`,
        qrCode: null,
        multicaixaId: result.data.id,
        multicaixaStatus: result.data.status,
      });

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao processar pagamento Multicaixa Express');
    } finally {
      setSubmitting(false);
    }
  }, [appointment, telefone]);

  // Limpar visualização ao trocar método
  useEffect(() => {
    setDadosPagamento(null);
    setError(null);
  }, [metodo]);

  const handlePagar = async () => {
    if (!metodo) {
      setError('Selecione um método de pagamento');
      return;
    }
    if (metodo === 'qrcode') {
      await generateQRCode();
      return;
    }
    if (metodo === 'reference') {
      await generateReferenceCode();
      return;
    }
    if (metodo === 'express') {
      if (!telefone.trim()) {
        setError('Digite o número de telefone para Multicaixa Express');
        return;
      }
      await processMulticaixaExpressPayment();
      return;
    }
  };

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
        <div className={styles.pagamentoBg} style={{ minHeight: '100vh' }}>
          <div className="container py-4">
            <div className="row g-4">
              <div className="col-12 col-md-8 col-sm-12">
                <div className={styles.skeletonCard}>
                  <div className={styles.skeletonLine} style={{ width: '50%', marginBottom: 12 }} />
                  <div className={styles.skeletonLine} style={{ width: '100%', height: 40, marginBottom: 12 }} />
                  <div className="d-flex gap-2" style={{ flexWrap: 'wrap', marginTop: 12 }}>
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className={styles.skeletonLine} style={{ width: 220, height: 96 }} />
                    ))}
                  </div>
                  <div className={styles.skeletonLine} style={{ width: '80%', height: 18, marginTop: 16 }} />
                </div>
              </div>
              <div className="col-12 col-md-4 col-sm-12">
                <div className={styles.skeletonCard}>
                  <div className={styles.skeletonLine} style={{ width: '60%', marginBottom: 12 }} />
                  <div className={styles.skeletonLine} style={{ width: '100%', height: 160 }} />
                </div>
              </div>
            </div>
          </div>
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

        <div className="container">
          <div className="row">
            {/* Coluna de pagamento */}
            <div className="col-12 col-md-8 col-sm-12">
              <div className={styles.cardForm}>
                <h2 style={{ marginBottom: 16, color: '#4F46E5', fontWeight: 800 }}>Forma de Pagamento</h2>
                <span style={{ color: '#6b7280', fontSize: 14 }}>Escolha a forma de pagamento (E-Kwanza, Referência, Multicaixa Express)</span>
                <div className="container" style={{ margin: '24px 0' }}>
                  <div className={`row`}>
                    {metodos.map(m => (
                      <div key={m.key} className="col-12 col-md-4 col-sm-4">
                        <label
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
                          <Image
                            src={
                              m.key === 'qrcode'
                                ? '/logo/e_kwanza_logo.png'
                                : '/logo/mcx_express_logo.webp'
                            }
                            alt={m.label}
                            width={50}
                            height={50}
                            className={styles.paymentIcon }
                            style={{ borderRadius: '5px' }}
                          />
                          <span className={styles.label}>{m.label}</span>
                        </label>
                      </div>
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
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ display: 'block', marginBottom: 8, color: '#6b7280' }}>
                        Número de telefone:
                      </label>
                      <input
                        type="tel"
                        required
                        value={telefone}
                        onChange={e => setTelefone(e.target.value)}
                        className={styles.input}
                        placeholder="Ex: 923000000"
                        maxLength={9}
                        style={{ width: '100%' }}
                      />
                      <small style={{ color: '#6b7280', fontSize: 12 }}>
                        Digite o número de telefone com 9 dígitos (ex: 923000000)
                      </small>
                    </div>
                    
                    {/* Exibir resultado do pagamento se disponível */}
                    {dadosPagamento && dadosPagamento.multicaixaId && (
                      <div style={{ margin: '16px 0', background: '#f3f4f6', borderRadius: 8, padding: 16 }}>
                        <div style={{ marginBottom: 8 }}>
                          <strong>Status:</strong> {dadosPagamento.multicaixaStatus === 'PENDING' ? 'Pendente' : dadosPagamento.multicaixaStatus}
                        </div>
                        <div style={{ marginBottom: 8 }}>
                          <strong>ID da Transação:</strong> {dadosPagamento.multicaixaId}
                        </div>
                        <div style={{ marginBottom: 8 }}>
                          <strong>Valor:</strong> {dadosPagamento.valor}
                        </div>
                        <div style={{ fontSize: 14, color: '#059669', marginTop: 12 }}>
                          ✓ Pagamento processado com sucesso! Verifique o status no seu aplicativo Multicaixa Express.
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <ErrorMessage 
                  error={error} 
                  onClear={() => setError(null)}
                />

                <div style={{ display: 'flex', gap: 16, marginTop: 32 }}>
                  <button
                    type="button"
                    onClick={handlePagar}
                    disabled={submitting || !metodo}
                    className={styles.submitBtn}
                  >
                    {submitting ? 'Processando...' : 'Pagar'}
                  </button>
                </div>
              </div>
            </div>
            {/* Coluna de resumo */}
            <div className="col-12 col-md-4 col-sm-12">
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
      </div>
    </>
  );
} 