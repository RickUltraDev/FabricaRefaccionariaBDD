export class ModelEnvio{
    public monto_envio:number;   
    public fecha_entrega:string;
    public estatus:string;
    public idPedido:number;
    public valido:number;  

    constructor(){
        this.monto_envio = 0,
        this.fecha_entrega = '',
        this.estatus = '',
        this.idPedido = 0,
        this.valido = 1   
    }


};