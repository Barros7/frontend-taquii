import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="w-100 py-3 d-flex justify-content-between align-items-center px-4 border-bottom">
        <h2 className="text-primary fw-bold">Taqui!</h2>
        <nav>
            <Link href={'/'} className="me-3 text-dark text-decoration-none">Home</Link>
            <Link href={'/planos'} className="me-3 text-dark text-decoration-none">Planos</Link>
            <Link href={'/perguntas-frequentes'} className="me-3 text-dark text-decoration-none">FAQ</Link>
            <Link href={'/contato'} className="me-3 text-dark text-decoration-none">Contato</Link>
            <Link href={'/login'} className="btn btn-primary">Entrar</Link>
        </nav>
    </header>
  );
};

export default Header;
