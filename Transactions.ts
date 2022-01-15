import Transaction from "./Transaction";

export default class Transactions {
    public transactions : Transaction[];
    constructor() {
        this.transactions = [];
    } 
    addTransaction(transaction : Transaction) {
        this.transactions.push(transaction);
    }
    getTransactions() : Transaction[] {
        return this.transactions;
    }
}