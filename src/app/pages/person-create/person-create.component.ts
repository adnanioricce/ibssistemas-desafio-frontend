import { Component, OnInit } from '@angular/core'
import { toString  } from "../person-list/person.model"
import { CommonModule } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router'
import { PersonViewModel } from '../person/personVm.model'
import { PersonsService } from '../../persons/persons.service'
import { FormsModule } from '@angular/forms';
import Swal from "sweetalert2";
@Component({
  selector: 'app-person-create',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './person-create.component.html',
  styleUrl: './person-create.component.sass'
})
export class PersonCreateComponent implements OnInit {
  
  vm:PersonViewModel = PersonViewModel.empty()

  constructor(private personsService:PersonsService
    ,private router: Router){

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
    
  }
  async create(): Promise<void> {    
    const person = await this.personsService.create(this.vm.toDto());
    person.subscribe(p => {
      this.router.navigate(['/persons',{ id: p.id }])
    })
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
