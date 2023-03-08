import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaBlogService {

  private url = 'http://localhost:8086/api/v1/categoriasblog';

  constructor(private http: HttpClient) {

   }
     getAllcategoriasblog(){
       return this.http.get(this.url);
     };

     getcategoriasblogById(id: number){
       return this.http.get(this.url + '/' + id);
     };

     getcategoriasblogPage(page: number){
       return this.http.get(this.url + "/page?page=" + page + "&size=6");
     }
}
