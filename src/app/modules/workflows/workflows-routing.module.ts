import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkflowsComponent } from './workflows.component';
import { TemplatesComponent } from '../templates/templates.component';

const routes: Routes = [
  { path: '', component: WorkflowsComponent },
  {
    path: ':id',
    component: WorkflowsComponent,
  },
  {
    path: ':workflowId/templates/:id',
    component: TemplatesComponent,
    data: { breadcrumb: 'Templates' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkflowsRoutingModule {}
