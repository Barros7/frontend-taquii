'use client';
import React from 'react';
import Image from 'next/image';
import './BusinessCategoriesSection.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';

const businessTypes = () => {

  const products = [
    {
      image_url: "/hospital.jpg",
      category: "Saúde",
    },
    {
      image_url: "/education.jpg",
      category: "Educação",
    },
    {
      image_url: "/beauty.png",
      category: "Beleza Feminina",
    },
    {
      image_url: "/barber.webp",
      category: "Beleza Masculina",
    },
    {
      image_url: "/hotel.png",
      category: "Hotelaria",
    },
    {
      image_url: "/rent_a_car.jpg",
      category: "Rent a Car",
    },
    {
      image_url: "/ball.jpg",
      category: "Desporto",
    },
    {
      image_url: "/travel.jpg",
      category: "Viagem",
    },
    {
      image_url: "/body_guard.jpg",
      category: "Serviços de Segurança",
    },
    {
      image_url: "/photo.jpg",
      category: "Fotógrafos",
    },
  ];

  return (
    <section id="servicos" className='container section-business-category text-center'>
      <h2 className={"title"}>Para todo tipo de empresa</h2>
      <p className={"subtitle"}>Temos a solução para todo tipo de estabelecimento</p>
      <div className='row py-3'>
        {products.map((product, idx) => (
          <div className="col-4 col-sm-2 col-md-2 py-2" key={idx}>
            <Link
              href={`/empresas?search=${encodeURIComponent(product.category)}`}
              className="hiperlink card card-custom d-flex flex-column align-items-center justify-content-center"
            >
              {product.image_url && (
                <Image
                  height={100}
                  width={100}
                  src={product.image_url}
                  alt={product.category}
                  className="card-img-top image-product mb-3"
                  style={{ maxWidth: '50%', overflow: 'hidden' }}
                />
              )}
              <p
                className="card-title text-center card-title-custom"
                style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '90%' }}
              >
                {product.category}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default businessTypes;
