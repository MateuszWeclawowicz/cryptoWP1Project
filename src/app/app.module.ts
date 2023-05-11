import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CryptolistComponent } from './components/cryptolist/cryptolist.component';
import { CryptoComponent } from './components/crypto/crypto.component';

@NgModule({
  declarations: [
    AppComponent,
    CryptolistComponent,
    CryptoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
