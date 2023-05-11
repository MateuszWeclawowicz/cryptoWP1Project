import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CryptolistComponent } from './components/cryptolist/cryptolist.component';
import { CryptoComponent } from './components/crypto/crypto.component';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationControlsComponent } from 'ngx-pagination';
import { PaginationControlsDirective } from 'ngx-pagination';
const routes: Routes = [
  { path: '', component: CryptolistComponent },
  { path: 'about', component: AboutComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    CryptolistComponent,
    CryptoComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
