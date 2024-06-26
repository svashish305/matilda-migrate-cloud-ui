import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from './templates/template/template.component';
import { TemplateListComponent } from './templates/template-list/template-list.component';
import { AvatarModule, AvatarSource } from 'ngx-avatar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { ResizableModule } from 'angular-resizable-element';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SearchPipeModule } from './searchpipe.module';
import { AddTaskModalContentModule } from './templates/add-task-modal-content/add-task-modal-content.module';
import { EditTagModule } from './templates/edit-tag/edit-tag.module';
import {
  DeviceDetectorService,
  DeviceDetectorModule,
} from 'ngx-device-detector';
import { TemplateDiscoverComponent } from './templates/template-discover/template-discover.component';

const avatarSourcesOrder = [AvatarSource.CUSTOM, AvatarSource.INITIALS];
const avatarColors = ['#5fb8f1', '#012b7a'];

@NgModule({
  declarations: [TemplateComponent, TemplateListComponent, TemplateDiscoverComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    AvatarModule.forRoot({
      colors: avatarColors,
      sourcePriorityOrder: avatarSourcesOrder,
    }),
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    SearchPipeModule,
    DragDropModule,
    ResizableModule,
    NgbModule,
    AddTaskModalContentModule,
    EditTagModule,
    DeviceDetectorModule.forRoot(),
  ],
  exports: [TemplateComponent, TemplateListComponent],
  providers: [],
  bootstrap: [],
})
export class TemplateModule {}
