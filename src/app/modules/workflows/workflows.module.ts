import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowsRoutingModule } from './workflows-routing.module';
import { WorkflowsComponent } from './workflows.component';
import { MaterialModule } from '../material/material.module';
import { AvatarModule, AvatarSource } from 'ngx-avatar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ResizableModule } from 'angular-resizable-element';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipeModule } from '../searchpipe.module';
import { HttpClientModule } from '@angular/common/http';
import { WorkflowModule } from '../workflow.module';
import { TemplatesModule } from '../templates/templates.module';

const avatarSourcesOrder = [AvatarSource.CUSTOM, AvatarSource.INITIALS];
const avatarColors = ['#5fb8f1', '#012b7a'];

@NgModule({
  declarations: [WorkflowsComponent],
  imports: [
    CommonModule,
    WorkflowsRoutingModule,
    MaterialModule,
    MaterialModule,
    DragDropModule,
    ResizableModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AvatarModule.forRoot({
      colors: avatarColors,
      sourcePriorityOrder: avatarSourcesOrder,
    }),
    SearchPipeModule,
    WorkflowModule,
    TemplatesModule,
  ],
  exports: [WorkflowsComponent],
})
export class WorkflowsModule {}
