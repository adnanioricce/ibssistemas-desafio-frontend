import { Component, OnInit } from '@angular/core'
import { toString  } from "../person-list/person.model"
import { CommonModule } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router'
import { PersonViewModel } from '../person/personVm.model'
import { PersonsService } from '../../persons/persons.service'
import { FormsModule } from '@angular/forms';

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
  async create(): Promise<void> {
    console.log('dto:',this.vm.toDto())
    return
    const person = await this.personsService.create(this.vm.toDto());
    person.subscribe(p => {
      this.router.navigate(['/persons',{ id: p.id }])
    })
  }
  addAddress(){
    //acho melhor não implementar isso.
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
