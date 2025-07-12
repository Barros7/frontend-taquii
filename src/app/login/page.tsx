'use client';
import React, { useEffect, useState, Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Spinner } from '@/components/Spinner';
import "./login.css";
import Header from '@/components/header/Header';

function LoginForm() {
  const { login, user, error, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams?.get('next');

  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });
  const [formError, setFormError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (user) {
      if (next) {
        router.replace(next);
      } else {
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
    
    // Validação básica
    if (!formData.phone.trim()) {
      setFormError('Telefone é obrigatório');
      return;
    }
    
    if (!formData.password) {
      setFormError('Senha é obrigatória');
      return;
    }
    
    setIsLoggingIn(true);
    try {
      const success = await login(formData.phone, formData.password);
      console.log(success);
      if (!success) {
        setFormError('Telefone ou Palavra-passe inválidos!');
      }
    } catch {
      setFormError('Erro ao tentar fazer login.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      <Header />
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
                    <label htmlFor="phone" className="form-label">Telefone</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      placeholder="Digite seu número de telefone"
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
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? <Spinner /> : 'Entrar'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        
        {/* Modal de Loading */}
        {loading && (
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 9999
            }}
          >
            <div 
              style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                textAlign: 'center'
              }}
            >
              <Spinner />
              <p className="mt-3 text-muted mb-0">Carregando...</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <LoginForm />
    </Suspense>
  );
}
