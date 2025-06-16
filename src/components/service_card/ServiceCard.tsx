'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import './ServiceCard.css';
import { Card, Button } from 'react-bootstrap';

interface Product {
  id: number;
  title: string;
  price: number;
  oldPrice: number;
  rating: number;
  orders: number;
  image: string;
  description: string;
  freeShipping: boolean;
}

const ServiceCard = () => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function getServiceData() {
      try {
        const response = await fetch('/api/service');

        if (!response.ok) {
          throw new Error(`Erro de rede: ${response.status}`);
        }

        const data = await response.json();

        setProduct(data);
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
      }
    }

    getServiceData();
  }, [product]);

  if (!product) return <p className="text-center">Carregando...</p>;

  return (
    <Card className={`shadow-sm p-3 ${"productCard"}`}>
      <Image src={product.image} alt={product.title} width={200} height={200} className={"productImage"} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>
          <strong className={"price"}>${product.price.toFixed(2)}</strong>
          {product.oldPrice && <span className={"oldPrice"}> ${product.oldPrice.toFixed(2)}</span>}
        </Card.Text>
        <div className={"rating"}>
          {'⭐'.repeat(Math.floor(product.rating))} ({product.rating}) • {product.orders} orders
        </div>
        <p className={"description"}>{product.description}</p>
        {product.freeShipping && <span className={"freeShipping"}>Free Shipping</span>}
        <Button variant="primary" className={"detailsButton"}>View Details</Button>
      </Card.Body>
    </Card>
  );
};

export default ServiceCard;
