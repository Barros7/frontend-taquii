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

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      console.warn('NEXT_PUBLIC_API_URL is not defined');
      return null;
    }

    const response = await fetch(`${apiUrl}/categories`, {
      next: { revalidate: 3600 },
      cache: 'force-cache'
    });

    if (!response.ok) {
      console.log(response) 
      console.error(`Erro ao buscar categorias: ${response.status} ${response.statusText}`);
      return null;
    }

    categories = await response.json();
  } catch (error) {
    console.error('Erro de rede ou busca de categorias:', error);
    return null;
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <section id="servicos" className='container section-business-category text-center'>
      <h2 className={"title"}>Para todo tipo de empresa</h2>
      <p className={"subtitle"}>Temos a solução para todo tipo de estabelecimento</p>
      <div className='row py-3'>
        {categories.map((category) => (
          <div className="col-4 col-sm-2 col-md-2 py-2" key={category.id}>
            <Link
              href={`/empresas?search=${encodeURIComponent(category.name)}`}
              className="hiperlink card card-custom d-flex flex-column align-items-center justify-content-center"
            >
              {category.iconUrl && (
                <Image
                  height={100}
                  width={100}
                  src={category.iconUrl}
                  alt={category.name}
                  className="card-img-top image-product mb-3"
                  style={{ maxWidth: '50%', overflow: 'hidden' }}
                />
              )}
              {!category.iconUrl && (
                <div className="placeholder-icon mb-3">
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
        ))}
      </div>
    </section>
  );
};

export default BusinessCategoriesSection;