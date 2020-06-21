export class ModelFactura{
     public fecha:string;
     public total:number;
     public idPedido:number;
     public idEmpleado:number;

    constructor(){
        this.fecha = '',
        this.total = 0,
        this.idPedido = 0,
        this.idEmpleado = 0
    }


};