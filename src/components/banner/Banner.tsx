import Image from 'next/image';
import "./Banner.css";
import Link from 'next/link';

export default function Banner() {
  return (
    <section>
        <div className="banner banner-logo-consulting">
            <Image
                src="/banner/banner_j2bcode_logo.png"
                alt="Consultoria de Tecnologia da Informação"
                height={1000}
                width={1000}
                className="object-fit-cover"
            />
        </div>
        <div>
            <nav className="nav nav-pills nav-justified bg-dark text-white py-2">
                <Link className="nav-link text-white" href="#sobre">Sobre</Link>
                <Link className="nav-link active bg-primary" href="#servicos">Serviços</Link>
                <Link className="nav-link text-white" href="#galeria">Galeria</Link>
                <Link className="nav-link text-white" href="#contactos">Contactos</Link>
            </nav>
        </div>
    </section>
  );
}
