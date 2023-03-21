import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticuloBlogService } from 'src/app/service/articulosBlog/articulo-blog.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticulosComponent implements OnInit {
  id: any;
  articulosblog : any = null;

  constructor(private articuloBlogService : ArticuloBlogService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.obtenerArticulos(this.id);
  }

  obtenerArticulos(id: any){
    this.articuloBlogService.getarticulosblogById(id).subscribe((data) => {
        this.articulosblog = data;
    });
  }


}
