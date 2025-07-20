export interface Feature {
    text: string;
    included: boolean;
  }
  
  export interface Plan {
    id: string;
    name: string;
    description: string;
    price: string;
    priceUnit: string;
    features: Feature[];
  }
  
  export const plans: Plan[] = [
    {
      id: 'encontrar',
      name: 'Encontrar',
      description: 'Descubra profissionais qualificados',
      price: '1º Passo',
      priceUnit: '',
      features: [
        { text: 'Busca inteligente por categoria', included: true },
        { text: 'Filtros por localização', included: true },
        { text: 'Avaliações e comentários reais', included: true },
        { text: 'Fotos dos trabalhos realizados', included: true },
        { text: 'Informações detalhadas dos serviços', included: true },
        { text: 'Horários de funcionamento', included: true },
        { text: 'Perfis verificados', included: true },
        { text: 'Comparação de preços', included: true },
        { text: 'Recomendações personalizadas', included: false },
        { text: 'Chat direto com o profissional', included: false },
        { text: 'Agendamento prioritário', included: false },
      ],
    },
    {
      id: 'agendar',
      name: 'Agendar',
      description: 'Reserve seu horário em segundos',
      price: '2º Passo',
      priceUnit: '',
      features: [
        { text: 'Agendamento 24/7', included: true },
        { text: 'Confirmação instantânea', included: true },
        { text: 'Lembretes automáticos', included: true },
        { text: 'Cancelamento gratuito', included: true },
        { text: 'Reagendamento fácil', included: true },
        { text: 'Histórico de agendamentos', included: true },
        { text: 'Notificações no WhatsApp', included: true },
        { text: 'Calendário integrado', included: true },
        { text: 'Agendamento recorrente', included: false },
        { text: 'Lembretes personalizados', included: false },
        { text: 'Agendamento para grupos', included: false },
      ],
    },
    {
      id: 'pagar',
      name: 'Pagar',
      description: 'Formas de pagamento seguras',
      price: '3º Passo',
      priceUnit: '',
      features: [
        { text: 'Pagamento no local', included: true },
        { text: 'Múltiplas formas de pagamento', included: true },
        { text: 'Transações seguras', included: true },
        { text: 'Comprovantes digitais', included: true },
        { text: 'Histórico de pagamentos', included: true },
        { text: 'Proteção ao consumidor', included: true },
        { text: 'Suporte 24/7', included: true },
        { text: 'Reembolso garantido', included: true },
        { text: 'Pagamento antecipado', included: false },
        { text: 'Parcelamento disponível', included: false },
        { text: 'Programa de fidelidade', included: false },
      ],
    },
  ];