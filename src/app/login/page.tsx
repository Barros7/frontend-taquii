'use client';
import React, { useEffect, useState, Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import "./login.css";

function LoginForm() {
  const { login, user, error, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams?.get('next');

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (user) {
      if (next) {
        router.replace(next);
      } else {
        // fluxo padrão por tipo de usuário
        switch (user.userType) {
          case 'ADMIN':
            router.replace('/admin/sysadmin');
            break;
          case 'PROVIDER':
            router.replace('/admin/provider');
            break;
          case 'USER':
            router.replace('/');
            break;
          default:
            router.replace('/login');
        }
      }
    }
  }, [user, router, next]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    try {
      const success = await login(formData.email, formData.password);
      if (!success) {
        setFormError('E-mail ou Palavra-passe inválidos!');
      }
    } catch {
      setFormError('Erro ao tentar fazer login.');
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Login</h2>
              {(formError || error) && (
                <div className="alert alert-danger" role="alert">
                  {formError || error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Senha</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Entrando...' : 'Entrar'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <LoginForm />
    </Suspense>
  );
}
