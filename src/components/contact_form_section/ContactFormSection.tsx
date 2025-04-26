'use client'
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ContactFormSection.css";

const ContactFormSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    employees: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <section id="contatos" className="container d-flex flex-column align-items-center justify-content-center my-5">
      <h2 className="text-center fw-bold">Contato</h2>
      <p className="text-muted text-center mb-4">
        Fale conosco para transformar seu estabelecimento junto com a gente!
      </p>

      <form onSubmit={handleSubmit} className="contact-form p-4 shadow-sm rounded">
        <div className="mb-3">
          <label className="form-label fw-medium">Seu nome</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Digite seu nome"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-medium">Sua categoria de serviços</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Informe o departamento do seu estabelecimento</option>
            <option value="barbearia">Barbearia</option>
            <option value="salaoDeBeleza">Salão de Beleza</option>
            <option value="rentacar">Rent a Car</option>
            <option value="segurança">Serviços de Segurança</option>
            <option value="hotelaria">Hotelaria</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label fw-medium">Quantidade de funcionários</label>
          <select
            name="employees"
            value={formData.employees}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Informe a quantidade de funcionários</option>
            <option value="1-5">1-5</option>
            <option value="6-10">6-10</option>
            <option value="11+">Mais de 10</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Enviar
        </button>
      </form>
    </section>
  );
};

export default ContactFormSection;
