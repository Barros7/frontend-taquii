import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./ResultsSection.css";

const ResultsSection: React.FC = () => {
  return (
    <section className="container container-result-section text-center">
      <h2 className="fw-bold">Resultados</h2>
      <p className="text-muted">Veja como o Taqui vem crescendo</p>

      <div className="row mt-4">
        <div className="col-6 col-sm-3 col-md-4 mb-4">
          <div className={"card resultCard"}>
            <div className="card-body">
              <h5 className="fw-bold">Utilizadores</h5>
              <p className="text-muted">Total de utilizadores ativos em nossa plataforma.</p>
              <h3 className={"resultValue"}>35</h3>
            </div>
          </div>
        </div>

        <div className="col-6 col-sm-3 col-md-4 mb-4">
          <div className={"card resultCard"}>
            <div className="card-body">
              <h5 className="fw-bold">Agendamentos</h5>
              <p className="text-muted">Total de agendamentos marcados.</p>
              <h3 className={"resultValue"}>+50</h3>
            </div>
          </div>
        </div>

        <div className="col-6 col-sm-3 col-md-4 mb-4">
          <div className={"card resultCard"}>
            <div className="card-body">
              <h5 className="fw-bold">Empresas Registadas</h5>
              <p className="text-muted">Empresas que confiam nos nossos serviços.</p>
              <h3 className={"resultValue"}>+20</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
