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
    this.usuarioService.getLogeo().subscribe(id => {
      console.log("id behavior: " + id);
      if (id == null || id == undefined) {
        this.estaLogeado = false;
      } else {
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
