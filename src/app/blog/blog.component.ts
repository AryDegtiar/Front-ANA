import { CategoriaBlogService } from './../service/categoriasBlog/categoria-blog.service';
import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ArticuloBlogService } from '../service/articulosBlog/articulo-blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogComponent implements OnInit {
  categorias : any = null;
  dataPaginada : any = null;
  totalPages : number = 0;
  numPage : number = 0;
  articulosblog : any = null;

  constructor(private categoriaService:CategoriaBlogService,private cdr : ChangeDetectorRef, private articuloBlogService:ArticuloBlogService,  private router: Router) {
    }

  ngOnInit() {
    this.categoriaService.getAllcategoriasblog().subscribe(data => {
      this.categorias = data;
      this.cdr.detectChanges();
    });

    this.getarticulosblog(this.numPage);
  }

  getarticulosblog(page: number){

    this.articuloBlogService.getarticulosblogPage(this.numPage).subscribe(
      (data) => {
        this.dataPaginada = data;
        this.articulosblog = this.dataPaginada.content;
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
