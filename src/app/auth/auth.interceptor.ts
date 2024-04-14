import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, Observable, throwError } from 'rxjs';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private authService: AuthService,private router: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {        
        req = req.clone({
            setHeaders: req.url.includes('auth/login')
            ? {
                'Content-Type' : 'application/json; charset=utf-8',
                'Accept'       : 'application/json',
            }
            : {
                'Content-Type' : 'application/json; charset=utf-8',
                'Accept'       : 'application/json',
                'Authorization': `Bearer ${this.authService.getJwt()}`,
            }
            
        });
        // if(req.url.includes('auth/login'))
        console.log('on login interceptor:',req)
        return next.handle(req).pipe(catchError(err => {
            console.error('on login interceptor catch:',err)
            if (err.status === 401) {
                this.router.navigate(['auth/login'])
            }
            const error = err.error.message || err.statusText;
            return throwError(() => error);
        }));
    }
}