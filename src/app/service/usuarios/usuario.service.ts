import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = 'http://localhost:8086/api/v1/usuarios';

  usuarioID?: any;
  logeo$ = new BehaviorSubject<any>(this.usuarioID);

  constructor(private http: HttpClient) {

   }
     getAllusuarios(){
       return this.http.get(this.url);
     };

     getusuariosById(id: number){
       return this.http.get(this.url + '/' + id);
     };

     getusuariosPage(page: number){
       return this.http.get(this.url + "/page?page=" + page + "&size=6");
     }

     login(email:string, password:string){
      const usu ={
        email: email,
        password: password
      }
      return this.http.post(this.url + '/login', usu);

     }
//guardo en una variable el usuario logeado

      getLogeo(){
        return this.logeo$;
      }

      setLogeo(usuario: any){
        this.logeo$.next(usuario);
      }

      cerrarSesion(){
        this.logeo$.next(null);
      }
}
