import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

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

  constructor(
    private empleadoService: EmpleadoService,
    private router: Router,
    private toastr:ToastrService) { }

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



}
