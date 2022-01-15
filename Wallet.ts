import {createHash} from "crypto";
import Coin from "./Coin";

export default class Wallet {
    public walletName : string;
    private passphrase : string[];
    private secretkey : string; 
    private coins : Coin[];
    constructor(walletName : string,passphrase : string[]) {
        this.walletName = walletName;
        this.passphrase = passphrase;
        this.secretkey = createHash("sha256").update(passphrase.join(":")).digest("hex").toString("hex");
        this.coins = []
    }
    public addCoin(coin : Coin) {
        this.coins.push(coin);
    }
    public getCoin(coinSymbol : string) {
        const coin = this.coins.find(coin=> coin.coinsymbol === coinSymbol);
        if(!coin) {
            console.log("Crypto Asset Not Found! ⚠️");
            return new Coin("",0,"");
        }
        return coin;
    }
    public showCoins() {
        console.log(this.coins);
    }
}
