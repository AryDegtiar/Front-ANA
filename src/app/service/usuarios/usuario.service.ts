import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = 'http://localhost:8086/api/v1';

  /* esto arregla el reading id del pricipio pero no sirve para buscar si esta logeado
  usuarioID?: {
    id: number;
    email: string;
    nombre: string;
    roles: any;
  };

  logeo$ = new BehaviorSubject<any>(this.usuarioID);
  */
  logeo$ = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {

   }
     getAllusuarios(){
       return this.http.get(this.url + '/usuarios');
     };

     getusuariosById(id: number){
       return this.http.get(this.url + '/usuarios/' + id);
     };

     getusuariosPage(page: number){
       return this.http.get(this.url + "/usuarios/page?page=" + page + "&size=6");
     }

     login(email: string, token: string, roles: Array<string> ) {
      // Convertir el array de roles en una cadena separada por comas y en mayúscula
      const rolesHeaderValue = roles.length > 0 ? roles.join(', ').toUpperCase() : null;

      // Eliminar los corchetes de la cadena de roles si existen
      const rolesHeaderWithoutBrackets = rolesHeaderValue ? rolesHeaderValue.replace(/\[|\]/g, '') : "";

      // Crear un objeto HttpHeaders con los encabezados
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Role': rolesHeaderWithoutBrackets
      });

      console.log('Encabezados desde obtencion de admin:', headers);

      if (roles.includes('ROLE_ADMIN')) {
        // Realizar la solicitud HTTP GET con los encabezados
        return this.http.get(this.url + '/admins/email/' + email, { headers: headers });
      }else{
        return this.http.get(this.url + '/usuarios/email/' + email, { headers: headers });
      }
    }


      registrar(email:string, password:string, nombre:string){
        const usu ={
          email: email,
          password: password,
          nombre: nombre
        }
        return this.http.post(this.url + '/usuarios/signup', usu);
      }

//guardo en una variable el usuario logeado

      setSesion(sesion: { token: string; roles: string[]; }) {
        localStorage.setItem('sesion', JSON.stringify(sesion));
      }

      getLogeo(){
        return this.logeo$;
      }

      setLogeo(response: any){
        this.logeo$.next(response);
      }

      cerrarSesion(){
        this.logeo$.next(null);
        localStorage.removeItem('sesion');
      }
}
