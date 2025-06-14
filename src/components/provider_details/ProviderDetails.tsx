import Image from 'next/image';
import "./Banner.css";
import React from 'react';
import styles from './NavBar.module.css';
import ServicesSection from '../company_profile/CompanyProfile'; // Renamed to CompanyProfile
import AboutSection from '../about_section/AboutSection';
import GallerySection from '../galary_section/GallerySection';

// Assuming this is the 'Service' interface ServicesSection expects
// You might already have this defined in '../company_profile/CompanyProfile.tsx' or a shared types file.
// If it's already there, you can remove this duplicate definition, but ensure it matches.
interface Service {
    id: string;
    title: string;
    duration: number;
    status: 'Disponível' | 'Indisponível';
    description: string;
    price: number;
    averageRating?: number;
    providerId: string; // This is the missing property!
}

interface IProviderDetails {
    provider: {
        id: string; // The provider's ID
        name: string;
        profileImage: string;
        galleryImages?: {
            id: string;
            imageUrl: string; 
        }[];
        addresses?: {
            city: string;
            country: string;
        }[];
        services?: { // This type is now a subset of what `ServicesSection` expects
            id: string;
            title: string;
            duration: number;
            status: 'Disponível' | 'Indisponível';
            description: string;
            price: number;
            averageRating?: number;
        }[];
    };
}

export const ProviderDetails: React.FC<IProviderDetails> = ({ provider }) => {
    const [activeLink, setActiveLink] = React.useState<'servicos' | 'sobre' | 'galeria' | 'contactos'>('servicos');

    const handleLinkClick = (link: 'servicos' | 'sobre' | 'galeria' | 'contactos') => {
        setActiveLink(link);
    };

    // Transform services to include providerId before passing to ServicesSection
    const servicesWithProviderId: Service[] = (provider.services ?? []).map(service => ({
        ...service,
        providerId: provider.id, // Add the provider.id to each service object
    }));

    return (
        <>
            <section>
                <div className="banner banner-logo-consulting">
                    <Image
                        src="/banner/banner_j2bcode_logo.png"
                        alt="Consultoria de Tecnologia da Informação"
                        height={1000}
                        width={1000}
                        className="object-fit-cover"
                    />
                </div>
                <div>
                    <nav className={styles.navbar}>
                        <ul className={styles.navList}>
                            <li
                                className={`${styles.navItem} ${activeLink === 'servicos' ? styles.active : ''}`}
                                onClick={() => handleLinkClick('servicos')}
                            >
                                <div className={styles.navLink}>
                                    Serviços
                                </div>
                            </li>
                            <li
                                className={`${styles.navItem} ${activeLink === 'galeria' ? styles.active : ''}`}
                                onClick={() => handleLinkClick('galeria')}
                            >
                                <div className={styles.navLink}>
                                    Galeria
                                </div>
                            </li>
                            <li
                                className={`${styles.navItem} ${activeLink === 'sobre' ? styles.active : ''}`}
                                onClick={() => handleLinkClick('sobre')}
                            >
                                <div className={styles.navLink}>
                                    Sobre
                                </div>
                            </li>
                            <li
                                className={`${styles.navItem} ${activeLink === 'contactos' ? styles.active : ''}`}
                                onClick={() => handleLinkClick('contactos')}
                            >
                                <div className={styles.navLink}>
                                    Contactos
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </section>
            {activeLink === 'sobre' && (
                <AboutSection
                    title="Sobre [Nome da Empresa/Profissional]"
                    description="Aqui você pode colocar uma descrição detalhada sobre a empresa, sua história, missão, valores, ou sobre o profissional, sua experiência, filosofia de trabalho, etc. Use este espaço para cativar seus visitantes."
                    imageUrl="/images/about-image.jpg"
                    imageAlt="Imagem de [Nome da Empresa/Profissional]"
                    additionalInfo={[
                        "Anos de experiência no mercado.",
                        "Equipa qualificada e apaixonada.",
                        "Compromisso com a satisfação do cliente.",
                        "Localização conveniente."
                    ]}
                />
            )}
            {activeLink === 'servicos' && (
                <ServicesSection
                    items={servicesWithProviderId} // Pass the transformed array
                />
            )}
            {activeLink === 'galeria' && (
                <GallerySection
                    items={(provider.galleryImages ?? []).map(img => ({
                        ...img,
                        caption: ''
                    }))}
                />
            )}
            
        </>
    );
};