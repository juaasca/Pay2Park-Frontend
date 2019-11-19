export class Transactions {
    
    Amount: string;
    Date: string;
    Operation: string;
    OwnersEmail: string;
    constructor(amount: string, date: string, owner: string, operation: string) {
        this.Amount = amount;
        this.Date = date;
        this.OwnersEmail = owner;
        this.Operation = operation;
    }
}