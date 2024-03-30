import { AddressDto, PersonDto } from "../person-list/person.model";

export type Address = {    
    cep: string;

    endereco: string;

    numero: string;

    complemento: string;

    bairro: string;

    estado: string;

    cidade: string;
}

export class PersonViewModel {       
    id: string = ""

    nome: string = "";

    sexo: string = "";

    dataNascimento: Date = new Date();

    estadoCivil: string = "";

    enderecos: Address[] = [];
    /**
     *
     */
    private constructor(
        nome: string
        ,sexo: string
        ,dataNascimento: Date
        ,estadoCivil: string
        ,enderecos: Address[]
    ) {        
        this.nome = nome
        this.sexo = sexo
        this.dataNascimento = dataNascimento
        this.estadoCivil = estadoCivil
        this.enderecos = enderecos
    }
    static empty(): PersonViewModel{
        return new PersonViewModel(
            ""
            ,""
            ,new Date()
            ,""
            ,[]
        )
    }
    
    public get stringfiedEnderecos() : string[] {
        return this.enderecos.map(toString)
    }
    static fromDto(dto:PersonDto): PersonViewModel {
        return new PersonViewModel(
            dto.nome
            ,dto.sexo
            ,dto.dataNascimento
            ,dto.estadoCivil
            ,dto.enderecos
        )
    }
    toDto() : PersonDto {
      return {
        id: ''
        ,nome: this.nome
        ,sexo: this.sexo
        ,dataNascimento: this.dataNascimento
        ,estadoCivil: this.estadoCivil
        ,enderecos: this.enderecos.map(e => ({
            numero:e.numero
            ,endereco: e.endereco
            ,estado: e.estado
            ,cidade: e.cidade
            ,bairro: e.bairro
            ,complemento: e.complemento
            ,cep: e.cep            
        }))
      }
    } 
}
export function toString(address:Address) : string {
    return `${address.endereco}, ${address.numero}, ${address.complemento}, ${address.bairro}, ${address.cidade}, ${address.estado} - ${address.cep}`;
}
  