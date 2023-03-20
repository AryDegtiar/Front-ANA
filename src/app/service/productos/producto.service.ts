import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
    private url = 'http://localhost:8086/api/v1/productos';

     constructor(private http: HttpClient) {

      }
        getAllProducts(){
          return this.http.get(this.url);
        };

        getProductById(id: number){
          return this.http.get(this.url + '/' + id);
        };

        getProductsPage(page: number, categoria: string, nivel: string){
          if(categoria == "" && nivel == ""){
            return this.http.get(this.url + "/page?page=" + page + "&size=6");
          }else if(categoria == "" && nivel != ""){
            return this.http.get(this.url + "/filtros?page=" + page + "&size=6&nivel=" + nivel);
          }else if(categoria != "" && nivel == ""){
            return this.http.get(this.url + "/filtros?page=" + page + "&size=6&categoria=" + categoria);
          }else{
            return this.http.get(this.url + "/filtros?page=" + page + "&size=6&categoria=" + categoria + "&nivel=" + nivel);
          }
        }

        gettop3ProductsPage(page: number){
          return this.http.get(this.url + "/page?page=" + page + "&size=3" + "&sort=visitas,desc");
        }

        sumarVisita(productoID: String){
          const sumarVisitaDTO ={
            sumarVisita: true
          }
          return this.http.put(this.url + "/" + productoID + "/sumarVisita", sumarVisitaDTO);
        }
}
