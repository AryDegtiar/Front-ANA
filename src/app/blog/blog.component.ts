import { CategoriaBlogService } from './../service/categoriasBlog/categoria-blog.service';
import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ArticuloBlogService } from '../service/articulosBlog/articulo-blog.service';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogComponent implements OnInit {
  categorias : any;
  dataPaginada : any;
  numPage : number = 0;
  articulosblog : any;

  constructor(private categoriaService:CategoriaBlogService,private cdr : ChangeDetectorRef, private articuloBlogService:ArticuloBlogService) {
    }

  ngOnInit() {
    this.categoriaService.getAllcategoriasblog().subscribe(data => {
      this.categorias = data;
      console.log("categorias");
      console.log(this.categorias);
    });
  }
  redirigirACategoria(){

    console.log("redirigirACategoria");
  }

  getarticulosblog(page: number){

    this.articuloBlogService.getarticulosblogPage(this.numPage).subscribe(
      (data) => {
        this.dataPaginada = data;
        this.articulosblog = this.dataPaginada.content;
        console.log(this.dataPaginada);
        console.log("articulosbloglista");
        console.log(this.articulosblog);
        this.cdr.detectChanges();
      }
    );
  }

  siguientePagina(){
    if(this.numPage < this.dataPaginada.totalPages-1){
      this.numPage++;
      this.getarticulosblog(this.numPage);
    }
  }
  paginaAnterior(){
    if(this.numPage > 0){
      this.numPage--;
      this.getarticulosblog(this.numPage);
    }
  }


}
