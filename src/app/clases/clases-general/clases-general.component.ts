import { ClasesService } from '../../service/clases/clases.service';
import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CategoriaService } from 'src/app/service/categorias/categoria.service';

@Component({
  selector: 'app-clases-general',
  templateUrl: './clases-general.component.html',
  styleUrls: ['./clases-general.component.css', '../../../assets/css/nice-select.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ClasesGeneralComponent implements OnInit {
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


  constructor(private productosService: ClasesService, private crd: ChangeDetectorRef,
              private categoriaService: CategoriaService){}

  ngOnInit(): void {
    this.getProductPage(this.numPage);
    this.obtenerTop3Productos();

    this.categoriaService.getAllcategorias().subscribe(data => {
      this.categorias = data;
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
