import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"; //Para redireccionar a otra ruta si es que se necesita

//Servicios que usará la pagina
import { EmpleadoService } from "../../../servicios/empleado.service";


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  
  rolDeUsuario:any;
  jojos:boolean;

  constructor(
    private empleadoService: EmpleadoService,
    private router: Router
  ) { }

  ngOnInit(){
    this.getLogin();
    this.rolDeUsuario = JSON.parse(this.readSessionStorageValue('currentUser'));
  }

  
  
   //Funciones que hará nuestra pagina

   getLogin(){
    
  }


   //Regresar lo que tenga sessionstorage
   readSessionStorageValue(key: string): string {
    return sessionStorage.getItem(key)
  }


}
