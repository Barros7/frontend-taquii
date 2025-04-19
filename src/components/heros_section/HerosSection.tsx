'use client';

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Hero: React.FC = () => {
  return (
    <section className="container py-3">
      <div className="row align-items-center">
        <div className="col-md-6 text-md-start text-center">
          <h1 className="fw-bold">Conectando tecnologia & trabalho.</h1>
          <p className="text-muted">Feito para estabelecimentos que prezam pelo melhor para seus clientes.</p>
          <button className="btn btn-primary">Registar Meu Estabelecimento</button>
        </div>
        <div className="col-md-6 text-center">
          <img
            src="/main.svg"
            alt="Ilustração de tecnologia e agendamento"
            className="img-fluid"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
