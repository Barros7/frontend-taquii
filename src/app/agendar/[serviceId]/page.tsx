'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/header/Header';
import { apiService, Service } from '@/services/apiService';

const horarios = [
  '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00',
];

export default function AgendarPage({ params }: { params: Promise<{ serviceId: string }> }) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [data, setData] = useState('2025-04-07');
  const [local, setLocal] = useState<'estabelecimento' | 'casa'>('estabelecimento');
  const [horario, setHorario] = useState('09:00');
  
  // Estados para dados da API
  const [service, setService] = useState<Service | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [serviceId, setServiceId] = useState<string>('');

  // Aguardar params e verificar autenticação
  useEffect(() => {
    const initParams = async () => {
      const resolvedParams = await params;
      setServiceId(resolvedParams.serviceId);
    };
    
    initParams();
  }, [params]);

  // Verificar se usuário está autenticado
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [authLoading, user, router]);

  // Buscar dados do serviço e horários ocupados
  useEffect(() => {
    if (authLoading || !user || !serviceId) return; // Aguardar autenticação e serviceId
    
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Buscar dados do serviço
        const serviceData = await apiService.getService(serviceId);
        setService(serviceData);
        
        // Buscar horários ocupados para a data selecionada
        const slots = await apiService.getBookedSlots(serviceData.providerId, data);
        setBookedSlots(slots);
        
      } catch (err: unknown) {
        console.error('Erro ao carregar dados:', err);
        setError(err instanceof Error ? err.message : 'Erro ao carregar dados do serviço');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [serviceId, data, authLoading, user]);

  // Atualizar horários ocupados quando a data mudar
  useEffect(() => {
    if (service) {
      const fetchBookedSlots = async () => {
        try {
          const slots = await apiService.getBookedSlots(service.providerId, data);
          setBookedSlots(slots);
        } catch (err: unknown) {
          console.error('Erro ao buscar horários ocupados:', err);
        }
      };
      
      fetchBookedSlots();
    }
  }, [data, service]);

  const handleAgendar = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!service) {
      setError('Dados do serviço não disponíveis');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      // Gerar código de referência único
      const referenceCode = `REF${Date.now()}`;
      
      if (!user?.id) {
        setError('Usuário não autenticado');
        return;
      }

      // Dados para criar o agendamento
      const appointmentData = {
        clientId: user.id,
        providerId: service.providerId,
        serviceId: service.id,
        date: `${data}T${horario}:00.000Z`,
        location: local === 'estabelecimento' ? 'estabelecimento' : 'casa',
        amount: service.price,
        referenceCode,
        mobileNumber: '937315418', // TODO: Adicionar phone ao session quando disponível
      };

      // Criar agendamento
      const appointment = await apiService.createAppointment(appointmentData);
      
      // Redirecionar para página de pagamento com o ID real
      router.push(`/pagamento/${appointment.id}`);
      
    } catch (err: unknown) {
      console.error('Erro ao criar agendamento:', err);
      setError(err instanceof Error ? err.message : 'Erro ao criar agendamento');
    } finally {
      setSubmitting(false);
    }
  };

  // Verificar se horário está disponível
  const isTimeAvailable = (time: string) => {
    return !bookedSlots.includes(time);
  };

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

  if (error) {
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
      <div style={{ background: '#0a1833', minHeight: '100vh', padding: 32 }}>
        {/* Stepper */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: '#fff', marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 16, background: '#2563eb', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>1</div>
            <span>Agendamento</span>
          </div>
          <div style={{ height: 2, width: 40, background: '#2563eb' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: 0.5 }}>
            <div style={{ width: 32, height: 32, borderRadius: 16, background: '#1e293b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>2</div>
            <span>Pagamento</span>
          </div>
          <div style={{ height: 2, width: 40, background: '#1e293b' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: 0.5 }}>
            <div style={{ width: 32, height: 32, borderRadius: 16, background: '#1e293b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>3</div>
            <span>Confirmação</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 32 }}>
          {/* Formulário de agendamento */}
          <form onSubmit={handleAgendar} style={{ flex: 1, background: '#12224a', borderRadius: 12, padding: 32, color: '#fff', minWidth: 340 }}>
            <h2 style={{ marginBottom: 16 }}>Agende o seu atendimento</h2>
            
            {/* Dados do serviço */}
            {service && (
              <div style={{ background: '#1e293b', borderRadius: 8, padding: 16, marginBottom: 24 }}>
                <h3 style={{ marginBottom: 8 }}>{service.title}</h3>
                <p style={{ color: '#94a3b8', marginBottom: 8 }}>{service.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Profissional: {service.provider.name}</span>
                  <span style={{ fontWeight: 700, fontSize: 18 }}>{service.price} Kz</span>
                </div>
              </div>
            )}

            <div style={{ marginBottom: 16 }}>
              <label>Data</label><br />
              <input 
                type="date" 
                value={data} 
                onChange={e => setData(e.target.value)} 
                style={{ background: '#1e293b', color: '#fff', border: 'none', borderRadius: 6, padding: 8, marginTop: 4 }} 
              />
            </div>
            
            <div style={{ marginBottom: 16 }}>
              <label>Atendimento</label><br />
              <label style={{ marginRight: 16 }}>
                <input type="radio" checked={local === 'estabelecimento'} onChange={() => setLocal('estabelecimento')} /> No estabelecimento
              </label>
              <label>
                <input type="radio" checked={local === 'casa'} onChange={() => setLocal('casa')} /> Em casa
              </label>
            </div>
            
            <div style={{ marginBottom: 16 }}>
              <label>Horário</label><br />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                {horarios.map(h => {
                  const isAvailable = isTimeAvailable(h);
                  return (
                    <button
                      key={h}
                      type="button"
                      onClick={() => isAvailable && setHorario(h)}
                      disabled={!isAvailable}
                      style={{
                        background: horario === h ? '#2563eb' : isAvailable ? '#1e293b' : '#374151',
                        color: isAvailable ? '#fff' : '#6b7280',
                        border: horario === h ? '2px solid #2563eb' : '1px solid #334155',
                        borderRadius: 6,
                        padding: '8px 16px',
                        fontWeight: 500,
                        cursor: isAvailable ? 'pointer' : 'not-allowed',
                        opacity: isAvailable ? 1 : 0.5
                      }}
                    >
                      {h}
                    </button>
                  );
                })}
              </div>
            </div>

            {error && (
              <div style={{ background: '#dc2626', color: '#fff', padding: 12, borderRadius: 6, marginBottom: 16 }}>
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={submitting}
              style={{ 
                marginTop: 24, 
                width: '100%', 
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
              {submitting ? 'Agendando...' : 'Agendar'}
            </button>
          </form>

          {/* Agenda do profissional */}
          <div style={{ flex: 1, background: '#12224a', borderRadius: 12, padding: 32, color: '#fff', minWidth: 340 }}>
            <h3 style={{ marginBottom: 16 }}>Agenda do profissional</h3>
            <div style={{ marginBottom: 16 }}>
              <span style={{ color: '#94a3b8' }}>Horários ocupados em {new Date(data).toLocaleDateString('pt-BR')}</span>
            </div>
            
            {bookedSlots.length === 0 ? (
              <div style={{ background: '#1e293b', borderRadius: 8, padding: 16, textAlign: 'center', color: '#94a3b8' }}>
                Nenhum horário ocupado nesta data
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ background: '#1e293b', borderRadius: 8, padding: 12 }}>
                  <div style={{ color: '#60a5fa', fontWeight: 500 }}>Horários Ocupados</div>
                  <div style={{ marginTop: 8 }}>
                    {bookedSlots.map((slot, index) => (
                      <div key={index} style={{ color: '#ef4444' }}>{slot}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
} 