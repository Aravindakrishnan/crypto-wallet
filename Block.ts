import {createHash} from "crypto";
import Transaction from "./Transaction";

export default class Block {
    private previousHash : string;
    public transactions : Transaction[];
    public blockData : string;
    private blockHash : string;
    constructor(previousHash : string, transactions : Transaction[] ) {
        this.previousHash = previousHash;
        this.transactions = transactions;
        this.blockData = transactions.map(transaction=> {
            return `${transaction.senderPublicAddress}:${transaction.coin.coinsymbol}:${transaction.coin.amount}:${transaction.receiverPublicAddress}:`
        }).join("") + `${this.getPreviousHash()}`
        this.blockHash = createHash("sha256").update(this.blockData).digest("hex").toString("hex");
    }
    getPreviousHash() : string {
        return this.previousHash;
    }
    getBlockHash() : string {
        return this.blockHash;
    }
}