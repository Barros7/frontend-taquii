'use client';

import { useEffect, useState, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ServiceCatalog.css";
import ServiceCatalogSkeleton from '../service_catalog_skeleton/ServiceCatalogSkeleton';
import ServiceCard from './ServiceCard';

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

interface Address {
  id: string;
  name: string;
  street: string;
  number: string | null;
  complement: string | null;
  neighborhood: string | null;
  city: string;
  state: string;
  country: string;
  postalCode: string | null;
  latitude: number | null;
  longitude: number | null;
}

interface GalleryImage {
  id: string;
  imageUrl: string;
  caption?: string;
  providerId: string;
}

interface ServiceCategory {
  category: {
    id: string;
    name: string;
  };
}

interface Service {
  id: string;
  imageUrlService?: string | null;
  title: string;
  description: string;
  duration: number;
  price: number;
  averageRating?: number;
  categories?: ServiceCategory[];
}

interface IProvider {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  profileImage: string;
  galleryImages?: GalleryImage[];
  addresses?: Address[];
  services?: Service[];
}

interface ServiceCatalogProps {
  categoryName?: string;
  categoryDescription?: string;
}

export default function ServiceCatalog({ categoryName, categoryDescription }: ServiceCatalogProps) {
  const [search, setSearch] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [professionals, setProfessionals] = useState<IProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const MOCK_PROFESSIONALS: IProvider[] = [
    {
      id: '1',
      name: 'Barbearia Classic',
      email: 'classic@barbearia.com',
      phone: '+244 912 345 678',
      profileImage: '/barber.webp',
      galleryImages: [
        {
          id: 'g1',
          imageUrl: '/barber.webp',
          caption: 'Corte clássico',
          providerId: '1',
        },
        {
          id: 'g2',
          imageUrl: '/beauty.png',
          caption: 'Barba desenhada',
          providerId: '1',
        },
      ],
      addresses: [
        {
          id: 'a1',
          name: 'Barbearia Classic',
          street: 'Rua Principal',
          number: '123',
          complement: null,
          neighborhood: 'Centro',
          city: 'Luanda',
          state: 'Luanda',
          country: 'Angola',
          postalCode: '1000',
          latitude: null,
          longitude: null,
        },
      ],
      services: [
        {
          id: 's1',
          imageUrlService: '/barber.webp',
          title: 'Corte Masculino',
          description: 'Corte clássico e moderno',
          duration: 1,
          price: 5000,
          averageRating: 4.8,
          categories: [
            { category: { id: 'c1', name: 'Barbearia' } },
          ],
        },
        {
          id: 's2',
          imageUrlService: '/beauty.png',
          title: 'Barba Completa',
          description: 'Barba desenhada e aparada',
          duration: 1,
          price: 7000,
          averageRating: 4.7,
          categories: [
            { category: { id: 'c2', name: 'Barba' } },
          ],
        },
      ],
    },
    {
      id: '2',
      name: 'Salão Beleza VIP',
      email: 'vip@beleza.com',
      phone: '+244 987 654 321',
      profileImage: '/beauty.png',
      galleryImages: [
        {
          id: 'g3',
          imageUrl: '/beauty.png',
          caption: 'Cabelo e maquiagem',
          providerId: '2',
        },
        {
          id: 'g4',
          imageUrl: '/photo.jpg',
          caption: 'Transformação',
          providerId: '2',
        },
      ],
      addresses: [
        {
          id: 'a2',
          name: 'Salão Beleza VIP',
          street: 'Av. das Flores',
          number: '456',
          complement: 'Sala 2',
          neighborhood: 'Centro',
          city: 'Benguela',
          state: 'Benguela',
          country: 'Angola',
          postalCode: '2000',
          latitude: null,
          longitude: null,
        },
      ],
      services: [
        {
          id: 's3',
          imageUrlService: '/beauty.png',
          title: 'Maquiagem Profissional',
          description: 'Maquiagem para eventos e festas',
          duration: 2,
          price: 10000,
          averageRating: 4.9,
          categories: [
            { category: { id: 'c3', name: 'Maquiagem' } },
          ],
        },
      ],
    },
    {
      id: '3',
      name: 'PetShop Miau',
      email: 'contato@miau.com',
      phone: '+244 999 888 777',
      profileImage: '/petshops.webp',
      galleryImages: [
        {
          id: 'g5',
          imageUrl: '/petshops.webp',
          caption: 'Banho e tosa',
          providerId: '3',
        },
        {
          id: 'g6',
          imageUrl: '/main.svg',
          caption: 'Produtos para pets',
          providerId: '3',
        },
      ],
      addresses: [
        {
          id: 'a3',
          name: 'PetShop Miau',
          street: 'Rua dos Animais',
          number: '789',
          complement: null,
          neighborhood: 'Bairro Novo',
          city: 'Huambo',
          state: 'Huambo',
          country: 'Angola',
          postalCode: '3000',
          latitude: null,
          longitude: null,
        },
      ],
      services: [
        {
          id: 's4',
          imageUrlService: '/petshops.webp',
          title: 'Banho e Tosa',
          description: 'Cuidados completos para seu pet',
          duration: 1,
          price: 8000,
          averageRating: 4.6,
          categories: [
            { category: { id: 'c4', name: 'Petshop' } },
          ],
        },
      ],
    },
  ];

  const fetchProfessionals = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Constrói a URL da API com base nos filtros
      const params = new URLSearchParams();

      if (search) {
        params.append('search', search);
      }
      if (selectedProvince) {
        params.append('city', selectedProvince);
      }
      if (categoryName) {
        params.append('categoryName', categoryName);
      }

      // Constrói a URL final
      const queryString = params.toString();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const url = `${apiUrl}/api/users/providers${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Erro ao buscar profissionais: ${response.statusText}`);
      }

      const data = await response.json();
      setProfessionals(data);
    } catch (error) {
      console.error('Erro ao buscar profissionais:', error);
      setError('Não foi possível carregar os profissionais. Tente novamente mais tarde.');
      setProfessionals([]);
    } finally {
      setLoading(false);
    }
  }, [search, selectedProvince, categoryName]);

  useEffect(() => {
    fetchProfessionals();
  }, [fetchProfessionals]);

  // Se não houver dados da API, mostra mock
  const displayProfessionals = professionals.length > 0 ? professionals : MOCK_PROFESSIONALS;

  return (
    <section className="container my-4">
      <div className="px-4">
        {/* Renderiza o nome e a descrição da categoria se existirem */}
        {categoryName && <h2 className="h4 text-primary">{categoryName}</h2>}
        {categoryDescription && <p className="text-secondary mb-4">{categoryDescription}</p>}

        {/* Se não houver categoryName, exibe a saudação padrão */}
        {!categoryName && (
          <>
            <h2 className="h4 text-secondary">Olá!</h2>
            <p className="text-primary font-weight-medium mb-4">
              Evite filas, pague de forma fácil, taqui o serviço que procuras!
            </p>
          </>
        )}

        {/* Filtros de busca */}
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <div className="d-flex flex-column flex-md-row gap-3 mb-3 align-items-center">
              <input
                type="text"
                placeholder="🔍 Procurar por empresa ou profissional"
                className="form-control flex-grow-1"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="form-select w-50"
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
              >
                <option value="">Selecionar Província</option>
                {angolanProvinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub-categorias (pode ser ajustado para filtrar também, se desejar) */}
            {/* Por enquanto, mantido como botões simples, sem lógica de filtro */}
            {/* Se quiser que eles filtrem, você precisaria de um estado para a sub-categoria selecionada */}
            {/* e adicioná-la aos parâmetros da URL no fetchProfessionals */}
            {/*
              <div className="d-flex flex-wrap gap-2">
                  {subCategories.map((cat) => (
                      <button key={cat} className="btn btn-outline-secondary btn-sm">
                          {cat}
                      </button>
                  ))}
              </div>
            */}
          </div>
        </div>

        {/* Lista de profissionais */}
        {loading && <ServiceCatalogSkeleton categoryName={categoryName} categoryDescription={categoryDescription} />}
        {error && <p className="text-center text-danger">{error}</p>}
        {!loading && !error && displayProfessionals.length === 0 && (
          <p className="text-center">Nenhum profissional encontrado com os filtros aplicados.</p>
        )}
        {!loading && !error && displayProfessionals.length > 0 && (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {displayProfessionals.map((provider) => (
              <div key={provider.id} className="col">
                <ServiceCard provider={provider} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}