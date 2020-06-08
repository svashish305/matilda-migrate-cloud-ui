import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditTagComponent } from './edit-tag.component';

const routes: Routes = [{ path: '', component: EditTagComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditTagRoutingModule { }
