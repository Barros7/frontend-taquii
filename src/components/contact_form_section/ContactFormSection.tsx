'use client'
import React, { useState } from "react";
import styles from "./ContactFormSection.module.css";

const ContactFormSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    urgency: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.name.trim() || !formData.category || !formData.urgency) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simular envio
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Form Submitted:", formData);
      alert("Solicitação enviada com sucesso! Entraremos em contato em breve.");
      
      // Limpar formulário
      setFormData({ name: "", category: "", urgency: "" });
    } catch {
      alert("Erro ao enviar solicitação. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="suporte" className={styles.contactSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Precisa de Ajuda?</h2>
        <p className={styles.subtitle}>
          Nossa equipe está pronta para te ajudar a encontrar o serviço ideal. 
          Preencha o formulário abaixo e entraremos em contato em até 2 horas.
        </p>

        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>
              Seu nome completo *
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Digite seu nome completo"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category" className={styles.formLabel}>
              Que tipo de serviço você procura? *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={styles.select}
              required
            >
              <option value="">Selecione o tipo de serviço</option>
              <option value="barbearia">Barbearia</option>
              <option value="salaoDeBeleza">Salão de Beleza</option>
              <option value="rentacar">Aluguel de Carro</option>
              <option value="segurança">Serviços de Segurança</option>
              <option value="hotelaria">Hospedagem</option>
              <option value="mecanica">Mecânica</option>
              <option value="limpeza">Limpeza</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="urgency" className={styles.formLabel}>
              Quando você precisa do serviço? *
            </label>
            <select
              id="urgency"
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              className={styles.select}
              required
            >
              <option value="">Selecione a urgência</option>
              <option value="hoje">Hoje mesmo</option>
              <option value="semana">Esta semana</option>
              <option value="mes">Este mês</option>
              <option value="sem-pressa">Sem pressa</option>
            </select>
          </div>

          <button 
            type="submit" 
            className={styles.button}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar solicitação"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactFormSection;
