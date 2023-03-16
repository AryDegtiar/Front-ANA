import { Router } from '@angular/router';
import { UsuarioService } from './../../service/usuarios/usuario.service';
import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";

    constructor(private usuarioService:UsuarioService, private cdr:ChangeDetectorRef,private router:Router) { }

    ngOnInit(): void {
    }

    login(event: Event){
      console.log(this.email);
      console.log(this.password);
      event.preventDefault();
      this.usuarioService.login(this.email, this.password).subscribe(
        res => {
          console.log(res);
          if (res != "Usuario o contraseña invalidos"){
            this.usuarioService.setLogeo(res);
            this.cdr.detectChanges();
            this.router.navigate(['/home']);
            //console.log(res);
           //localStorage.setItem('token', res.token);
          }
        },
        err => alert("Error al logearse")
      )
    }


}
