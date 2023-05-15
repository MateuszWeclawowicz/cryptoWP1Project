import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICryptolore } from '../interfaces/cryptolore';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CryptowatchlistApiService {

  constructor(private _http: HttpClient) { }
  private _url: string = "http://localhost:5050/crypto/";
  getCrypto(): Observable<any> {
    return this._http.get<ICryptolore>(this._url)
      .pipe(
        tap(data => console.log('crypto data/error' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  addCrypto(crypto: ICryptolore): Observable<any> {
    return this._http.post<ICryptolore>(this._url, crypto)
      .pipe(
        tap(data => console.log('add crypto message/error' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteCrypto(cryptoID: string): Observable<any> {
    let deleteURL = `${this._url}:${cryptoID}`;
    return this._http.delete(deleteURL)
      .pipe(
        tap(data => console.log('del crypto message/error' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  

  private handleError(err: HttpErrorResponse) {
    console.log('CryptowatchlistApiService: ' + err.message);
    return err.message;
  }

}
