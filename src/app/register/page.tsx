'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import "./register.css";

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Limpar erro geral automaticamente após 5 segundos
  useEffect(() => {
    if (errors.general) {
      const timer = setTimeout(() => {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.general;
          return newErrors;
        });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errors.general]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro do campo quando o usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorDetail = await response.json().catch(() => ({ message: response.statusText || 'Erro desconhecido' }));
        throw new Error(errorDetail.message || 'Erro ao registrar');
      }

      const result = await response.json();
      
      // Mostrar mensagem de sucesso e redirecionar para login
      setSuccessMessage(result.message || 'Registro realizado com sucesso!');
      
      // Redirecionar para login após 2 segundos
      setTimeout(() => {
        router.push('/login?message=' + encodeURIComponent('Registro realizado com sucesso! Faça login para continuar.'));
      }, 2000);

    } catch (err: unknown) {
      setErrors({ general: err instanceof Error ? err.message : 'Erro ao registrar' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container container-register my-5">
      <div className="card">
        <div className="card-body p-5">
          <h2 className="text-center mb-4">Registrar</h2>
          
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {errors.general && (
              <div className="alert alert-danger" role="alert">
                {errors.general}
              </div>
            )}

            <div className="row">
              <div className="col-md-12 mb-3">
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nome de utilizador"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  required
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>
              <div className="col-md-5 mb-3">
                <input
                  type="tel"
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Telefone"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  required
                />
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
              </div>
              <div className="col-md-7 mb-3">
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="E-mail"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  required
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Senha"
                  autoComplete="new-password"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  required
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="password"
                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirmar senha"
                  autoComplete="new-password"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  required
                />
                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                <span 
                  className="input-group-text" 
                  onClick={togglePasswordVisibility} 
                  role="button" 
                  style={{ cursor: 'pointer' }}
                >
                  <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </span>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-100" 
              disabled={isLoading}
            >
              {isLoading ? 'Registrando...' : 'Registrar'}
            </button>
            <div className="text-center mt-3">
              Já tem uma conta? <a href="/login" className="text-decoration-none">Faça o Login aqui!</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm; 