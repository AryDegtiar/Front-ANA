import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private url = 'http://localhost:8086/api/v1/categorias';

  constructor(private http: HttpClient) {

   }
     getAllcategorias(){
       return this.http.get(this.url);
     };

     getcategoriasById(id: number){
       return this.http.get(this.url + '/' + id);
     };

     getcategoriasPage(page: number){
       return this.http.get(this.url + "/page?page=" + page + "&size=6");
     }

}
