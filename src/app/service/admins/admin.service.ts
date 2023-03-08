import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private url = 'http://localhost:8086/api/v1/admins';

  constructor(private http: HttpClient) {

   }
     getAlladmins(){
       return this.http.get(this.url);
     };

     getadminsById(id: number){
       return this.http.get(this.url + '/' + id);
     };

     getadminsPage(page: number){
       return this.http.get(this.url + "/page?page=" + page + "&size=6");
     }

}
