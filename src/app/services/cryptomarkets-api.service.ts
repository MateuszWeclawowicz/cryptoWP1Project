import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ICryptoloreMarkets } from '../interfaces/cryptoloreMarkets';

@Injectable({
  providedIn: 'root'
})
export class CryptomarketsApiService {
  constructor(private _http: HttpClient) { }
  private _url: string = " https://api.coinlore.net/api/coin/markets/?id=";
  getCryptoMarkets(id: string): Observable<any> {
    return this._http.get<ICryptoloreMarkets>(this._url+id)
      .pipe(
        tap(data => console.log('car data/error' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  

  private handleError(err: HttpErrorResponse) {
    console.log('CryptoloreMarketsApiService: ' + err.message);
    return err.message;
  }

}
