import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopHeaderRoutingModule } from './top-header-routing.module';
import { TopHeaderComponent } from './top-header.component';
import { MaterialModule } from '../material/material.module';
import { AvatarModule } from 'ngx-avatar';
import { BreadcrumbComponent } from 'src/app/shared/components/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [TopHeaderComponent, BreadcrumbComponent],
  imports: [CommonModule, TopHeaderRoutingModule, MaterialModule, AvatarModule],
  exports: [TopHeaderComponent],
})
export class TopHeaderModule {}
