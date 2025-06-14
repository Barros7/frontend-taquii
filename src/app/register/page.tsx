'use client';

import React, { useState } from 'react';
import "./register.css";

const RegisterForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState('');
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);


    if (!formData.email || !formData.password) {
      throw new Error('Todos os campos são obrigatórios');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      throw new Error('Email inválido');
    }

    const userData = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    try {
      const res = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('Register failed:', data);
        throw new Error('Credenciais inválidas');
      }

      if (data.user) {
        console.log('Register successful, user data:', data.user);
      }
      
      return null;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer o registro');
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
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <div className="row">
              <div className="col-md-12 mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nome de utilizador"
                  required
                />
              </div>
              <div className="col-md-5 mb-3">
                <input
                  type="phone"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Telefone"
                  required
                />
              </div>
              <div className="col-md-7 mb-3">
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
              <div className="col-md-6 mb-3">
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
              <div className="col-md-6 mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirmar senha"
                  required
                />
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
              Já tem uma conta? <a href="/login" className="text-decoration-none">Entre agora!</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm; 