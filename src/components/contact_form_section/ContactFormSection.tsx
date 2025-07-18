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
    <section id="contatos" className={styles.contactSection}>
      <h2 className={styles.title}>Contato</h2>
      <p className={styles.subtitle}>
        Fale conosco para transformar seu estabelecimento junto com a gente!
      </p>

      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <div>
          <label className={styles.formLabel}>Seu nome</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Digite seu nome"
            className={styles.input}
          />
        </div>

        <div>
          <label className={styles.formLabel}>Sua categoria de serviços</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">Informe o departamento do seu estabelecimento</option>
            <option value="barbearia">Barbearia</option>
            <option value="salaoDeBeleza">Salão de Beleza</option>
            <option value="rentacar">Rent a Car</option>
            <option value="segurança">Serviços de Segurança</option>
            <option value="hotelaria">Hotelaria</option>
          </select>
        </div>

        <div>
          <label className={styles.formLabel}>Quantidade de funcionários</label>
          <select
            name="employees"
            value={formData.employees}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">Informe a quantidade de funcionários</option>
            <option value="1-5">1-5</option>
            <option value="6-10">6-10</option>
            <option value="11+">Mais de 10</option>
          </select>
        </div>

        <button type="submit" className={styles.button}>
          Enviar
        </button>
      </form>
    </section>
  );
};

export default ContactFormSection;
