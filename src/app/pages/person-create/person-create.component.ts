import { Component, OnInit } from '@angular/core'
import { toString  } from "../person-list/person.model"
import { CommonModule } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router'
import { CEP, PersonViewModel } from '../person/personVm.model'
import { PersonsService } from '../../persons/persons.service'
import { FormsModule } from '@angular/forms';
import Swal from "sweetalert2";
import { HttpClient } from '@angular/common/http'
@Component({
  selector: 'app-person-create',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './person-create.component.html',
  styleUrl: './person-create.component.sass'
})
export class PersonCreateComponent implements OnInit {
  
  vm:PersonViewModel = PersonViewModel.empty()

  constructor(
    private personsService:PersonsService
    ,private router: Router
    ,private http: HttpClient){

  }

  ngOnInit(): void {
    /** ? */
  }
  async showBirthdayMessage(){
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
  }
  async create(): Promise<void> {    
    const person = await this.personsService.create(this.vm.toDto());
    person.subscribe(async p => {
      await Swal.fire({
        title: 'Criado!'
        ,text: 'Pessoa foi criada com sucesso, redirecionando...'
        ,icon: 'success'
      })
      const r = await this.router.navigate(['/persons',{ id: p._id }])
      if(!r){
        await Swal.fire({
          title: 'Estranho...'
          ,text: 'Não estamos conseguindo te redirecionar, consegue ir até a página inicial?'
          ,icon: 'warning'          
        })
      }
    })
  }

  async onCepChange(cep: string,index: number): Promise<void>{
    const validatedCep = CEP.create(cep)
    if(!validatedCep){
      return
    }
    const addr = await CEP.getAddress(this.http,validatedCep)
    addr?.subscribe(value => {
      const currentAddr = this.vm.enderecos.at(index)
            
      if(!currentAddr){
        return;
      }

      currentAddr.bairro = value.bairro
      currentAddr.cidade = value.cidade
      currentAddr.estado = value.estado
      currentAddr.endereco = value.endereco            
      currentAddr.cep = value.cep
    })
    // const enderecos = this.vm.enderecos
    // for(let i = 0;i < enderecos.length;++i){
    //   CEP.getAddress(this.http, )
    // }
  }
  addAddress(){    
    this.vm.enderecos.push({
      cep: ""      
      ,estado:""
      ,cidade:""
      ,bairro: ""
      ,numero: ""            
      ,endereco: ""
      ,complemento: ""
    })
  }
  
}
