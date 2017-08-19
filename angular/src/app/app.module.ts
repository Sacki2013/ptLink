import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';

// Trainer Components
import { TrainerLoginComponent } from './components/trainer/login/login.component';
import { TrainerRegisterComponent } from './components/trainer/register/register.component';
import { TrainerProfileComponent } from './components/trainer/profile/profile.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'trainer/register', component: TrainerRegisterComponent },
  { path: 'trainer/login', component: TrainerLoginComponent },
  { path: 'trainer/profile', component: TrainerProfileComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    TrainerLoginComponent,
    TrainerRegisterComponent,
    TrainerProfileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
