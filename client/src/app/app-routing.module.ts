import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/*Modulos home y submenus */
import {HomeComponent} from './componentes/homepage/home/home.component';

/*Modulos para todo lo demás */
import { EmpleadoRegistroComponent } from './componentes/empleado/empleado-registro/empleado-registro.component';
import { EmpleadoRegistradosComponent } from './componentes/empleado/empleado-registrados/empleado-registrados.component';
import { EmpleadoModificarComponent } from './componentes/empleado/empleado-modificar/empleado-modificar.component';
import { PedidoRegistradosComponent } from './componentes/pedido/pedido-registrados/pedido-registrados.component';
import { PedidoRegistrarComponent } from './componentes/pedido/pedido-registrar/pedido-registrar.component';


const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
   { path: "home", component: HomeComponent},
   { path: "pedido/registro", component: PedidoRegistrarComponent},
   { path: "pedido/registrados", component: PedidoRegistradosComponent},
   { path: "empleado/registro", component: EmpleadoRegistroComponent},
   { path: "empleado/modificar", component: EmpleadoModificarComponent},
   { path: "empleado/registrados", component: EmpleadoRegistradosComponent}

   
   

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
