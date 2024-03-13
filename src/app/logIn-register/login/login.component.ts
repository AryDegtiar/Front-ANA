import { Router } from '@angular/router';
import { UsuarioService } from './../../service/usuarios/usuario.service';
import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importación necesaria

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";

  usuarioGuardado: any;
  responseLogin: any;

    constructor(private usuarioService:UsuarioService, private cdr:ChangeDetectorRef,private router:Router, private http: HttpClient) { } // Agregamos HttpClient aquí

    ngOnInit(): void {
    }

    login(event: Event){
      //console.log(this.email);
      //console.log(this.password);
      event.preventDefault();

      // pasar esto el service
      this.usuarioService.obtenerUsuarioLogeado(this.email, this.password).then((response) => {
        this.responseLogin = response;
        //console.log("Respuesta del login: ", this.responseLogin);
        if (this.responseLogin.body != "Usuario o contraseña invalidos") {
          if (this.responseLogin.token !== null && this.responseLogin.rolesHeaderValue !== null) {
            this.usuarioService.login(this.email, this.responseLogin.token, this.responseLogin.roles).subscribe(
              response => {
                //console.log('Usuario logeado:', response);
                let sesion = {
                  token: this.responseLogin.token,
                  roles: this.responseLogin.roles,
                }
                this.usuarioService.setLogeo(response);
                this.usuarioService.setSesion(sesion);
                this.usuarioGuardado = this.usuarioService.getLogeo();
                //console.log("Usuario guardado: ", this.usuarioGuardado);
                this.cdr.detectChanges();
                this.router.navigate(['/home']);
              },
              error => {
                console.error('Error al enviar la solicitud:', error);
              }
            );
            //this.usuarioService.setLogeo(response);
            this.cdr.detectChanges();
            //this.router.navigate(['/home']);
            //console.log("Usuario logeado");
            //console.log(this.responseLogin.body);
            //localStorage.setItem('token', response.body.token);
          }
        }
      });
    }
}
