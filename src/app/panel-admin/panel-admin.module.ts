import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelAdminRoutingModule } from './panel-admin-routing.module';
import { ModificarClaseComponent } from './modificar-clase/modificar-clase.component';
import { PanelClasesComponent } from './panel-clases/panel-clases.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { PanelUsuariosComponent } from './panel-usuarios/panel-usuarios.component';
import { ModificarCompraComponent } from './modificar-compra/modificar-compra.component';
import { PanelProfesoresComponent } from './panel-profesores/panel-profesores.component';

@NgModule({
  declarations: [
    ModificarClaseComponent,
    PanelClasesComponent,
    HomeAdminComponent,
    PanelUsuariosComponent,
    ModificarCompraComponent,
    PanelProfesoresComponent,
  ],
  imports: [
    CommonModule,
    PanelAdminRoutingModule,
    FormsModule
  ]
})
export class PanelAdminModule { }
