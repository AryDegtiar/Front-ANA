import { Router } from '@angular/router';
import { ArticuloBlogService } from './../../service/articulosBlog/articulo-blog.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-articulo-blog',
  templateUrl: './crear-articulo-blog.component.html',
  styleUrls: ['./crear-articulo-blog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CrearArticuloBlogComponent implements OnInit {

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

  constructor(private ArticuloBlogService:ArticuloBlogService, private cdr:ChangeDetectorRef, private router:Router ) { }

  ngOnInit(): void {
  }

  crearArticulo(event: any){
    console.log ("entre a la funcion"); 

    // for (let i = 0; i < event.target.length; i++) {
    //   console.log(event.target[i].value);
    // }



    for (const key in this.articulo) {
      for (const elemento of event.target) {
        if (Object.prototype.hasOwnProperty.call(elemento.name, key)) {
            this.articulo[key] = elemento.value;
        }
      }
    }





    // console.log (event.target.urlImagen);
    // console.log (event.target.titulo);
    // console.log (event.target.video);
    // console.log (event.target.breveIntroduccion);
    // console.log (event.target.subtitulo1);
    // console.log (event.target.descripcion1);
    // console.log (event.target.subtitulo2);
    // console.log (event.target.descripcion2);
    // console.log (event.target.subtitulo3);
    // console.log (event.target.descripcion3);
    // console.log (event.target.categoriaBlogId);
    // console.log (event);
  }

}


