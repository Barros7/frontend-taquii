"use client";
import React from 'react';
import Head from 'next/head';
import Header from '@/components/header/Header';
import { Link } from 'lucide-react';

const TermsOfResponsibility: React.FC = () => {
  return (
    <>
        <Header />

        <section className="container">
            <Head>
                <title>Termos de Responsabilidade - Taqui</title>
                <meta name="description" content="Leia os termos de responsabilidade ao usar o Taqui." />
            </Head>

            <div className="header pt-5">
                <h1>Termos de Responsabilidade</h1>
            </div>

            <main className="main-content">
                <section className="section">
                <h2>1. Introdução</h2>
                <p>
                    Bem-vindo ao Taqui! Estes Termos de Responsabilidade regem o seu uso da plataforma Taqui, incluindo o website, aplicações móveis e quaisquer serviços relacionados. Ao aceder ou utilizar o Serviço, concorda em cumprir e estar vinculado a estes Termos.
                </p>
                <p>
                    O Serviço é operado pela J2B CODE.
                </p>
                </section>

                <section className="section">
                <h2>2. Uso do Serviço</h2>
                <h3>2.1 Elegibilidade</h3>
                <p>
                    Ao utilizar o Serviço, declara e garante que tem pelo menos 18 anos de idade ou possui consentimento legal dos pais ou responsável.
                </p>
                <h3>2.2 Conduta do Usuário</h3>
                <p>
                    Concorda em utilizar o Serviço apenas para fins lícitos e de acordo com estes Termos. Concorda em não:
                </p>
                <ul>
                    <li>Violar quaisquer leis ou regulamentos aplicáveis.</li>
                    <li>Infringir os direitos de propriedade intelectual de terceiros.</li>
                    <li>Carregar ou transmitir material que seja ilegal, prejudicial, difamatório, obsceno ou de outra forma censurável.</li>
                    <li>Tentar obter acesso não autorizado a sistemas ou redes de computador ligados ao Serviço.</li>
                    <li>Interferir ou interromper o Serviço ou servidores ou redes ligados ao Serviço.</li>
                    <li>Utilizar o Serviço para enviar publicidade não solicitada ou spam.</li>
                    <li>Coletar ou armazenar dados pessoais de outros usuários sem o seu consentimento.</li>
                </ul>
                </section>

                <section className="section">
                <h2>3. Propriedade Intelectual</h2>
                <p>
                    Todo o conteúdo e materiais disponíveis no Serviço, incluindo, entre outros, texto, gráficos, logótipos, ícones, imagens, clipes de áudio, downloads digitais, compilações de dados e software, são propriedade da J2B CODE e são protegidos por leis de direitos de autor, marcas comerciais e outras leis de propriedade intelectual.
                </p>
                <p>
                    Estes Termos concedem-lhe uma licença limitada, não exclusiva e intransferível para aceder e utilizar o Serviço para seu uso pessoal e não comercial.
                </p>
                </section>

                <section className="section">
                <h2>4. Isenção de Garantias</h2>
                <p>
                    O SERVIÇO É FORNECIDO COMO ESTÁ E CONFORME DISPONÍVEL, SEM GARANTIAS DE QUALQUER TIPO, EXPRESSAS OU IMPLÍCITAS, INCLUINDO, ENTRE OUTRAS, GARANTIAS IMPLÍCITAS DE COMERCIALIZAÇÃO, ADEQUAÇÃO A UM FIM ESPECÍFICO E NÃO INFRAÇÃO. O Taqui NÃO GARANTE QUE O SERVIÇO SERÁ ININTERRUPTO, LIVRE DE ERROS OU SEGURO.
                </p>
                </section>

                <section className="section">
                <h2>5. Limitação de Responsabilidade</h2>
                <p>
                    EM NENHUM CASO O Taqui, OS SEUS AFILIADOS, DIRETORES, FUNCIONÁRIOS OU AGENTES SERÃO RESPONSÁVEIS POR QUAISQUER DANOS DIRETOS, INDIRETOS, INCIDENTAIS, ESPECIAIS, CONSEQUENCIAIS OU PUNITIVOS, INCLUINDO, ENTRE OUTROS, PERDA DE LUCROS, DADOS, USO OU OUTRAS PERDAS INTANGÍVEIS, RESULTANTES DO SEU ACESSO OU USO OU INCAPACIDADE DE ACEDER OU UTILIZAR O SERVIÇO, QUALQUER CONDUTA OU CONTEÚDO DE TERCEIROS NO SERVIÇO, OU ACESSO, USO OU ALTERAÇÃO NÃO AUTORIZADOS DAS SUAS TRANSMISSÕES OU CONTEÚDO, SEJA COM BASE EM GARANTIA, CONTRATO, ATO ILÍCITO (INCLUINDO NEGLIGÊNCIA) OU QUALQUER OUTRA TEORIA LEGAL, MESMO QUE TENHAMOS SIDO INFORMADOS DA POSSIBILIDADE DE TAIS DANOS.
                </p>
                </section>

                <section className="section">
                <h2>6. Indemnização</h2>
                <p>
                    Concorda em indemnizar e isentar o Taqui e os seus afiliados, diretores, funcionários e agentes de e contra quaisquer reivindicações, responsabilidades, danos, perdas e despesas, incluindo, entre outros, honorários advocatícios razoáveis, decorrentes ou de qualquer forma relacionados com o seu acesso ou uso do Serviço, a sua violação destes Termos, ou a sua violação de quaisquer direitos de terceiros, incluindo, entre outros, quaisquer direitos de propriedade intelectual ou de privacidade.
                </p>
                </section>

                <section className="section">
                <h2>7. Rescisão</h2>
                <p>
                    Podemos rescindir ou suspender o seu acesso ao Serviço imediatamente, sem aviso prévio ou responsabilidade, por qualquer motivo, incluindo, entre outros, se violar estes Termos. Após a rescisão, o seu direito de utilizar o Serviço cessará imediatamente.
                </p>
                </section>

                <section className="section">
                <h2>8. Lei Aplicável</h2>
                <p>
                    Estes Termos serão regidos e interpretados de acordo com as leis de Angola, sem levar em consideração os seus conflitos de provisões legais.
                </p>
                </section>

                <section className="section">
                <h2>9. Alterações aos Termos</h2>
                <p>
                    Reservamo-nos o direito, a nosso exclusivo critério, de modificar ou substituir estes Termos a qualquer momento. Se uma revisão for material, faremos esforços razoáveis para fornecer um aviso com pelo menos 30 dias de antecedência antes que quaisquer novos termos entrem em vigor. O que constitui uma alteração material será determinado a nosso exclusivo critério.
                </p>
                <p>
                    Ao continuar a aceder ou utilizar o nosso Serviço após essas revisões entrarem em vigor, concorda em ficar vinculado aos termos revisados. Se não concordar com os novos termos, por favor, pare de utilizar o Serviço.
                </p>
                </section>

                <section className="section">
                <h2>10. Contacto</h2>
                <p>
                    Se tiver alguma dúvida sobre esta Política de Privacidade, entre em contacto connosco:
                </p>
                <ul>
                    <li>Por email: info@taquiservico.com</li>
                    <li>Visitando a nossa página do facebook: <Link href="https://www.facebook.com/profile.php?id=61560147640900">Facebook</Link></li>
                    <li>Por telefone: (244) 952 408 038 | (244) 937 315 418</li>
                </ul>
                </section>
            </main>

            <style jsx>{`
                .container {
                max-width: 960px;
                margin: 0 auto;
                padding: 20px;
                font-family: sans-serif; /* Pode ajustar a fonte */
                line-height: 1.6;
                color: #333; /* Cor de texto padrão */
                }

                .header {
                text-align: center;
                margin-bottom: 40px;
                }

                .header h1 {
                color: #333; /* Ajuste a cor do título */
                font-size: 2.5em;
                }

                .main-content .section {
                margin-bottom: 30px;
                padding: 20px;
                background-color: #f9f9f9; /* Cor de fundo para as secções */
                border-radius: 8px;
                }

                .main-content .section h2 {
                color: #555; /* Ajuste a cor dos subtítulos */
                margin-top: 0;
                margin-bottom: 15px;
                font-size: 1.8em;
                }

                .main-content .section h3 {
                color: #666; /* Ajuste a cor dos subtítulos menores */
                margin-top: 15px;
                margin-bottom: 10px;
                font-size: 1.4em;
                }


                .main-content .section p {
                margin-bottom: 15px;
                }

                .main-content .section ul {
                margin-bottom: 15px;
                padding-left: 20px;
                }

                .main-content .section li {
                margin-bottom: 5px;
                }

                .footer {
                text-align: center;
                margin-top: 40px;
                font-size: 0.9em;
                color: #777; /* Cor do texto do rodapé */
                }

                /* Adicione mais estilos conforme necessário para a identidade visual do Taqui */
            `}</style>
        </section>
    </>
  );
};

export default TermsOfResponsibility;