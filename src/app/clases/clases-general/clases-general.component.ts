import { ProductosService } from './../../service/productos.service';
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
  

  constructor(private productosService: ProductosService, private crd: ChangeDetectorRef){
   }

  ngOnInit(): void {
   this.productosService.getAllProducts().subscribe(
      (data) => {
        this.productos = data;
        console.log(data);
        console.log("productoslista");
        console.log(this.productos);
        this.crd.detectChanges();
      }
    );
    this.getProductPage(this.numPage);
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

  /*getAllProductos(){
    this.productosService.getAllProducts().subscribe(
      (data) => {
        this.productos = data;
        console.log(data);
        console.log("productoslista");
        console.log(this.productos);
      }
    );
  }*/

}
