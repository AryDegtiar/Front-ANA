import { ProductoService } from './../../service/productos/producto.service';
import { ChangeDetectionStrategy, Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-crear-clase',
  templateUrl: './crear-clase.component.html',
  styleUrls: ['./crear-clase.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrearClaseComponent  implements OnInit {

  //nombre: string = "";
  //descripcion: string = "";
 // precioPesos: number = 0;
  //precioDolares: number = 0;
  //urlImagen: string = "";

  clase: any = {
    nombre: "",
    descripcion: "",
    precioPesos: 0,
    precioDolares: 0,
    urlImagen: ""
  }

  constructor(private ProductoService:ProductoService, private cdr:ChangeDetectorRef, private router:Router) { }

  ngOnInit(): void {
  }

  crearClase(event:any){
    console.log("entre a la funcion");

    console.log(this.clase);

    this.cdr.detectChanges();
  }

}
