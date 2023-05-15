import { Component, Output, EventEmitter } from '@angular/core';
import { OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CryptowatchlistApiService } from 'src/app/services/cryptowatchlist-api.service';
import { ICryptolore } from 'src/app/interfaces/cryptolore';
import { ICryptoloreMarkets } from 'src/app/interfaces/cryptoloreMarkets';
import { CryptomarketsApiService } from 'src/app/services/cryptomarkets-api.service';
import { filter } from 'rxjs';
Chart.register(...registerables);
@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit{
  public chart: any;
  public cryptoData: ICryptolore[] | any;
  public cryptoMarkets: ICryptoloreMarkets[] | any;
  public validMarkets: ICryptoloreMarkets[] | any;

  constructor(private _cryptowatchlistApiService:CryptowatchlistApiService, private _cryptoMarketsApiService:CryptomarketsApiService){}

  @Output() cryptoDeletedEvent = new EventEmitter<string>();

  marketName: any[] = [];//array for displaying names of markets
  marketPrice: any[] = []; //array for displaying prices of markets
  ngOnInit() {
    this.getWatchlist();
    
  }
  
  getWatchlist() {
    this._cryptowatchlistApiService.getCrypto().subscribe(cryptoData =>
      { this.cryptoData = cryptoData
        console.log(this.cryptoData);
        this.getMarkets(this.cryptoData[0].id);
        
    });
    
  }
  getMarkets(id : string){
    this._cryptoMarketsApiService.getCryptoMarkets(id).subscribe(markets =>
      { 
        
        this.cryptoMarkets = markets;
        console.log(this.cryptoMarkets);
        console.log(`crypto markets contains :  + ${this.cryptoMarkets}`);
        this.filterMarkets();
        this.createChart();
      }
    );
    
    
    
        
    
  }
  updateMarkets(id : string){
    let totalPrice = 0;
    this._cryptoMarketsApiService.getCryptoMarkets(id).subscribe(markets =>
      { 
        
        this.cryptoMarkets = markets;
        console.log(this.cryptoMarkets);
        console.log(`crypto markets contains :  + ${this.cryptoMarkets}`);
        this.filterMarkets();
        return;
      }
    );
    
  }
  filterMarkets(){
    let totalPrice = 0;
    let selectedCoinObject: ICryptolore | any;
    //filter out the wrong currencies
    let selectedCoin = (document.getElementById("myCoins") as HTMLSelectElement).value;
    this.cryptoData.forEach((coin: ICryptolore) => {
      if(coin.id == selectedCoin){
        selectedCoinObject = coin;
        this.cryptoMarkets = this.cryptoMarkets.filter(
        (c: ICryptoloreMarkets) => c.base == coin.symbol);
        this.validMarkets = this.cryptoMarkets;
      }
      
    });
    // Remove elements with prices below the current price
    this.cryptoMarkets = this.cryptoMarkets.filter(
      (c: ICryptoloreMarkets) => parseFloat(c.price) >= (0.1 * parseFloat(selectedCoinObject.price_usd) )
    );

    //remove elements with prices above the current price
    this.cryptoMarkets = this.cryptoMarkets.filter(
      (c: ICryptoloreMarkets) => parseFloat(c.price) <= (1.1 * parseFloat(selectedCoinObject.price_usd) )
    );
    this.marketName = [];
    this.marketPrice= [];
    //filter prices and names
    this.cryptoMarkets.forEach((coin :ICryptoloreMarkets) => {
      this.marketName.push(coin.name);
    });
    

    
    this.cryptoMarkets.forEach((coin :ICryptoloreMarkets) => {
      this.marketPrice.push(coin.price);
    });
    this.marketName = this.marketName.slice(0, 10);
    this.marketPrice = this.marketPrice.slice(0, 10);
    if(this.cryptoMarkets.length == 0){
      alert("No markets found");
      this.marketName.push("No markets found");
      this.marketPrice.push(0);
    }
    
  }
  
  
  createChart(){
    console.log("In create chart");
    // console.log(this.cryptoMarkets[0].name);
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.marketName,
	       datasets: [
          {
            label: "Prices",
            data: this.marketPrice,
            backgroundColor: 'lightblue'
          } 
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
    return;
  }
  cryptoChange(){
    this.chart.destroy();
  }
  updateChart() {
    this.cryptoChange();
    let selectedCoin = (document.getElementById("myCoins") as HTMLSelectElement).value;
    this.cryptoData.forEach((crypto: ICryptolore) => {
      if(crypto.id == selectedCoin){
        selectedCoin = crypto.id;
      }
      else{
        selectedCoin = this.cryptoData[0].id;
      }
    });
    console.log("selected coin is " + selectedCoin)
    console.log(selectedCoin);
    //this.updateMarkets(selectedCoin);//this.selectedCoin
  // this.getMarkets(selectedCoin);
    // Wait for the API call to complete
    this._cryptoMarketsApiService.getCryptoMarkets(selectedCoin).subscribe(markets => {
      this.cryptoMarkets = markets;
      this.filterMarkets();
      console.log(this.cryptoMarkets);
  
      // Create the chart with the updated data
      this.createChart();
      
    });
  }
  
  
  deleteCrypto() {
    const selectedCoinId = (document.getElementById("myCoins") as HTMLSelectElement).value;
    let selectedCoinDelete = ""; 
    this.cryptoData.forEach((crypto: ICryptolore) => {
      if(crypto.id == selectedCoinId){
        selectedCoinDelete = crypto._id;

      }});
    
    this._cryptowatchlistApiService.deleteCrypto(selectedCoinDelete).subscribe(result => {
      console.log(result);
    });
      this.cryptoData = this.cryptoData.filter((crypto: ICryptolore) => crypto._id !== selectedCoinDelete);
      this.cryptoDeletedEvent.emit("crypto got deleted");
      
      // Update the chart after deletion
      this.updateChart();
    
    return;
  }
  
  
}
