import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelClasesComponent } from './panel-clases/panel-clases.component';
import { PanelArticulosBlogComponent } from './panel-articulos-blog/panel-articulos-blog.component';
import { CrearArticuloBlogComponent } from './crear-articulo-blog/crear-articulo-blog.component';
import { CrearClaseComponent } from './crear-clase/crear-clase.component';
import { ModificarArticuloBlogComponent } from './modificar-articulo-blog/modificar-articulo-blog.component';
import { ModificarClaseComponent } from './modificar-clase/modificar-clase.component';

const routes: Routes = [
  { path: '', component: PanelClasesComponent},
  { path: 'creararticulo', component: CrearArticuloBlogComponent},
  { path: 'crearclase', component: CrearClaseComponent},
  { path: 'modificararticulo', component: ModificarArticuloBlogComponent},
  { path: 'modificarclase', component: ModificarClaseComponent},
  { path: 'panelarticulos', component: PanelArticulosBlogComponent},
  { path: 'panelclases', component: PanelClasesComponent},
  { path: 'home', redirectTo: '' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelAdminRoutingModule { }
