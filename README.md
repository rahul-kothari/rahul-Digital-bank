# rahul-Digital-bank
Used permissioned blockchain such as hyperledger fabric along with composer to create my own digital bank

>This is my first Hyperledger Composer work. I tried to use as much functionality as possible and leverage Fabric and Composer to create this. The Business network defines:

**Participant**
`Customer` - the account holder of the bank

**Asset**
`Account`

**Transaction**
`AccountTransfer`- transfer money between two accounts, `Deposit`,`Withdrawal`, `WithdrawdiffCurrency` - withdraw in different currency

Accounts are owned by a customer. One customer CAN have more than one account, AND they can do any transactions as they see fit.

All the transactions are implemented in `logic.js` file. The `accountTransfer()`, `withdrawal()`, `deposit()`, `withdrawInDiffCurrency()` do the respective transactions. Each of them, check that the customer is over 18 years old, and if the accounts have enough balance to carry out the transaction. `WithdrawdiffCurrency` charges 50 currency units to do the transaction (I tried to incorporate certain negatives of a bank ;) ). All transactions, assets, customers are stored on the blockchain!`permissions.acl` gives certain permissions to participants. Here everyone can do anything, within the scope of their accounts. So there isn't much to talk about here.

To test this Business Network Definition on Composer, go to the **Test** tab:

Create a `Customer` participant:
```
{
  "$class": "org.acme.digitalbank.Customer",
  "customerId": "rahul",
  "firstName": "Rahul",
  "lastName": "Kothari",
  "dob": {
    "$class": "org.acme.digitalbank.DateOfBirth",
    "yearOfBirth": 1998,
    "monthOfBirth": 1,
    "dayOfBirth": 20
  }
}
```

Create an `Account` asset:
```
{
  "$class": "org.acme.digitalbank.Account",
  "accountId": "rahul1",
  "balance": 1500,
  "owner": "resource:org.acme.digitalbank.Customer#rahul"
}
```
(can also do `"owner" : "rahul"`. Owner is the customerId)

Submit a `AccountTransfer` transaction:
```
{
  "$class": "org.acme.digitalbank.AccountTransfer",
  "from": "rahul1",
  "to": "adam2",
  "amount": 500
}
```
`from` and `to` are accountIds.

Submit a `WithdrawdiffCurrency` transaction:
```
{
  "$class": "org.acme.digitalbank.WithdrawdiffCurrency",
  "currencyExchangeRate": 10,
  "from": "rahul1",
  "amount": 45
}
```
`currencyExchangeRate = 10` -> 1 unit of your currency = 10 units of the bank's native currency. And there is a 50 native currency units charge.

Check the Transaction Registry to see EVERYTHING stored on blockchain.

Congratulations!

### NOTE :
As you can see in comments of `logic.js` I am working on other functionalities! If you have any recommendations of transactions, that I should code, please let me know!

You can also create a `Query.js` file to query data using CouchDB (https://hyperledger.github.io/composer/next/business-network/query.html).

## Want to deploy this on the network :
Install docker 17.x
Run it as an administrator
go on your command line and type
```
$ docker run --name composer-playground --publish 8080:8080 hyperledger/composer-playground
```
Now go to `localhost:8080` and enjoy!
## Want to use this as a Web App (UI)
SURE! It just is QUITE A LOT of work:
Quoting the Composer docs:-
Composer DOCS: https://hyperledger.github.io/composer/next/installing/development-tools.html

Install hyperledger fabric, composer-playround, yo
https://hyperledger.github.io/composer/next/tutorials/developer-tutorial.html
After deploying the .bna (business network archive file) and create a fabric instance of it, then

CREATING THE WEB APP - Using the REST Server and yo!
