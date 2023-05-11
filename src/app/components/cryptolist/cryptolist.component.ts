import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CryptoloreApiService } from '../../services/cryptolore-api.service';
import { ICryptolore, NewCrypto } from '../../interfaces/cryptolore';
import { CryptowatchlistApiService } from 'src/app/services/cryptowatchlist-api.service';
import { PaginationInstance } from 'ngx-pagination';
@Component({
  selector: 'app-cryptolist',
  templateUrl: './cryptolist.component.html',
  styleUrls: ['./cryptolist.component.css']
})
export class CryptolistComponent implements OnInit{
  public cryptoData:ICryptolore | any;
  page = 1;
  totalCryptoData!: number;
  maxSize!: number;
  
  constructor(private _cryptoloreApiService:CryptoloreApiService, private _cryptowatchlistApiService: CryptowatchlistApiService){}
  ngOnInit() {
    this.getCrypto();
    this.checkPage(this.page);
  }
  getCrypto() {
    this._cryptoloreApiService.getCryptolore(this.page).subscribe(cryptoData=>
    {
      this.cryptoData = cryptoData.data
      this.totalCryptoData = cryptoData.info.coins_num;
      this.maxSize = Math.round(this.totalCryptoData/100)*100;
      console.log(this.totalCryptoData);
      console.log(this.cryptoData);
      console.log(this.page);
    });
  }
  onNextPage() {
    this.page++;
    console.log(this.page);
    
    this.getCrypto();
    this.checkPage(this.page);
    return false;
  }
  onPreviousPage() {
    this.page--;
    console.log(this.page);
    
    this.getCrypto();
    this.checkPage(this.page);
    return false;
  }
  checkPage(page: number) {
    if(this.page == 1){
      document.getElementById("previous")!.classList.add("disabled")
    }
    else if(this.page == 108){
      document.getElementById("next")!.classList.add("disabled")
    }
    else{
      document.getElementById("previous")!.classList.remove("disabled")
      document.getElementById("next")!.classList.remove("disabled")
    }
  }
}
