'use client';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import "./ServiceCatalog.css"
import Link from 'next/link';

const categories = [
    'Saúde',
    'Educação',
    'Beleza Feminina',
    'Hotelaria',
    'Rent a Car',
    'Serviços Técnicos e Reparações',
    'Casa e Decoração',
    'Eventos e Entretenimento',
    'Consultoria e Serviços Profissionais'
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
];

export default function ServiceCatalog() {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');

  return (
    <section className="container">
        <div className="p-4 max-w-7xl mx-auto">
            <h2 className="text-lg text-gray-700">Olá,</h2>
            <p className="text-blue-600 font-semibold mb-6">
                Evite filas, pague de forma fácil, taqui o serviço que procuras!
            </p>
            {/* Filtros de busca */}
            <div className="bg-white p-4 rounded-md shadow-sm border mb-4">
                <div className="flex flex-wrap gap-4 mb-3">
                <input
                    type="text"
                    placeholder="🔍 Procurar por empresa ou profissional"
                    className="flex-1 px-3 py-2 border rounded-md w-full md:w-auto"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Localização"
                    className="px-3 py-2 border rounded-md"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                </div>

                <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                    <button key={cat} className="px-3 py-1 border rounded-md bg-gray-100 hover:bg-blue-100 text-sm">
                    {cat}
                    </button>
                ))}
                </div>
            </div>

            {/* Lista de profissionais */}
            <div className="row">
                {professionals.map((pro) => (
                <div key={pro.id} className="profissional-card col-3 border p-4 rounded-md shadow-sm">
                    <div className="row container-logo-and-title">
                        <div className="col-4">
                            <Image src={pro.image} alt={pro.name} height={75} width={75} className="rounded-full mb-3" />
                        </div>
                        <div className="col-8">
                            <h4 className="card-title font-semibold text-blue-800">{pro.name}</h4>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600">{pro.location}</p>
                    <span className="text-green-600 font-bold mt-2 me-2 text-success">{pro.rating}</span>
                    <span className="text-green-500 text-sm text-success">Disponível</span>
                    <Link href={"/perfil"} className="btn btn-primary w-100 mt-3 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Agendar
                    </Link>
                </div>
                ))}
            </div>
        </div>
    </section>
  );
}
