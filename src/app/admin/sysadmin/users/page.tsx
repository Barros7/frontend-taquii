"use client";
import React, { useEffect, useState, useCallback } from "react"; // Adicionado useCallback
import styles from "./users.module.css";
import UserModal from "./UserModal";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  userType: 'CUSTOMER' | 'PROVIDER' | 'ADMIN';
  status: string;
  active: boolean;
}

type UserType = 'all' | 'customer' | 'provider';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<UserType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  // Use useCallback para memoizar a função fetchUsers
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const endpoint = filter === 'all' ? `/api/users` : `/api/users/${filter}s`;
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error('Falha ao carregar usuários');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, [filter]); // Removed apiUrl from dependencies

  // O useEffect agora depende apenas da versão memoizada de fetchUsers
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleCreateUser = async (userData: Partial<User>) => {
    try {
      // Enviar para o endpoint de registro
      const response = await fetch(`/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          password: userData.password,
          confirmPassword: userData.password,
          userType: userData.userType,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || 'Falha ao criar usuário');
      }

      await fetchUsers(); // Atualiza a lista
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Erro ao criar usuário');
    }
  };

  const handleEditUser = async (userData: Partial<User>) => {
    if (!selectedUser) return;

    try {
      const response = await fetch(`/api/users/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          userType: userData.userType,
          active: userData.active,
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || 'Falha ao atualizar usuário');
      }

      await fetchUsers(); // Atualiza a lista
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Erro ao atualizar usuário');
    }
  };

  const handleDeleteUser = async (user: User) => {
    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || 'Falha ao excluir usuário');
      }

      await fetchUsers(); // Atualiza a lista
      setDeleteConfirmOpen(false);
      setUserToDelete(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir usuário');
    }
  };

  const openCreateModal = () => {
    setModalMode('create');
    setSelectedUser(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setModalMode('edit');
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const openDeleteConfirm = (user: User) => {
    setUserToDelete(user);
    setDeleteConfirmOpen(true);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  if (loading) {
    return <div className={styles.container}>Carregando...</div>;
  }

  if (error) {
    return <div className={styles.container}>Erro: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>Usuários</span>
        <div className={styles.controls}>
          <input
            type="text"
            placeholder="Buscar usuários..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value as UserType)}
            className={styles.filterSelect}
          >
            <option value="all">Todos</option>
            <option value="client">Clientes</option>
            <option value="provider">Prestadores</option>
          </select>
          <button className={styles.button} onClick={openCreateModal}>Novo Usuário</button>
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.tableCell}>ID</th>
            <th className={styles.tableCell}>Nome</th>
            <th className={styles.tableCell}>Email</th>
            <th className={styles.tableCell}>Telefone</th>
            <th className={styles.tableCell}>Tipo</th>
            <th className={styles.tableCell}>Status</th>
            <th className={styles.tableCell}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td className={styles.tableCell}>{index + 1}</td>
              <td className={styles.tableCell}>{user.name}</td>
              <td className={styles.tableCell}>{user.email}</td>
              <td className={styles.tableCell}>{user.phone}</td>
              <td className={styles.tableCell}>{user.userType}</td>
              <td className={styles.tableCell}><span className={styles.status}>{user.status}</span></td>
              <td className={styles.tableCell}>
                <button 
                  className={styles.actionButton}
                  onClick={() => openEditModal(user)}
                >
                  Editar
                </button>
                <button 
                  className={`${styles.actionButton} ${styles.deleteButton}`}
                  onClick={() => openDeleteConfirm(user)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={modalMode === 'create' ? handleCreateUser : handleEditUser}
        user={selectedUser}
        mode={modalMode}
      />

      {deleteConfirmOpen && userToDelete && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Confirmar Exclusão</h2>
              <button 
                onClick={() => setDeleteConfirmOpen(false)} 
                className={styles.closeButton}
              >
                &times;
              </button>
            </div>
            <p>Tem certeza que deseja excluir o usuário {userToDelete.name}?</p>
            <div className={styles.modalFooter}>
              <button 
                className={styles.cancelButton}
                onClick={() => setDeleteConfirmOpen(false)}
              >
                Cancelar
              </button>
              <button 
                className={`${styles.submitButton} ${styles.deleteButton}`}
                onClick={() => handleDeleteUser(userToDelete)}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
