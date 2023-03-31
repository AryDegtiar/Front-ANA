import { ArticuloBlogService } from './../../service/articulosBlog/articulo-blog.service';
import { ChangeDetectionStrategy,ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificar-articulo-blog',
  templateUrl: './modificar-articulo-blog.component.html',
  styleUrls: ['./modificar-articulo-blog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModificarArticuloBlogComponent implements OnInit {

  urlImagen: string = "";
    titulo: string = "";
    video: string = "";
    breveIntroduccion: string = "";
    subtitulo1: string = "";
    descripcion1: string = "";
    subtitulo2: string = "";
    descripcion2: string = "";
    subtitulo3: string = "";
    descripcion3: string = "";
    categoriaBlogId: number = 0;


  articulo: any = {

    urlImagen:"",
    titulo:"",
    video:"",
    breveIntroduccion:"",
    subtitulo1:"",
    descripcion1:"",
    subtitulo2:"",
    descripcion2:"",
    subtitulo3:"",
    descripcion3:"",
    categoriaBlog:"",
    admin:""
  }

  constructor(private ArticuloBlogService:ArticuloBlogService, private cdr:ChangeDetectorRef, private router:Router ) {

  }
  ngOnInit(): void {
  }

  modificarArticulo(event: any){
    console.log ("entre a la funcion");
    console.log (event.target.urlImagen);
    console.log (event.target.titulo);
    console.log (event.target.video);
    console.log (event.target.breveIntroduccion);
    console.log (event.target.subtitulo1);
    console.log (event.target.descripcion1);
    console.log (event.target.subtitulo2);
    console.log (event.target.descripcion2);
    console.log (event.target.subtitulo3);
    console.log (event.target.descripcion3);
    console.log (event.target.categoriaBlogId);
    console.log (event);
    
  }

}
