import React from 'react';
import './CompanyProfile.css';
import BookingModal from '../booking_modal/BookingModal';

interface Service {
  name: string;
  duration: number;
  status: 'Disponível' | 'Indisponível';
  description: string;
  price: string;
}

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => (
  <div className="row">
    <div className="col">
        {/* Cartão de serviço */}
        <div className="card mb-3 container-card-service">
            <div className="card-body">
                <div className="row align-items-center gy-3">
                    {/* Ícone */}
                    <div className="col-12 col-sm-auto text-center">
                        <div
                            style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            backgroundColor: '#e0e0e0',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '1.5rem',
                            color: '#757575',
                            margin: '0 auto',
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 11.37A7 7 0 0 0 8 1z" />
                            </svg>
                        </div>
                    </div>

                    {/* Informações do serviço */}
                    <div className="col-12 col-md">
                        <h6 className="mb-1">{service.name}</h6>
                        <p className="small text-muted mb-1 d-flex flex-wrap gap-3">
                            <span>Duração: {service.duration} min</span>
                            <span>
                            Status:{' '}
                            <strong className={service.status === 'Disponível' ? 'text-success' : 'text-danger'}>
                                {service.status}
                            </strong>
                            </span>
                        </p>
                        <p className="text-muted small mb-0">{service.description}</p>
                    </div>

                    {/* Preço e botão */}
                    <div className="col-12 col-sm-auto text-sm-end text-center">
                        <h6 className="fw-bold">{service.price}</h6>
                        <button className="btn btn-primary w-100 mt-2">Agendar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
);

const ServicesSection: React.FC = () => {
  const servicesData: Service[] = [
    {
      name: 'Trança Virada',
      duration: 45,
      status: 'Disponível',
      description: 'Corte de cabelo feminino com lavagem e escova incluídas.',
      price: '3.000 Kz',
    },
    {
      name: 'Dredlocks',
      duration: 45,
      status: 'Indisponível',
      description: 'Corte de cabelo feminino com lavagem e escova incluídas.',
      price: '7.000 Kz',
    },
    {
      name: 'Dredlocks',
      duration: 45,
      status: 'Disponível',
      description: 'Corte de cabelo feminino com lavagem e escova incluídas.',
      price: '7.000 Kz',
    },
    {
      name: 'Dredlocks',
      duration: 60,
      status: 'Disponível',
      description: 'Corte de cabelo feminino com lavagem e escova incluídas.',
      price: '20.000 Kz',
    },
  ];

  const services = [
    {
      id: '1',
      nome: 'J2B CODE - Consultoria de TI',
      descricao: 'Empresa de Tecnologia, Benguela'
    },
    {
      id: '2',
      nome: 'J2B CODE - Consultoria de TI',
      descricao: 'Empresa de Tecnologia, Benguela'
    }
  ];

  const serviceCategories: string[] = ['Manicure', 'Pedicure', 'Maquiagem', 'Tranças', 'Aplicação', '2+'];

  return (
    <section className="container py-5">
      <BookingModal service={ services[0] }/>
      <div>
        <div className="row">
          <div className="col">
            {/* Barra de pesquisa e categorias */}
            <div className="card mb-3">
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <input type="search" className="form-control" placeholder="Procurar por serviço" />
                  </div>
                  <div className="mt-3 d-flex flex-wrap gap-2">
                    {serviceCategories.map((category, index) => (
                      <button key={index} type="button" className="btn btn-outline-secondary btn-sm">
                        {category}
                      </button>
                    ))}
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div>
            {/* Lista de serviços */}
            {servicesData.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
