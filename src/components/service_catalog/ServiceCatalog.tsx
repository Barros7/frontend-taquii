'use client'; // Mantemos como Client Component pois ele tem estado interno e interações do usuário

import { useEffect, useState, useCallback } from 'react'; // Adicionado useCallback
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import "./ServiceCatalog.css";
import Link from 'next/link';

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

interface IProvider {
  id: string;
  name: string;
  profileImage: string;
  addresses?: { city: string; country: string; }[];
  services?: { averageRating?: number; }[];
  // Adicione outras propriedades relevantes que vêm da sua API de provedores
}

interface ServiceCatalogProps {
  categoryName?: string; // Nome da categoria passada pelo pai (opcional)
  categoryDescription?: string; // Descrição da categoria passada pelo pai (opcional)
}

export default function ServiceCatalog({ categoryName, categoryDescription }: ServiceCatalogProps) {
  const [search, setSearch] = useState(''); // Estado para o campo de busca de texto
  const [selectedProvince, setSelectedProvince] = useState(''); // Estado para o select de província
  const [professionals, setProfessionals] = useState<IProvider[]>([]); // Estado para armazenar os profissionais
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const [error, setError] = useState<string | null>(null); // Estado para erros na busca

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
      const url = `${process.env.NEXT_PUBLIC_API_URL}/users/providers${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Erro ao buscar profissionais: ${response.statusText}`);
      }

      const data = await response.json();
      setProfessionals(data);
    } catch (error) {
      console.error('Erro ao buscar profissionais:', error);
      setError('Não foi possível carregar os profissionais. Tente novamente mais tarde.');
      setProfessionals([]); // Limpa os profissionais em caso de erro
    } finally {
      setLoading(false);
    }
  }, [search, selectedProvince, categoryName]);

  useEffect(() => {
    fetchProfessionals();
  }, [fetchProfessionals]);

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
        {loading && <p className="text-center">Carregando profissionais...</p>}
        {error && <p className="text-center text-danger">{error}</p>}
        {!loading && !error && professionals.length === 0 && (
          <p className="text-center">Nenhum profissional encontrado com os filtros aplicados.</p>
        )}
        {!loading && !error && professionals.length > 0 && (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {professionals.map((provider) => (
              <div key={provider.id} className="col">
                <div className="card h-100 shadow-sm rounded">
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex align-items-center mb-3">
                      <Image
                        src={provider.profileImage}
                        alt={provider.name}
                        height={60}
                        width={60}
                        className="rounded-circle me-3 border"
                      />
                      <h5 className="card-title h6 font-weight-bold text-primary mb-0">{provider.name}</h5>
                    </div>
                    <p className="card-text text-muted mb-2">
                      {provider.addresses?.[0]?.city}, {provider.addresses?.[0]?.country}
                    </p>
                    <div className="d-flex align-items-center mb-3">
                      <span className="text-success font-weight-bold me-2">{provider.services?.[0]?.averageRating?.toFixed(1) ?? 'N/A'} ★</span>
                      <span className="text-success small">Disponível</span>
                    </div>
                    <Link href={`/perfil/${provider.id}`} className="btn btn-primary mt-auto">
                      Agendar
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}