import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelClasesComponent } from './panel-clases/panel-clases.component';

const routes: Routes = [{ path: '', component: PanelClasesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelAdminRoutingModule { }
