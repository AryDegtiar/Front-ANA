import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ArticuloBlogService {

  private url = 'http://localhost:8086/api/v1/articulosblog';

  constructor(private http: HttpClient) {

   }
     getAllarticulosblog(){
       return this.http.get(this.url);
     };

     getarticulosblogById(id: number){
       return this.http.get(this.url + '/' + id);
     };

     getarticulosblogPage(page: number){
       return this.http.get(this.url + "/page?page=" + page + "&size=6");
     }

     postarticulosBlog(articulo: any){
      return this.http.post(this.url, articulo);
     }

     putarticulosBlog(articulo: any){
      return this.http.put(this.url, articulo);
     }
     patcharticulosBlog(articulo: any){
      return this.http.patch(this.url, articulo);
     }
     deletearticulosBlog(id: number){
        return this.http.delete(this.url + '/' + id);
     }


}
