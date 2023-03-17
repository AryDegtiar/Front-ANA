import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelAdminRoutingModule } from './panel-admin-routing.module';
import { ModificarArticuloBlogComponent } from './modificar-articulo-blog/modificar-articulo-blog.component';
import { ModificarClaseComponent } from './modificar-clase/modificar-clase.component';
import { PanelArticulosBlogComponent } from './panel-articulos-blog/panel-articulos-blog.component';
import { PanelClasesComponent } from './panel-clases/panel-clases.component';
import { CrearArticuloBlogComponent } from './crear-articulo-blog/crear-articulo-blog.component';
import { CrearClaseComponent } from './crear-clase/crear-clase.component';

@NgModule({
  declarations: [
    CrearArticuloBlogComponent,
    CrearClaseComponent,
    ModificarArticuloBlogComponent,
    ModificarClaseComponent,
    PanelArticulosBlogComponent,
    PanelClasesComponent
  ],
  imports: [
    CommonModule,
    PanelAdminRoutingModule
  ]
})
export class PanelAdminModule { }
