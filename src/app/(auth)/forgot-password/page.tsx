"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/v1/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok && res.status !== 204) {
        throw new Error('Não foi possível enviar o e-mail de recuperação');
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-body p-4 p-md-5">
              <h1 className="h4 mb-3">Recuperar senha</h1>
              {sent ? (
                <div className="alert alert-success">
                  Enviamos um link de recuperação para o seu e-mail.
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">E-mail</label>
                    <input
                      id="email"
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button className="btn btn-primary w-100" disabled={loading}>
                    {loading ? 'Enviando...' : 'Enviar link'}
                  </button>
                </form>
              )}
              <div className="mt-3 text-center">
                <Link href="/login" className="text-decoration-none">Voltar ao login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


