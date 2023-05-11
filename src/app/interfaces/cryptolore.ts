export interface ICryptolore{
    
    id:string,
    symbol:string,
    name:string,
    rank:string,
    price_usd:string,
    percent_change_24h:string,
    percent_change_1h:string,
    percent_change_7d:string,
    market_cap_usd:string,
    volume24:string
    
    
}
export class NewCrypto implements ICryptolore{
    id!:string;
    symbol:string;
    name:string;
    rank:string;
    price_usd:string;
    percent_change_24h:string;
    percent_change_1h:string;
    percent_change_7d:string;
    market_cap_usd:string;
    volume24:string;
    constructor(id:string, symbol:string, name:string, rank:string, price_usd:string, percent_change_24h:string, 
        percent_change_1h:string, percent_change_7d:string, market_cap_usd:string, volume24:string ){
            this.id = id;
            this.symbol = symbol;
            this.name = name;
            this.rank = rank;
            this.price_usd = price_usd;
            this.percent_change_24h = percent_change_24h;
            this.percent_change_1h = percent_change_1h;
            this.percent_change_7d = percent_change_7d;
            this.market_cap_usd = market_cap_usd;
            this.volume24 = volume24;
        }
}