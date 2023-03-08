import { Router } from '@angular/router';
import { UsuarioService } from './../../service/usuarios/usuario.service';
import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

    constructor(private usuarioService:UsuarioService, private cdr:ChangeDetectorRef,private router:Router) { }

    ngOnInit(): void {
    }

    login(email:string, password:string){

      this.usuarioService.login(email, password).subscribe(
        res => {
          if (res != null){
            this.usuarioService.setLogeo(res);
            this.cdr.detectChanges();
            this.router.navigate(['/home']);
            //console.log(res);
           //localStorage.setItem('token', res.token);
          }
        },
        err => console.log(err)
      )
    }


}
