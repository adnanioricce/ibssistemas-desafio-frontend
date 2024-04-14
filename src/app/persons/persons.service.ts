import { Injectable } from '@angular/core'
import { HttpClient,HttpHeaders  } from '@angular/common/http'
import { environment } from "../../environments/environment";
import { PersonDto } from '../pages/person-list/person.model'
import { Observable } from 'rxjs'
import { AuthService } from '../auth/auth.service'


@Injectable({
  providedIn: 'root'
})
export class PersonsService {
  
  
  private baseUrl:string = environment.API_URL  

  constructor(private http:HttpClient,private auth:AuthService) { }
  async create(dto:PersonDto) : Promise<Observable<PersonDto>> {    
    return await this.http.post<PersonDto>(`${this.baseUrl}/persons`,dto)
  }
  async update(dto: PersonDto) {
    const endpoint = `${this.baseUrl}/persons/${dto._id}`
    return await this.http.put(endpoint,dto)
  }
  async get(personId: string) : Promise<Observable<PersonDto>> {    
    const endpoint = `${this.baseUrl}/persons/${personId}`
    return await this.http.get<PersonDto>(endpoint)    
  }

  async list({page = 1,count = 100}): Promise<Observable<PersonDto[]>> {
    const baseUrl = environment.API_URL
    const endpoint = `${baseUrl}/persons?page=${page}&limit=${count}`
    return this.http.get<PersonDto[]>(endpoint)
    
  }
  
}
