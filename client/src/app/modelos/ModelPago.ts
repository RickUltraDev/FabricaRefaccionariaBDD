export class ModelPago{
    public tipo:string;   
    public fecha_pago:string;
    public monto:number;
    public total_llevado:number;
    public idPedido:number;

    constructor(){
       this.tipo = '',
       this.fecha_pago = '',
       this.monto = 0,
       this.total_llevado = 0,
       this.idPedido = 0
    }


};