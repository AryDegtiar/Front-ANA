import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from '../usuarios/usuario.service';
@Injectable({
  providedIn: 'root'
})
export class CompraRealizadaService {

  private url = 'http://localhost:8086/api/v1';

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
       return this.http.get(this.url + "/cliente/" + usuarioID + '/compraRealizadas', { headers: headers });
     };

     getComprasRealizadasById(id: number){
       return this.http.get(this.url + '/cliente/' + id);
     };

     getComprasRealizadasPage(page: number){
       return this.http.get(this.url + "/cliente/page?page=" + page + "&size=6");
     }

     getEstadosCompra(){
      let sesionString  = localStorage.getItem('sesion');

      // Analizar la cadena JSON almacenada en sesionString
      let sesion = sesionString ? JSON.parse(sesionString) : null;

       const headers = new HttpHeaders({
        'Authorization': `Bearer ${sesion.token}`,
        'Role': sesion.roles
      });
        return this.http.get(this.url + "/enums/estadoCompra", { headers: headers });
      }

      updateCompraRealizada(compraRealizada: any){
        let sesionString  = localStorage.getItem('sesion');

        // Analizar la cadena JSON almacenada en sesionString
        let sesion = sesionString ? JSON.parse(sesionString) : null;

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${sesion.token}`,
          'Role': sesion.roles
        });
        return this.http.put(this.url + "/compraRealizada/" + compraRealizada.id, compraRealizada, { headers: headers });
      }

}
