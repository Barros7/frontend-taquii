import React from "react";
import { Container, Button } from "react-bootstrap";
import "./CallToActionsSection.css";

const CallToAction: React.FC = () => {
  return (
    <section className={"ctaSection"}>
      <Container className="text-center">
        <h2 className="fw-bold">Comece agora mesmo</h2>
        <p className="text-muted">Registe o seu estabelecimento e automatize seus processos!</p>
        <Button className={"ctaButton"}>Começar agora</Button>
      </Container>
    </section>
  );
};

export default CallToAction;
