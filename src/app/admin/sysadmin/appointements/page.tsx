"use client";
import React from "react";
import styles from "./appointements.module.css";

export default function AppointementsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>Agendamentos</span>
        <button className={styles.button}>Novo Agendamento</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Serviço</th>
            <th>Data</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>João Silva</td>
            <td>Corte de Cabelo</td>
            <td>2024-06-10</td>
            <td><span className={`${styles.status} ${styles.confirmado}`}>Confirmado</span></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Maria Souza</td>
            <td>Manicure</td>
            <td>2024-06-11</td>
            <td><span className={`${styles.status} ${styles.pendente}`}>Pendente</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
} 