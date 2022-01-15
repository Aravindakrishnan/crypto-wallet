import Coin from "./Coin";
import Fiat from "./Fiat";
import User from "./User";
import Users from "./Users";
import Block from "./Block";
import Transactions from "./Transactions";

// Todo: Initialize users and transactions
// Purpose: Act as a DB for storing Users and Transactions

const users = new Users();
const transactions = new Transactions();

// Todo: Creating a User Instance 
// User { WalletName : string, passphrase : string[] }

const user1 = new User("Address 1",["one","two","three"]);
const user2 = new User("Address 2",["one","two","three"]);
const user3 = new User("Address 3",["one","two","three"]);

// Todo: Adding the user into users
// .addUser(user : User) method

users.addUser(user1);
users.addUser(user2);
users.addUser(user3);

// Todo: Depositing Fiat funds for User 
// Fiat { symbol : string, amount : number }

user1.depositFiat(new Fiat("INR",1000000));
user2.depositFiat(new Fiat("INR",42341));
user3.depositFiat(new Fiat("INR",32341));

// Todo: Viewing Fiat Balance
// .viewFiatBalance() : void -> logs [fiat balance]

user1.viewFiatBalance();
user2.viewFiatBalance();
user3.viewFiatBalance();


// Todo: Purchasing Cryptocurrencies
// .purchaseCrypto(coinsymbol : string,fiatsymbol : string, amount : number) 

user1.purchaseCrypto("BTC","INR",999999);
user2.purchaseCrypto("SHIB","INR",12000);
user3.purchaseCrypto("SOL","INR",12999);

// Todo: Viewing Crypto Balance
// .viewCryptoBalance() : void -> logs [crypto balance]

user1.viewCryptoBalance();
user2.viewCryptoBalance();
user3.viewCryptoBalance();

// Todo: WithdrawCoin means sending coins to another account with the public address 
/*
    .withdrawCoin(
        users.users, // required default
        transactions  // required default,
        receiversPublicAddress,
        coin : Coin
    )
    Coin {coinsymbol : string, amount : number , senderPublicAddress : string}
*/

user1.withdrawCoin(users.users,transactions,user2.publicAddress,new Coin("BTC",0.04,user1.publicAddress));
user2.withdrawCoin(users.users,transactions,user3.publicAddress,new Coin("SHIB",1000,user2.publicAddress));
user3.withdrawCoin(users.users,transactions,user1.publicAddress,new Coin("SOL",0.5,user3.publicAddress));

// Todo: getTransactions
// .getTransactions() returns the transaction[]
console.log(user1.getTransactions());
console.log(user2.getTransactions());
console.log(user3.getTransactions());

// coming soon...
const block1 = new Block("0".repeat(16),transactions.getTransactions());

