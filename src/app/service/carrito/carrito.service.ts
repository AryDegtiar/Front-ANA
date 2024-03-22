import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { UsuarioService } from '../usuarios/usuario.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CarritoComponentService {

  url = "http://localhost:8086/api/v1";

  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient, private usuarioService: UsuarioService, private datePipe: DatePipe) { }

  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  /*
    addProduct(product: any) {
      let productExist = false;
      for (let i in this.cartItemList) {
        if (product.tipo != 'CLASE' && this.cartItemList[i].id === product.id && this.cartItemList[i].nombre === product.nombre) {
          console.log("Producto ya agregado");
          this.cartItemList[i].cantidad += 1;
          productExist = true;
        }
      }
      if (!productExist) {
        console.log("Producto no agregado");
        Object.assign(product, { cantidad: 1 });
        this.cartItemList.push(product);
      }

      this.productList.next(this.cartItemList);
      console.log("Productos en el carrito: ");
      console.log(this.cartItemList);
      console.log("Productos en el prodcrList: ");
      console.log(this.productList);
    }
    */
  addProduct(product: any) {
    let productExist = false;
    let seAgrego = true;
    for (let i = 0; i < this.cartItemList.length; i++) {
      const item = this.cartItemList[i];
      if (product.tipo !== 'CLASE' && item.id === product.id && item.nombre === product.nombre) {
        item.cantidad += 1;
        productExist = true;
        break;
      } else if (product.tipo === 'CLASE' && item.tipo === 'CLASE' &&
        item.id === product.id && item.nombre === product.nombre &&
        item.horarioClase.id === product.horarioClase.id) {
        productExist = true;
        seAgrego = false;
        break;
      }
    }
    if (!productExist) {
      ;
      const productCopy = Object.assign({}, product); // Crear una copia para no modificar el original
      productCopy.cantidad = 1;
      this.cartItemList.push(productCopy);
    } else if (product.tipo === 'CLASE' && !productExist) {
      const productCopy = Object.assign({}, product); // Crear una copia para no modificar el original
      productCopy.cantidad = 1;
      this.cartItemList.push(productCopy);
    }

    this.productList.next(this.cartItemList);
    return seAgrego;
  }


  decrementProduct(product: any) {
    for (let [index, p] of this.cartItemList.entries()) {
      if (p.id === product.id) {
        this.cartItemList[index].cantidad -= 1;
        if (this.cartItemList[index].cantidad == 0) {
          this.cartItemList.splice(index, 1);
        }
      }
    }
    this.productList.next(this.cartItemList);
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.cantidad * a.precioPesos;
    })
    return grandTotal;
  }

  removeCartItem(product: any) {
    for (let [index, p] of this.cartItemList.entries()) {
      if (p.id === product.id) {

        this.cartItemList.splice(index, 1);

      }
    }
    this.productList.next(this.cartItemList);
  }

  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }

  getTotalCant() {
    let cant = 0;
    this.cartItemList.map((a: any) => {
      cant += a.cantidad;
    })
    return cant;
  }

  getMetodosPagos() {
    return this.http.get(this.url + '/enums');
  }
  /*
  comprar(items: any, metodoPagoInput: any, grandTotal: any): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      let productos = this.obtenerProductos(items);
      console.log("productos obtenidos: " + JSON.stringify(productos));
      let clases = this.obtenerClases(items);
      console.log("clases obtenidas: " + JSON.stringify(clases));

      let estadoCompra = "PENDIENTE";
      if (metodoPagoInput == "MERCADOPAGO") {
        estadoCompra = "PAGADO";
      }

      let compra = {
        precio: grandTotal,
        metodoPago: metodoPagoInput,
        estado: estadoCompra,
        productos: productos,
        clases: clases
      }

      let cliente = this.usuarioService.getLogeo().getValue();

      let sesionString = localStorage.getItem('sesion');

      // Analizar la cadena JSON almacenada en sesionString
      let sesion = sesionString ? JSON.parse(sesionString) : null;

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${sesion.token}`,
        'Role': sesion.roles
      });

      this.http.post<any>(this.url + '/cliente/' + cliente.id + '/compraRealizadas', compra, { headers: headers }).subscribe((data) => {
        if (data == null) {
          observer.error('No se pudo realizar la compra');
        } else {
          Swal.fire({
            title: '¡Gracias por tu compra!',
            text: 'Nos esforzamos para que tu experiencia sea la mejor posible',
            width: 600,
            padding: '3em',
            color: '#00000',
            background: '#fff',
            icon: 'success',
            backdrop: `
            rgba(0, 167, 0, 0.2)
          `
          }).then(() => {
            observer.next(true);
            observer.complete();
          });
        }
      }, (error) => {
        observer.error('No se pudo realizar la compra');
      });
    });
  }
*/

  comprar(items: any, metodoPagoInput: any, grandTotal: any): Observable<boolean> {
    console.log("service comprar: ");
    return new Observable<boolean>((observer) => {
      let productos = this.obtenerProductos(items);
      console.log("productos obtenidos: " + JSON.stringify(productos));
      let clases = this.obtenerClases(items);
      console.log("clases obtenidas: " + JSON.stringify(clases));

      let estadoCompra = "PENDIENTE";
      if (metodoPagoInput == "MERCADOPAGO") {
        estadoCompra = "PAGADO";
      }

      let compra = {
        precio: grandTotal,
        metodoPago: metodoPagoInput,
        estado: estadoCompra,
        productos: productos,
        clases: clases
      }

      console.log("compra: ");
      console.log(compra);

      let cliente = this.usuarioService.getLogeo().getValue();

      let sesionString = localStorage.getItem('sesion');

      // Analizar la cadena JSON almacenada en sesionString
      let sesion = sesionString ? JSON.parse(sesionString) : null;

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${sesion.token}`,
        'Role': sesion.roles
      });

      this.http.post<any>(this.url + '/cliente/' + cliente.id + '/compraRealizadas', compra, { headers: headers }).subscribe((data) => {
        if (data == null) {
          observer.error('No se pudo realizar la compra');
        } else {
          Swal.fire({
            title: '¡Gracias por tu compra!',
            text: 'Nos esforzamos para que tu experiencia sea la mejor posible',
            width: 600,
            padding: '3em',
            color: '#00000',
            background: '#fff',
            icon: 'success',
            backdrop: `
          rgba(0, 167, 0, 0.2)
        `
          }).then(() => {
            observer.next(true);
            observer.complete();
          });
        }
      }, (error) => {
        observer.error('No se pudo realizar la compra');
      });
    });
  }
  obtenerProductos(items: any) {
    let productos = [];
    for (let item of items) {
      if (item.tipo === "PRODUCTO") {
        let cantidad = item.cantidad;
        for (let j = 0; j < cantidad; j++) {
          productos.push(item.id);
        }
      }
    }
    return productos;
  }

/*
  obtenerClases(items: any) {
    let clases: any = [];
    for (let i in items) {
      if (items[i].tipo == "CLASE") {
        let cantidad = items[i].cantidad;
        for (let j = 0; j < cantidad; j++) {
          clases.push(items[i].id);
        }
        delete items[i];
      }
    }
    return clases;
  }
*/
obtenerClases(items: any) {
  let clases = [];

  // Verificar si la lista 'items' no está vacía
  if (items && items.length > 0) {
    for (let clase of items) {
      // Verificar si la clase tiene la propiedad 'horarioClase'
      if (clase.horarioClase) {
        let hora = clase.horarioClase.hora;
        if (typeof hora === 'string' && hora.includes(':')) {
          // Formatear la hora manualmente
          let parts = hora.split(':');
          hora = new Date(0, 0, 0, parseInt(parts[0]), parseInt(parts[1]), parseInt(parts[2]));
        }
        let horarioClase = {
          id: clase.horarioClase.id,
          activo: clase.horarioClase.activo,
          dia: clase.horarioClase.dia,
          hora: hora + '.000'
        };
        let claseObj = {
          claseId: clase.id,
          cantidadDisponible: 4,
          diaHorarioClaseId: horarioClase.id
        };
        clases.push(claseObj);
      } else {
        console.log('La clase no tiene la propiedad "horarioClase" definida:', clase);
      }
    }
  } else {
    console.log('La lista "items" está vacía o no está definida.');
  }

  return clases;
}



}
