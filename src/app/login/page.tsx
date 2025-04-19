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
            <div className="input-group">
              <input type="email" className="form-control" id="email" placeholder="E-mail" required />
              <span className="input-group-text">
                <i className="fas fa-envelope" aria-hidden="true"></i>
              </span>
            </div>
          </div>

          <div className="mb-3">
              <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder="Password"
                required
              />
              <span className="input-group-text password-toggle" onClick={togglePasswordVisibility} role="button" aria-label="Toggle password visibility">
                <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </span>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="remember" />
              <label className="form-check-label" htmlFor="remember">Lembrar-me</label>
            </div>
            <a href="#" className="text-decoration-none">Esqueceu a password?</a>
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">Entrar</button>

          <div className="text-center my-3">
            <span>ou continua com</span>
          </div>

          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-outline-danger w-100 me-2">
              <i className="fab fa-google"></i> Google
            </button>
            <button type="button" className="btn btn-outline-primary w-100 ms-2">
              <i className="fab fa-facebook-f"></i> Facebook
            </button>
          </div>

          <div className="text-center mt-3">
            Não tem uma conta? <a href="/register" className="text-decoration-none">Registar agora!</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
