import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from "@angular/router";  //Es el router de angular para redirigir a otras paginas

//Servicios a usar
import {AuthService} from '../servicios/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService, private router: Router){

  }

  canActivate(): boolean{
     
    if(this.authService.logeado()){
      return true;
    }
      this.router.navigate(["/"]);
      return false;
    
  }
  
}
