/* Imports base o predeterminados */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Import para las animaciones de Toast*/ 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


/* HTTP Module for RestAPI*/
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



/*Guards  de las rutas */
import {AuthGuard} from './guards/auth.guard';

/* Interceptor del token */
import {TokenInterceptorService} from './servicios/token-interceptor.service';

/* Modulos pagina de inicio*/
import { HomeComponent } from './componentes/homepage/home/home.component';
import { NavigationComponent } from './componentes/homepage/navigation/navigation.component';

/* Modulo angular */
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/* Modulos de todo lo demás */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmpleadoRegistroComponent } from './componentes/empleado/empleado-registro/empleado-registro.component';
import { EmpleadoRegistradosComponent } from './componentes/empleado/empleado-registrados/empleado-registrados.component';
import { EmpleadoModificarComponent } from './componentes/empleado/empleado-modificar/empleado-modificar.component';
import { PedidoRegistradosComponent } from './componentes/pedido/pedido-registrados/pedido-registrados.component';
import { PedidoRegistrarComponent } from './componentes/pedido/pedido-registrar/pedido-registrar.component';
import { PiezaRegistrarComponent } from './componentes/pieza/pieza-registrar/pieza-registrar.component';
import { PiezaRegistradosComponent } from './componentes/pieza/pieza-registrados/pieza-registrados.component';
import { PedidoModificarComponent } from './componentes/pedido/pedido-modificar/pedido-modificar.component';
import { PiezaModificaComponent } from './componentes/pieza/pieza-modifica/pieza-modifica.component';
import { ClienteRegistrarComponent } from './componentes/cliente/cliente-registrar/cliente-registrar.component';
import { ClienteModificarComponent } from './componentes/cliente/cliente-modificar/cliente-modificar.component';
import { ClienteRegistradosComponent } from './componentes/cliente/cliente-registrados/cliente-registrados.component';
import { PiezaImagenComponent } from './componentes/pieza/pieza-imagen/pieza-imagen.component';

import { FacturaRegistradosComponent } from './componentes/factura/factura-registrados/factura-registrados.component';
import { PagoRegistradosComponent } from './componentes/pago/pago-registrados/pago-registrados.component';
import { PagoModificarComponent } from './componentes/pago/pago-modificar/pago-modificar.component';
import { PagoRegistrarComponent } from './componentes/pago/pago-registrar/pago-registrar.component';



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    EmpleadoRegistroComponent,
    EmpleadoRegistradosComponent,
    EmpleadoModificarComponent,
    PedidoRegistradosComponent,
    PedidoRegistrarComponent,
    PiezaRegistrarComponent,
    PiezaRegistradosComponent,
    PedidoModificarComponent,
    PiezaModificaComponent,
    ClienteRegistrarComponent,
    ClienteModificarComponent,
    ClienteRegistradosComponent,
    PiezaImagenComponent,
    FacturaRegistradosComponent,
    PagoRegistradosComponent,
    PagoModificarComponent,
    PagoRegistrarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    FontAwesomeModule,
    NgbModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
