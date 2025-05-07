"use client";
import React from "react";
import styles from "./reports.module.css";

export default function ReportsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>Relatórios</span>
        <button className={styles.button}>Gerar Relatório</button>
      </div>
      <ul>
        <li>Relatório de Agendamentos - Junho 2024</li>
        <li>Relatório de Pagamentos - Junho 2024</li>
        <li>Relatório de Usuários - Junho 2024</li>
      </ul>
    </div>
  );
} 