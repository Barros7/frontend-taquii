"use client";
import React, { useEffect, useState } from "react";
import styles from "../services/services.module.css";

interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/categories", { credentials: "include" });
      if (!response.ok) throw new Error("Erro ao buscar categorias");
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setEditId(category.id);
      setFormData({
        name: category.name,
        description: category.description || ''
      });
    } else {
      setEditId(null);
      setFormData({ name: '', description: '' });
    }
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormError(null);
    setEditId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setCreating(true);
    try {
      if (!formData.name) {
        setFormError('O nome da categoria é obrigatório.');
        setCreating(false);
        return;
      }
      const payload = {
        name: formData.name,
        description: formData.description || undefined
      };
      let response;
      if (editId) {
        response = await fetch(`/api/categories/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(payload)
        });
      } else {
        response = await fetch('/api/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(payload)
        });
      }
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || 'Erro ao salvar categoria');
      }
      await fetchCategories();
      setIsModalOpen(false);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setCreating(false);
      setEditId(null);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    setDeleteError(null);
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || 'Erro ao deletar categoria');
      }
      await fetchCategories();
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>Categorias</span>
        <button className={styles.button} onClick={() => handleOpenModal()}>Nova Categoria</button>
      </div>
      {loading ? (
        <div>Carregando...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>
                  <button className={styles.editButton} onClick={() => handleOpenModal(category)}>
                    Editar
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => {
                      if (window.confirm('Tem certeza que deseja excluir esta categoria?')) handleDelete(category.id);
                    }}
                    disabled={deletingId === category.id}
                  >
                    {deletingId === category.id ? 'Excluindo...' : 'Excluir'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>{editId ? 'Editar Categoria' : 'Nova Categoria'}</h2>
              <button onClick={handleCloseModal} className={styles.closeButton}>×</button>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="description">Descrição</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              {formError && <div style={{ color: 'red', marginBottom: 8 }}>{formError}</div>}
              <div className={styles.formActions}>
                <button type="button" onClick={handleCloseModal} className={styles.cancelButton} disabled={creating}>
                  Cancelar
                </button>
                <button type="submit" className={styles.saveButton} disabled={creating}>
                  {creating ? (editId ? 'Salvando...' : 'Criando...') : (editId ? 'Salvar' : 'Criar')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {deleteError && <div style={{ color: 'red', marginTop: 8 }}>{deleteError}</div>}
    </div>
  );
} 