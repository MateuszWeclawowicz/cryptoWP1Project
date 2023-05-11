import { Component, Input } from '@angular/core';
import { ICryptolore, NewCrypto } from 'src/app/interfaces/cryptolore';
import { CryptowatchlistApiService } from 'src/app/services/cryptowatchlist-api.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.css']
})
export class CryptoComponent implements OnInit{
  @Input() crypto!: ICryptolore;
  public cryptoData:ICryptolore | any;
  public checkCrypto:ICryptolore[] | any;
  cryptoAdded: boolean = false;
  constructor(private _cryptowatchlistApiService: CryptowatchlistApiService) { }
  ngOnInit(): void {
    this.getCheckCrypto();
  }
  getCheckCrypto() {
    this._cryptowatchlistApiService.getCrypto().subscribe(checkCrypto =>
      { this.checkCrypto = checkCrypto
        console.log(this.checkCrypto);
    });
    
  }
  addToWatchlist(crypto:ICryptolore){
    this.getCheckCrypto();
    
    if(this.checkCrypto){
        this.checkCrypto.forEach((c : ICryptolore)=>{
        if(c.id == crypto.id){
          alert("Crypto already in watchlist!");
          this.cryptoAdded = true;
        }
      })
    }
    if(this.cryptoAdded == false){
    crypto = new NewCrypto(crypto.id, crypto.symbol, crypto.name, crypto.rank, crypto.price_usd, 
      crypto.percent_change_24h, crypto.percent_change_1h, crypto.percent_change_7d, crypto.market_cap_usd, crypto.volume24);
      this._cryptowatchlistApiService.addCrypto(crypto).subscribe(cryptoData =>
      {
        this.cryptoData = cryptoData;
      });
      this.getCheckCrypto();
    }
  }
}
