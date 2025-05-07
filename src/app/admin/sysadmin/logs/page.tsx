"use client";
import React from "react";
import styles from "./logs.module.css";

export default function LogsPage() {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Logs do Sistema</span>
      <ul className={styles.list}>
        <li className={styles.item}>[2024-06-10 10:00] Usuário admin fez login</li>
        <li className={styles.item}>[2024-06-10 10:05] Novo serviço cadastrado: Manicure</li>
        <li className={styles.item}>[2024-06-10 10:10] Pagamento confirmado para João Silva</li>
      </ul>
    </div>
  );
} 