import { Component, OnInit } from '@angular/core';
import { CompraRealizadaService } from '../service/comprasRealizadas/compra-realizada.service';


@Component({
  selector: 'app-historial-compras',
  templateUrl: './historial-compras.component.html',
  styleUrls: ['./historial-compras.component.css']
})
export class HistorialComprasComponent implements OnInit {

  historialCompras: any;

  mostrarHistorial: boolean = false;

  listCompras: any;

  constructor(private comprasRealizadas: CompraRealizadaService) {}

  ngOnInit(): void {
    this.comprasRealizadas.getAllComprasRealizadas().subscribe((res: any) => {
      this.historialCompras = this.convertirComprasRealizadasAHistorialCompras(res);
      if (this.historialCompras.length > 0) {
        this.mostrarHistorial = true;
      }else{
        this.mostrarHistorial = false;
      }

    });
  }

  convertirComprasRealizadasAHistorialCompras(comprasRealizadas: any[]): any[] {
    let historialCompras: any[] = [];

    for (let compra of comprasRealizadas) {
      let prods = this.obtenerProductos(compra);
      let clases = this.obtenerClases(compra);
      historialCompras.push({
        fecha: compra.fecha,
        precio: compra.precio,
        metodoPago: compra.metodoPago,
        estadoCompra: compra.estado,
        clases: clases,
        productos: prods,
      });
    }

    return historialCompras;
  }

  obtenerProductos(compra: any) {
    let productos = [];
    for (let producto of compra.productos) {
      // Buscar el producto en el historial de compras por su nombre
      let productoExistenteIndex = productos.findIndex(item => item.producto.nombre === producto.nombre);

      if (productoExistenteIndex !== -1) {
        // Si el producto ya está en el historial de compras, incrementar su cantidad
        productos[productoExistenteIndex].cantidad += 1;
      } else {
        // Si el producto no está en el historial de compras, agregarlo con cantidad 1
        productos.push({
          producto: producto,
          cantidad: 1
        });
      }
    }
    return productos;
  }

  obtenerClases(compra: any) {
    let clases = [];
    for (let clase of compra.clases) {
      // Buscar la clase en el historial de compras por su nombre
      let claseExistenteIndex = clases.findIndex(item => item.clase.clase.nombre === clase.clase.nombre);

      if (claseExistenteIndex !== -1) {
        // Si la clase ya está en el historial de compras, incrementar su cantidad
        clases[claseExistenteIndex].cantidad += 1;
      } else {
        // Si la clase no está en el historial de compras, agregarla con cantidad 1
        clases.push({
          clase: clase,
          cantidad: 1
        });
      }
    }
    return clases;
  }

}
