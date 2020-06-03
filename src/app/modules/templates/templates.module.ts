import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TemplatesRoutingModule } from "./templates-routing.module";
import { TemplatesComponent } from "./templates.component";
import { MainLeftNavbarModule } from "src/app/components/main-left-navbar/main-left-navbar.module";

@NgModule({
  declarations: [TemplatesComponent],
  imports: [CommonModule, TemplatesRoutingModule, MainLeftNavbarModule],
})
export class TemplatesModule {}
