'use client';

import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import "./ServiceCatalog.css";
import Link from 'next/link';

// Importe um ícone de localização se estiver a usar uma biblioteca de ícones com foco em Bootstrap/CSS
// Se usar react-icons (ainda compatível com Bootstrap), pode manter:
// import { FaMapMarkerAlt } from 'react-icons/fa';
// Se não, pode precisar de uma fonte de ícones CSS como Font Awesome e referenciá-la no <head> do seu layout.
// Para este exemplo, vamos assumir que pode usar algo como <i class="bi bi-geo-alt"></i> se usar Bootstrap Icons.
// Ou simplesmente usar texto ou um emoji '📍'. Vamos usar um emoji simples no placeholder e texto no botão.

const categories = [
    'Saúde',
    'Educação',
    'Beleza Feminina',
    'Hotelaria',
    'Rent a Car',
    'Serviços Técnicos e Reparações',
    'Casa e Decoração',
    'Eventos e Entretenimento',
    'Consultoria'
];

// Lista das províncias de Angola
const angolanProvinces = [
  'Bengo',
  'Benguela',
  'Bié',
  'Cabinda',
  'Cuando Cubango',
  'Cuanza Norte',
  'Cuanza Sul',
  'Cunene',
  'Huambo',
  'Huíla',
  'Lunda Norte',
  'Lunda Sul',
  'Malanje',
  'Moxico',
  'Namibe',
  'Uíge',
  'Zaire',
  'Luanda',
];

const professionals = [
    {
        id: 1,
        name: 'Salão de Beleza JC Bongadas',
        location: 'Salão de Beleza, Benguela',
        rating: 4.5,
        available: true,
        image: '/logo/jc_salao_de_beleza_logo.png',
    },
    {
        id: 2,
        name: 'J2B CODE - Consultoria de TI',
        location: 'Empresa de Tecnologia, Benguela',
        rating: 4.9,
        available: true,
        image: '/logo/j2b_code_logo.png',
    },
    {
        id: 3,
        name: 'Munga Space - Manicure e Pedicure',
        location: 'Serviços de Unhas, Benguela',
        rating: 4.5,
        available: true,
        image: '/logo/munga_space_logo.png',
    },
    {
        id: 4,
        name: 'Munga Space - Manicure e Pedicure',
        location: 'Serviços de Unhas, Benguela',
        rating: 4.5,
        available: true,
        image: '/logo/munga_space_logo.png',
    },
    // Adicione mais profissionais conforme necessário
];

export default function ServiceCatalog() {
    const [search, setSearch] = useState('');
    //const [userLocation, setUserLocation] = useState<UserLocation | null>(null); // Para armazenar a localização do usuário
    const [selectedProvince, setSelectedProvince] = useState(''); // Estado para a província selecionada

    return (
        <section className="container my-4"> {/* container e my-4 do Bootstrap */}
            <div className="px-4"> {/* px-4 para padding horizontal */}
                 {/* Removido max-w-7xl mx-auto, o container já centraliza */}
                <h2 className="h4 text-secondary">Olá!</h2> {/* h4 e text-secondary do Bootstrap */}
                <p className="text-primary font-weight-medium mb-4"> {/* text-primary, font-weight-medium, mb-4 do Bootstrap */}
                    Evite filas, pague de forma fácil, taqui o serviço que procuras!
                </p>

                {/* Filtros de busca */}
                {/* Adicionado classes Bootstrap para card-like appearance */}
                <div className="card mb-4 shadow-sm"> {/* card, mb-4, shadow-sm do Bootstrap */}
                    <div className="card-body"> {/* card-body do Bootstrap */}
                        {/* Layout responsivo para inputs com Bootstrap flexbox */}
                        <div className="d-flex flex-column flex-md-row gap-3 mb-3 align-items-center">
                            <input
                                type="text"
                                placeholder="🔍 Procurar por empresa ou profissional"
                                className="form-control flex-grow-1" // form-control e flex-grow-1 do Bootstrap
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            {/* Select para as províncias */}
                            <select
                                className="form-select w-50" // Classe Bootstrap para selects estilizados
                                value={selectedProvince}
                                onChange={(e) => setSelectedProvince(e.target.value)}
                            >
                                <option value="">Selecionar Província</option> {/* Opção padrão */}
                                {angolanProvinces.map((province) => (
                                    <option key={province} value={province}>
                                        {province}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Categoria buttons - usando flexbox e gap do Bootstrap */}
                        <div className="d-flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button key={cat} className="btn btn-outline-secondary btn-sm"> {/* Classes de botão e tamanho do Bootstrap */}
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Lista de profissionais */}
                {/* Usando o sistema de grid responsivo do Bootstrap */}
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4"> {/* row-cols-* e g-4 do Bootstrap */}
                    {professionals.map((pro) => (
                        <div key={pro.id} className="col"> {/* Cada card é uma coluna */}
                             {/* Card de Profissional com classes Bootstrap */}
                            <div className="card h-100 shadow-sm rounded"> {/* card, h-100, shadow-sm, rounded do Bootstrap */}
                                <div className="card-body d-flex flex-column"> {/* card-body, d-flex, flex-column do Bootstrap */}
                                    <div className="d-flex align-items-center mb-3"> {/* d-flex, align-items-center, mb-3 do Bootstrap */}
                                        <Image
                                            src={pro.image}
                                            alt={pro.name}
                                            height={60}
                                            width={60}
                                            className="rounded-circle me-3 border" // rounded-circle, me-3, border do Bootstrap
                                        />
                                        <h5 className="card-title h6 font-weight-bold text-primary mb-0">{pro.name}</h5> {/* card-title, h6, font-weight-bold, text-primary, mb-0 do Bootstrap */}
                                    </div>
                                    <p className="card-text text-muted mb-2"> {/* card-text, text-muted, mb-2 do Bootstrap */}
                                        {pro.location}
                                    </p>
                                    <div className="d-flex align-items-center mb-3"> {/* d-flex, align-items-center, mb-3 do Bootstrap */}
                                        <span className="text-success font-weight-bold me-2">{pro.rating} ★</span> {/* text-success, font-weight-bold, me-2 do Bootstrap */}
                                        <span className="text-success small">Disponível</span> {/* text-success, small do Bootstrap */}
                                    </div>
                                    {/* Botão Agendar empurrado para baixo */}
                                    <Link href={`/perfil/`} className="btn btn-primary mt-auto"> {/* btn, btn-primary, mt-auto do Bootstrap */}
                                        Agendar
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}