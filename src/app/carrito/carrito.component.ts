import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CarritoComponentService } from '../service/carrito/carrito.service';
import { UsuarioService } from '../service/usuarios/usuario.service';

@Component({
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  public items: any[] = [];

  public grandTotal: number = 0;

  public cantItems: number = 0;

  metodosPagos: any[] = [];

  metodoPagoInput: any = null;


  constructor(private cartService: CarritoComponentService, private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cartService.getProducts().subscribe((res: any) => {
      this.items = res;
      this.grandTotal = this.cartService.getTotalPrice();
      this.cantItems = this.cartService.getTotalCant();
      /*
      console.log("res: " + JSON.stringify(res));
      console.log("items: " + JSON.stringify(this.items));
      console.log("grandTotal: " + this.grandTotal);
      console.log("cantItems: " + this.cantItems);
      */

    });

    this.cartService.getMetodosPagos().subscribe((res: any) => {
      this.metodosPagos = res;
    });
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
    if(this.items.length == 0){
      this.metodosPagos = [];
    }
  }

  removeAll() {
    this.cartService.removeAllCart();
    console.log("items: " + JSON.stringify(this.items));
  }

  decrement(item: any) {
    this.cartService.decrementProduct(item);
  }

  increment(item: any) {
    this.cartService.addProduct(item);
  }

  comprar() {
    let datosCorrectos = this.verificarDatosCarrito();

    if (datosCorrectos) {
      this.cartService.comprar(this.items, this.metodoPagoInput, this.grandTotal).subscribe(compraExitosa => {
        if (compraExitosa) {
          // Si la compra fue exitosa, borra el carrito
          this.cartService.removeAllCart();
          this.router.navigate(['/historial']);
        }
      });
    }
  }


  verificarDatosCarrito(){
      let res = false;
      if (this.items.length == 0) {
        //this.removeAll();
        Swal.fire({
          icon: 'error',
          text: 'No hay productos en el carrito'
        });
      } else if (this.metodoPagoInput != null || (this.metodoPagoInput != undefined)) {
        let logeoValue = this.usuarioService.getLogeo().getValue();
        if (logeoValue == null) {
          console.log("entre en el get logeo");
          Swal.fire({
            icon: 'info',
            text: 'Debe logearse para comprar'
          }).then((result) => {
            if (result) {
              this.router.navigate(['login']);
            }
          });

        }else{
          //this.cartService.comprar(this.items ,this.metodoPagoInput, this.direccionInput);
          res = true;
        }
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Debe seleccionar un metodo de pago'
        });
      }

      return res;
  }

}
