
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'clases', component: ClasesGeneralComponent },
  { path: 'subclase', component: SubclaseComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegistrarComponent },
  { path: 'about', component: AboutComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'articulos', component: ArticulosComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
