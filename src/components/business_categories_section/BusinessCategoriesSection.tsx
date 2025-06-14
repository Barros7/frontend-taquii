// components/BusinessCategoriesSection.tsx (ou o nome do seu arquivo)
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './BusinessCategoriesSection.css';

interface Category {
  id: string;
  name: string;
  description?: string;
  iconUrl?: string;
}

const BusinessCategoriesSection = async () => {
  let categories: Category[] = [];
  const apiUrl = process.env.API_BASE_URL || 'http://localhost:8000';

  try {
    const response = await fetch(`${apiUrl}/api/categories`, {
      cache: 'no-store', // Garante que os dados sejam sempre buscados e não cacheados pelo Next.js (útil durante o desenvolvimento)
      // next: { revalidate: 3600 } // Opcional: Revalidar a cada hora em produção
    });

    if (!response.ok) {
      console.error(`Erro ao buscar categorias: ${response.status} ${response.statusText}`);
      // Lançar um erro aqui faria com que o Next.js renderizasse um error.tsx se você o tiver.
      // throw new Error(`Failed to fetch categories: ${response.statusText}`);
    } else {
      categories = await response.json();
    }
  } catch (error) {
    console.error('Erro de rede ou busca de categorias:', error);
    // Em caso de erro de rede, categories permanecerá como um array vazio,
    // ou você pode retornar um componente de fallback.
  }

  return (
    <section id="servicos" className='container section-business-category text-center'>
      <h2 className={"title"}>Para todo tipo de empresa</h2>
      <p className={"subtitle"}>Temos a solução para todo tipo de estabelecimento</p>
      <div className='row py-3'>
        {categories.length > 0 ? (
          categories.map((category) => ( // Removido 'idx' pois 'category.id' é mais estável como key
            <div className="col-4 col-sm-2 col-md-2 py-2" key={category.id}>
              <Link
                href={`/empresas?search=${encodeURIComponent(category.name)}`}
                className="hiperlink card card-custom d-flex flex-column align-items-center justify-content-center"
              >
                {category.iconUrl && ( // Usamos iconUrl. Certifique-se de que sua API fornece isso.
                  <Image
                    height={100}
                    width={100}
                    src={category.iconUrl}
                    alt={category.name}
                    className="card-img-top image-product mb-3"
                    style={{ maxWidth: '50%', overflow: 'hidden' }}
                  />
                )}
                {/* Se a API não fornecer iconUrl, você pode ter um fallback ou usar um ícone genérico */}
                {!category.iconUrl && (
                  <div className="placeholder-icon mb-3">
                    {/* Exemplo de ícone de fallback ou texto */}
                    <span style={{ fontSize: '2em' }}>💼</span>
                  </div>
                )}
                <p
                  className="card-title text-center card-title-custom"
                  style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '90%' }}
                >
                  {category.name}
                </p>
              </Link>
            </div>
          ))
        ) : (
          <p className="col-12">Nenhuma categoria encontrada ou erro ao carregar.</p>
        )}
      </div>
    </section>
  );
};

export default BusinessCategoriesSection;