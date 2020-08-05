import { NgModule } from '@angular/core';

import { MainLeftNavbarComponent } from './main-left-navbar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [MainLeftNavbarComponent],
  imports: [CommonModule, RouterModule, MaterialModule, NgbModule],
  exports: [MainLeftNavbarComponent],
  providers: [],
  bootstrap: [],
})
export class MainLeftNavbarModule {}
