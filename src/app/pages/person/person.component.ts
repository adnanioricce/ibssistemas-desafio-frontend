import { Component, OnInit } from '@angular/core'
import { PersonDto, toString  } from "../person-list/person.model"
import { CommonModule, DatePipe } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
import { EstadoCivil, PersonViewModel, Sexo } from './personVm.model'
import { PersonsService } from '../../persons/persons.service'
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-person',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './person.component.html',
  styleUrl: './person.component.sass'
})
export class PersonComponent implements OnInit {
  
  personId:string = ""
  dataNascimento: string | undefined = new Date().toLocaleDateString()
  vm!: PersonViewModel;

  constructor(
    private route: ActivatedRoute
    ,private personService: PersonsService
    ,private datePipe: DatePipe){

  }  
  SexoType = Sexo
  
  public get sexos() : {name: string,value: number}[] {
    return [Sexo.Sexo.Homem,Sexo.Sexo.Mulher,Sexo.Sexo.Outro,Sexo.Sexo.Undefined].map(s => ({ name: Sexo.Sexo[s],value: s }))
  }
  
  public get estadosCivis() : {name: string,value: number}[] {    
    return [EstadoCivil.EstadoCivil.Solteiro,EstadoCivil.EstadoCivil.Casado,EstadoCivil.EstadoCivil.Divorciado,EstadoCivil.EstadoCivil.Viuvo]
    .map(e => ({name: EstadoCivil.EstadoCivil[e],value: e}))
  }
  
  public get formattedDate() : string {            
    const transformedDt = this.datePipe.transform(this.vm.dataNascimento,'yyyy-MM-dd') ?? 'yyyy-MM-dd'
    console.log('this.vm.dataNascimento transformed:',transformedDt)
    return transformedDt
  }
  
  public set formattedDate(v : string) {        
    this.vm.dataNascimento = new Date(v)
  }
  
  dateUpdate(ev:string | Date){
    const dt = new Date(ev)    
    this.vm.dataNascimento = dt
  }
  ngOnInit(): void {
    console.log('onInit:')
    this.route.params.subscribe(params => {
      
      this.personId = params['id']
      console.log('personId:',this.personId)
      const resp = Promise.resolve(this.personService.get(this.personId))
        resp.then(obs => 
          obs.subscribe(person => {
            console.log('person:',person)            
            this.vm = PersonViewModel.fromDto(person)            
            this.dateUpdate(this.vm.dataNascimento)
            // this.dataNascimento = this.vm.dataNascimento.toLocaleDateString() ?? new Date().toLocaleDateString()
            console.log('this.vm:',this.vm)
          })
        )
        .catch(err => console.error(err))
    })
  }
  
  async saveChanges(): Promise<void> {
    const dto = this.vm.toDto()
    //isso não deveria acontecer aqui, mas agora estou sem tempo para consertar esses problemas
    dto._id = this.personId
    const subs = await this.personService.update(dto)
    subs.subscribe(async value => {    
      console.log('value returned:',value)  
      const returnedDto = value as PersonDto
      if(returnedDto){
        console.log('returnedDto:',returnedDto)
        this.vm = PersonViewModel.fromDto(returnedDto)
      }
      if(!this.vm.isBirthday){
        await Swal.fire({
          title: `Olá ${this.vm.nome}`
          ,text: `Seja bem vindo!Parece que faltam ${this.vm.daysToNextBirthday} dias para seu próximo aniversário para seus ${this.vm.idade} virarem ${this.vm.idade + 1}`
          ,icon: 'success'
        })
        return
      }
      await Swal.fire({
        title: `Feliz aniversário ${this.vm.nome}!`
        ,text: `${this.vm.nome}, parece que hoje você completa seus ${this.vm.idade} de idade, estamos desejando muitos anos de vida pra você!`
        ,icon: 'success'
      })
    })
  }
}
