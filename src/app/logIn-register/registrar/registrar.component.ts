import { ChangeDetectionStrategy, Component, OnInit,ChangeDetectorRef } from '@angular/core';
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

  constructor(private cdr: ChangeDetectorRef, private usuarioService: UsuarioService,
              private router:Router) { }

  ngOnInit(): void {
  }
/*
  register(){
    console.log(this.email);
    console.log(this.password);
    this.usuarioService.registrar(this.email, this.password).subscribe(
      (res: any) => {
        alert("Usuario registrado");
        console.log(res);
        this.cdr.detectChanges();
      },
      (err: any) => {
        alert("Error al registrar usuario");
        console.log(err);
        this.cdr.detectChanges();
      }
    )
  }
*/
  register(event: Event){
    event.preventDefault();
    console.log(this.email);
    console.log(this.password);
    console.log(this.nombre);
    this.usuarioService.registrar(this.email, this.password, this.nombre).subscribe(
      (res: any) => {
        alert("Usuario registrado");
        this.cdr.detectChanges();

        //this.loginComponent.login(event);

        this.router.navigate(['/home']);
      },
      (err: any) => {
        alert("Error al registrar usuario");
        this.cdr.detectChanges();
      }
    )
  }

}
