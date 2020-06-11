import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { MainLeftNavbarModule } from "../main-left-navbar/main-left-navbar.module";
import { TopHeaderModule } from "../top-header/top-header.module";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MainLeftNavbarModule,
    TopHeaderModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
