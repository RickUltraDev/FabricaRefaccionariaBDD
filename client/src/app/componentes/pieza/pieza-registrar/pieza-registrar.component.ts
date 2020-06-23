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
   
  Categorias = ["Accesorios Internos", "Accesorios Externos","Herramientas","Liquidos"];

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private piezaService: PiezaService
  ) { }

  ngOnInit(): void {
    //nombre, descripcion, precio_fabricacion, precio_venta, existencia, categoria, url 
    this.formval = this.builder.group({
      nombre: ["", [Validators.required,Validators.minLength(1), Validators.maxLength(60)]],
      descripcion: ["", [Validators.required,Validators.minLength(1), Validators.maxLength(80)]],
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
       //Categorias = ["Accesorios Internos", "Accesorios Externos","Herramientas","Liquidos"];
       //AI - Accesorios Internos\\nAE- Accesorios Externos\\nHE - Herramientas y equipos\\nLQ - Liquidos y Químicos\\n

       if(this.Pieza.categoria == 'Accesorios Internos'){
        this.Pieza.categoria = 'ai';
       }

       if(this.Pieza.categoria == 'Accesorios Externos'){
        this.Pieza.categoria = 'ae';
       }

       if(this.Pieza.categoria == 'Herramientas'){
        this.Pieza.categoria = 'he';
       }

       if(this.Pieza.categoria == 'Liquidos'){
        this.Pieza.categoria = 'lq';
       }

        
        await this.piezaService.postRegistroPieza(this.Pieza);
        
      }
    } catch (err) {
      console.log(err);
    }
      
   }



}
