'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/header/Header';
import { apiService, Appointment, Payment } from '@/services/apiService';
import { Spinner } from '@/components/Spinner';

export default function ConfirmacaoPage({ params }: { params: Promise<{ appointmentId: string }> }) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  
  // Estados para dados da API
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [appointmentId, setAppointmentId] = useState<string>('');

  // Limpar erro automaticamente após 5 segundos
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error]);

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

  // Buscar dados do agendamento e pagamento
  useEffect(() => {
    if (authLoading || !appointmentId) return;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Buscar dados do agendamento
        const appointmentData = await apiService.getAppointment(appointmentId);
        setAppointment(appointmentData);
        
        // Buscar dados do pagamento (se existir)
        try {
          const paymentData = await apiService.getPaymentByAppointmentId(appointmentId);
          setPayment(paymentData);
        } catch (paymentError) {
          // Pagamento pode não existir ainda, não é erro crítico
          console.log('Pagamento ainda não criado:', paymentError);
        }
        
      } catch (err: unknown) {
        console.error('Erro ao carregar dados:', err);
        setError(err instanceof Error ? err.message : 'Erro ao carregar dados do agendamento');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [appointmentId, authLoading]);

  const handleConfirmar = async () => {
    if (!appointment) {
      setError('Dados do agendamento não disponíveis');
      return;
    }

    try {
      setConfirming(true);
      setError(null);

      // Simular confirmação
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirecionar para home ou perfil
      router.push('/home');
      
    } catch (err: unknown) {
      console.error('Erro ao confirmar:', err);
      setError(err instanceof Error ? err.message : 'Erro ao confirmar agendamento');
    } finally {
      setConfirming(false);
    }
  };

  if (authLoading || loading) {
    return (
      <>
        <Header />
        <div style={{ background: '#0a1833', minHeight: '100vh', padding: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ color: '#fff', fontSize: 18 }}><Spinner /></div>
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
          <div className="d-flex align-items-center gap-2 opacity-50">
            <div style={{ width: 32, height: 32, borderRadius: 16, background: '#1e293b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>2</div>
            <span>Pagamento</span>
          </div>
          <div style={{ height: 2, width: 40, background: '#2563eb' }} />
          <div className="d-flex align-items-center gap-2">
            <div style={{ width: 32, height: 32, borderRadius: 16, background: '#2563eb', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>3</div>
            <span>Confirmação</span>
          </div>
        </div>

        <div className="row g-4 flex-column flex-md-row">
          {/* Dados Confirmados */}
          <div className="col-12 col-md-6">
            <div style={{ background: '#12224a', borderRadius: 12, padding: 24, color: '#fff', minWidth: 0, width: '100%' }}>
              <h2 style={{ marginBottom: 16 }}>Dados Confirmados</h2>
              {appointment && (
                <div style={{ background: '#0f5132', border: '2px solid #198754', borderRadius: 8, padding: 16, marginBottom: 24 }}>
                  <div style={{ color: '#198754', fontWeight: 700, marginBottom: 8 }}>Agendamento Confirmado</div>
                  <div>Cliente: {appointment.client.name}</div>
                  <div>Email: {appointment.client.email}</div>
                  <div>Telefone: {appointment.client.phone || 'Não informado'}</div>
                  <div>Atendimento: {appointment.location === 'ESTABLISHMENT' ? 'No estabelecimento' : 'Em casa'}</div>
                  <div>Forma de pagamento: {payment?.paymentMethod || 'E-Kwanza (QR Code)'}</div>
                  <div>Status do pagamento: {payment?.status || 'PENDING'}</div>
                </div>
              )}
              <div style={{ background: '#1e293b', borderRadius: 8, padding: 16, color: '#fff', fontSize: 14 }}>
                Ao confirmar, você concorda com nossos termos de serviço e política de cancelamento. Você receberá um email de confirmação com todos os detalhes do seu agendamento.
              </div>
            </div>
          </div>

          {/* Resumo do agendamento */}
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
              
              {error && (
                <div style={{ background: '#dc2626', color: '#fff', padding: 12, borderRadius: 6, marginTop: 16 }}>
                  {error}
                </div>
              )}
              
              <div style={{ display: 'flex', gap: 16, marginTop: 32 }}>
                <button 
                  type="button" 
                  onClick={() => router.back()} 
                  disabled={confirming}
                  style={{ 
                    flex: 1, 
                    background: confirming ? '#6b7280' : '#ef4444', 
                    color: '#fff', 
                    padding: 14, 
                    borderRadius: 8, 
                    border: 'none', 
                    fontWeight: 600, 
                    fontSize: 18,
                    cursor: confirming ? 'not-allowed' : 'pointer'
                  }}
                >
                  Voltar
                </button>
                <button 
                  type="button" 
                  onClick={handleConfirmar}
                  disabled={confirming}
                  style={{ 
                    flex: 1, 
                    background: confirming ? '#6b7280' : '#22c55e', 
                    color: '#fff', 
                    padding: 14, 
                    borderRadius: 8, 
                    border: 'none', 
                    fontWeight: 600, 
                    fontSize: 18,
                    cursor: confirming ? 'not-allowed' : 'pointer'
                  }}
                >
                  {confirming ? 'Confirmando...' : 'Confirmar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
