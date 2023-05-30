export class Evento {
    id: string;
    nome: string;
    decricaoCurta: string;
    descricaoConga: string;
    dataInicio: Date;
    dataFim: Date;
    gratuito: Boolean;
    valor: string;
    online: Boolean;
    nomeEmpresa: string;
    endereco: Endereco;
    categoriaId: string;
    organizadorId: string;
}

export class Team  {
    id: number;
    area: string;
    name: string;
    shortName: string;
    tla: string;
    crestUrl: string;
    address: string;
    phone: string;
    website: string;
    email: string;
    founded: number;
    clubColors: string;
    venue: string;
    lastUpdated: Date;
  }
  

  export class BetResult {
    public team1AverageGoals: string;
    public team2AverageGoals: string;
    public probabilityOver15: string;
    public probabilityOver25: string;
    public probabilityUnder35: string;
    public probabilityUnder45: string;

    public probabilityUnder15: string;
    public probabilityUnder25: string;
    public probabilityOver05: string;
    public probabilityOver35: string;
    public probabilityOver45: string;
  }

  export class BetInputModel {
    Time1: number;
    Time2: number;
  }

  export class CalculatedProbabilities {
    probabilityOver15: string;
    probabilityOver25: string;
    probabilityUnder35: string;
    probabilityUnder45: string;


    probabilityUnder15: string;
    probabilityUnder25: string;
    probabilityOver05: string;
    probabilityOver35: string;
    probabilityOver45: string;
  }

export class Endereco{
    id: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cep: string;
    cidade: string;
    estado: string;
    eventoId: string;
}

export class Area
{
    id: number;
    name: string;
}

export interface Categoria{
    id: string;
    nome: string;
}