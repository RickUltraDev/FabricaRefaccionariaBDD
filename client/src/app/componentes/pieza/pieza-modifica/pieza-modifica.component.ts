import { Component, OnInit} from '@angular/core';

import { Router } from "@angular/router"; //Para redireccionar a otra ruta si es que se necesita
import { FormGroup, FormBuilder, Validators } from "@angular/forms"; //Para validar los formularios

import { PiezaService } from 'src/app/servicios/pieza.service';

@Component({
  selector: 'app-pieza-modifica',
  templateUrl: './pieza-modifica.component.html',
  styleUrls: ['./pieza-modifica.component.css']
})
export class PiezaModificaComponent implements OnInit {

   
  constructor(
    private builder: FormBuilder,
    private router: Router,
    private piezaService: PiezaService
  ) { }

  ngOnInit(): void {
  }

  

}
