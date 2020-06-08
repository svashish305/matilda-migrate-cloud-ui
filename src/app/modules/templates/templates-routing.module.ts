import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemplatesComponent } from './templates.component';

const routes: Routes = [{ path: '', component: TemplatesComponent }, { path: 'add-task-modal-content', loadChildren: () => import('./add-task-modal-content/add-task-modal-content.module').then(m => m.AddTaskModalContentModule) }, { path: 'edit-tag', loadChildren: () => import('./edit-tag/edit-tag.module').then(m => m.EditTagModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplatesRoutingModule { }
