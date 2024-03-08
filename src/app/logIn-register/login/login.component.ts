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

    constructor(private usuarioService:UsuarioService, private cdr:ChangeDetectorRef,private router:Router, private http: HttpClient) { } // Agregamos HttpClient aquí

    ngOnInit(): void {
    }
    login(event: Event){
      console.log(this.email);
      console.log(this.password);
      event.preventDefault();

      this.http.post<any>('http://localhost:8086/api/v1/login', { email: this.email, password: this.password }, { observe: 'response' })
        .subscribe(
          response => {
            console.log('Encabezados de respuesta:', response.headers);
            console.log('Cuerpo de la respuesta:', response.body);

            // Obtener el token de autorización (Bearer token) directamente de los encabezados
            const authorizationHeader = response.headers.get('Authorization');
            const token = authorizationHeader ? authorizationHeader.split(' ')[1] : null; // Extraer el token del encabezado
            console.log('Token:', token);

            // Acceder al valor del encabezado 'rol' directamente desde los encabezados
            const rolesHeaderValue = response.headers.get('Role');
            console.log('Valor del encabezado rol:', rolesHeaderValue);

            let roles: string[] = [];
            // Verificar si rolesHeaderValue es una cadena válida
            if (rolesHeaderValue) {
              // Separar los roles utilizando la coma como delimitador y eliminar los corchetes
              const rolesArray = rolesHeaderValue
                  .replace(/\[|\]/g, '') // Eliminar los corchetes
                  .split(',') // Separar los roles utilizando la coma como delimitador

              // Limpiar y normalizar los roles
              roles = rolesArray.map(role => role.trim().toLowerCase());

              console.log('Roles separados:', roles);
            } else {
              console.error('No se encontraron roles en el encabezado.');
            }

            if (response.body != "Usuario o contraseña invalidos") {
              if (token !== null && rolesHeaderValue !== null) {
                this.usuarioService.login(this.email, token, roles).subscribe(
                  response => {
                    console.log('Usuario logeado:', response);
                    this.usuarioService.setLogeo(response);
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
                console.log("Usuario logeado");
                console.log(response.body);
                //localStorage.setItem('token', response.body.token);
              }
            }
          },
          error => {
            console.error('Error al enviar la solicitud:', error);
            alert("Error al logearse");
          }
        );
    }

}
