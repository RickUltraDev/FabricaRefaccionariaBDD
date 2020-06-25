import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router"; //Para redireccionar a otra ruta si es que se necesita
import { FormGroup, FormBuilder, Validators } from "@angular/forms"; //Para validar los formularios

import { PiezaService } from 'src/app/servicios/pieza.service';
import { ModelPieza } from 'src/app/modelos/ModeloPieza';

@Component({
  selector: 'app-pieza-registrar',
  templateUrl: './pieza-registrar.component.html',
  styleUrls: ['./pieza-registrar.component.css']
})
export class PiezaRegistrarComponent implements OnInit {
  
  public Pieza: ModelPieza;
  formval: FormGroup;
   
  Categorias = ["Afinación", "Frenos","Suspensión","Clutch de Embrague","Enfriamiento","Ajuste de motor"];

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private piezaService: PiezaService
  ) { }

  ngOnInit(): void {
    //nombre, descripcion, precio_fabricacion, precio_venta, existencia, categoria, url 
    this.formval = this.builder.group({
      nombre: ["", [Validators.required,Validators.minLength(1), Validators.maxLength(60)]],
      descripcion: ["", [Validators.required,Validators.minLength(1), Validators.maxLength(300)]],
      precio_fabricacion: ["", [Validators.required,Validators.minLength(1), Validators.maxLength(6)]],
      precio_venta: ["", [Validators.required,Validators.minLength(1), Validators.maxLength(6)]],
      existencia: ["", [Validators.required,Validators.minLength(1), Validators.maxLength(9)]],
      categoria: [null, Validators.required],
      valido:[null],
      url:[null]
    });
    this.Pieza = new ModelPieza();
    this.formval.setValue(this.Pieza);
  }
  
  


  async postPieza(){

    try {
      if (!this.formval.invalid) {
      
        
        await this.piezaService.postRegistroPieza(this.Pieza);
        
      }
    } catch (err) {
      console.log(err);
    }
      
   }



}
