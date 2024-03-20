import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuarios/usuario.service';
import { CompraRealizadaService } from 'src/app/service/comprasRealizadas/compra-realizada.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificar-compra',
  templateUrl: './modificar-compra.component.html',
  styleUrls: ['./modificar-compra.component.css']
})
export class ModificarCompraComponent {
date: any;

  constructor(private usuarioService: UsuarioService, private compraRealizadasService: CompraRealizadaService, private router: Router) { }

  ngOnInit(): void {
    this.datosUsuario = this.usuarioService.getCompraSeleccionada().user;
    console.log("data: " + JSON.stringify(this.usuarioService.getCompraSeleccionada()));
    this.historialCompras = this.convertirComprasRealizadasAHistorialCompras(this.usuarioService.getCompraSeleccionada().comprasRealizadas).reverse();
    console.log("datosUsuario: " + JSON.stringify(this.datosUsuario));
    console.log("historialCompras: " + JSON.stringify(this.historialCompras));

    this.compraRealizadasService.getEstadosCompra().subscribe((data: any) => {
      this.estadosCompra = data;
      console.log("estadosCompra: " + JSON.stringify(this.estadosCompra));
    }, (error: any) => {
      console.log("Error al obtener los estados de compra: " + error);
    });
  }

  datosUsuario: any;
  historialCompras: any;
  estadosCompra: any;

  convertirComprasRealizadasAHistorialCompras(comprasRealizadas: any[]): any[] {
    let historialCompras: any[] = [];

    for (let compra of comprasRealizadas) {
      let prods = this.obtenerProductos(compra);
      let clases = this.obtenerClases(compra);
      historialCompras.push({
        id: compra.id,
        fecha: compra.fecha,
        precio: compra.precio,
        metodoPago: compra.metodoPago,
        estadoCompra: compra.estado,
        clases: clases,
        productos: prods,
      });
      console.log("historialCompras en el loop: " + JSON.stringify(historialCompras));
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
      clases.push({
          clase: clase,
          cantidad: 1
      });

    }
    return clases;
  }

  cambiarCantClasesDisp(event: any, indiceCompra: number, indiceClase: number) {
    const nuevoValor = event.target.value;

    if (nuevoValor !== null) {
      const compra = this.historialCompras[indiceCompra];
      compra.clases[indiceClase].clase.cantidadDisponible = parseInt(nuevoValor);
      this.historialCompras[indiceCompra] = compra;
    }
  }


  guardarCambios() {
    // Se recorre el historial de compras y se envía cada compra a la base de datos
    for (let compra of this.historialCompras) {

      let clases = [];
      for (let clase of compra.clases) {

        let claseDTO: any = {
          id: clase.clase.id, // Cambiado aquí
          cantidadDisponible: clase.clase.cantidadDisponible // Cambiado aquí
        };
        clases.push(claseDTO);
      }

      let historialCompras: any = {
        id: compra.id,
        precio: compra.precio,
        metodoPago: compra.metodoPago,
        estadoCompra: compra.estadoCompra, // Agregando el estado de compra
        clases: clases, // Cambiado aquí
        productos: compra.productos
      };

      // Enviar la compra a la base de datos
      this.compraRealizadasService.updateCompraRealizada(historialCompras).subscribe(
        (data: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Cambios guardados',
            text: 'Los cambios se han guardado correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/paneladmin/panelusuarios']);
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error al guardar los cambios',
            showConfirmButton: false,
            timer: 1500
          });
        }
      );

    }
  }



}
