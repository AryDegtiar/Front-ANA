import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CategoriasProductosService {

  private url = 'http://localhost:8086/api/v1/categoriasProducto';

  constructor(private http: HttpClient) {}

  getAllcategoriasProducto(){
    return this.http.get(this.url);
  }


}
