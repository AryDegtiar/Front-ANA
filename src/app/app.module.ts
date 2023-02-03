import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './general/navbar/navbar.component';
import { FooterComponent } from './general/footer/footer.component';
import { InicioComponent } from './inicio/inicio.component';
import { ClasesGeneralComponent } from './clases/clases-general/clases-general.component';
import { SubclaseComponent } from './clases/subclase/subclase.component';
import { ContactoComponent } from './contacto/contacto.component';
import { LoginComponent } from './logIn-register/login/login.component';
import { RegistrarComponent } from './logIn-register/registrar/registrar.component';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { ArticulosComponent } from './blog/articulos/articulos.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
      InicioComponent,
      ClasesGeneralComponent,
      SubclaseComponent,
      ContactoComponent,
      LoginComponent,
      RegistrarComponent,
      AboutComponent,
      BlogComponent,
      ArticulosComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
