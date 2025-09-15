'use client';

import styles from './ComoFunciona.module.css';

const etapas = [
  {
    numero: "01",
    titulo: "Crie seu perfil",
    descricao: "Cadastre-se gratuitamente e personalize seu perfil com fotos, descrições e informações de contato.",
    icon: "👤",
    cor: "#F9A826"
  },
  {
    numero: "02",
    titulo: "Publique seus serviços",
    descricao: "Adicione seus serviços, preços, horários de atendimento e localização para que os clientes te encontrem.",
    icon: "📝",
    cor: "#10B981"
  },
  {
    numero: "03",
    titulo: "Receba agendamentos",
    descricao: "Clientes encontram seu perfil, fazem agendamentos e você recebe notificações em tempo real.",
    icon: "📅",
    cor: "#3B82F6"
  },
  {
    numero: "04",
    titulo: "Atenda e ganhe",
    descricao: "Presta o serviço, receba avaliações positivas e continue crescendo sua base de clientes.",
    icon: "💰",
    cor: "#8B5CF6"
  }
];

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Como funciona em <span className={styles.highlight}>4 passos simples</span>
          </h2>
          <p className={styles.subtitle}>
            Do registro ao primeiro cliente em menos de 10 minutos
          </p>
        </div>

        <div className={styles.timeline}>
          {etapas.map((etapa, index) => (
            <div 
              key={index} 
              className={styles.etapaCard}
              style={{ '--accent-color': etapa.cor } as React.CSSProperties}
            >
              <div className={styles.etapaHeader}>
                <div className={styles.numeroContainer}>
                  <span className={styles.numero}>{etapa.numero}</span>
                </div>
                <div className={styles.iconContainer}>
                  <span className={styles.icon}>{etapa.icon}</span>
                </div>
              </div>

              <div className={styles.etapaContent}>
                <h3 className={styles.etapaTitulo}>{etapa.titulo}</h3>
                <p className={styles.etapaDescricao}>{etapa.descricao}</p>
              </div>

              {index < etapas.length - 1 && (
                <div className={styles.connector}>
                  <div className={styles.connectorLine}></div>
                  <div className={styles.connectorArrow}>↓</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>Pronto para começar?</h3>
            <p className={styles.ctaDescription}>
              Junte-se a centenas de prestadores que já estão crescendo com o Taqui Serviço
            </p>
            <div className={styles.ctaButtons}>
              <a href="/prestadores/registro" className={styles.primaryButton}>
                Criar conta gratuita
              </a>
              <a href="#testemunhos" className={styles.secondaryButton}>
                Ver testemunhos
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 