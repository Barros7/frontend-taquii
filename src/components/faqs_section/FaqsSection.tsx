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
            title: 'Como funciona o agendamento no Taqui Serviços?',
            content: 'É super simples! Você escolhe a categoria do serviço que precisa, seleciona o profissional, escolhe o horário disponível, confirma o agendamento e por último confirma o pagamento. Receberá uma confirmação instantânea e lembretes automáticos por WhatsApp, Email ou SMS.'
        },
        {
            title: 'Posso cancelar ou reagendar um serviço?',
            content: 'Sim! Você pode cancelar ou reagendar seu agendamento gratuitamente até 2 horas. Basta acessar seu perfil e gerenciar seus agendamentos.'
        },
        {
            title: 'Como sei se o profissional é confiável?',
            content: 'Todos os profissionais no Taqui Serviços passam por verificação rigorosa. Além disso, você pode ver fotos dos trabalhos realizados e informações detalhadas sobre cada prestador de serviço ou empresa.'
        },
        {
            title: 'Como funciona o pagamento?',
            content: 'O pagamento é feito diretamente na plataforma. Você pode pagar via trânsferência bancária, Multicaixa Express, Código de Referência ou Pelo E-Kwanza, conforme a preferência do prestador. O Taqui Serviços não cobra taxas adicionais.'
        },
        {
            title: 'E se o profissional não aparecer ou o serviço for ruim?',
            content: 'Se o profissional não aparecer, você pode cancelar o agendamento e receberá um reembolso. Nossa equipe de suporte está sempre pronta para ajudar. Se houver qualquer problema, entre em contato conosco imediatamente. Trabalhamos para garantir sua satisfação total.'
        },
        {
            title: 'O Taqui Serviços funciona 24 horas por dia?',
            content: 'O agendamento funciona 24/7, mas os horários de atendimento dependem de cada profissional ou empresa. Você pode ver a disponibilidade de cada um em tempo real na plataforma.'
        },
        {
            title: 'Como posso entrar em contato com o suporte?',
            content: 'Nossa equipe está disponível através do chat online, WhatsApp, email, SMS ou chamada telefônica. Respondemos em até 15 minutos e estamos sempre prontos para te ajudar com qualquer dúvida ou problema.'
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