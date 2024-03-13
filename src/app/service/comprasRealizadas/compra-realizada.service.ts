import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from '../usuarios/usuario.service';
@Injectable({
  providedIn: 'root'
})
export class CompraRealizadaService {

  private url = 'http://localhost:8086/api/v1/cliente';

  constructor(private http: HttpClient, private usuarioService: UsuarioService) {

   }
     getAllComprasRealizadas(){
       let usuarioID = this.usuarioService.getLogeo().getValue().id;

       let sesionString  = localStorage.getItem('sesion');

      // Analizar la cadena JSON almacenada en sesionString
      let sesion = sesionString ? JSON.parse(sesionString) : null;

       const headers = new HttpHeaders({
        'Authorization': `Bearer ${sesion.token}`,
        'Role': sesion.roles
      });
       return this.http.get(this.url + "/" + usuarioID + '/compraRealizadas', { headers: headers });
     };

     getComprasRealizadasById(id: number){
       return this.http.get(this.url + '/' + id);
     };

     getComprasRealizadasPage(page: number){
       return this.http.get(this.url + "/page?page=" + page + "&size=6");
     }

}
