'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/header/Header';
import { apiService, Appointment, PaymentQRCodeResponse } from '@/services/apiService';
import Image from 'next/image';

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
      const response = await fetch(`/api/payments`, {
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
      const response = await fetch(`/api/payments/createReferenceCode`, {
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
  }, [metodo, appointment, generateQRCode, dadosPagamento?.qrCode]);

  useEffect(() => {
    if (metodo === 'reference' && appointment && !dadosPagamento?.entity) {
      if (dadosPagamento?.qrCode) {
        setDadosPagamento(null);
      }
      generateReferenceCode();
    }
  }, [metodo, appointment, generateReferenceCode, dadosPagamento?.entity]);

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
        <div style={{ background: '#0a1833', minHeight: '100vh', padding: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ color: '#fff', fontSize: 18 }}>Carregando...</div>
        </div>
      </>
    );
  }

  if (error && !appointment) {
    return (
      <>
        <Header />
        <div style={{ background: '#0a1833', minHeight: '100vh', padding: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ color: '#ef4444', fontSize: 18, textAlign: 'center' }}>
            <div style={{ marginBottom: 16 }}>Erro ao carregar dados</div>
            <div style={{ fontSize: 14, color: '#94a3b8' }}>{error}</div>
            <button 
              onClick={() => window.location.reload()} 
              style={{ 
                marginTop: 16, 
                background: '#2563eb', 
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
      <div style={{ background: '#0a1833', minHeight: '100vh', padding: 16 }}>
        {/* Stepper responsivo */}
        <div className="d-flex flex-wrap align-items-center gap-2 gap-md-4 text-white mb-4" style={{fontSize: 16}}>
          <div className="d-flex align-items-center gap-2 opacity-50">
            <div style={{ width: 32, height: 32, borderRadius: 16, background: '#1e293b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>1</div>
            <span>Agendamento</span>
          </div>
          <div style={{ height: 2, width: 40, background: '#2563eb' }} />
          <div className="d-flex align-items-center gap-2">
            <div style={{ width: 32, height: 32, borderRadius: 16, background: '#2563eb', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>2</div>
            <span>Pagamento</span>
          </div>
          <div style={{ height: 2, width: 40, background: '#2563eb' }} />
          <div className="d-flex align-items-center gap-2 opacity-50">
            <div style={{ width: 32, height: 32, borderRadius: 16, background: '#1e293b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>3</div>
            <span>Confirmação</span>
          </div>
        </div>

        <div className="row g-4 flex-column flex-md-row">
          {/* Coluna de pagamento */}
          <div className="col-12 col-md-6">
            <div style={{ background: '#12224a', borderRadius: 12, padding: 24, color: '#fff', minWidth: 0, width: '100%' }}>
              <h2 style={{ marginBottom: 16 }}>Forma de Pagamento</h2>
              <span style={{ color: '#94a3b8', fontSize: 14 }}>Escolha a forma de pagamento (E-Kwanza, Referência)</span>
              <div style={{ margin: '24px 0' }}>
                <select
                  value={metodo}
                  onChange={e => setMetodo(e.target.value as 'reference' | 'qrcode' | 'express')}
                  style={{ width: '100%', padding: 12, borderRadius: 8, background: '#1e293b', color: '#fff', border: 'none', fontSize: 16 }}
                >
                  {metodos.map(m => (
                    <option key={m.key} value={m.key}>{m.label}</option>
                  ))}
                </select>
              </div>

              {/* Renderização dinâmica do método */}
              {metodo === 'reference' && dadosPagamento && (
                <div style={{ marginTop: 24 }}>
                  <h3 style={{ color: '#fff' }}>Pagamento por Referência</h3>
                  <div style={{ margin: '16px 0', background: '#1e293b', borderRadius: 8, padding: 16 }}>
                    <div>Entidade: <b>{dadosPagamento.entity}</b></div>
                    <div>Referência: <b>{dadosPagamento.reference}</b></div>
                    <div>Montante: <b>{dadosPagamento.montante}</b></div>
                  </div>
                </div>
              )}
              
              {metodo === 'qrcode' && dadosPagamento && (
                <div style={{ marginTop: 24 }}>
                  <h3 style={{ color: '#fff' }}>E-Kwanza</h3>
                  <span style={{ color: '#94a3b8' }}>Escaneie o Código Qr no Aplicativo</span>
                  <div style={{ margin: '16px 0', background: '#1e293b', borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {submitting ? (
                      <div style={{ color: '#94a3b8', padding: 20 }}>Gerando QR Code...</div>
                    ) : dadosPagamento.qrCode ? (
                      <Image src={dadosPagamento.qrCode} alt="QR Code" width={200} height={200} />
                    ) : (
                      <div style={{ color: '#94a3b8', padding: 20 }}>QR Code não disponível</div>
                    )}
                    <div style={{ marginTop: 12 }}>Valor: <b>{dadosPagamento.valor}</b></div>
                  </div>
                </div>
              )}
              
              {metodo === 'express' && (
                <div style={{ marginTop: 24 }}>
                  <h3 style={{ color: '#fff' }}>Multicaixa Express</h3>
                  <label>Número de telefone:</label>
                  <input
                    type="tel"
                    required
                    value={telefone}
                    onChange={e => setTelefone(e.target.value)}
                    style={{ width: '100%', padding: 8, margin: '8px 0 16px 0', borderRadius: 6, border: '1px solid #ccc', background: '#1e293b', color: '#fff' }}
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
                  style={{ 
                    flex: 1, 
                    background: submitting ? '#6b7280' : '#2563eb', 
                    color: '#fff', 
                    padding: 14, 
                    borderRadius: 8, 
                    border: 'none', 
                    fontWeight: 600, 
                    fontSize: 18,
                    cursor: submitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {submitting ? 'Processando...' : 'Continuar'}
                </button>
              </div>
            </div>
          </div>
          {/* Coluna de resumo */}
          <div className="col-12 col-md-6">
            <div style={{ background: '#12224a', borderRadius: 12, padding: 24, color: '#fff', minWidth: 0, width: '100%' }}>
              <h3 style={{ marginBottom: 16 }}>Resumo do agendamento</h3>
              <span style={{ color: '#94a3b8', fontSize: 14 }}>Detalhes do seu agendamento</span>
              {appointment && (
                <div style={{ marginTop: 24, background: '#1e293b', borderRadius: 8, padding: 16 }}>
                  <div>{appointment.service.title}</div>
                  <div style={{ margin: '8px 0' }}>{appointment.provider.name}<br />Profissional</div>
                  <div>{new Date(appointment.date).toLocaleDateString('pt-BR')}</div>
                  <div>{new Date(appointment.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</div>
                  <div style={{ marginTop: 16, fontWeight: 700, fontSize: 20 }}>Total: <span style={{ color: '#fff' }}>{appointment.service.price} Kz</span></div>
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
} 