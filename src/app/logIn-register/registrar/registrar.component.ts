import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuarios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrarComponent implements OnInit {

  email: string = "";
  password: string = "";
  nombre: string = "";

  usuarioGuardado: any;
  responseLogin: any;

  constructor(private cdr: ChangeDetectorRef, private usuarioService: UsuarioService,
    private router: Router) { }

  ngOnInit(): void {
  }

  register(event: Event) {
    event.preventDefault();
    this.usuarioService.registrar(this.email, this.password, this.nombre).subscribe(
      (res: any) => {
        alert("Usuario registrado");
        this.cdr.detectChanges();

        // Obtener el usuario logeado después del registro
        this.usuarioService.obtenerUsuarioLogeado(this.email, this.password).then((response) => {
          this.responseLogin = response;
          if (this.responseLogin.body !== "Usuario o contraseña invalidos" &&
              this.responseLogin.token !== null && this.responseLogin.roles !== null) {
            // Realizar el login con los datos obtenidos
            this.usuarioService.login(this.email, this.responseLogin.token, this.responseLogin.roles).subscribe(
              response => {
                let sesion = {
                  token: this.responseLogin.token,
                  roles: this.responseLogin.roles,
                }
                this.usuarioService.setLogeo(response);
                this.usuarioService.setSesion(sesion);
                this.usuarioGuardado = this.usuarioService.getLogeo();
                this.cdr.detectChanges();
                this.router.navigate(['/home']);
              },
              error => {
                console.error('Error al enviar la solicitud:', error);
              }
            );
          }
        }).catch(error => {
          console.error('Error al obtener la respuesta del login:', error);
        });
      },
      (err: any) => {
        alert("Error al registrar usuario");
        this.cdr.detectChanges();
      }
    )
  }

}
