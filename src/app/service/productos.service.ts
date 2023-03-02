import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
    private url = 'http://localhost:8086/api/v1/productos';

     constructor(private http: HttpClient) {

      }
        getAllProducts(){
          return this.http.get(this.url);
        };

        getProductById(id: number){
          return this.http.get(this.url + '/' + id);
        };

        getProductsPage(page: number){
          return this.http.get(this.url + "/page?page=" + page + "&size=6");
        }


}

