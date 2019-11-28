export class Bono {

    Duracion: number;
    Matricula: string;
    Tipo: string;
    PersonasPorBono: number;

    constructor(Duracion : number, Matricula : string, Tipo : string, PersonasPorBono : number) {
        this.Duracion = Duracion;
        this.Matricula = Matricula;
        this.Tipo = Tipo;
        this.PersonasPorBono = PersonasPorBono;
    }
}