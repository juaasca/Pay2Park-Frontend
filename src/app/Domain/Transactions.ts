export class Transactions {
    
    Amount: string;
    Date: string;
    Operation: string;
    OwnersEmail: string;
    Tipo: string;
    Motivo: string;
    constructor(amount: string, date: string, owner: string, operation: string, tipo: string, motivo: string) {
        this.Amount = amount;
        this.Date = date;
        this.OwnersEmail = owner;
        this.Operation = operation;
        this.Tipo = tipo;
        this.Motivo = motivo;
    }
}