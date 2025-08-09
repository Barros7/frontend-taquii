"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProviderRegistrationFormPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const res = await fetch('/api/v1/users/providers/register', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ message: 'Erro ao registrar prestador' }));
        const message = (data as { message?: string }).message || 'Erro ao registrar prestador';
        throw new Error(message);
      }

      setSuccess('Registro enviado com sucesso! Aguarde validação.');
      form.reset();

      // Se já existir sessão (token), redirecionar para dashboard do prestador
      try {
        const me = await fetch('/api/v1/auth/me', { credentials: 'include' });
        if (me.ok) {
          const meData = await me.json();
          if (meData?.userType === 'PROVIDER') {
            router.push('/admin/provider');
          }
        }
      } catch {}
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar registro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Registro de Prestador</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Nome</label>
            <input name="name" className="form-control" required />
          </div>
          <div className="col-md-6">
            <label className="form-label">E-mail</label>
            <input type="email" name="email" className="form-control" required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Telefone</label>
            <input name="phone" className="form-control" required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Senha</label>
            <input type="password" name="password" className="form-control" required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Número de BI/Passaporte</label>
            <input name="documentNumber" className="form-control" />
          </div>
          <div className="col-md-6">
            <label className="form-label">NIF</label>
            <input name="nifNumber" className="form-control" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Quantidade de Funcionários</label>
            <input type="number" name="employeeCount" className="form-control" min={0} />
          </div>
          <div className="col-md-6">
            <label className="form-label">É Empresa?</label>
            <select name="isCompany" className="form-select" defaultValue="false">
              <option value="false">Não</option>
              <option value="true">Sim</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Foto de Perfil</label>
            <input type="file" name="profileImage" className="form-control" accept="image/*" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Certidão Comercial (apenas empresa)</label>
            <input type="file" name="commercialCertificate" className="form-control" accept="image/*,.pdf" />
          </div>

          <div className="col-12">
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar Registro'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}


