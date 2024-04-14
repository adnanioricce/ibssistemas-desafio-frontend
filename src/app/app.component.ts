import { CommonModule,DatePipe } from '@angular/common'
import { Component, OnInit,LOCALE_ID  } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
// import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'
import { PersonListComponent } from './pages/person-list/person-list.component'
import { PersonComponent } from './pages/person/person.component'
import { HttpClientModule } from '@angular/common/http'
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { AuthService } from './auth/auth.service'

registerLocaleData(localePt, 'pt-BR');
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink,RouterLinkActive,ReactiveFormsModule,PersonListComponent,PersonComponent,HttpClientModule],  
  providers:[DatePipe,{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent implements OnInit {  
  title = 'persons-frontend';
  constructor(    
    private authService: AuthService
    ,private router: Router
    ){

  }  
  async ngOnInit(): Promise<void> {
    if(this.authService.isAuthenticated()){
      await this.router.navigate(['/persons'])
    }
    else {
      await this.router.navigate(['/auth/login'])
    }
  }
}
