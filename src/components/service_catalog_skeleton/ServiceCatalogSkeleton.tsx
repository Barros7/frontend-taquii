'use client';

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ServiceCatalogSkeleton.css";

interface ServiceCatalogProps {
  categoryName?: string;
  categoryDescription?: string;
}

export default function ServiceCatalogSkeleton({ categoryName, categoryDescription }: ServiceCatalogProps) {
  return (
    <section className="container my-4">
      <div className="px-4">
        {/* Renderiza o nome e a descrição da categoria se existirem */}
        {categoryName && (
          <div className="skeleton-line skeleton-heading mb-2" style={{ width: '60%' }}></div>
        )}
        {categoryDescription && (
          <div className="skeleton-line skeleton-text mb-4" style={{ width: '80%' }}></div>
        )}

        {/* Se não houver categoryName, exibe a saudação padrão */}
        {!categoryName && (
          <>
            <div className="skeleton-line skeleton-heading mb-2" style={{ width: '40%' }}></div>
            <div className="skeleton-line skeleton-text mb-4" style={{ width: '70%' }}></div>
          </>
        )}

        {/* Filtros de busca - Skeleton */}
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <div className="d-flex flex-column flex-md-row gap-3 mb-3 align-items-center">
              <div className="skeleton-line skeleton-input flex-grow-1" style={{ height: '38px' }}></div>
              <div className="skeleton-line skeleton-input w-50" style={{ height: '38px' }}></div>
            </div>
            {/* Opcional: Skeleton para sub-categorias se for incluí-las no futuro */}
            {/*
              <div className="d-flex flex-wrap gap-2">
                <div className="skeleton-line skeleton-button" style={{ width: '80px', height: '30px' }}></div>
                <div className="skeleton-line skeleton-button" style={{ width: '90px', height: '30px' }}></div>
                <div className="skeleton-line skeleton-button" style={{ width: '70px', height: '30px' }}></div>
              </div>
            */}
          </div>
        </div>

        {/* Lista de profissionais - Skeleton */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {[...Array(8)].map((_, index) => ( // Renderiza 8 skeletons de card
            <div key={index} className="col">
              <div className="card h-100 shadow-sm rounded skeleton-card">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex align-items-center mb-3">
                    <div className="skeleton-circle me-3" style={{ width: '60px', height: '60px' }}></div>
                    <div className="skeleton-line" style={{ width: '70%', height: '24px' }}></div>
                  </div>
                  <div className="skeleton-line mb-2" style={{ width: '60%', height: '20px' }}></div>
                  <div className="d-flex align-items-center mb-3">
                    <div className="skeleton-line me-2" style={{ width: '40px', height: '20px' }}></div>
                    <div className="skeleton-line" style={{ width: '50px', height: '18px' }}></div>
                  </div>
                  <div className="skeleton-line skeleton-button mt-auto" style={{ height: '38px', width: '100%' }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}