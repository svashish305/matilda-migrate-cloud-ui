import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemplatesComponent } from './templates.component';
import { TemplateDiscoverComponent } from './template-discover/template-discover.component';

const routes: Routes = [
  { path: '', component: TemplatesComponent },
  { path: ':id', component: TemplatesComponent },
  {
    path: ':templateId/discover',
    component: TemplateDiscoverComponent,
    data: { breadcrumb: 'Discover' },
  },
  {
    path: 'add-task-modal-content',
    loadChildren: () =>
      import('./add-task-modal-content/add-task-modal-content.module').then(
        (m) => m.AddTaskModalContentModule
      ),
  },
  {
    path: 'edit-tag',
    loadChildren: () =>
      import('./edit-tag/edit-tag.module').then((m) => m.EditTagModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplatesRoutingModule {}
