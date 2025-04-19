import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./FeaturesSection.css";

const FeatureSection: React.FC = () => {
  return (
    <Container className="text-center mt-5">
      <h2 className="fw-bold">Tudo em um só lugar</h2>
      <p className="text-muted">Uma plataforma focada no controle total do estabelecimento</p>

      <Row className="mt-4">
        <Col md={6} lg={3} className="mb-4">
          <div className={"feature"}>
            <span className="fs-3">💬</span>
            <h5 className="fw-bold mt-2">Notificações</h5>
            <p className="text-muted">
              Mantenha sempre seus clientes avisados sobre seus agendamentos. Evitando assim faltas e possíveis prejuízos.
            </p>
          </div>
        </Col>

        <Col md={6} lg={3} className="mb-4">
          <div className={"feature"}>
            <span className="fs-3">👥</span>
            <h5 className="fw-bold mt-2">Funcionários</h5>
            <p className="text-muted">
              Gerencie comissão, horários, serviços e férias de seus funcionários. Tenha estatísticas de performance ao fim do mês.
            </p>
          </div>
        </Col>

        <Col md={6} lg={3} className="mb-4">
          <div className={"feature"}>
            <span className="fs-3">⏰</span>
            <h5 className="fw-bold mt-2">Horários</h5>
            <p className="text-muted">
              Configure facilmente os horários da sua semana, adicione férias/descansos, dias disponíveis na agenda e muito mais.
            </p>
          </div>
        </Col>

        <Col md={6} lg={3} className="mb-4">
          <div className={"feature"}>
            <span className="fs-3">✏️</span>
            <h5 className="fw-bold mt-2">Personalize seu perfil</h5>
            <p className="text-muted">
              Mostre todos os seus serviços, configure um perfil personalizado para sua empresa e atraia ainda mais clientes.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FeatureSection;
