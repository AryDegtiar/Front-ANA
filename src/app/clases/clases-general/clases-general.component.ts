import { ProductoService } from './../../service/productos/producto.service';
import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-clases-general',
  templateUrl: './clases-general.component.html',
  styleUrls: ['./clases-general.component.css', '../../../assets/css/nice-select.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ClasesGeneralComponent implements OnInit {
  productos:any = [ ];
  productosPage:any = [ ];
  dataPaginada : any;
  numPage : number = 0;
  paginadoTop3Productos : any;
  top3Productos : any = [];


  constructor(private productosService: ProductoService, private crd: ChangeDetectorRef){
   }

  ngOnInit(): void {
    /*
   this.productosService.getAllProducts().subscribe(
      (data) => {
        this.productos = data;
        console.log(data);
        console.log("productoslista");
        console.log(this.productos);
        this.crd.detectChanges();
      }
    ); */
    this.getProductPage(this.numPage);
    this.obtenerTop3Productos();
  }
  getProductPage(page: number){
    this.productosService.getProductsPage(this.numPage).subscribe(
      (data) => {
        this.dataPaginada = data;
        this.productosPage = this.dataPaginada.content;
        console.log(this.dataPaginada);
        console.log("productoslista");
        console.log(this.productosPage);
        this.crd.detectChanges();
      }
    );
  }

  siguientePagina(){
    if(this.numPage < this.dataPaginada.totalPages-1){
      this.numPage++;
      this.getProductPage(this.numPage);
    }
  }
  paginaAnterior(){
    if(this.numPage > 0){
      this.numPage--;
      this.getProductPage(this.numPage);
    }
  }

  sumarAlCarrito(productoID: String){
    this.productosService.sumarVisita(productoID).subscribe(
      (data) => {
        console.log(data);
        this.crd.detectChanges();
      }
    , error => {
      console.log(error);
    });
  }

  obtenerTop3Productos(){
    this.productosService.gettop3ProductsPage(0).subscribe(
      (data) => {
        this.paginadoTop3Productos = data;
        this.top3Productos = this.paginadoTop3Productos.content;
        this.crd.detectChanges();
      }
    );
  }

}
