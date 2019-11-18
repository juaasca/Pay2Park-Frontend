export class Transactions {
    
    Amount: string;
    Date: string;
    Operation: number;
    OwnersEmail: string[];
    constructor(amount: string, date: string, owner: string[], operation) {
        this.Amount = amount;
        this.Date = date;
        this.OwnersEmail = owner;
        this.Operation = operation;
    }
}