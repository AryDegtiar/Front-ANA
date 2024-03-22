import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { UsuarioService } from '../usuarios/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoComponentService {

  url = "http://localhost:8086/api/v1";

  public cartItemList : any = [];
  public productList = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient, private usuarioService: UsuarioService) { }

  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addProduct(product: any) {
    let productExist = false;
    for (let i in this.cartItemList) {
      if (this.cartItemList[i].id === product.id && this.cartItemList[i].nombre === product.nombre) {
        this.cartItemList[i].cantidad += 1;
        productExist = true;
        break;
      }
    }
    if (!productExist) {
      Object.assign(product, { cantidad: 1});
      this.cartItemList.push(product);
    }
    this.productList.next(this.cartItemList);
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

  getMetodosPagos(){
    return this.http.get(this.url + '/enums');
  }
/*
  comprar(items:any ,metodoPagoInput:any){
    // creo un arr de idproductos repeditos por la cantidad
    let productosId = [];
    for (let i in items) {
      let cantidad = items[i].cantidad;
      delete items[i].cantidad;
      for (let j = 0; j < cantidad; j++){
        productosId.push(items[i].id);
      }
    }

    let cliente = JSON.parse(localStorage.getItem('usuario') || '{}');

    if (cliente.id != undefined && cliente.id != null){

      const body = {
        publicacionesId: productosId,
        metodoPagoId: metodoPagoInput
      };

      
      let res= this.http.post<any>(this.url + '/cliente/' + cliente.id + '/compraRealizadas', body);
      res.subscribe((data) => {
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
            url("../../../assets/images/Congratulations-Gifs-Transparent-Images.gif")
            center
            no-repeat
          `
        })
        this.removeAllCart();
      });
    }else{
      Swal.fire({
        icon: 'error',
        text: 'Debe iniciar sesión para realizar la compra'
      });
    }
  }
*/

comprar(items:any ,metodoPagoInput:any, grandTotal: any): Observable<boolean> {
  return new Observable<boolean>((observer) => {
    let productos = this.obtenerProductos(items);
    let clases = this.obtenerClases(items);
    
    let estadoCompra = "PENDIENTE";
    if (metodoPagoInput == "MERCADOPAGO"){
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

    let sesionString  = localStorage.getItem('sesion');

    // Analizar la cadena JSON almacenada en sesionString
    let sesion = sesionString ? JSON.parse(sesionString) : null;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sesion.token}`,
      'Role': sesion.roles
    });

    this.http.post<any>(this.url + '/cliente/' + cliente.id + '/compraRealizadas', compra, { headers: headers}).subscribe((data) => {
      if (data == null){
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

  obtenerProductos(items:any){
    let productos = [];
    for (let i in items) {
      if (items[i].tipo == "PRODUCTO"){
        let cantidad = items[i].cantidad;
        //delete items[i].cantidad;
        for (let j = 0; j < cantidad; j++){
          productos.push(items[i].id);
        }
        delete items[i];
      }
    }
    return productos;
  }

  obtenerClases(items:any){
    let clases = [];
    for (let i in items) {
      if (items[i].tipo == "CLASE"){
        let cantidad = items[i].cantidad;
        for (let j = 0; j < cantidad; j++){
          clases.push(items[i].id);
        }
        delete items[i];
      }
    }
    return clases;
  }

}
