import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { CommonModule } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async login(): Promise<void> {
    const response = await this.authService.login({ username: this.username, password: this.password })
    response.subscribe(
      {
        next: async (v)  => {
          //pensei tem criar um dashboard, mas praticamente seria o mesmo que ter uma tela de proxy para a página persons
          // this.router.navigate(['/dashboard'])
          console.log('login succeed!',v)
          const canNavigate = await this.router.navigate(['/persons'])
          console.log('user can navigate?',canNavigate ? 'yes' : 'no')
        }
        ,error: (error) => {
            if (error.status === 404) {
              this.errorMessage = 'usuario não existe.';
            } else if (error.status === 401) {
              this.errorMessage = 'Senha incorreta, tente novamente.';
            } else if (error.status === 500) {
              this.errorMessage = 'Meu amigo, me desculpe, parece que teve um problema do nosso lado, tente outra vez mais tarde.';
            } else if (error.status === 429) {
              this.errorMessage = 'Olha, a gente viu que você tentou muitas vezes, e por segurança, nos demos uma segurada nos seus logins, então tente novamente mais tarde, por favor.';
            } else {
              this.errorMessage = 'Alguma problema ocorreu que a gente não estava esperando, por favor, tente outra vez mais tarde.';
            }          
        }
      }
    );
  }
}
