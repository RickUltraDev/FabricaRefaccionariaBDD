export class ModelCliente{
    public razon_social:string;   
    public correo:string;
    public calle:string;
    public numero:number;
    public cp:number;
    public ciudad:string;
    public estado:string;
    public telefono:number;
    public valido:number;  
   

    constructor(){
        this.razon_social = '',
        this.correo = '',
        this.calle = '',
        this.numero = 0,
        this.cp = 0,
        this.ciudad = '',
        this.estado = '',
        this.telefono = 0,
        this.valido = 1    
    }


};