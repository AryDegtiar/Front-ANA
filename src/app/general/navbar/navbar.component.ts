import { ChangeDetectionStrategy, Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/service/categorias/categoria.service';
import { UsuarioService } from 'src/app/service/usuarios/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  categorias:any = null;
  estaLogeado = false;
  esUsuario = true;
  esAdmin = false;
  esProfesor = false;

  constructor(private usuarioService: UsuarioService, private cdr: ChangeDetectorRef, private router: Router,
              private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.verificarLogeo();

    this.categoriaService.getAllcategorias().subscribe(data => {
      this.categorias = data;
      this.cdr.detectChanges();
    });
  }

  verificarLogeo(){
    this.usuarioService.getLogeo().subscribe(usuario => {
      console.log("id behavior: " + usuario.id);
      if (usuario.id == null || usuario.id == undefined) {
        this.estaLogeado = false;
      } else {
        let esAdmin = false;
        let esProfesor = false;
        let esUsuario = false;

        let flag = true;
        // Recorremos el array de roles
        for (const rol of usuario.roles) {
          if (flag) {
            // Buscamos el rol "admin" o "profesor"
            switch (rol.nombre) {
              case "ROLE_ADMIN":
                esAdmin = true;
                flag = false;
                // No es necesario seguir buscando si encontramos el rol "admin"
                break;
              case "ROLE_PROFESOR":
                esProfesor = true;
                flag = false;
                break;
              default:
                flag = false;
                break;
            }
          }
        }

        this.esUsuario = esUsuario;
        this.esAdmin = esAdmin;
        this.esProfesor = esProfesor;

        this.estaLogeado = true;
      }
      this.cdr.detectChanges();
    });
  }

  logOut(){
    this.usuarioService.cerrarSesion();
    this.estaLogeado = false;
    this.cdr.detectChanges();
    this.router.navigate(['/home']);
  }

}
