import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopHeaderComponent } from './top-header.component';

const routes: Routes = [{ path: '', component: TopHeaderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopHeaderRoutingModule { }
