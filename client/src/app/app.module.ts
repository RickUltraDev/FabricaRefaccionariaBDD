/* Imports base o predeterminados */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Import para las animaciones de Toast*/ 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


/* HTTP Module for RestAPI*/
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


/* Modulos pagina de inicio*/
import { HomeComponent } from './componentes/homepage/home/home.component';
import { NavigationComponent } from './componentes/homepage/navigation/navigation.component';
import { FooterComponent } from './componentes/homepage/footer/footer.component';
/* Modulos de todo lo demás */

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmpleadoRegistroComponent } from './componentes/empleado/empleado-registro/empleado-registro.component';
import { EmpleadoRegistradosComponent } from './componentes/empleado/empleado-registrados/empleado-registrados.component';
import { EmpleadoModificarComponent } from './componentes/empleado/empleado-modificar/empleado-modificar.component';
import { PedidoRegistradosComponent } from './componentes/pedido/pedido-registrados/pedido-registrados.component';
import { PedidoRegistrarComponent } from './componentes/pedido/pedido-registrar/pedido-registrar.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    HomeComponent,
    EmpleadoRegistroComponent,
    EmpleadoRegistradosComponent,
    EmpleadoModificarComponent,
    PedidoRegistradosComponent,
    PedidoRegistrarComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
