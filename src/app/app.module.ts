import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Modulo para peticiones HTTP
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';

// MODULOS
import { GifsModule } from './gifs/gifs.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    GifsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
