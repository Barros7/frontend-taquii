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
      id: 'free',
      name: 'Free',
      description: 'Plano gratuito inicial',
      price: '4.990 Kz',
      priceUnit: '/mês',
      features: [
        { text: 'Agendamentos: 30', included: true },
        { text: 'Serviços: 5', included: true },
        { text: 'Funcionários: 1', included: true },
        { text: 'Notificações (Email e WhatsApp): 30', included: true },
        { text: 'Cadastro de cupons: 0', included: true },
        { text: 'Fotos de capa: 0', included: true },
        { text: 'Estatísticas mensais', included: true },
        { text: 'Módulo financeiro', included: true },
        { text: 'Horários personalizados para funcionários', included: false },
        { text: 'Lembretes diários', included: false },
        { text: 'Participação em promoções do Taqui', included: false },
      ],
    },
    {
      id: 'starter',
      name: 'Starter',
      description: 'Para estabelecimentos com um funcionário que prezam pelo gerenciamento e organização',
      price: '8.990 Kz',
      priceUnit: '/mês',
      features: [
        { text: 'Agendamentos: 250', included: true },
        { text: 'Serviços: 10', included: true },
        { text: 'Funcionários: 1', included: true },
        { text: 'Notificações (Email e WhatsApp): 150', included: true }, // Ajustado para 150 conforme imagem
        { text: 'Cadastro de cupons: 1', included: true },
        { text: 'Fotos de capa: 2', included: true },
        { text: 'Estatísticas mensais', included: true },
        { text: 'Módulo financeiro', included: true },
        { text: 'Horários personalizados para funcionários', included: false },
        { text: 'Lembretes diários', included: false },
        { text: 'Participação em promoções do Taqui', included: false },
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Para estabelecimentos de pequeno ou médio porte com mais de um funcionário',
      price: '16.990 Kz',
      priceUnit: '/mês',
      features: [
        { text: 'Agendamentos: 1000', included: true },
        { text: 'Serviços: 20', included: true },
        { text: 'Funcionários: 5', included: true },
        { text: 'Notificações (Email e WhatsApp): 3000', included: true },
        { text: 'Cadastro de cupons: 4', included: true },
        { text: 'Fotos de capa: 4', included: true },
        { text: 'Estatísticas mensais', included: true },
        { text: 'Módulo financeiro', included: true },
        { text: 'Horários personalizados para funcionários', included: true },
        { text: 'Lembretes diários', included: true },
        { text: 'Participação em promoções do Taqui', included: false },
      ],
    },
    {
      id: 'gold',
      name: 'Gold',
      description: 'Para estabelecimentos de grande porte',
      price: '35.990 Kz',
      priceUnit: '/mês',
      features: [
        { text: 'Agendamentos: 10000', included: true },
        { text: 'Serviços: 50', included: true },
        { text: 'Funcionários: 20', included: true },
        { text: 'Notificações (Email e WhatsApp): 10000', included: true },
        { text: 'Cadastro de cupons: Ilimitado', included: true },
        { text: 'Fotos de capa: 4', included: true },
        { text: 'Estatísticas mensais', included: true },
        { text: 'Módulo financeiro', included: true },
        { text: 'Horários personalizados para funcionários', included: true },
        { text: 'Lembretes diários', included: true },
        { text: 'Participação em promoções do Taqui', included: true },
      ],
    },
  ];