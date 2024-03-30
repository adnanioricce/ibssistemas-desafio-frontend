import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from '../storage/cookie.service';
// import {} from "http";
import { settings } from "../settings";
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

  async login(req:LoginRequest){
    
    if((await this.validate(req)).length === 0){
      const bodyJson = JSON.stringify(req)
      await this.http.post<LoginResponse>(`${settings.API_URL}/auth/login`,bodyJson)
        .subscribe(response => {
          sessionStorage.setItem('auth',response.access_token)
        })
    }
  }
  isAuthenticated(): boolean {
    return !!this.cookieService.getCookie('jwt'); // Check if token exists in cookie
  }
  logout(): void {
    this.cookieService.deleteCookie('jwt'); // Delete token from cookie
  }
  getJwt(){
    return this.cookieService.getCookie('jwt')
  }
  private async validate(req:LoginRequest){
    return [];
  }
}
