"use client";
import React from "react";
import styles from "./notifications.module.css";

export default function NotificationsPage() {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Notificações</span>
      <ul className={styles.list}>
        <li className={styles.item}>🔔 Novo usuário registrado: Maria Souza</li>
        <li className={styles.item}>🔔 Pagamento pendente de João Silva</li>
        <li className={styles.item}>🔔 Serviço "Corte de Cabelo" atualizado</li>
      </ul>
    </div>
  );
} 