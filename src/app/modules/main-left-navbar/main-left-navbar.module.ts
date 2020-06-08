import { NgModule } from "@angular/core";

import { MainLeftNavbarComponent } from "./main-left-navbar.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../material.module";

@NgModule({
  declarations: [MainLeftNavbarComponent],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [MainLeftNavbarComponent],
  providers: [],
  bootstrap: [],
})
export class MainLeftNavbarModule {}
