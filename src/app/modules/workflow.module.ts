import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule, AvatarSource } from 'ngx-avatar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { ResizableModule } from 'angular-resizable-element';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { WaveListComponent } from './workflows/wave-list/wave-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SearchPipeModule } from './searchpipe.module';
import { TemplateModule } from './template.module';
import { RouterModule } from '@angular/router';
import { WaveComponent } from './workflows/wave/wave.component';
import { EditTagModule } from './templates/edit-tag/edit-tag.module';

const avatarSourcesOrder = [AvatarSource.CUSTOM, AvatarSource.INITIALS];
const avatarColors = ['#5fb8f1', '#012b7a'];

@NgModule({
  declarations: [WaveComponent, WaveListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    AvatarModule.forRoot({
      colors: avatarColors,
      sourcePriorityOrder: avatarSourcesOrder,
    }),
    RouterModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    DragDropModule,
    ResizableModule,
    SearchPipeModule,
    TemplateModule,
    EditTagModule,
    NgbModule,
  ],
  exports: [WaveComponent, WaveListComponent],
  providers: [],
  bootstrap: [],
})
export class WorkflowModule {}
