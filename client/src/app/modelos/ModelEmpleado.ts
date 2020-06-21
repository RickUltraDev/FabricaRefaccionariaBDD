export class ModelEmpleado{
    public nombre:string;   
    public apellido_paterno:string;
    public apellido_materno:string;
    public fecha_nacimiento:string;
    public calle:string;
    public numero:number;
    public cp:number;
    public telefono:number;
    public cargo:string;
    public salario:number;
    public correo:string;
    public contrasena:string;
    public valido:number;  
    

    constructor(){
        this.nombre = '',
        this.apellido_paterno = '',
        this.apellido_materno = '',
        this.fecha_nacimiento = '',
        this.calle= '',
        this.numero = 0,
        this.cp = 0,
        this.telefono = 0,
        this.cargo = '',
        this.salario = 0,
        this.correo = '',
        this.contrasena = '',
        this.valido = 1    
    }


};