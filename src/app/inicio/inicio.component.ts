import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClasesService } from '../service/clases/clases.service';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
import { CarritoComponentService } from '../service/carrito/carrito.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  paginadoTop3Productos: any;
  top3Productos: any = [];

  constructor(private ClasesService: ClasesService, private cdr: ChangeDetectorRef, private carritoService: CarritoComponentService) { }

  ngOnInit() {
    this.obtenerTop3Productos();
  }

  obtenerTop3Productos(){
    this.ClasesService.gettop3ProductsPage(0).subscribe(
      (data) => {
        this.paginadoTop3Productos = data;
        this.top3Productos = this.paginadoTop3Productos.content;
        this.cdr.detectChanges();
      }
    );
  }

  sumarAlCarrito(producto: any){
    this.ClasesService.sumarVisita(producto.id).subscribe(
      (data) => {
        console.log(data);
        this.cdr.detectChanges();
      }
    , error => {
      console.log(error);
    });
    this.carritoService.addProduct(producto);
    Swal.fire({
      title: 'Articulo agregado al carrito',
      imageUrl: '../../../assets/img/carro-de-la-carretilla.png',
      imageWidth: 70,
      imageHeight: 70,
      imageAlt: 'Custom image',
    });
  }

}
