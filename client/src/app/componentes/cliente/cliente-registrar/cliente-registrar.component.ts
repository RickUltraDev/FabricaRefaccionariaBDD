import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"; //Para redireccionar a otra ruta si es que se necesita
import { FormGroup, FormBuilder, Validators } from "@angular/forms"; //Para validar los formularios
import { ModelCliente } from 'src/app/modelos/ModelCliente';
import { ClienteService } from 'src/app/servicios/cliente.service';


@Component({
  selector: 'app-cliente-registrar',
  templateUrl: './cliente-registrar.component.html',
  styleUrls: ['./cliente-registrar.component.css']
})
export class ClienteRegistrarComponent implements OnInit {
  
  
  //Formulario a comprobar
  public Cliente: ModelCliente;
  formval: FormGroup;
  Estados = ["Distrito Federal", "Aguascalientes","Baja California","Baja California Sur",
   "Campeche","Chiapas","Chihuahua","Coahuila","Colima","Durango","Guanajuato","Guerrero","Hidalgo",
   "Jalisco","México","Michoacán","Morelos","Nayarit","Nuevo León","Oaxaca","Puebla",
   "Queretaro","Quintana Roo","San Luis Potosí","Sinaloa","Sonora","Tabasco","Tamaulipas","Tlaxcala","Veracruz",
   "Yucatán","Zacatecas"];

  
  constructor(
    private builder: FormBuilder,
    private router: Router,
    private clienteService: ClienteService
  ) { 
    this.formval = this.builder.group({
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
    this.formval.setValue(this.Cliente);

  }

  ngOnInit(): void {
  }

  async postCliente(){

    try {
      if (!this.formval.invalid) {
        
        await this.clienteService.postRegistroCliente(this.Cliente);
      }
    } catch (err) {
      console.log(err);
    }
      
   }

}
