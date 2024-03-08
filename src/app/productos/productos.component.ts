import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ProductosService } from '../service/productos/productos.service';
import { CategoriasProductosService } from '../service/categoriasProductos/categoriasProductos.service';
import Swal from 'sweetalert2';
import { CarritoComponentService } from '../service/carrito/carrito.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  categorias:any = null;
  categoriaSeleccionada = "";
  nivelSeleccionado = "";
  productos:any = [ ];
  productosPage:any = [ ];
  dataPaginada : any;
  totalPages : number = 0;
  numPage : number = 0;
  paginadoTop3Productos : any;
  top3Productos : any = [];

  constructor(private productosService: ProductosService, private categoriaProdService: CategoriasProductosService,
    private crd: ChangeDetectorRef, private carritoService: CarritoComponentService) { }


  ngOnInit(): void {
    this.getProductPage(this.numPage);

    this.categoriaProdService.getAllcategoriasProducto().subscribe(data => {
      this.categorias = data;
      console.log("Categorias:");
      console.log(this.categorias);
      this.crd.detectChanges();
    });
  }


  getProductPage(page: number){
    this.productosService.getProductsPage(this.numPage, this.categoriaSeleccionada, this.nivelSeleccionado).subscribe(
      (data) => {
        this.dataPaginada = data;
        this.productosPage = this.dataPaginada.content;
        this.totalPages = this.dataPaginada.totalPages;
        this.crd.detectChanges();
        console.log("Productos Page:");
        console.log(this.productosPage);
      }
    );
  }

  siguientePagina(){

  }
  paginaAnterior(){

  }

  sumarAlCarrito(producto: any){
    this.carritoService.addProduct(producto);
    Swal.fire({
      title: 'Articulo agregado al carrito',
      imageUrl: '../../../assets/img/carro-de-la-carretilla.png',
      imageWidth: 70,
      imageHeight: 70,
      imageAlt: 'Custom image',
    });
  }


  obtenerTop3Productos(){

  }
}
