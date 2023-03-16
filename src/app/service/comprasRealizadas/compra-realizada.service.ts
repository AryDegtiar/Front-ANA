import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CompraRealizadaService {

  private url = 'http://localhost:8086/api/v1/comprasRealizadas';

  constructor(private http: HttpClient) {

   }
     getAllComprasRealizadas(){
       return this.http.get(this.url);
     };

     getComprasRealizadasById(id: number){
       return this.http.get(this.url + '/' + id);
     };

     getComprasRealizadasPage(page: number){
       return this.http.get(this.url + "/page?page=" + page + "&size=6");
     }

}
