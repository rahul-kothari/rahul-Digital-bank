//Transaction processing
/**
 * Transaction AccountTransfer - transfer money between two accounts.
 * Also check that account holder is above 18 years of age 
 * to carry out the transaction.
 * @param {org.acme.digitalbank.AccountTransfer} accountTransfer 
 * @transaction
 */
function accountTransfer(accountTransfer) {
  let amount = accountTransfer.amount
  let from = accountTransfer.from
  let to = accountTransfer.to
  //check if transaction can be carried out.
  //check if 18 years old
  var today = new Date(accountTransfer.timestamp)
  let dob = from.owner.dob
  var age = today.getFullYear() - dob.yearOfBirth
  // use var to define age globally
  if (today.getMonth()+1 < dob.monthOfBirth || 
      (today.getMonth()+1 == dob.monthOfBirth && 
       today.getDate() < dob.dayOfBirth))
    //getMonth() is 0 indexed.
	age--
  
  if (age<18)
    throw new Error('Too young to carry out this transaction')
  //check if enough balance
  if (amount > from.balance)
    throw new Error('Insufficient balance to carry out transaction')
  //carry out the transaction
  from.balance-=amount
  to.balance+=amount
  
  //Update on blockchain.
   return getAssetRegistry('org.acme.digitalbank.Account')
  	.then(function(assetRegistry) {
    	return assetRegistry.update(from);
   	})
  	.then (function() {
     	return getAssetRegistry('org.acme.digitalbank.Account');
   	})
  	.then (function(assetRegistry) {
     	return assetRegistry.update(to);
   	});
}

/**
 * Transaction Withdrawal - withdraw money from an account.
 * Also check that account holder is above 18 years of age 
 * to carry out the transaction.
 * @param {org.acme.digitalbank.Withdrawal} withdrawal
 * @transaction
 */
async function withdrawal(withdrawal) {
  let amount = withdrawal.amount
  let account = withdrawal.from
  //check if transaction can be carried out.
  //check if user is above 18 years
  var today = new Date(withdrawal.timestamp)
  let dob = account.owner.dob
  var age = today.getFullYear() - dob.yearOfBirth
  // use var to define age globally
  if (today.getMonth()+1 < dob.monthOfBirth || 
      (today.getMonth()+1 == dob.monthOfBirth && 
       today.getDate() < dob.dayOfBirth))
    //getMonth() is 0 indexed.
	age--
  
  if (age<18)
    throw new Error('Too young to carry out this transaction')
  
  if (amount>account.balance)
      throw new Error('Insufficient balance to carry out transaction')
  //remove amount from balance.
  account.balance-=amount
  
  //Update on Blockchain
   let assetRegistry = await getAssetRegistry('org.acme.digitalbank.Account');
   await assetRegistry.update(account); //Account.from
}

/**
 * Transaction Deposit - deposit money to an account.
 * Also check that account holder is above 18 years of age 
 * to carry out the transaction.
 * @param {org.acme.digitalbank.Deposit} deposit
 * @transaction
 */
async function deposit(deposit) {
  let amount = deposit.amount
  let account = deposit.to
  //check if transaction can be carried out.
  //check if user is above 18 years
  var today = new Date(deposit.timestamp)
  let dob = account.owner.dob
  var age = today.getFullYear() - dob.yearOfBirth
  // use var to define age globally
  if (today.getMonth()+1 < dob.monthOfBirth || 
      (today.getMonth()+1 == dob.monthOfBirth && 
       today.getDate() < dob.dayOfBirth))
    //getMonth() is 0 indexed.
	age--
  
  if (age<18)
    throw new Error('Too young to carry out this transaction')
  //add amount to balance.
  account.balance+=amount
  
  //Update on Blockchain
  let assetRegistry = await getAssetRegistry('org.acme.digitalbank.Account');
  await assetRegistry.update(account); //Account.to
}

/**
 * Transaction - withdraw in another currency unit
 * extra charge of 50 original currency units.
 * @param {org.acme.digitalbank.WithdrawdiffCurrency} withdrawal
 * @transaction
 */
async function withdrawInDiffCurrency(withdrawal) {
  let account = withdrawal.from
  let exchangeRate = withdrawal.currencyExchangeRate
  let amountInOriginalCurrency=(withdrawal.amount*exchangeRate)+50
  //check if transaction can be carried out.
  //check if user is above 18 years
  var today = new Date(withdrawal.timestamp)
  let dob = account.owner.dob
  var age = today.getFullYear() - dob.yearOfBirth
  // use var to define age globally
  if (today.getMonth()+1 < dob.monthOfBirth || 
      (today.getMonth()+1 == dob.monthOfBirth && 
       today.getDate() < dob.dayOfBirth))
    //getMonth() is 0 indexed.
	age--
  
  if (age<18)
    throw new Error('Too young to carry out this transaction')
  if (amountInOriginalCurrency>account.balance)
      throw new Error('Insufficient balance to carry out transaction')
  //remove amount from balance.
  account.balance-=amountInOriginalCurrency
  
  //Update on Blockchain
  let assetRegistry = await getAssetRegistry('org.acme.digitalbank.Account');
  await assetRegistry.update(account); //Account.from
}









/**
 * Transaction Loan - based on interest rate and number of 
 * months, deduct certain amount from balance and if 
 * balance becomes negative charge extra penalty of 
 * 100 currency units.
 
 * @param {org.acme.digitalbank.Loan} loan
 * @transaction
 
function loanPay(loan) {
  //check if user is above 18 years
  let dob = account.owner.dob
  if (age<18) 
    // age defined gloablly
    throw new Error('Too young to carry out this transaction')
  
/**
 * If user doesn't have enough money (loan/10) 
 * -> not enough guarentee -> don't give him loan.
 
  let balance = loan.from.balance
  if (balance<=loan.amount/10)
    throw new Error('Insufficient balance to guarentee a loan')
/**
 * The amount to deduct from balance monthly :
 * Using simple interest (SI = principal*rate*time_inYears/100
 *        = principal*rate*time_in_months/1200)
 * THUS, amount to deduct monthly = 
 * (principal + SI)/months to pay it in.
 
  let principal = loan.amount
  let rate = loan.interestRate
  let time_in_months = loan.monthsToRepayIn
  let si = principal*rate*(time_in_months)/1200
  let deduct_amount = (principal+si)/time_in_months
  
  // DO THIS EVERY MONTH.

  if (balance<deduct_amount)
  // penalty
    balance-=100
  else
    balance-=deduct_amount
}
*/

/* PERSONAL NOTES
TWO WAYS TO UPDATE ON BLOCKCHAIN
1. using promises - 
	return getAssetRegistry('org.acme.digitalbank.Account')
  	.then(function(assetRegistry) {
    	return assetRegistry.update(from);
   	})
  	.then (function() {
     	return getAssetRegistry('org.acme.digitalbank.Account');
   	})
  	.then (function(assetRegistry) {
     	return assetRegistry.update(to);
   	});
2. async function, await command - 
 async func(..) {
  	// Get the asset registry that stores the assets. Note that
    // getAssetRegistry() returns a promise, so we have to await for it.
    let assetRegistry = await getAssetRegistry('org.acme.sample.SampleAsset');

    // Update the asset in the asset registry. Again, note
    // that update() returns a promise, so so we have to return
    // the promise so that Composer waits for it to be resolved.
    await assetRegistry.update(asset);
  }
*/