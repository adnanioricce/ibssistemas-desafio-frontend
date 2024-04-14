export type AddressDto = {    
  cep: string;
  
  endereco: string;
  
  numero: string;

  complemento: string;

  bairro: string;

  estado: string;

  cidade: string;
}

export type PersonDto = {    
  _id: string

  nome: string
  
  sexo: number

  dataNascimento: Date

  estadoCivil: number

  enderecos: AddressDto[]
}
export function toString(address:AddressDto):string {
  return `${address.endereco}, ${address.numero}, ${address.complemento}, ${address.bairro}, ${address.cidade}, ${address.estado} - ${address.cep}`;
}
