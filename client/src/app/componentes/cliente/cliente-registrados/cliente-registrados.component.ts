import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms"; //Para validar los formularios

/*Servicios usados*/
import { ToastrService } from 'ngx-toastr'; //Para tener los mensaje de toast en pantalla
import { AuthService } from "src/app/servicios/auth.service";
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-cliente-registrados',
  templateUrl: './cliente-registrados.component.html',
  styleUrls: ['./cliente-registrados.component.css']
})
export class ClienteRegistradosComponent implements OnInit {
  
  usuarioLog = {id: '',nombre: '',cargo: '',};
  clientes: any = [];
  titulos: any[] = [{"name": "id"},{"name": "razon social"},
  { "name": "correo"},{ "name": "direccion"},{ "name": "estado"},{"name": "telefono"}];

   //Variables de la busqueda
  public nombre:string;
   //Formulario de busqueda
   formval: FormGroup;

  constructor(
    private clienteService: ClienteService,
    private authService: AuthService,
    private router: Router,
    private toastr:ToastrService,
    private builder: FormBuilder
  ) { 
    this.formval = this.builder.group({
      nombre: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(45)]]
    });

  }

  ngOnInit(): void {
    this.getUser();
    this.cargarEmpleados();
  }

  getUser(){
    this.authService.getLogeado().subscribe((resp: any) => {
       if(resp != null){
        this.usuarioLog =  resp.info;
       }
    });
  } 

  cargarEmpleados(){

    return this.clienteService.getClientes().subscribe((resp: any) => {
      if(resp != null){
         this.clientes = resp["info"][0];         
      }
   }, (error:any)=>{
    this.toastr.error("Se produjo un error.","Error");  
    this.router.navigate(["navigation"]);});
  
  }

  eliminarCliente(idCliente){
    return this.clienteService.deleteCliente(idCliente).subscribe((resp: {}) => {
      this.toastr.info("Eliminación exitosa.","Listo");  
        this.cargarEmpleados();
        
     });   
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

}
