import { ChangeDetectionStrategy, Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/service/categorias/categoria.service';
import { UsuarioService } from 'src/app/service/usuarios/usuario.service';
import { CarritoComponentService } from 'src/app/service/carrito/carrito.service';
import { BehaviorSubject } from 'rxjs';

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
  totalItems = 0;

  constructor(private usuarioService: UsuarioService, private cdr: ChangeDetectorRef, private router: Router,
              private categoriaService: CategoriaService, private cartService: CarritoComponentService) { }

  ngOnInit(): void {
    this.verificarLogeo();

    this.categoriaService.getAllcategorias().subscribe(data => {
      this.categorias = data;
      this.cdr.detectChanges();
    });

    this.cartService.getProducts().subscribe((data: any) => {
      this.totalItems = 0;
      for (let i = 0; i < data.length; i++) {
        this.totalItems += data[i].cantidad;
      }
      console.log("totalItems: " + this.totalItems);
      this.cdr.detectChanges();
      console.log("totalItems despues del cmabio: " + this.totalItems);
    });

  }

  verificarLogeo(){
    console.log("verificarLogeo");
    this.usuarioService.getLogeo().subscribe(usuario => {
      console.log("usuario behaviorSubject: " + JSON.stringify(usuario));
      if (usuario.id == null || usuario.id == undefined) {
        this.estaLogeado = false;
      } else {
        let esAdmin = false;
        let esProfesor = false;
        let esUsuario = false;

        let flag = true;

        // si es admin la estructura es usuario.roles
        let usuarioRoles = usuario.roles;
        // si es usuario la estructura es usuario.user.roles
        if (usuarioRoles == null && usuarioRoles == undefined) {
          usuarioRoles = usuario.user.roles;
        }

        // Recorremos el array de roles
        for (const rol of usuarioRoles) {
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
                esUsuario = true;
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
    this.esUsuario = true;
    this.esAdmin = false;
    this.esProfesor = false;
    this.cdr.detectChanges();
    this.router.navigate(['/home']);
  }

}
