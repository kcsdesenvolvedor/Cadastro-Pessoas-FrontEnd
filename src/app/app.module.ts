import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './template/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { NavComponent } from './template/nav/nav.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListPessoasComponent } from './components/pessoas/list-pessoas/list-pessoas.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormPessoaComponent } from './components/pessoas/form-pessoa/form-pessoa.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ListCidadesComponent } from './components/cidades/list-cidades/list-cidades.component';
import { FormCidadeComponent } from './components/cidades/form-cidade/form-cidade.component';
import { PipeCpf } from './Pipes/pipeCpf';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    HomeComponent,
    ListPessoasComponent,
    FormPessoaComponent,
    ListCidadesComponent,
    FormCidadeComponent,
    PipeCpf
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    AppRoutingModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
