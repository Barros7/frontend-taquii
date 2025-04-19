'use client';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function FaqSection() {
    const [activeSection, setActiveSection] = useState<boolean[]>(Array(10).fill(false));

    const toggleSection = (index: number) => {
        setActiveSection((prevState) => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

    const sections = [
        {
            title: 'Como faço para registar o meu estabelecimento e começar a usar o Taqui?',
            content: 'Para fazer o registo no Taqui, basta apenas '
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
        <div className="container mt-4">
            <section className="faq-section">
               {sections.map((section, index) => (
                    <div 
                        key={index} 
                        className="alert my-3" 
                        role="alert" 
                        onClick={() => toggleSection(index)}
                    >
                        <h6 className="alert-heading">{section.title}</h6>
                        <div className={activeSection[index] ? "showContent" : "hideContent"}>
                            <hr />
                            <p>{section.content}</p>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}
