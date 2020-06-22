import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms"; //Para validar los formularios

/*Servicios usados*/
import { ToastrService } from 'ngx-toastr'; //Para tener los mensaje de toast en pantalla
import { ClienteService } from 'src/app/servicios/cliente.service';
import { ModelCliente } from 'src/app/modelos/ModelCliente';

@Component({
  selector: 'app-cliente-modificar',
  templateUrl: './cliente-modificar.component.html',
  styleUrls: ['./cliente-modificar.component.css']
})
export class ClienteModificarComponent implements OnInit {
  
  clientes: any = [];
  titulos: any[] = [{"name": "id"},{"name": "razon social"},
  { "name": "correo"},{ "name": "direccion"},{ "name": "estado"},{"name": "telefono"}];


  //Variables de la busqueda
  public nombre:string;
   //Formulario de busqueda
   formval: FormGroup;

  //Variables para cambio
  buttonModifica:boolean =  false;
  clienteaux:any;
  EstadosCli = ["Dar de alta", "Dar de baja"];
  validoaux:any;

  public Cliente: ModelCliente;
  formval2: FormGroup;
  Estados = ["Distrito Federal", "Aguascalientes","Baja California","Baja California Sur",
   "Campeche","Chiapas","Chihuahua","Coahuila","Colima","Durango","Guanajuato","Guerrero","Hidalgo",
   "Jalisco","México","Michoacán","Morelos","Nayarit","Nuevo León","Oaxaca","Puebla",
   "Queretaro","Quintana Roo","San Luis Potosí","Sinaloa","Sonora","Tabasco","Tamaulipas","Tlaxcala","Veracruz",
   "Yucatán","Zacatecas"];
   
    
  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private toastr:ToastrService,
    private builder: FormBuilder
  ) { 
    this.formval = this.builder.group({
      nombre: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(45)]]
    });

    this.formval2 = this.builder.group({
      razon_social: ["", [Validators.required,Validators.minLength(1), Validators.maxLength(45)]],
      correo: ["", [Validators.required,Validators.minLength(1), Validators.maxLength(80)]],
      calle: ["", [Validators.required,Validators.minLength(1), Validators.maxLength(50)]],
      numero: [null, Validators.required],
      cp: [null, Validators.required],
      ciudad: [null, Validators.required],
      estado: [null, Validators.required],
      telefono: [null, Validators.required],
      valido:[null]
    });

    this.Cliente = new ModelCliente();
    this.formval2.setValue(this.Cliente);

  }

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(){

    return this.clienteService.getClientes().subscribe((resp: any) => {
      if(resp != null){
         this.clientes = resp["info"][0];         
      }
   }, (error:any)=>{
    this.toastr.error("Se produjo un error.","Error");  
    this.router.navigate(["navigation"]);});
  
  }

  busquedaEmpleado(){
    return this.clienteService.postBusquedaCliente(this.nombre).subscribe((resp:any) => {
      this.clientes = resp["info"][0];
      this.toastr.info("Objeto encontrado.","Listo");  
       
  }, (error:any)=>{
    this.clientes = null;
    this.toastr.error("No se ha encontrado, verifica los datos","Error");  
  });
    
  }

  
  toggleModficar(cliente: ModelCliente){    
    if(this.buttonModifica == true){
      this.buttonModifica = false;
     }else{
       this.buttonModifica = true;
     }

     this.clienteaux = cliente;
    }

    async postClienteModifica(){

      if(this.validoaux == "Dar de alta"){
        this.clienteaux.valido = 1;
      }else if(this.validoaux == "Dar de baja"){
       this.clienteaux.valido =  0;
       }

      await this.clienteService.putClienteActualiza(this.clienteaux).subscribe((resp:any) => {
        this.toastr.info("Cliente actualizado.","Listo");
        this.router.navigate(["navigation/cliente/registrados"]);  
         
    }, (error:any)=>{
      this.toastr.error("No actualizado, verifica los datos","Error");  
    });
    }

}
