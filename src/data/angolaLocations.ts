export type Neighborhood = string;

export interface Commune {
  name: string;
  neighborhoods: Neighborhood[];
}

export interface Municipality {
  name: string;
  communes: Commune[];
}

export interface Province {
  name: string;
  municipalities: Municipality[];
}

export const provinces: Province[] = [
  {
    name: 'Luanda',
    municipalities: [
      {
        name: 'Luanda',
        communes: [
          { name: 'Ingombota', neighborhoods: ['Kinaxixi', 'Mutamba', 'Baixa de Luanda'] },
          { name: 'Maianga', neighborhoods: ['Prenda', 'Alvalade', 'Bairro Azul'] },
        ],
      },
      {
        name: 'Belas',
        communes: [
          { name: 'Talatona', neighborhoods: ['Talatona Centro', 'Nova Vida'] },
          { name: 'Quenguela', neighborhoods: ['Ramiro', 'Morro dos Veados'] },
        ],
      },
    ],
  },
  {
    name: 'Benguela',
    municipalities: [
      {
        name: 'Benguela',
        communes: [
          { name: 'Benguela', neighborhoods: ['Baixa', 'Praia Morena'] },
          { name: 'Bocoio', neighborhoods: ['Passe', 'Chila'] },
        ],
      },
      {
        name: 'Lobito',
        communes: [
          { name: 'Lobito', neighborhoods: ['Compão', 'Canata'] },
          { name: 'Catumbela', neighborhoods: ['Luz', 'Velho'] },
        ],
      },
    ],
  },
];


