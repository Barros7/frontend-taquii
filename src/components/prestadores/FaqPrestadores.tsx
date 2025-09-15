'use client';

import { useState } from 'react';
import styles from './FaqPrestadores.module.css';

const faqs = [
  {
    id: 1,
    pergunta: "Preciso pagar para usar a plataforma?",
    resposta: "Não! O cadastro é 100% gratuito. Você pode criar seu perfil, adicionar serviços e começar a receber clientes sem nenhum custo inicial. Só cobramos uma pequena comissão quando você recebe um agendamento confirmado."
  },
  {
    id: 2,
    pergunta: "Como os clientes me encontram?",
    resposta: "Os clientes encontram você através da busca por localização, tipo de serviço e avaliações. Seu perfil aparece nos resultados de busca com suas fotos, preços, localização e avaliações. Quanto mais completo seu perfil, mais visibilidade você terá."
  },
  {
    id: 3,
    pergunta: "Posso cancelar quando quiser?",
    resposta: "Sim! Você tem total liberdade para cancelar sua conta a qualquer momento. Não há contratos de longo prazo ou taxas de cancelamento. Seus dados são removidos da plataforma e você pode voltar quando quiser."
  },
  {
    id: 4,
    pergunta: "Onde recebo meus pagamentos?",
    resposta: "Os pagamentos são feitos diretamente para você através de referência bancária ou carteira digital. O dinheiro vai direto para sua conta, sem intermediários. Você recebe o valor total do serviço, menos nossa pequena comissão."
  },
  {
    id: 5,
    pergunta: "Como funciona o sistema de avaliações?",
    resposta: "Após cada serviço, o cliente pode avaliar seu trabalho com estrelas e comentários. Boas avaliações aumentam sua visibilidade e credibilidade na plataforma. Recomendamos sempre entregar um excelente serviço para manter avaliações positivas."
  }
];

export default function FaqPrestadores() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Perguntas <span className={styles.highlight}>Frequentes</span>
          </h2>
          <p className={styles.subtitle}>
            Tire suas dúvidas sobre como funciona o Taqui Serviço
          </p>
        </div>

        <div className={styles.faqContainer}>
          {faqs.map((faq) => (
            <div 
              key={faq.id} 
              className={`${styles.faqItem} ${openFaq === faq.id ? styles.faqOpen : ''}`}
            >
              <button 
                className={styles.faqQuestion}
                onClick={() => toggleFaq(faq.id)}
                aria-expanded={openFaq === faq.id}
              >
                <span className={styles.questionText}>{faq.pergunta}</span>
                <svg 
                  className={styles.arrowIcon} 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none"
                >
                  <path 
                    d="M6 9L12 15L18 9" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              
              <div className={styles.faqAnswer}>
                <div className={styles.answerContent}>
                  {faq.resposta}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>Ainda tem dúvidas?</h3>
            <p className={styles.ctaDescription}>
              Nossa equipe está pronta para te ajudar. Entre em contato conosco.
            </p>
            <div className={styles.ctaButtons}>
              <a href="/prestadores/registro" className={styles.primaryButton}>
                Criar conta gratuita
              </a>
              <a href="mailto:info@taquiservico.com" className={styles.secondaryButton}>
                Falar com suporte
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 