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
    categoriaBlog:{
      id:0,
    },
    admin:""
  }

  constructor(private ArticuloBlogService:ArticuloBlogService, private cdr:ChangeDetectorRef, private router:Router ) { }

  ngOnInit(): void {
  }

  crearArticulo(event: any){
    console.log ("entre a la funcion");

    console.log(this.articulo);

    this.cdr.detectChanges();
  }

}


