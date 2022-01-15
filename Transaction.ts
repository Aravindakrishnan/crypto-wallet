import Coin from "./Coin";

export default class Transaction {
    public senderPublicAddress : string;
    public receiverPublicAddress : string;
    public coin : Coin;
    constructor(senderPublicAddress : string, receiverPublicAddress : string, coin : Coin){
       this.senderPublicAddress = senderPublicAddress;
       this.receiverPublicAddress = receiverPublicAddress;
       this.coin = coin;
    }
}