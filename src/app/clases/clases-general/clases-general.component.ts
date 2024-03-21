import { ClasesService } from '../../service/clases/clases.service';
import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CategoriaService } from 'src/app/service/categorias/categoria.service';
import Swal from 'sweetalert2';
import { CarritoComponentService } from 'src/app/service/carrito/carrito.service';

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
  diaHorarioSelected: any = {producto: null, diaHorario: null};


  constructor(private productosService: ClasesService, private crd: ChangeDetectorRef,
              private categoriaService: CategoriaService, private carritoService: CarritoComponentService){}

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

  sumarAlCarrito(producto: any){
    if(this.diaHorarioSelected.producto != null && this.diaHorarioSelected.producto.id == producto.id){
      producto.horarioClase = this.diaHorarioSelected.diaHorario;
      this.productosService.sumarVisita(producto.id).subscribe(
        (data) => {
          console.log(data);
          this.crd.detectChanges();
        }
      , error => {
        console.log(error);
      });
      this.carritoService.addProduct(producto);
      Swal.fire({
        title: 'Articulo agregado al carrito',
        imageUrl: '../../../assets/img/carro-de-la-carretilla.png',
        imageWidth: 70,
        imageHeight: 70,
        imageAlt: 'Custom image',
      });
      this.diaHorarioSelected = {producto: null, diaHorario: null};
    }else{
      Swal.fire({
        title: 'Debe seleccionar un horario para la clase',
        icon: 'info',
        showConfirmButton: false,
        timer: 1500
      });
    }

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

  selectDiaHorario(producto: any, diaHorario: any){
    this.diaHorarioSelected = {producto: producto, diaHorario: diaHorario};
    console.log(this.diaHorarioSelected);
  }
}
