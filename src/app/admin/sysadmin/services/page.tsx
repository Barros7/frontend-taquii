"use client";
import React from "react";
import styles from "./services.module.css";

export default function ServicesPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>Serviços</span>
        <button className={styles.button}>Novo Serviço</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Preço</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Corte de Cabelo</td>
            <td>Beleza</td>
            <td>2.000 Kz</td>
            <td><span className={styles.status}>Ativo</span></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Manicure</td>
            <td>Estética</td>
            <td>1.500 Kz</td>
            <td><span className={styles.status}>Ativo</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
} 