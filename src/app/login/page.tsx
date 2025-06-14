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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false
      });

      if (result?.error) {
        setError(result.error);
        return;
      }

      // O redirecionamento será feito pelo useEffect quando a sessão for atualizada
    } catch (err) {
      console.error('Login error:', err);
      setError('Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (status === 'loading') {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Login</h2>
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isLoading}
                >
                  {isLoading ? 'Entrando...' : 'Entrar'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
