import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
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
import { CarritoComponent } from './carrito/carrito.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HistorialComprasComponent } from './historial-compras/historial-compras.component';
import { ProductosComponent } from './productos/productos.component';
import { DatePipe } from '@angular/common'; // Importar DatePipe desde @angular/common

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
    ArticulosComponent,
    CarritoComponent,
    HistorialComprasComponent,
    ProductosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  providers: [
    DatePipe // Agregar DatePipe como un proveedor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
