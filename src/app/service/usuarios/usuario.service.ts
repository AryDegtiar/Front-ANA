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
  compraSeleccionada: any;

  constructor(private http: HttpClient) {

   }
     getAllusuarios(){
       let headers = this.getHeaders();
       return this.http.get(this.url + '/usuarios', { headers: headers });
     };

     getusuariosById(id: number){
       return this.http.get(this.url + '/usuarios/' + id);
     };

     getusuariosPage(page: number, esActivo: boolean = true){
       let headers = this.getHeaders();
       return this.http.get(this.url + "/usuarios/page?page=" + page + "&size=10&activo=" + esActivo, { headers: headers });
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

      
      if (roles.includes('ROLE_ADMIN')) {
        // Realizar la solicitud HTTP GET con los encabezados
        return this.http.get(this.url + '/admins/email/' + email, { headers: headers });
      }else{
        return this.http.get(this.url + '/usuarios/email/' + email, { headers: headers });
      }
    }


    async obtenerUsuarioLogeado(email: string, password: string): Promise<any> {
      try {
        const response = await this.http.post<any>('http://localhost:8086/api/v1/login', { email, password }, { observe: 'response' }).toPromise();

        let token: string | null = null;
        let roles: string[] = [];

        if (response) {
          
          // Obtener el token de autorización (Bearer token) directamente de los encabezados
          const authorizationHeader: string | null = response.headers.get('Authorization');
          token = authorizationHeader ? authorizationHeader.split(' ')[1] : null; // Extraer el token del encabezado
          
          // Acceder al valor del encabezado 'rol' directamente desde los encabezados
          const rolesHeaderValue = response.headers.get('Role');
         
          // Verificar si rolesHeaderValue es una cadena válida
          if (rolesHeaderValue) {
            // Separar los roles utilizando la coma como delimitador y eliminar los corchetes
            const rolesArray = rolesHeaderValue
                .replace(/\[|\]/g, '') // Eliminar los corchetes
                .split(',') // Separar los roles utilizando la coma como delimitador

            // Limpiar y normalizar los roles
            roles = rolesArray.map(role => role.trim().toUpperCase());

           }
           else {
            console.error('No se encontraron roles en el encabezado.');
          }
        }

        let sesion = {
          body: response ? response.body : null,
          headers: response ? response.headers : null,
          token: token,
          roles: roles,
        }

        return sesion;
      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        throw new Error('Error al obtener el usuario logeado');
      }
    }

    eliminar(id: number){
      let headers = this.getHeaders();
      return this.http.delete(this.url + '/usuarios/delete/' + id, { headers: headers });
    }

    modificar(usuario: any){
      let headers = this.getHeaders();
      return this.http.put(this.url + '/usuarios/update/'+usuario.id, usuario, { headers: headers });
    }

    activarUsuario(id: number){
      let headers = this.getHeaders();
      return this.http.put(this.url + '/usuarios/activar/' + id, null, { headers: headers });
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

      getHeaders() {
        let sesion = localStorage.getItem('sesion');
        let headers = new HttpHeaders();
         if (sesion) {
           const { token, roles } = JSON.parse(sesion);
           headers = headers.set('Authorization', `Bearer ${token}`);
           headers = headers.set('Role', roles.join(', '));
         }
        return headers;
      }

      getLogeo(){
        return this.logeo$;
      }

      setLogeo(response: any){
        this.logeo$.next(response);
      }

      serCompraSeleccionada(compra: any){
        this.compraSeleccionada = compra;
      }

      getCompraSeleccionada(){
        return this.compraSeleccionada;
      }

      cerrarSesion(){
        this.logeo$.next(null);
        localStorage.removeItem('sesion');
      }
}
