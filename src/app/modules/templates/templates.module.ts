import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplatesRoutingModule } from './templates-routing.module';
import { TemplatesComponent } from './templates.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AvatarModule, AvatarSource } from 'ngx-avatar';
import { MaterialModule } from '../material.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ResizableModule } from 'angular-resizable-element';
import { SearchPipeModule } from '../searchpipe.module';
import { TemplateModule } from '../template.module';
import { HttpClientModule } from '@angular/common/http';
//import { SimpleNotificationsModule } from 'angular2-notifications';

const avatarSourcesOrder = [AvatarSource.CUSTOM, AvatarSource.INITIALS];
const avatarColors = ['#5fb8f1', '#012b7a'];

@NgModule({
  declarations: [TemplatesComponent],
  imports: [
    CommonModule,
    TemplatesRoutingModule,
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
    //SimpleNotificationsModule.forRoot(),
    SearchPipeModule,
    TemplateModule,
  ],
  exports: [TemplatesComponent],
})
export class TemplatesModule {}
