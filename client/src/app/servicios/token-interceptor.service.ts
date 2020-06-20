import { Injectable } from '@angular/core';

import { HttpInterceptor } from "@angular/common/http";

//Servicios a usar
import { AuthService } from "../servicios/auth.service";


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  
  constructor(private authService:AuthService){} 

  //Con esto se agregará una cabecera en cada petición al servidor con el token para verificar si tenemos los permisos 
  //esto es para que no se tenga que estar agregando todo el tiempo a los headers
  intercept(req,next){
    const tokenizeReq = req.clone({
      setHeaders: {
        authorization : `Bearer ${this.authService.getToken()} `
      }
    })
    return next.handle(tokenizeReq);
  }


}
