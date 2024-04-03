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
    private getDiffInDays(d1:Date,d2:Date){

        // Diferença em milisegundos 
        const differenceMs = Math.abs(d1.getTime() - d2.getTime())

        // Milisegundos para dias
        const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24))

        return differenceDays;
    }
    private getDiffInYears(d1: Date, d2: Date) {
        
        const y1 = d1.getFullYear();
        const y2 = d2.getFullYear();
        
        let differenceYears = y1 - y2;

        // Check if the second date has not reached the same month and day as the first date
        if (d2.getMonth() < d1.getMonth() || (d2.getMonth() === d1.getMonth() && d2.getDate() < d1.getDate())) {
            differenceYears--;
        }

        return differenceYears;
    }       
    public get isBirthday() : boolean {
        const getSum = (d:Date) => d.getDay() + d.getMonth() + d.getFullYear();
        const today = new Date();
        const todaySum = getSum(today);
        return getSum(this.dataNascimento) === todaySum
    }
    public get idade(): number {        
        const today = new Date()
        const diff = this.getDiffInYears(today,this.dataNascimento)
        return diff
    }
    public get daysToNextBirthday(): number {        
        const today = new Date()
        const nextBirthday = new Date(today.getFullYear(),this.dataNascimento.getMonth(),this.dataNascimento.getDate())
        
        // Verificação, caso o aniversário já tenha passado.
        if (nextBirthday < today) {
            // dessa forma, o aniversário dela é somente próximo ano.
            nextBirthday.setFullYear(today.getFullYear() + 1);
        }
        
        return this.getDiffInDays(nextBirthday,today)
    }
    isValidGender(): boolean {
        return this.sexo === 'H' || this.sexo === 'M';
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
  