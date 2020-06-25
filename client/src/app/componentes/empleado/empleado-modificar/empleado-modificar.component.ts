import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms"; //Para validar los formularios

/*Servicios usados*/
import { ToastrService } from 'ngx-toastr'; //Para tener los mensaje de toast en pantalla
import { EmpleadoService } from 'src/app/servicios/empleado.service';
import { ModelEmpleado } from 'src/app/modelos/ModelEmpleado';


@Component({
  selector: 'app-empleado-modificar',
  templateUrl: './empleado-modificar.component.html',
  styleUrls: ['./empleado-modificar.component.css']
})
export class EmpleadoModificarComponent implements OnInit {
  empleados: any = [];
  titulos: any[] = [{"name": "id"},{"name": "nombre"},{ "name": "apellidos"},
    {"name": "fecha"},{"name": "domicilio"}
    ,{"name": "salario"},{"name": "telefono"},{"name": "correo"},{"name": "puesto"}];

  //Variables de la busqueda
  public nombre:string;
  public cargo:string;
  Cargos = ["encargado", "general"];
  
  //Formulario de busqueda
  busquedaForm: FormGroup;
  buscBool: boolean = false;
  
  //Variables para cambio
  buttonModifica:boolean =  false;
  empleadoaux:any;
  
  public Empleado: ModelEmpleado;
  empleadoForm: FormGroup;
  EstadosEmp = ["Dar de alta", "Dar de baja"];
  validoaux:any;

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

    this.empleadoForm = this.builder.group({
      nombre: ["", [Validators.required,Validators.minLength(1), Validators.maxLength(60)]],
      apellido_paterno: ["", [Validators.required,Validators.minLength(1), Validators.maxLength(45)]],
      apellido_materno: ["", [Validators.required,Validators.minLength(1), Validators.maxLength(45)]],
      fecha_nacimiento: [null],
      calle: ["", [Validators.required,Validators.minLength(1), Validators.maxLength(50)]],
      numero: [null, Validators.required],
      cp: [null, Validators.required],
      telefono: [null, Validators.required],
      cargo: ["", Validators.required],
      salario: [null, Validators.required],
      correo: ["", [Validators.required,Validators.minLength(1), Validators.maxLength(80)]],
      contrasena: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      valido:[null]
    });
    this.Empleado = new ModelEmpleado();
    this.empleadoForm.setValue(this.Empleado);
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
    this.router.navigate(["navigation"]);
    });
  }

  busquedaEmpleado(){
    if(this.cargo == 'encargado'){
      this.cargo = 'e';
    }else if(this.cargo == 'general'){
      this.cargo = 'n'
    }      
    return this.empleadoService.postBusquedaEmpleado(this.nombre,this.cargo).subscribe((resp:any) => {
      this.empleados = resp["info"][0];
      this.toastr.info("Empleado encontrado.","Listo");  
      this.buscBool = false;
       
  }, (error:any)=>{
    this.empleados = null;
    this.toastr.error("No se encontrado, verifica los datos","Error"); 
    this.buscBool = true;  
  });
  }

  toggleModficar(empleado: ModelEmpleado){    
    if(this.buttonModifica == true){
      this.buttonModifica = false;
     }else{
       this.buttonModifica = true;
     }

     this.empleadoaux = empleado;
    }

    async postEmpleadoModifica(){
    try {
      if (!this.empleadoForm.invalid) {
        
        if(this.empleadoaux.cargo == "encargado"){
          this.empleadoaux.cargo = 'e';
        }else if(this.empleadoaux.cargo == "general"){
          this.empleadoaux.cargo = 'n';
        }
        
        if(this.validoaux == "Dar de alta"){
            this.empleadoaux.valido = 1;
        }else if(this.validoaux == "Dar de baja"){
          this.empleadoaux.valido =  0;
        }

        await this.empleadoService.putEmpleadoActualiza(this.empleadoaux).subscribe((resp:any) => {
          this.toastr.info("Empleado actualizado.","Listo");
          this.router.navigate(["navigation/empleado/registrados"]);  
           
      }, (error:any)=>{
        this.toastr.error("No actualizado, verifica los datos","Error");  
      });

      }
    } catch (err) {
      console.log(err);
    }
      
   }

 

}
