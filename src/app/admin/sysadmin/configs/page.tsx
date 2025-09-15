"use client";
import React from "react";
import styles from "./configs.module.css";

export default function ConfigsPage() {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Configurações do Sistema</span>
      <form>
        <div className={styles.formGroup}>
          <label className={styles.label}>Nome do Sistema:</label>
          <input className={styles.input} type="text" value="Taqui" readOnly />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email de Suporte:</label>
          <input className={styles.input} type="email" value="info@taquiservico.com" readOnly />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Moeda:</label>
          <input className={styles.input} type="text" value="Kz" readOnly />
        </div>
      </form>
    </div>
  );
} 