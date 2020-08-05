import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddTaskModalContentRoutingModule } from './add-task-modal-content-routing.module';
import { AddTaskModalContentComponent } from './add-task-modal-content.component';
import { MaterialModule } from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskGeneralConfigComponent } from './task-general-config/task-general-config.component';
import { TaskInputComponent } from './task-input/task-input.component';
import { TaskOutputComponent } from './task-output/task-output.component';
import { DynamicFormsModule } from './task-input/dynamic-forms/dynamic-forms.module';
import { EditTaskTemplateComponent } from './edit-task-template/edit-task-template.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AddTaskModalContentComponent,
    TaskGeneralConfigComponent,
    TaskInputComponent,
    TaskOutputComponent,
    EditTaskTemplateComponent,
  ],
  imports: [
    CommonModule,
    AddTaskModalContentRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicFormsModule,
    MatSnackBarModule
  ],
  exports: [AddTaskModalContentComponent],
})
export class AddTaskModalContentModule {}
