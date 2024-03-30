import { Injectable } from '@angular/core'
import { HttpClient,HttpHeaders  } from '@angular/common/http'
import { settings } from '../settings'
import { PersonDto } from '../pages/person-list/person.model'
import { Observable } from 'rxjs'
import { AuthService } from '../auth/auth.service'


@Injectable({
  providedIn: 'root'
})
export class PersonsService {
  
  private baseUrl:string = settings.API_URL  

  constructor(private http:HttpClient,private auth:AuthService) { }
  async create(dto:PersonDto) : Promise<Observable<PersonDto>> {
    const jwt = this.auth.getJwt()    
    if(!jwt){
      return await this.http.post<PersonDto>(`${this.baseUrl}/persons`,dto)      
    }
    else {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
      return await this.http.post<PersonDto>(`${this.baseUrl}/persons`,dto,{
        headers
      })
    }
  }

  async get(personId: string) : Promise<Observable<PersonDto>> {    
    const endpoint = `${this.baseUrl}/persons/${personId}`
    return await this.http.get<PersonDto>(endpoint)    
  }

  async list({offset = 0,page = 1,count = 100}): Promise<Observable<PersonDto[]>> {
    const baseUrl = settings.API_URL
    const endpoint = `${baseUrl}/persons`
    return this.http.get<PersonDto[]>(endpoint)
    
  }

}
