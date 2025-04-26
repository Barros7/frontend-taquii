import Link from "next/link";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header: React.FC = () => {
  return (
    // Use a tag <nav> sem container-fluid e w-100, o navbar já cuida disso
    // navbar-expand-lg: expande a navegação acima do breakpoint 'lg'
    // bg-light: Opcional, adiciona um fundo claro
    // border-bottom: Mantém a borda inferior
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      {/* Use container em vez de container-fluid para melhor alinhamento com o conteúdo da página */}
      <div className="container">
        {/* Brand/Logo */}
        {/* Use Link ou <a> para o logo conforme necessário. navbar-brand adiciona padding e styling */}
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
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center"> {/* ms-auto para alinhar à direita */}
            <li className="nav-item">
              <Link href={'/'} className="nav-link text-dark text-decoration-none">Home</Link>
            </li>
            <li className="nav-item">
              {/* Certifique-se de que os IDs das seções na página correspondem aos hashes */}
              <Link href={'/#planos'} className="nav-link text-dark text-decoration-none">Planos</Link>
            </li>
            <li className="nav-item">
              <Link href={'/#faq'} className="nav-link text-dark text-decoration-none">FAQ</Link> {/* Ajustei para #faq */}
            </li>
            <li className="nav-item">
              <Link href={'/#contato'} className="nav-link text-dark text-decoration-none">Contato</Link> {/* Ajustei para #contato */}
            </li>
            {/* O link Entrar como botão */}
            <li className="nav-item">
               {/* Adicione um pouco de margem à esquerda no lg para separar do último link */}
              <Link href={'/login'} className="btn btn-primary ms-lg-3">Entrar</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;