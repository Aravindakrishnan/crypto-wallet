import {createHash} from "crypto";
import Wallet from "./Wallet";
import Transaction from "./Transaction";
import Coin from "./Coin";
import getUserByPublicAddress from "./hooks/getUserByPublicAddress";
import Fiat from "./Fiat";
import Cryptocoins from "./Cryptocoins";
import Transactions from "./Transactions";

export default class User {
    private walletName : string;
    public publicAddress : string;
    private wallet : Wallet;
    public transactions : Transaction[];
    public fiats : Fiat[];
    constructor(walletName : string,passphrase : string[]) {
        this.wallet = new Wallet(walletName,passphrase);
        this.walletName = walletName;
        this.publicAddress = createHash("sha256").update(walletName).digest("hex").toString("hex");
        this.transactions = [];
        this.fiats = [];
    }

    depositFiat(fiat : Fiat) {
        this.fiats.push(fiat);
    }

    purchaseCrypto(coinSymbol : string,fiatSymbol : string ,amount : number) {
        const fiat = this.fiats.find(fiat=> fiat.symbol === fiatSymbol);
        if(!fiat) {
            console.log("No Fiat funds found Kindly Deposit!");
            return;
        }

        if(fiat.amount < amount) {
            console.log("Insufficient Balance...⚠️");
            return;
        }

        const cryptoCoin = Cryptocoins.cryptoCoins.find(crypto => crypto.coinsymbol.toUpperCase() === coinSymbol );
        const cryptoQuantity = amount / (cryptoCoin?.price * 77);

        fiat.amount -= amount;
        this.wallet.addCoin(new Coin(coinSymbol,cryptoQuantity,this.publicAddress));
        console.log(`${cryptoQuantity} Quantity of ${cryptoCoin?.coinsymbol} are Purchased...✅`)
    }

    withdrawCoin(users : User[],transactions : Transactions,receiverPublicAddress : string,coin : Coin) {
        const user = getUserByPublicAddress(users,receiverPublicAddress);
        const coin_ = this.wallet.getCoin(coin.coinsymbol);
        if(coin_.amount === 0 ) {
            console.log("Crypto Asset Not Found! ⚠️");
            return;
        }
        const transaction = new Transaction(this.publicAddress,receiverPublicAddress,coin);
        transactions.addTransaction(transaction);
        coin_.amount -= coin.amount;
        this.transactions.push(transaction);
        user.wallet.coins.push(coin);
        console.log(`${receiverPublicAddress.slice(0,12)} received ${coin.amount} of ${coin.coinsymbol} ✅.`);
    }

    viewFiatBalance () {
        console.log(`Balance Fiat : ${JSON.stringify(this.fiats)} 💰`);
    }
    viewCryptoBalance() {
        this.wallet.showCoins()
    }
    getTransactions() {
        return this.transactions;
    }
}
