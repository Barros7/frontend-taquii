"use client"

import React, { useState } from 'react';
import styles from './help.module.css';

const HelpPage = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = {
    general: 'Geral',
    scheduling: 'Agendamentos',
    clients: 'Clientes',
    services: 'Serviços',
    payments: 'Pagamentos',
    account: 'Conta'
  };

  const faqs = {
    general: [
      {
        question: 'Como começar a usar o sistema?',
        answer: 'Para começar a usar o sistema, primeiro complete seu perfil com as informações do seu negócio. Em seguida, adicione seus serviços e configure seu horário de funcionamento. Você pode então começar a receber agendamentos de clientes.'
      },
      {
        question: 'Como posso personalizar minha página?',
        answer: 'Você pode personalizar sua página através das configurações do perfil. Lá você pode adicionar fotos, descrições, e ajustar as informações do seu negócio.'
      }
    ],
    scheduling: [
      {
        question: 'Como gerenciar meus horários?',
        answer: 'Você pode gerenciar seus horários na seção de Agendamentos. Lá você pode definir seus horários de trabalho, pausas, e ver todos os agendamentos do dia.'
      },
      {
        question: 'Como configurar lembretes para clientes?',
        answer: 'Os lembretes podem ser configurados nas configurações de notificações. Você pode escolher enviar lembretes por email ou SMS antes dos agendamentos.'
      }
    ],
    clients: [
      {
        question: 'Como adicionar novos clientes?',
        answer: 'Novos clientes são adicionados automaticamente quando fazem seu primeiro agendamento. Você também pode adicionar clientes manualmente através da seção de Clientes.'
      },
      {
        question: 'Como ver o histórico de um cliente?',
        answer: 'O histórico completo de cada cliente pode ser acessado clicando no nome do cliente na lista de clientes. Lá você verá todos os agendamentos, serviços realizados e preferências.'
      }
    ],
    services: [
      {
        question: 'Como adicionar novos serviços?',
        answer: 'Você pode adicionar novos serviços na seção de Serviços. Clique no botão "Adicionar Serviço" e preencha as informações necessárias como nome, duração e preço.'
      },
      {
        question: 'Como gerenciar preços dos serviços?',
        answer: 'Os preços podem ser ajustados a qualquer momento na seção de Serviços. Clique no serviço desejado e use o botão de edição para atualizar o preço.'
      }
    ],
    payments: [
      {
        question: 'Quais métodos de pagamento são aceitos?',
        answer: 'O sistema aceita pagamentos em dinheiro, cartão de crédito/débito e transferência bancária. Você pode configurar os métodos aceitos nas configurações de pagamento.'
      },
      {
        question: 'Como gerar relatórios financeiros?',
        answer: 'Os relatórios financeiros podem ser gerados na seção de Relatórios. Você pode filtrar por período e exportar em diferentes formatos.'
      }
    ],
    account: [
      {
        question: 'Como alterar minha senha?',
        answer: 'Para alterar sua senha, vá até as configurações da conta e clique em "Alterar Senha". Você precisará inserir sua senha atual e a nova senha.'
      },
      {
        question: 'Como atualizar minhas informações de contato?',
        answer: 'Suas informações de contato podem ser atualizadas no seu perfil. Clique em "Editar Perfil" e atualize as informações necessárias.'
      }
    ]
  };

  const filteredFaqs = faqs[activeCategory].filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.helpPage}>
      <div className={styles.header}>
        <h1>Central de Ajuda</h1>
        <div className={styles.searchBar}>
          <input 
            type="text"
            placeholder="Buscar ajuda..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.sidebar}>
          {Object.entries(categories).map(([key, label]) => (
            <button
              key={key}
              className={`${styles.categoryButton} ${activeCategory === key ? styles.active : ''}`}
              onClick={() => setActiveCategory(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className={styles.faqSection}>
          <h2>{categories[activeCategory]}</h2>
          <div className={styles.faqList}>
            {filteredFaqs.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.supportSection}>
        <div className={styles.supportCard}>
          <h3>Precisa de mais ajuda?</h3>
          <p>Nossa equipe de suporte está disponível para ajudar você.</p>
          <div className={styles.supportActions}>
            <button className={styles.supportButton}>
              Enviar Mensagem
            </button>
            <button className={styles.supportButton}>
              Agendar Chamada
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage; 