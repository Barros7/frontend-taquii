'use client';

import styles from './PropostaValor.module.css';

const beneficios = [
  {
    icon: "👥",
    title: "Mais Visibilidade",
    description: "Seus serviços expostos para milhares de clientes em busca de profissionais qualificados.",
    color: "#F9A826"
  },
  {
    icon: "📅",
    title: "Agendamento Inteligente",
    description: "Calendário integrado para organizar seu tempo e evitar conflitos de horários.",
    color: "#10B981"
  },
  {
    icon: "💳",
    title: "Pagamentos Seguros",
    description: "Receba por referência bancária ou carteira digital com total segurança.",
    color: "#3B82F6"
  },
  {
    icon: "🎯",
    title: "Sem Taxa Inicial",
    description: "Cadastre-se grátis e comece hoje. Sem custos ocultos ou taxas surpresa.",
    color: "#8B5CF6"
  },
  {
    icon: "✨",
    title: "Perfil Personalizado",
    description: "Adicione fotos, preços, localização e mais para destacar seus serviços.",
    color: "#EF4444"
  }
];

export default function PropostaValor() {
  return (
    <section id="vantagens" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Por que escolher o <span className={styles.highlight}>Taqui Serviço</span>?
          </h2>
          <p className={styles.subtitle}>
            Tudo que você precisa para crescer seu negócio em uma só plataforma
          </p>
        </div>

        <div className={styles.beneficiosGrid}>
          {beneficios.map((beneficio, index) => (
            <div 
              key={index} 
              className={styles.beneficioCard}
              style={{ '--accent-color': beneficio.color } as React.CSSProperties}
            >
              <div className={styles.iconContainer}>
                <span className={styles.icon}>{beneficio.icon}</span>
              </div>
              
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{beneficio.title}</h3>
                <p className={styles.cardDescription}>{beneficio.description}</p>
              </div>

              <div className={styles.cardDecoration}>
                <div className={styles.decorationCircle}></div>
                <div className={styles.decorationLine}></div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.statsSection}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>+300%</div>
            <div className={styles.statLabel}>Aumento médio na renda</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>-70%</div>
            <div className={styles.statLabel}>Redução no tempo de gestão</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>24/7</div>
            <div className={styles.statLabel}>Disponibilidade para clientes</div>
          </div>
        </div>
      </div>
    </section>
  );
} 