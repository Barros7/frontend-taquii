'use client';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import "./login.css";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;

    if (session?.user) {
      const userType = session.user.userType;
      console.log('Session detected:', session);

      // Se o usuário já está autenticado, redirecionar para a dashboard apropriada
      switch (userType) {
        case 'ADMIN':
          console.log('Redirecting to admin dashboard');
          router.replace('/admin/sysadmin');
          break;
        case 'PROVIDER':
          console.log('Redirecting to provider dashboard');
          router.replace('/admin/provider');
          break;
        case 'CLIENT':
          console.log('Redirecting to client area');
          router.replace('/');
          break;
        default:
          router.replace('/login');
      }
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <div>Carregando...</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!formData.email || !formData.password) {
        throw new Error('Todos os campos são obrigatórios');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Email inválido');
      }

      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container container-login">
      <div className="card">
        <div className="card-body p-5">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <div className="row">
              <div className="col-md-12 mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="E-mail"
                  required
                />
              </div>
              <div className="col-md-12 mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Senha"
                  required
                />
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="remember" />
                <label className="form-check-label" htmlFor="remember">Lembrar-me</label>
              </div>
              <a href="#" className="text-decoration-none">Esqueceu a senha?</a>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-100" 
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>

            {/*
              <div className="text-center my-3">
                <span>ou continue com</span>
              </div>

              <div className="d-flex gap-2">
                <button type="button" className="btn btn-outline-danger flex-grow-1">
                  <i className="fab fa-google me-2"></i> Google
                </button>
                <button type="button" className="btn btn-outline-primary flex-grow-1">
                  <i className="fab fa-facebook-f me-2"></i> Facebook
                </button>
              </div>
            */}

            <div className="text-center mt-3">
              Não tem uma conta? <a href="/register" className="text-decoration-none">Registre-se agora!</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
