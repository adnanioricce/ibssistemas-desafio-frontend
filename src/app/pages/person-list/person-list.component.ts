import { Component, OnInit } from '@angular/core';
import { AddressDto, PersonDto } from './person.model';
import { PersonsService } from '../../persons/persons.service';
import { Observable } from 'rxjs';
// import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.sass'
})
export class PersonListComponent implements OnInit {
  persons:PersonDto[] = []
  constructor(private personService:PersonsService){

  }
  ngOnInit(): void {
    this.personService.list({page: 1,count: 100})
      .then(res => res.subscribe(persons => this.persons = persons))
      .catch(err => console.error(err))
  }    
  toAddressString(address:AddressDto):string {
    return `${address.endereco}, ${address.numero}, ${address.complemento}, ${address.bairro}, ${address.cidade}, ${address.estado} - ${address.cep}`;
  }
}
