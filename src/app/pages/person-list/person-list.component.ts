import { Component, OnInit } from '@angular/core';
import { PersonDto } from './person.model';
import { PersonsService } from '../../persons/persons.service';
import { Observable } from 'rxjs';
// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.sass'
})
export class PersonListComponent implements OnInit {
  persons:PersonDto[] = []
  constructor(private personService:PersonsService){

  }
  ngOnInit(): void {
    this.personService.list({offset: 0,page: 1,count: 100})
      .then(res => res.subscribe(persons => this.persons = persons))
      .catch(err => console.error(err))
  }    
}
