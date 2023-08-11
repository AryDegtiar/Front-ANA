import { ProductoService } from 'src/app/service/productos/producto.service';
import { ChangeDetectionStrategy,ChangeDetectorRef, Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modificar-clase',
  templateUrl: './modificar-clase.component.html',
  styleUrls: ['./modificar-clase.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModificarClaseComponent {

  clase: any = {
    nombre: "",
    descripcion: "",
    precioPesos: 0,
    precioDolares: 0,
    urlImagen: ""
  }

  constructor(private ProductoService:ProductoService ,private cdr:ChangeDetectorRef, private router:Router) { }

  ngOnInit(): void {
  }

  modificarClase(event:any){
    console.log("entre a la funcion");

    console.log(this.clase);

    this.cdr.detectChanges();
    
    /*
      for (const key in this.clase) {
        for (const elemento of event.target) {
            if (Object.prototype.hasOwnProperty.call(elemento.name, key)) {
                this.clase[key] = elemento.value;
            }
        }
      }

*/
  }

}
