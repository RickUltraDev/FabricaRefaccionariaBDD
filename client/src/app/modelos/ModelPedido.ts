export class ModelPago{   
    public fecha:string;
    public total_pagar:number;
    public estatus_surtido:string;
    public estatus_pago:string;
    public idCliente:number;

    constructor(){
        this.fecha = '',
        this.total_pagar = 0,
        this.estatus_surtido = '',
        this.estatus_pago = '',
        this.idCliente = 0
    }


};