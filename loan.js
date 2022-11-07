let creditLimit=200; // testing code here changing the creditLimit amount

const loanOut = function(amount){
return new Promise((resolve, reject)=>{ // creating a primise here with a callback function with two argumnets
    if(creditLimit<=0){
        reject('Insufficient funds') // rejecting funds as credit limit is 0
    }
    if(creditLimit>0 && creditLimit<amount){
        resolve(creditLimit,creditLimit=0) // it will still accept the funds but the credit balance is know 0, which we updated after calling credit limit
    }
    else{
    resolve(creditLimit-=amount); //accepting funds as credit limit is know 0 and their money in it.
    }
   
});
};

// Test code here

console.log("Asking for $150, which should be okay ...");
loanOut(150)
  .then((amountReceived) => {
    console.log(`\t-> I got $${amountReceived} loan from the bank! Remaining Credit Limit: $${creditLimit}`);
  })
  .catch((err) => {
    console.log(`\t-> Error: ${err}!`);
  });