import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SharedModule } from "./modules/shared.module";
import {
  RippleGlobalOptions,
  MAT_RIPPLE_GLOBAL_OPTIONS,
} from "@angular/material/core";
import { HomeModule } from "./modules/home/home.module";
import { BreadcrumbComponent } from "./shared/components/breadcrumb/breadcrumb.component";
import { FlexLayoutModule } from "@angular/flex-layout";

const globalRippleConfig: RippleGlobalOptions = {
  disabled: true,
};

@NgModule({
  declarations: [AppComponent, BreadcrumbComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    HomeModule,
    SharedModule,
  ],
  providers: [
    { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
