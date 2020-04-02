import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialImportModule } from './modules/material-import.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { Routes, RouterModule } from '@angular/router';
import { VotingScreenComponent } from './voting-screen/voting-screen.component';

import {  HttpClientModule } from '@angular/common/http';

import { VoterApiService } from './services/voter-api.service';
import { LoginActivate } from './login/login.activate';
import { MatProgressSpinnerModule } from '@angular/material';

const appRoutes: Routes=[
  {path:'signup',component:SignupComponent},
  {path:'login', component:LoginComponent},
  {path:'voting-screen',canActivate:[LoginActivate], component:VotingScreenComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    VotingScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialImportModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing:true}
    ),
    HttpClientModule
  ],
  providers: [VoterApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
