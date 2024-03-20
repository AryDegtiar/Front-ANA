import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelAdminRoutingModule } from './panel-admin-routing.module';
import { ModificarClaseComponent } from './modificar-clase/modificar-clase.component';
import { PanelArticulosBlogComponent } from './panel-articulos-blog/panel-articulos-blog.component';
import { PanelClasesComponent } from './panel-clases/panel-clases.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { PanelUsuariosComponent } from './panel-usuarios/panel-usuarios.component';
import { ModificarCompraComponent } from './modificar-compra/modificar-compra.component';

@NgModule({
  declarations: [
    ModificarClaseComponent,
    PanelArticulosBlogComponent,
    PanelClasesComponent,
    HomeAdminComponent,
    PanelUsuariosComponent,
    ModificarCompraComponent,
  ],
  imports: [
    CommonModule,
    PanelAdminRoutingModule,
    FormsModule
  ]
})
export class PanelAdminModule { }
