"use client";
import React from "react";
import styles from "./payments.module.css";

export default function PaymentsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>Pagamentos</span>
        <button className={styles.button}>Novo Pagamento</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Valor</th>
            <th>Data</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>João Silva</td>
            <td>2.000 Kz</td>
            <td>2024-06-10</td>
            <td><span className={`${styles.status} ${styles.pago}`}>Pago</span></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Maria Souza</td>
            <td>1.500 Kz</td>
            <td>2024-06-11</td>
            <td><span className={`${styles.status} ${styles.pendente}`}>Pendente</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
} 