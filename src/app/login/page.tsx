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
  const callbackUrl = searchParams?.get('callbackUrl');

  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });
  const [formError, setFormError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {   
    if (user) {      
      if (callbackUrl) {
        router.replace(callbackUrl);
      } else {
        switch (user.userType) {
          case 'ADMIN':
            router.replace('/admin/sysadmin');
            break;
          case 'PROVIDER':
            router.replace('/admin/provider');
            break;
          case 'CUSTOMER':
            router.replace('/');
            break;
          default:
            router.replace('/login');
        }
      }
    } else {
      console.log('LoginPage: no user, not redirecting');
    }
  }, [user, router, callbackUrl]);

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
                      placeholder="Digite seu telefone"
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
                      placeholder="Digite sua senha"
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
                  <div className="text-center mt-3 d-flex flex-column gap-2">
                    <a href="/forgot-password" className="text-decoration-none">Esqueci minha senha</a>
                    <span>
                      Não tem uma conta? <a href="/register" className="text-decoration-none">Faça o registo aqui!</a>
                    </span>
                  </div>
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
             <Spinner />
          </div>
        )}
      </div>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <LoginForm />
    </Suspense>
  );
}
