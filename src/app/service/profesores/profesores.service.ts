import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {

  constructor(private http: HttpClient) {
  }

  private url = 'http://localhost:8086/api/v1';

  getHeaders(){
    let sesion = localStorage.getItem('sesion');
    let headers = new HttpHeaders();
     if (sesion) {
       const { token, roles } = JSON.parse(sesion);
       headers = headers.set('Authorization', `Bearer ${token}`);
       headers = headers.set('Role', roles.join(', '));
     }
    return headers;
  }

  registrar(email: string, password: string, nombre: string){
    const body = {
      email: email,
      password: password,
      nombre: nombre
    };
    return this.http.post(this.url + '/profesores/register', body, { headers: this.getHeaders() });
  }

  eliminar(id: number){
    let headers = this.getHeaders();
    return this.http.delete(this.url + '/profesores/delete/' + id, { headers: headers });
  }

  modificar(profesor: any){
    let headers = this.getHeaders();
    return this.http.put(this.url + '/profesores/' + profesor.id, profesor, { headers: headers });
  }

  activar(profID: number){
    let headers = this.getHeaders();
    return this.http.put(this.url + '/profesores/activar/' + profID, null, { headers: headers });
  }

  getProfesoresPage(page: number, esActivo: boolean = true){
    let headers = this.getHeaders();
    let size = 10;
    let urlCompleto;
    if (!esActivo) {
      urlCompleto = this.url + "/profesores/page/inactivos?page=" + page + "&size=" + size;
    } else {
      urlCompleto = this.url + "/profesores/page/activos?page=" + page + "&size=" + size;
    }
    return this.http.get(urlCompleto + esActivo, { headers: headers });
  }

}
