'use client';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <h5 className="text-center mb-4">Taqui a Sua Solução!</h5>
        <form>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">Telefone</label>
            <div className="input-group">
              <input type="tel" className="form-control" id="phoneNumber" placeholder="Introduz o número de telefone" required />
              <span className="input-group-text">
                <i className="fas fa-envelope" aria-hidden="true"></i>
              </span>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="email">E-mail</label>
            <div className="input-group">
              <input type="email" className="form-control" id="email" placeholder="Introduz o seu endereço de E-mail" required />
              <span className="input-group-text">
                <i className="fas fa-envelope" aria-hidden="true"></i>
              </span>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder=""
                required
              />
              <span className="input-group-text password-toggle" onClick={togglePasswordVisibility} role="button" aria-label="Toggle password visibility">
                <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </span>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">Registar</button>

          <div className="text-center mt-3">
            Já tem uma conta? <a href="/login" className="text-decoration-none">Entrar agora!</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
