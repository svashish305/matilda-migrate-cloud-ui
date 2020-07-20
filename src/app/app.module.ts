import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared.module';
import { HomeModule } from './modules/home/home.module';
import { SnackbarComponent } from './shared/components/snackbar/snackbar.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AppComponent, SnackbarComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HomeModule,
    SharedModule,
    MatIconModule
  ],
  entryComponents: [SnackbarComponent],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,  useValue: {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
  }}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
