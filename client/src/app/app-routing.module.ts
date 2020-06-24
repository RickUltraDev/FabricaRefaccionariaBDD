import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/*Modulos home y submenus */
import {HomeComponent} from './componentes/homepage/home/home.component';
import { NavigationComponent } from "./componentes/homepage/navigation/navigation.component";


/*Modulos para todo lo demás */
import { EmpleadoRegistroComponent } from './componentes/empleado/empleado-registro/empleado-registro.component';
import { EmpleadoRegistradosComponent } from './componentes/empleado/empleado-registrados/empleado-registrados.component';
import { EmpleadoModificarComponent } from './componentes/empleado/empleado-modificar/empleado-modificar.component';
import { PedidoRegistradosComponent } from './componentes/pedido/pedido-registrados/pedido-registrados.component';
import { PedidoRegistrarComponent } from './componentes/pedido/pedido-registrar/pedido-registrar.component';
import { PedidoModificarComponent } from './componentes/pedido/pedido-modificar/pedido-modificar.component';
import { PiezaRegistrarComponent} from './componentes/pieza/pieza-registrar/pieza-registrar.component';
import { PiezaRegistradosComponent } from './componentes/pieza/pieza-registrados/pieza-registrados.component';
import { PiezaModificaComponent } from './componentes/pieza/pieza-modifica/pieza-modifica.component';
import { PiezaImagenComponent } from './componentes/pieza/pieza-imagen/pieza-imagen.component';
import { ClienteRegistrarComponent  } from './componentes/cliente/cliente-registrar/cliente-registrar.component';
import { ClienteRegistradosComponent } from './componentes/cliente/cliente-registrados/cliente-registrados.component';
import { ClienteModificarComponent  } from './componentes/cliente/cliente-modificar/cliente-modificar.component';
import { FacturaRegistradosComponent } from './componentes/factura/factura-registrados/factura-registrados.component';
import { PagoRegistrarComponent } from './componentes/pago/pago-registrar/pago-registrar.component';
import { PagoRegistradosComponent } from './componentes/pago/pago-registrados/pago-registrados.component';
import { PagoModificarComponent } from './componentes/pago/pago-modificar/pago-modificar.component';
//import {  } from './componentes';

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
      { path: "empleado/registro", component: EmpleadoRegistroComponent , canActivate:[AuthGuard]},
      { path: "empleado/modificar", component: EmpleadoModificarComponent, canActivate:[AuthGuard]},
      { path: "empleado/registrados", component: EmpleadoRegistradosComponent, canActivate:[AuthGuard]},

      { path: "pedido/registro", component: PedidoRegistrarComponent},
      { path: "pedido/registrados", component: PedidoRegistradosComponent}, 
      { path: "pedido/modificar", component: PedidoModificarComponent}, 

      { path: "pieza/registro", component: PiezaRegistrarComponent},
      { path: "pieza/registrados", component: PiezaRegistradosComponent},
      { path: "pieza/modificar", component: PiezaModificaComponent},
      { path: "pieza/modificar/imagen", component: PiezaImagenComponent},

      { path: "cliente/registro", component: ClienteRegistrarComponent},
      { path: "cliente/registrados", component: ClienteRegistradosComponent},
      { path: "cliente/modificar", component: ClienteModificarComponent},

      { path: "factura/registradas", component: FacturaRegistradosComponent},

      { path: "pago/registro", component: PagoRegistrarComponent},
      { path: "pago/registrados", component: PagoRegistradosComponent},
      { path: "pago/modificar", component: PagoModificarComponent}

    ]}
   
];

 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
