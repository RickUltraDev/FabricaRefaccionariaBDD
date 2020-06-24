import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"; //Para redireccionar a otra ruta si es que se necesita
import { FormGroup, FormBuilder, Validators } from "@angular/forms"; //Para validar los formularios
import { ModelEmpleado } from 'src/app/modelos/ModelEmpleado';

// Servicios que usará la página
import { EmpleadoService } from 'src/app/servicios/empleado.service';

@Component({
  selector: 'app-empleado-registro',
  templateUrl: './empleado-registro.component.html',
  styleUrls: ['./empleado-registro.component.css']
})
export class EmpleadoRegistroComponent implements OnInit {

  //Formulario a comprobar
  public Empleado: ModelEmpleado;
  empleadoForm: FormGroup;
  Cargos = ["Encargado", "General"];

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private empleadoService: EmpleadoService

  ) { 
    this.empleadoForm = this.builder.group({
      nombre: ["", [Validators.required,Validators.minLength(1), Validators.maxLength(60)]],
      apellido_paterno: ["", [Validators.required,Validators.minLength(1), Validators.maxLength(45)]],
      apellido_materno: ["", [Validators.required,Validators.minLength(1), Validators.maxLength(45)]],
      fecha_nacimiento: ["", Validators.required],
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
  }


   async postEmpleado(){

    try {
      if (!this.empleadoForm.invalid) {
        
        if(this.Empleado.cargo == "Encargado"){
          this.Empleado.cargo = 'e';
        }else if(this.Empleado.cargo == "General"){
          this.Empleado.cargo = 'n';
        }
     
        await this.empleadoService.postRegistroCliente(this.Empleado);
        
      }
    } catch (err) {
      console.log(err);
    }
      
   }

}
