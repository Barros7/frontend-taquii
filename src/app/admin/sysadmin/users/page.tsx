"use client";
import React from "react";
import styles from "./users.module.css";

export default function UsersPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>Usuários</span>
        <button className={styles.button}>Novo Usuário</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>João Silva</td>
            <td>joao@email.com</td>
            <td>Cliente</td>
            <td><span className={styles.status}>Ativo</span></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Maria Souza</td>
            <td>maria@email.com</td>
            <td>Prestador</td>
            <td><span className={styles.status}>Ativo</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
} 