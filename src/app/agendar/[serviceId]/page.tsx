'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/header/Header';
import { apiService, Service } from '@/services/apiService';
// import ServiceCatalogSkeleton from '@/components/service_catalog_skeleton/ServiceCatalogSkeleton';
import ErrorMessage from '@/components/ErrorMessage';
import styles from '../Agendar.module.css';

const horarios = [
  '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00',
];

export default function AgendarPage({ params }: { params: Promise<{ serviceId: string }> }) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  
  const [data, setData] = useState(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });
  const [local, setLocal] = useState<'ESTABLISHMENT' | 'HOME'>('ESTABLISHMENT');

  const getCurrentTimeString = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  
  const [horario, setHorario] = useState(getCurrentTimeString());
  
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
      const current = window.location.pathname + window.location.search;
      router.push(`/login?callbackUrl=${encodeURIComponent(current)}`);
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

    // Validação extra: não permitir datas/horas passadas
    const now = new Date();
    const selectedDateTime = new Date(`${data}T${horario}:00`);
    if (selectedDateTime < now) {
      setError('Não é possível agendar para datas/horas passadas!');
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
        location: local === 'ESTABLISHMENT' ? 'ESTABLISHMENT' : 'HOME',
        amount: service.price,
        referenceCode,
        mobileNumber: '937315418',
      };

      // Criar agendamento
      const appointment = await apiService.createAppointment(appointmentData);

      // Redirecionar para página de pagamento com o ID real
      router.push(`/pagamento/${appointment.id}`);
      
    } catch (err: unknown) {
      console.error('Erro ao criar agendamento:', err);
      const message = err instanceof Error ? err.message : 'Erro ao criar agendamento';
      setError(message);
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
        <div className={styles.agendarBg} style={{ minHeight: '100vh' }}>
          <div className="container py-4">
            <div className="row g-4">
              <div className="col-12 col-md-6 col-sm-12">
                <div className={styles.skeletonCard}>
                  <div className={styles.skeletonLine} style={{ width: '60%', marginBottom: 12 }} />
                  <div className={styles.skeletonLine} style={{ width: '100%', height: 60, marginBottom: 8 }} />
                  <div className={styles.skeletonLine} style={{ width: '100%', height: 14, marginBottom: 8 }} />
                  <div className={styles.skeletonLine} style={{ width: '80%', height: 14, marginBottom: 16 }} />
                  <div className="d-flex gap-2" style={{ flexWrap: 'wrap' }}>
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className={styles.skeletonLine} style={{ width: 64, height: 36 }} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-sm-12">
                <div className={styles.skeletonCard}>
                  <div className="d-flex align-items-center gap-2" style={{ marginBottom: 12 }}>
                    <div className={styles.skeletonCircle} />
                    <div className={styles.skeletonLine} style={{ width: '40%' }} />
                  </div>
                  <div className={styles.skeletonLine} style={{ width: '100%', height: 160 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className={styles.agendarBg} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
      <div className={styles.agendarBg}>
        {/* Stepper */}
        <div className={styles.stepper}>
          <div className={styles.step}>
            <div className={styles.stepCircle}>1</div>
            <span>Agendamento</span>
          </div>
          <div className={styles.stepLine} />
          <div className={`${styles.step} ${styles.inactive}`}> 
            <div className={styles.stepCircle}>2</div>
            <span>Pagamento</span>
          </div>
          <div className={styles.stepLine} />
          <div className={`${styles.step} ${styles.inactive}`}>
            <div className={styles.stepCircle}>3</div>
            <span>Confirmação</span>
          </div>
        </div>

        <div className="container">
          <div className="row">
            {/* Formulário de agendamento */}
            <div className="col-12 col-md-6 col-sm-12">
              <form onSubmit={handleAgendar} className={styles.cardForm}>
                <h2 style={{ marginBottom: 16, color: '#4F46E5', fontWeight: 800 }}>Agende o seu atendimento</h2>
                {/* Dados do serviço */}
                {service && (
                  <div className={styles.cardService}>
                    <h3 style={{ marginBottom: 8 }}>{service.title}</h3>
                    <p style={{ color: '#6b7280', marginBottom: 8 }}>{service.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Profissional: {service.provider.name}</span>
                      <span style={{ fontWeight: 700, fontSize: 18, color: '#4F46E5' }}>{service.price} Kz</span>
                    </div>
                  </div>
                )}

                <div style={{ marginBottom: 16 }}>
                  <label>Data</label><br />
                  <input 
                    type="date" 
                    value={data} 
                    min={new Date().toISOString().split('T')[0]}
                    onChange={e => setData(e.target.value)} 
                    className={styles.input}
                  />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label>Atendimento</label><br />
                  <div className={styles.radioGroup}>
                    <label>
                      <input type="radio" checked={local === 'ESTABLISHMENT'} onChange={() => setLocal('ESTABLISHMENT')} /> No estabelecimento
                    </label>
                    <label>
                      <input type="radio" checked={local === 'HOME'} onChange={() => setLocal('HOME')} /> Em casa
                    </label>
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label>Horário</label><br />
                  <div className={styles.timeGrid}>
                    {horarios.map(h => {
                      const isToday = data === new Date().toISOString().split('T')[0];
                      const now = new Date();
                      const [hHour, hMin] = h.split(':').map(Number);
                      const isPast = isToday && (hHour < now.getHours() || (hHour === now.getHours() && hMin <= now.getMinutes()));
                      const isAvailable = isTimeAvailable(h) && !isPast;
                      return (
                        <button
                          key={h}
                          type="button"
                          onClick={() => isAvailable && setHorario(h)}
                          disabled={!isAvailable}
                          className={
                            styles.timeBtn + (horario === h ? ' ' + styles.selected : '')
                          }
                        >
                          {h}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <ErrorMessage 
                  error={error} 
                  onClear={() => setError(null)}
                />

                <button 
                  type="submit" 
                  disabled={submitting}
                  className={styles.submitBtn}
                >
                  {submitting ? 'Agendando...' : 'Agendar'}
                </button>
              </form>
            </div>

            {/* Agenda do profissional */}
            <div className="col-12 col-md-6 col-sm-12">
              <div className={styles.cardAgenda}>
                <h3 style={{ marginBottom: 16, color: '#4F46E5', fontWeight: 700 }}>Agenda do profissional</h3>
                <div style={{ marginBottom: 16 }}>
                  <span style={{ color: '#6b7280' }}>Horários ocupados em {new Date(data).toLocaleDateString('pt-BR')}</span>
                </div>
                {bookedSlots.length === 0 ? (
                  <div style={{ background: '#f3f4f6', borderRadius: 8, padding: 16, textAlign: 'center', color: '#6b7280' }}>
                    Nenhum horário ocupado nesta data
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ background: '#ede9fe', borderRadius: 8, padding: 12 }}>
                      <div style={{ color: '#4F46E5', fontWeight: 500 }}>Horários Ocupados</div>
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
        </div>
      </div>
    </>
  );
} 