import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HubRoutingModule } from "./hub-routing.module";
import { HubComponent } from "./hub.component";
import { MainLeftNavbarModule } from "src/app/modules/main-left-navbar/main-left-navbar.module";

@NgModule({
  declarations: [HubComponent],
  imports: [CommonModule, HubRoutingModule, MainLeftNavbarModule],
})
export class HubModule {}
