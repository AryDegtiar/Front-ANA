import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClasesService } from '../service/clases/clases.service';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  paginadoTop3Productos: any;
  top3Productos: any = [];

  constructor(private ClasesService: ClasesService, private cdr: ChangeDetectorRef) { }

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

  sumarAlCarrito(productoID: String){
    this.ClasesService.sumarVisita(productoID).subscribe(
      (data) => {
        console.log(data);
        this.cdr.detectChanges();
      }
    , error => {
      console.log(error);
    });
  }

}
