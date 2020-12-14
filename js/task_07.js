"use strict";
const Transaction = {
  DEPOSIT: "deposit",
  WITHDRAW: "withdraw",
};

let id = 0;
const getId = () => {
  return id++;
};

const account = {

  balance: 0,


  transactions: [],

 
  createTransaction(amount, type) {
    return {
      id: getId(),
      amount,
      type,
    };
  },

 
  deposit(amount) {
    if (typeof amount !== "number" || amount <= 0) {
      console.log("Please, type a valid number.");
      return;
    }

    this.transactions.push(this.createTransaction(amount, Transaction.DEPOSIT));
    this.balance += amount;
  },

  withdraw(amount) {
    if (typeof amount !== "number" || amount <= 0) {
      console.log("Please, type a valid number.");
      return;
    }
    if (amount > this.balance) {
      console.log("Insufficient funds to write off");
      return;
    }
    this.transactions.push(
      this.createTransaction(amount, Transaction.WITHDRAW)
    );
    this.balance -= amount;
  },

  getBalance() {
    return this.balance;
  },

  getTransactionDetails(id) {
    for (const transObj of this.transactions) {
      if (transObj.id !== id) continue;
      return transObj;
    }
    return null;
  },

  getTransactionTotal(type) {
    let sum = 0;
    for (const transObj of this.transactions) {
      if (type !== transObj.type) continue;
      sum += transObj.amount;
    }
    return sum;
  },
};

// проверка
console.log(account.getBalance());
account.deposit(2000);
console.log(account.getBalance());
account.withdraw(500);
console.log(account.getBalance());
account.deposit(2000);
account.deposit(2000);
account.withdraw(500);
account.withdraw(500);
console.log(account.getBalance());
console.log(account.getTransactionTotal(Transaction.DEPOSIT));
console.log(account.getTransactionTotal(Transaction.WITHDRAW));
console.table(account.transactions);

const transactionId = account.transactions[1].id;
console.table(account.getTransactionDetails(transactionId));
