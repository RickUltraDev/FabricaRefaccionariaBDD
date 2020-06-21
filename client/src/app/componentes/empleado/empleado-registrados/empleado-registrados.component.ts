import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms"; //Para validar los formularios

/*Servicios usados*/
import { ToastrService } from 'ngx-toastr'; //Para tener los mensaje de toast en pantalla
import { EmpleadoService } from 'src/app/servicios/empleado.service';


@Component({
  selector: 'app-empleado-registrados',
  templateUrl: './empleado-registrados.component.html',
  styleUrls: ['./empleado-registrados.component.css']
})
export class EmpleadoRegistradosComponent implements OnInit {
  empleados: any = [];
  titulos: any[] = [{"name": "id"},{"name": "nombre"},{ "name": "apellidos"},
  {"name": "fecha"},{"name": "domicilio"}
  ,{"name": "salario"},{"name": "telefono"},{"name": "correo"},{"name": "puesto"}];

  //Variables de la busqueda
  public nombre:string;
  public cargo:string;
  Cargos = ["Encargado", "General"];

   //Formulario de busqueda
   busquedaForm: FormGroup;
  
  constructor(
    private empleadoService: EmpleadoService,
    private router: Router,
    private toastr:ToastrService,
    private builder: FormBuilder
    ) { 
      this.busquedaForm = this.builder.group({
        nombre: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
        cargo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]]
      });
    }

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(){
    return this.empleadoService.getEmpleados().subscribe((resp: any) => {
      if(resp != null){
         this.empleados = resp["info"][0];
         
      }
   }, (error:any)=>{
    this.toastr.error("Se produjo un error.","Error");  
    this.router.navigate(["navigation"]);});
  }


  eliminarEmpleados(idEmpleado){
      return this.empleadoService.deleteEmpleado(idEmpleado).subscribe((resp: {}) => {
        this.toastr.info("Eliminación exitosa.","Listo");  
          this.cargarEmpleados();
          
       });   
  }
  
  busquedaEmpleado(){
    if(this.cargo == 'Encargado'){
      this.cargo = 'e';
    }else if(this.cargo == 'General'){
      this.cargo = 'n'
    }      
    return this.empleadoService.postBusquedaEmpleado(this.nombre,this.cargo).subscribe((resp:any) => {
      this.empleados = resp["info"][0];
      this.toastr.info("Empleado encontrado.","Listo");  
       
  }, (error:any)=>{
    this.empleados = null;
    this.toastr.error("No se encontrado, verifica los datos","Error");  
  });
    
  }

}
