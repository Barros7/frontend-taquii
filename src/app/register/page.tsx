'use client';

import React, { useState } from 'react';
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
    setErrors({});
    setIsLoading(true);


    // Validação de campos obrigatórios
    if (!formData.name.trim()) {
      throw new Error('Nome é obrigatório');
    }
    
    if (!formData.email.trim()) {
      throw new Error('Email é obrigatório');
    }
    
    if (!formData.phone.trim()) {
      throw new Error('Telefone é obrigatório');
    }
    
    if (!formData.password) {
      throw new Error('Senha é obrigatória');
    }
    
    if (!formData.confirmPassword) {
      throw new Error('Confirmação de senha é obrigatória');
    }

    // Validação de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      throw new Error('Email inválido');
    }

    // Validação de tamanho mínimo da senha
    if (formData.password.length < 6) {
      throw new Error('A senha deve ter pelo menos 6 caracteres');
    }

    // Validação de confirmação de senha
    if (formData.password !== formData.confirmPassword) {
      throw new Error('As senhas não coincidem');
    }

    // Validação de tamanho mínimo do nome
    if (formData.name.trim().length < 3) {
      throw new Error('O nome deve ter pelo menos 3 caracteres');
    }

    const userData = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    try {
      const res = await fetch(`/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('Register failed:', data);
        const errorMessage = data.message || data.error || 'Erro ao fazer o registro';
        throw new Error(errorMessage);
      }

      if (data.user) {
        console.log('Register successful, user data:', data.user);
        // Redirecionar para login após registro bem-sucedido
        router.push('/login?message=Registro realizado com sucesso! Faça login para continuar.');
      }
          } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer o registro';
        setErrors({ general: errorMessage });
      } finally {
        setIsLoading(false);
      }
  };

  return (
    <div className="container container-register my-5">
      <div className="card">
        <div className="card-body p-5">
          <h2 className="text-center mb-4">Registrar</h2>
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
              Já tem uma conta? <a href="/login" className="text-decoration-none">Entre agora!</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm; 