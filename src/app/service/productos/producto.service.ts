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

        getProductsPage(page: number){
          return this.http.get(this.url + "/page?page=" + page + "&size=6");
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

        postcrearClase(producto: any){
          return this.http.post(this.url, producto);
        }

        putcrearClase(producto: any){
          return this.http.put(this.url, producto);
        }

        patchcrearClase( producto: any){
          return this.http.patch(this.url, producto);
        }

        deletecrearClase(id: number){
          return this.http.delete(this.url + '/' + id);
        }

}
