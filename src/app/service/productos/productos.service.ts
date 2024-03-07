import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private url = 'http://localhost:8086/api/v1/producto';

  constructor(private http: HttpClient) {}

  getProductsPage(page: number, categoria: string, nivel: string){
    if(categoria == "" && nivel == ""){
      return this.http.get(this.url + "/page?page=" + page + "&size=6");
    }else if(categoria == "" && nivel != ""){
      return this.http.get(this.url + "/filtrar?page=" + page + "&size=6&nivel=" + nivel);
    }else if(categoria != "" && nivel == ""){
      return this.http.get(this.url + "/filtrar?page=" + page + "&size=6&categoria=" + categoria);
    }else{
      return this.http.get(this.url + "/filtrar?page=" + page + "&size=6&categoria=" + categoria + "&nivel=" + nivel);
    }
  }

}
