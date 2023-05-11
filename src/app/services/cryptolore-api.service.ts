import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICryptolore } from '../interfaces/cryptolore';
import { catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoloreApiService {

  constructor(private _http : HttpClient) { }
  private _url = "https://api.coinlore.net/api/tickers/?start=";
  getCryptolore(page: number): Observable<any> {
    const start = (page - 1) * 100;
  const url = `${this._url}${start}`;
  return this._http.get<ICryptolore>(url)
    .pipe(
      tap(data => console.log('crypto data/error' + JSON.stringify(data))),
      catchError(this.handleError))
  }
  private handleError (err:HttpErrorResponse) {
    console.log('CryptoloreApiService: ' + err.message);
    return err.message;
  }
}
