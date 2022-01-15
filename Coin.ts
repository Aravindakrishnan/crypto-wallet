export default class Coin {
    public coinsymbol : string;
    public amount : number;
    public senderAddress : string;
    constructor(coinsymbol : string,amount : number,senderAddress : string,) {
        this.senderAddress = senderAddress;
        this.coinsymbol = coinsymbol;
        this.amount = amount;
    }
}