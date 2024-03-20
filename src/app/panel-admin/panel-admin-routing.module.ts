import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelClasesComponent } from './panel-clases/panel-clases.component';
import { PanelArticulosBlogComponent } from './panel-articulos-blog/panel-articulos-blog.component';
import { ModificarClaseComponent } from './modificar-clase/modificar-clase.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { PanelUsuariosComponent } from './panel-usuarios/panel-usuarios.component';
import { ModificarCompraComponent } from './modificar-compra/modificar-compra.component';

const routes: Routes = [
  { path: '', component: HomeAdminComponent},
  { path: 'modificarclase', component: ModificarClaseComponent},
  { path: 'modificarcompra', component: ModificarCompraComponent},
  { path: 'panelarticulos', component: PanelArticulosBlogComponent},
  { path: 'panelclases', component: PanelClasesComponent},
  { path: 'panelusuarios', component: PanelUsuariosComponent},
  { path: 'home', redirectTo: '' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelAdminRoutingModule { }
