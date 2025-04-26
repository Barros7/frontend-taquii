'use client';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function FaqSection() {
    const [openSections, setOpenSections] = useState<Set<number>>(new Set());

    const toggleSection = (index: number) => {
        setOpenSections(prevOpenSections => {
            const newOpenSections = new Set(prevOpenSections); // Create a copy of the current open sections
            if (newOpenSections.has(index)) {
                newOpenSections.delete(index); // If the section is open, close it (remove from Set)
            } else {
                newOpenSections.add(index); // If the section is closed, open it (add to Set)
            }
            return newOpenSections; // Return the new Set to update state
        });
    };

    // Your FAQ data
    const sections = [
        {
            title: 'Como faço para registar o meu estabelecimento e começar a usar o Taqui?',
            // Make sure to complete the content here
            content: 'Para fazer o registo no Taqui, basta apenas visitar a nossa página de registo para estabelecimentos e seguir os passos indicados para criar o seu perfil e configurar os seus serviços.'
        },
        {
            title: 'Posso utilizar o Taqui de graça?',
            content: 'Sim, temos um plano gratuito. No entanto, você pode ter algumas limitações nesse plano e algumas funcionalidades que estão presentes somente em outros planos.'
        },
        {
            title: 'E se meus clientes não conseguirem agendar sozinhos, irei perder os clientes?',
            content: 'Não! Temos noção que algumas pessoas não tem conhecimento suficiente ou eventualmente não irão conseguir agendar sozinhos. Por isso, temos a opção de "Agendamento manual", onde você mesmo poderá adicionar esse agendamento depois que o cliente marcar com você por alguma rede social ou pessoalmente.'
        },
        {
            title: 'Como irei receber o dinheiro dos agendamentos?',
            content:'Atualmente não temos pagamento na plataforma, então, você irá receber o dinheiro dos seus agendamentos no ato do atendimento.'
        },
        {
            title: 'E como posso fazer para que os meus clientes não marquem agendamentos nos meus horários de almoço e/ou descanso?',
            content: 'Não se preocupe. No Taqui, você pode configurar os dias de abertura e fechamento de todos os dias da semana. Além disso, pode configurar "janelas de descanso" durante o dia. Você também pode desabilitar um dia específico para não receber agendamentos naquele dia (ex: Domingo)'
        },
        {
            title: 'E se eu precisar me ausentar em um dia específico?',
            content: 'Além da configuração de horários do seu estabelecimento, você pode configurar "Horários Off", informando uma data e horário de início e fim. Desse modo, os seus clientes não vão conseguir marcar agendamento com você nesse período.'
        },
        {
            title: 'E como os clientes vão escolher o horário?',
            content: 'Os horários são listados em intervalos de tempo que podem ser configurados por você e o cliente irá escolher um deles. Quando um cliente marca um horário, aquele horário irá ficar bloqueado para próximos clientes, evitando assim dois clientes marcando no mesmo horário.'
        },
        {
            title: 'Como posso obter suporte em caso de problemas?',
            content: 'Você pode entrar em contato com nossa equipe de suporte, que irá responder e tentar resolver o seu problema o mais rápido possível. Clicando aqui, você será redirecionado para o chat com o nosso suporte.'
        }
    ];

    return (
        <section id="faqs" className="container my-5">
            <div className="faq-section">
                {/* Optional: Add a main heading for the FAQ section */}
                <h2>Perguntas Frequentes</h2>

                {/* Use a container for the FAQ items, though not strictly required by Bootstrap collapse if not using accordion behavior */}
                <div>
                    {sections.map((section, index) => {
                        // Determine if the current section is open
                        const isExpanded = openSections.has(index);
                        // Create a unique ID for the collapsible content
                        const collapseId = `faq-collapse-${index}`;

                        return (
                            // Use a div for each FAQ item, applying Bootstrap classes for accordion items if desired for styling
                            <div className="card mb-2" key={index}> {/* Using card for visual separation like your original alert */}
                                <div className="card-header" id={`faq-heading-${index}`}> {/* Card header for the question */}
                                    <h5 className="mb-0">
                                        {/* Use a button for the question title - better for accessibility */}
                                        <button
                                            className={`btn btn-link ${isExpanded ? '' : 'collapsed'}`} // Bootstrap classes for button styling and state
                                            type="button"
                                            onClick={() => toggleSection(index)} // Toggle the section state on click
                                            aria-expanded={isExpanded} // ARIA attribute: true if expanded, false if collapsed
                                            aria-controls={collapseId} // ARIA attribute linking button to the collapsible content
                                            style={{ textDecoration: 'none', color: 'inherit' }} // Optional: Remove default button link styling
                                        >
                                            {section.title}
                                        </button>
                                    </h5>
                                </div>

                                {/* The collapsible content */}
                                <div
                                    id={collapseId}
                                    // Apply Bootstrap collapse classes and the 'show' class conditionally
                                    className={`collapse ${isExpanded ? 'show' : ''}`}
                                    aria-labelledby={`faq-heading-${index}`} // ARIA attribute linking content back to its heading
                                    // Removed data-bs-parent attribute to allow multiple items to be open simultaneously
                                >
                                    <div className="card-body"> {/* Card body for the answer */}
                                        {/* Content is typically in a paragraph */}
                                        <p>{section.content}</p>
                                        {/* If there's a link mentioned in content, ensure it's an actual <a> tag */}
                                        {index === 7 && ( // Example for the support question
                                            <p><a href="#" className="alert-link">Clique aqui para o chat com o nosso suporte.</a></p>
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