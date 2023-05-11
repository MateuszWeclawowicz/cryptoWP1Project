import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CryptowatchlistApiService } from 'src/app/services/cryptowatchlist-api.service';
import { ICryptolore } from 'src/app/interfaces/cryptolore';
import { ICryptoloreMarkets } from 'src/app/interfaces/cryptoloreMarkets';
import { CryptomarketsApiService } from 'src/app/services/cryptomarkets-api.service';
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
  
  constructor(private _cryptowatchlistApiService:CryptowatchlistApiService, private _cryptoMarkets:CryptomarketsApiService){}
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
    this._cryptoMarkets.getCryptoMarkets(id).subscribe(markets =>
      { 
        
        this.cryptoMarkets = markets;
        console.log(this.cryptoMarkets);
        console.log(`crypto markets contains :  + ${this.cryptoMarkets}`);
        this.createChart();
        return;
      }
    );
    
  }
  updateMarkets(id : string){
    let totalPrice = 0;
    this._cryptoMarkets.getCryptoMarkets(id).subscribe(markets =>
      { 
        
        this.cryptoMarkets = markets;
        console.log(this.cryptoMarkets);
        console.log(`crypto markets contains :  + ${this.cryptoMarkets}`);
        // this.cryptoMarkets.forEach((c : ICryptoloreMarkets)=>{
        //   totalPrice += parseFloat(c.price);
        // });
        // const averagePrice = totalPrice / this.cryptoMarkets.length;
        // this.cryptoMarkets.forEach((c : ICryptoloreMarkets)=>{
        //   if(parseFloat(c.price) < (0.5 * averagePrice)){
        //     this.cryptoMarkets.remove(c);
        //   }
        // });
        return;
      }
    );
    
  }
  
  createChart(){
    
    console.log("In create chart");
    console.log(this.cryptoMarkets[0].name);
    
    
    
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: 
        [
          this.cryptoMarkets[0].name, 
          this.cryptoMarkets[1].name, 
          this.cryptoMarkets[2].name, 
          this.cryptoMarkets[3].name, 
          this.cryptoMarkets[4].name, 
          this.cryptoMarkets[5].name, 
          this.cryptoMarkets[6].name, 
          this.cryptoMarkets[7].name,
          this.cryptoMarkets[8].name,
          this.cryptoMarkets[9].name,
          this.cryptoMarkets[10].name,
        ],
	       datasets: [
          {
            label: "Prices",
            data: [
              this.cryptoMarkets[0].price,
              this.cryptoMarkets[1].price,
              this.cryptoMarkets[2].price,
              this.cryptoMarkets[3].price,
              this.cryptoMarkets[4].price,
              this.cryptoMarkets[5].price,
              this.cryptoMarkets[6].price,
              this.cryptoMarkets[7].price,
              this.cryptoMarkets[8].price,
              this.cryptoMarkets[9].price,
              this.cryptoMarkets[10].price,
            ],
            backgroundColor: 'lightblue'
          } 
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }
  cryptoChange(){
    this.chart.destroy();
    this.updateChart();
    //chart needs to refresh after 1 button click
  }
  updateChart(){
    let selectedCoin = (document.getElementById("myCoins") as HTMLSelectElement).value;
    console.log(selectedCoin);
    this.updateMarkets(selectedCoin);
    
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: 
        [
          this.cryptoMarkets[0].name, 
          this.cryptoMarkets[1].name, 
          this.cryptoMarkets[2].name, 
          this.cryptoMarkets[3].name, 
          this.cryptoMarkets[4].name, 
          this.cryptoMarkets[5].name, 
          this.cryptoMarkets[6].name, 
          this.cryptoMarkets[7].name,
          this.cryptoMarkets[8].name,
          this.cryptoMarkets[9].name,
          this.cryptoMarkets[10].name,
        ],
	       datasets: [
          {
            label: "Prices",
            data: [
              this.cryptoMarkets[0].price,
              this.cryptoMarkets[1].price,
              this.cryptoMarkets[2].price,
              this.cryptoMarkets[3].price,
              this.cryptoMarkets[4].price,
              this.cryptoMarkets[5].price,
              this.cryptoMarkets[6].price,
              this.cryptoMarkets[7].price,
              this.cryptoMarkets[8].price,
              this.cryptoMarkets[9].price,
              this.cryptoMarkets[10].price,
            ],
            backgroundColor: 'lightblue'
          } 
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
    
  }
}
