import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkflowsComponent } from './workflows.component';
import { TemplatesComponent } from '../templates/templates.component';
import { TemplateDiscoverComponent } from '../templates/template-discover/template-discover.component';

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
    children: [
      {
        path: 'discover',
        component: TemplateDiscoverComponent,
        data: { breadcrumb: 'Discover' },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkflowsRoutingModule {}
