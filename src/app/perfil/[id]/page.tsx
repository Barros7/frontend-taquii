"use client"
import { useEffect, useState } from 'react';
import { ProviderDetails } from '../../../components/provider_details/ProviderDetails';
import Header from '../../../components/header/Header';
import { useParams } from 'next/navigation';

interface ProviderData {
  id: string;
  name: string;
  profileImage: string;
  galleryImages?: { id: string; imageUrl: string; }[];
  addresses?: { city: string; country: string; }[];
  services?: {
    id: string;
    title: string;
    duration: number;
    status: 'Disponível' | 'Indisponível';
    description: string;
    price: number;
    averageRating?: number;
  }[];
}

export default function ProfilePage() {
  const params = useParams();
  const providerId = params?.id;
  const [providerData, setProviderData] = useState<ProviderData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!providerId) {
        setError("ID do profissional não fornecido na URL.");
        return;
    }

    const fetchProviderDetails = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/providers?id=${providerId}`);
            if (!response.ok) {
                if (response.status === 404) {
                  throw new Error("Profissional não encontrado.");
                }
                throw new Error(`Erro ao buscar dados do profissional: ${response.status}`);
            }

            const data = await response.json();
             const foundProvider = Array.isArray(data) ? data.find((p: ProviderData) => p.id === providerId) : data;

             if (!foundProvider) {
                 throw new Error("Dados do profissional não encontrados após a busca.");
             }

            setProviderData(foundProvider);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Erro ao buscar dados do profissional.");
        }
    };

    fetchProviderDetails();

}, [providerId]);

if (!providerData) {
  return <div className="container mt-4">Profissional não encontrado.{error}</div>;
}

return (
    <div className="container-fluid bg-light min-vh-100 m-0 p-0">
      <Header />
      <ProviderDetails provider={providerData} />
    </div>
  );
}
