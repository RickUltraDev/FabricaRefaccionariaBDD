import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/*Modulos home y submenus */
import {HomeComponent} from './componentes/homepage/home/home.component';
import { NavigationComponent } from "./componentes/homepage/navigation/navigation.component";


/*Modulos para todo lo demás */
import { EmpleadoRegistroComponent } from './componentes/empleado/empleado-registro/empleado-registro.component';
import { EmpleadoRegistradosComponent } from './componentes/empleado/empleado-registrados/empleado-registrados.component';
import { EmpleadoModificarComponent } from './componentes/empleado/empleado-modificar/empleado-modificar.component';
import { EmpleadoBajaComponent } from './componentes/empleado/empleado-baja/empleado-baja.component';
import { PedidoRegistradosComponent } from './componentes/pedido/pedido-registrados/pedido-registrados.component';
import { PedidoRegistrarComponent } from './componentes/pedido/pedido-registrar/pedido-registrar.component';
import { PiezaRegistrarComponent} from './componentes/pieza/pieza-registrar/pieza-registrar.component';
import { PiezaRegistradosComponent } from './componentes/pieza/pieza-registrados/pieza-registrados.component';

//Rutas protegidas para encargado: 

/*
empleado/registro, empleado/registrados, empleado/elimina, empleado/actualiza (normal y ascendido)
Pieza/registro, Pieza/modificar*/

/* Guards de las rutas */
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
   { path: "home", component: HomeComponent},
   { path: "navigation", component: NavigationComponent
    , children:[
      { path: "empleado/registro", component: EmpleadoRegistroComponent},
    ]},

   { path: "pedido/registro", component: PedidoRegistrarComponent},
   { path: "pedido/registrados", component: PedidoRegistradosComponent},
  
   { path: "empleado/modificar", component: EmpleadoModificarComponent},
   { path: "empleado/baja", component: EmpleadoBajaComponent},
   { path: "empleado/registrados", component: EmpleadoRegistradosComponent, canActivate:[AuthGuard]},
   { path: "pieza/registro", component: PiezaRegistrarComponent},
   { path: "pieza/registrados", component: PiezaRegistradosComponent}
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
