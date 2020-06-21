export class ModelPieza{
    public nombre:string;   
    public descripcion:string;
    public precio_fabricacion:number;
    public precio_venta:number;
    public existencia:number;
    public categoria:string;
    public valido:number;  
    public url:string;

    constructor(){
        this.nombre = '',
        this.descripcion = '',
        this.precio_fabricacion = 0,
        this.precio_venta = 0,
        this.existencia = 0,
        this.categoria = '';
        this.valido = 1,
        this.url = ''    
    }


};