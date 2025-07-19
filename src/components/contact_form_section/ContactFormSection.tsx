'use client'
import React, { useState } from "react";
import styles from "./ContactFormSection.module.css";

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
    <section id="suporte" className={styles.contactSection}>
      <h2 className={styles.title}>Precisa de Ajuda?</h2>
      <p className={styles.subtitle}>
        Nossa equipe está pronta para te ajudar a encontrar o serviço ideal
      </p>

      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <div>
          <label className={styles.formLabel}>Seu nome</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Como devemos te chamar?"
            className={styles.input}
          />
        </div>

        <div>
          <label className={styles.formLabel}>Que tipo de serviço você procura?</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">Selecione o tipo de serviço</option>
            <option value="barbearia">Barbearia</option>
            <option value="salaoDeBeleza">Salão de Beleza</option>
            <option value="rentacar">Aluguel de Carro</option>
            <option value="segurança">Serviços de Segurança</option>
            <option value="hotelaria">Hospedagem</option>
            <option value="outro">Outro</option>
          </select>
        </div>

        <div>
          <label className={styles.formLabel}>Quando você precisa do serviço?</label>
          <select
            name="employees"
            value={formData.employees}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">Selecione a urgência</option>
            <option value="hoje">Hoje mesmo</option>
            <option value="semana">Esta semana</option>
            <option value="mes">Este mês</option>
            <option value="sem-pressa">Sem pressa</option>
          </select>
        </div>

        <button type="submit" className={styles.button}>
          Enviar solicitação
        </button>
      </form>
    </section>
  );
};

export default ContactFormSection;
