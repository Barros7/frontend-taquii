'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './BusinessCategoriesSection.css';

interface Category {
  id: string;
  name: string;
  description?: string;
  iconUrl?: string;
}

const SkeletonCard = () => (
  <div className="col-4 col-sm-2 col-md-2 py-2">
    <div className="card card-custom d-flex flex-column align-items-center justify-content-center skeleton-card">
      <div className="skeleton-image mb-3" />
      <div className="skeleton-text" />
    </div>
  </div>
);
const BusinessCategoriesSection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchCategories = async () => {
      try {

        const response = await fetch(`/api/categories`);

        if (!response.ok) {
          console.error(`Erro ao buscar categorias: ${response.status} ${response.statusText}`);
          return;
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Erro de rede ou busca de categorias:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section id="servicos" className="container-fluid section-business-category text-center">
      <div id="servicos" className="container">
        <h2 className="title">Escolha a categoria e resolva sua necessidade</h2>
        <p className="subtitle">Taqui Serviços com profissionais prontos para atender em diversas áreas.</p>
        <div className="row py-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : categories.length > 0 ? (
                categories.map((category) => (
                  <div className="col-4 col-sm-2 col-md-2 py-2" key={category.id}>
                    <Link
                      href={`/empresas?search=${encodeURIComponent(category.name)}`}
                      className="hiperlink card card-custom d-flex flex-column align-items-center justify-content-center"
                    >
                      {category.iconUrl ? (
                        <Image
                          height={100}
                          width={100}
                          src={category.iconUrl}
                          alt={category.name}
                          className="card-img-top image-product mb-3"
                          style={{ maxWidth: '50%', overflow: 'hidden' }}
                        />
                      ) : (
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
                ))
              ) : (
                <p className="text-center w-100">Nenhuma categoria encontrada.</p>
              )}
        </div>
      </div>
    </section>
  );
};

export default BusinessCategoriesSection;
