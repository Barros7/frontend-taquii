import Link from "next/link";
import React from 'react';

const Header: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom py-3">
      <div className="container">
        {/* Brand/Logo */}
        <Link href="/" className="navbar-brand text-primary fw-bold">
          Taquii!
        </Link>

        {/* Botão Toggler (Hambúrguer) para telas pequenas */}
        {/* data-bs-toggle e data-bs-target controlam o colapso */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav" // ID do elemento que será colapsado
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Conteúdo que será colapsado (Links de Navegação) */}
        {/* Adicione w-100 para que o menu colapsado ocupe a largura total se necessário */}
        <div className="collapse navbar-collapse w-100" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center"> {/* ms-auto para alinhar à direita */}
            <li className="nav-item">
              <Link href={'/'} className="nav-link text-dark text-decoration-none">Home</Link>
            </li>
            <li className="nav-item">
              <Link href={'/#servicos'} className="nav-link text-dark text-decoration-none">Serviços</Link>
            </li>
            <li className="nav-item">
              <Link href={'/#planos'} className="nav-link text-dark text-decoration-none">Planos</Link>
            </li>
            <li className="nav-item">
              <Link href={'/#faqs'} className="nav-link text-dark text-decoration-none">FAQ</Link> {/* Ajustei para #faq */}
            </li>
            <li className="nav-item">
              <Link href={'/#contatos'} className="nav-link text-dark text-decoration-none">Contato</Link> {/* Ajustei para #contato */}
            </li>
            {/* O link Entrar como botão */}
            <li className="nav-item">
              <Link href={'/login'} className="btn btn-primary ms-lg-3">Entrar</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;