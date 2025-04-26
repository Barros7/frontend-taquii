import React from "react";
import { Button } from "react-bootstrap";
import "./CallToActionsSection.css";

const CallToAction: React.FC = () => {
  return (
    <section className={"ctaSection"}>
      <div className="container text-center">
        <div className="row">
            <div className="col-sm-9 col-md-8">
              <h2 className="fw-bold">Comece agora mesmo</h2>
              <p className="text-muted">Registe o seu estabelecimento e automatize seus processos!</p>
            </div>
            <div className="col-sm-3 col-md-4 d-flex align-items-center">   
              <Button className={"ctaButton w-100"}>Começar agora</Button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
