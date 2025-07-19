'use client';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function FaqSection() {
    const [openSections, setOpenSections] = useState<Set<number>>(new Set());

    const toggleSection = (index: number) => {
        setOpenSections(prevOpenSections => {
            const newOpenSections = new Set(prevOpenSections);
            if (newOpenSections.has(index)) {
                newOpenSections.delete(index);
            } else {
                newOpenSections.add(index);
            }
            return newOpenSections;
        });
    };

    const sections = [
        {
            title: 'Como funciona o agendamento no Taqui?',
            content: 'É super simples! Você escolhe o serviço que precisa, seleciona o profissional, escolhe o horário disponível e confirma o agendamento. Receberá uma confirmação instantânea e lembretes automáticos no WhatsApp.'
        },
        {
            title: 'Posso cancelar ou reagendar um serviço?',
            content: 'Sim! Você pode cancelar ou reagendar seu agendamento gratuitamente até 2 horas antes do horário marcado. Basta acessar seu perfil e gerenciar seus agendamentos.'
        },
        {
            title: 'Como sei se o profissional é confiável?',
            content: 'Todos os profissionais no Taqui passam por verificação rigorosa. Além disso, você pode ver avaliações reais de outros clientes, fotos dos trabalhos realizados e informações detalhadas sobre cada prestador de serviço.'
        },
        {
            title: 'Como funciona o pagamento?',
            content: 'O pagamento é feito diretamente com o profissional no momento do serviço. Você pode pagar em dinheiro, cartão ou PIX, conforme a preferência do prestador. O Taqui não cobra taxas adicionais.'
        },
        {
            title: 'E se o profissional não aparecer ou o serviço for ruim?',
            content: 'Nossa equipe de suporte está sempre pronta para ajudar. Se houver qualquer problema, entre em contato conosco imediatamente. Trabalhamos para garantir sua satisfação total.'
        },
        {
            title: 'Posso agendar serviços para outras pessoas?',
            content: 'Sim! Você pode agendar serviços para familiares ou amigos. Basta informar os dados da pessoa que receberá o serviço durante o processo de agendamento.'
        },
        {
            title: 'O Taqui funciona 24 horas por dia?',
            content: 'O agendamento funciona 24/7, mas os horários de atendimento dependem de cada profissional. Você pode ver a disponibilidade de cada um em tempo real na plataforma.'
        },
        {
            title: 'Como posso entrar em contato com o suporte?',
            content: 'Nossa equipe está disponível através do chat online, WhatsApp ou email. Respondemos em até 2 horas e estamos sempre prontos para te ajudar com qualquer dúvida ou problema.'
        }
    ];

    return (
        <section id="faqs" className="container my-5">
            <div className="faq-section">
                <h2>Perguntas Frequentes</h2>

                <div>
                    {sections.map((section, index) => {
                        const isExpanded = openSections.has(index);
                        const collapseId = `faq-collapse-${index}`;

                        return (
                            <div className="card mb-2" key={index}>
                                <div className="card-header" id={`faq-heading-${index}`}>
                                    <h5 className="mb-0">
                                        <button
                                            className={`btn btn-link ${isExpanded ? '' : 'collapsed'}`}
                                            type="button"
                                            onClick={() => toggleSection(index)}
                                            aria-expanded={isExpanded}
                                            aria-controls={collapseId}
                                            style={{ textDecoration: 'none', color: 'inherit' }}
                                        >
                                            {section.title}
                                        </button>
                                    </h5>
                                </div>

                                <div
                                    id={collapseId}
                                    className={`collapse ${isExpanded ? 'show' : ''}`}
                                    aria-labelledby={`faq-heading-${index}`}
                                >
                                    <div className="card-body">
                                        <p>{section.content}</p>
                                        {index === 7 && (
                                            <p><a href="#" className="alert-link">Clique aqui para falar com nosso suporte agora.</a></p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}