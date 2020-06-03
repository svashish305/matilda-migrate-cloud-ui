import { NgModule } from "@angular/core";

import { MainLeftNavbarComponent } from "./main-left-navbar.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [MainLeftNavbarComponent],
  imports: [CommonModule, RouterModule],
  exports: [MainLeftNavbarComponent],
  providers: [],
  bootstrap: [],
})
export class MainLeftNavbarModule {}
