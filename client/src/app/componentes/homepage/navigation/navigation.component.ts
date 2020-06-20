import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"; //Para redireccionar a otra ruta si es que se necesita

/* Servicios a usar */
import { AuthService } from "../../../servicios/auth.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
   usuarioLog = {
     id: '',
     nombre: '',
     cargo: '',
   };

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(){
    this.getUser();
  }
  
   //Funciones que hará nuestra pagina
   postLogout(){
    this.authService.logout();
  }

  getLog(){
    return this.authService.logeado();
    
  }
  
  getUser(){
    this.authService.getLogeado().subscribe((resp: any) => {
       if(resp != null){
        this.usuarioLog =  resp.info;
       }
    });
  } 



}
