import { HttpClient } from "@angular/common/http";
import { AddressDto, PersonDto } from "../person-list/person.model";
import { map, Observable } from "rxjs";
import { ValidationError } from "../../shared/models";
export namespace Sexo {
    export enum Sexo {
        Homem = 1
        ,Mulher = 2
        ,Outro = 3
        ,Undefined = 4
    }
    export function stringfy(s:Sexo) {
        return Sexo[s]
    }
    export function from(s:number) {
        const n = Math.floor(s)
        if(n < 1 || n > 3){
            return Sexo.Undefined;
        }
        return n;        
    }
    export function parse(s:string) {
        return from(parseInt(s))
    }
}
export namespace EstadoCivil {
    export enum EstadoCivil {  
        Solteiro = 1,
        Casado = 2,
        Divorciado = 3,
        Viuvo = 4,
      }
    export function stringfy(s:EstadoCivil) : string {
        return EstadoCivil[s]
    }
    export function from(s:number) : EstadoCivil {
        const n = Math.floor(s)
        if(n < 1 || n > 4){
            return EstadoCivil.Solteiro
        }
        return n;
    }
    export function parse(s:string) {
        return from(parseInt(s))
    }
}
export class CEP {  
    private _value:string
    private constructor(value: string){
      this._value = value
    }
    
    public get value() : string {
      return this._value
    }
    
    static create(cep: string){
      const errors = CEP.validateCEP(cep)
      if(errors.length === 0){
        return new CEP(cep)
      }
      return null
    }
    static validateCEP(cep: string): ValidationError[] {
      const errors: ValidationError[] = [];
      if(!cep){
        errors.push({ field: 'cep', message: 'CEP é obrigatório.' });
        return errors
      }
      // Remove any non-numeric characters from the CEP
      const sanitizedCEP = cep.replace(/\D/g, '');
    
      // Check if the CEP has the correct length
      if (sanitizedCEP.length !== 8) {
        errors.push({ field: 'cep', message: 'CEP obrigatóriamente tem 8 digitos.' });
      }
    
      return errors;
    }
  
    static async getAddress(client:HttpClient,cep: CEP): Promise<Observable<AddressDto> | null> {
      try 
      {
          const response = await client.get(`https://viacep.com.br/ws/${cep.value}/json/`)
          return response.pipe(
            map((data:any) => { 
                const addr:AddressDto = {
                    cep: data.cep,
                    endereco: data.logradouro,
                    complemento: data.complemento,
                    bairro: data.bairro,
                    cidade: data.localidade,
                    estado: data.uf,
                    numero: data.numero
                }
                return addr
            }))
      } 
      catch (error) 
      {
        console.error('Error fetching address info:', error)
        return null;
      }
    }
    
  }
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

    sexo: Sexo.Sexo = Sexo.Sexo.Undefined;

    dataNascimento: Date = new Date();

    estadoCivil: EstadoCivil.EstadoCivil = EstadoCivil.EstadoCivil.Solteiro;

    enderecos: Address[] = [];    
    /**
     *
     */
    private constructor(
        nome: string
        ,sexo: Sexo.Sexo
        ,dataNascimento: Date
        ,estadoCivil: EstadoCivil.EstadoCivil
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
            ,Sexo.Sexo.Undefined
            ,new Date()
            ,EstadoCivil.EstadoCivil.Solteiro
            ,[]
        )
    }
    private getDiffInDays(d1:Date,d2:Date){

        // Diferença em milisegundos 
        const differenceMs = Math.abs(d2.getTime() - d1.getTime())

        // Milisegundos para dias
        const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24))

        return differenceDays;
    }      
    public get isBirthday() : boolean {
        const getSum = (d:Date) => d.getDay() + d.getMonth() + d.getFullYear();
        const today = new Date();
        const todaySum = getSum(today);
        return getSum(this.dataNascimento) === todaySum
    }
    public get idade(): number {        
        // Get the current date
        const currentDate = new Date();
        console.log('dataNascimento:',this.dataNascimento)
        // Calculate the difference in years
        let age = currentDate.getFullYear() - this.dataNascimento.getFullYear();

        // Check if the current date is before the birthday in the current year
        const currentMonth = currentDate.getMonth(); // Months are zero-based
        const birthMonth = this.dataNascimento.getMonth(); // Months are zero-based
        const currentDay = currentDate.getDate();
        const birthDay = this.dataNascimento.getDate();

        if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
            age--; // Subtract 1 from age if the current date is before the birthday in the current year
        }

        return age;
    }
    public get daysToNextBirthday(): number {        
        const today = new Date()
        const nextBirthday = new Date(today.getFullYear(),this.dataNascimento.getMonth(),this.dataNascimento.getDate())
        
        // Verificação, caso o aniversário já tenha passado.
        console.log('nextBirthday:',nextBirthday)
        if (today < nextBirthday) {
            // dessa forma, o aniversário dela é somente próximo ano.
            nextBirthday.setFullYear(today.getFullYear() + 1);
        }
        
        return this.getDiffInDays(nextBirthday,today)
    }
    public get stringfiedEnderecos() : string[] {
        return this.enderecos.map(toString)
    }
    static fromDto(dto:PersonDto): PersonViewModel {
        const dtStr: string = dto.dataNascimento.toString()
        console.log('dtStr:',dtStr)
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
        _id: this.id
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
  