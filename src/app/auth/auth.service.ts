import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from '../storage/cookie.service';
// import {} from "http";
import { environment  } from "../../environments/environment"
import { ValidationError } from '../shared/models';
export type LoginRequest = {
  username: string
  password: string
}
export type LoginResponse = {
  access_token: string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {  
  constructor(private http: HttpClient
    ,private cookieService: CookieService) { }

  async login(req:LoginRequest): Promise<Observable<LoginResponse>> {
    console.log('login request:',req)
    const bodyJson = JSON.stringify(req)
    const url = `${environment.API_URL}/auth/login`
    console.log("sending request to url ",url, " with body -> ",bodyJson)
    const response = await this.http.post<LoginResponse>(url,bodyJson)    
    response.subscribe(response => {
      this.cookieService.setCookie('auth',response.access_token,1)
    })
    return response      
  }
  isAuthenticated(): boolean {
    return !!this.cookieService.getCookie('auth'); // Check if token exists in cookie
  }
  logout(): void {
    this.cookieService.deleteCookie('auth'); // Delete token from cookie
  }
  getJwt(){
    return this.cookieService.getCookie('auth')
  }
  private validate(req:LoginRequest): ValidationError[] {
    const errors = []
    if(!req.username){
      errors.push({field: 'username',message: 'username is required'})
    }
    if(!req.password){
      errors.push({field: 'password',message: 'password is required'})
    }
    return errors;
  }
}
