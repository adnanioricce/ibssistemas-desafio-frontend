import { Component, OnInit } from '@angular/core'
import { toString  } from "../person-list/person.model"
import { CommonModule } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
import { PersonViewModel } from './personVm.model'
import { PersonsService } from '../../persons/persons.service'
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-person',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './person.component.html',
  styleUrl: './person.component.sass'
})
export class PersonComponent implements OnInit {
  
  personId:string = ""
  vm!: PersonViewModel;

  constructor(
    private route: ActivatedRoute
    ,private personService: PersonsService){

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
          })
        )
        .catch(err => console.error(err))
    })
  }
  saveChanges(): void {
    const dto = this.vm.toDto()
  }
}
