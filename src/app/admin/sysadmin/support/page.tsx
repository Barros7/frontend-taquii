"use client";
import React from "react";
import styles from "./support.module.css";

export default function SupportPage() {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Suporte e Ajuda</span>
      <p className={styles.text}>Precisa de ajuda? Entre em contato com o suporte:</p>
      <ul className={styles.list}>
        <li className={styles.item}>Email: info@taquiservico.com</li>
        <li className={styles.item}>Telefone: +244 937 315 418</li>
      </ul>
    </div>
  );
} 