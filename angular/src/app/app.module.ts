import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';

// Trainer Components
import { TrainerLoginComponent } from './components/trainer/login/login.component';
import { TrainerRegisterComponent } from './components/trainer/register/register.component';
import { TrainerProfileComponent } from './components/trainer/profile/profile.component';
import { TrainerDashboardComponent } from './components/trainer/dashboard/dashboard.component';

// Services
import { TrainerAuthService } from './services/trainerAuth.service';
import { TrainerAuthGuard } from './guards/trainerAuth.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'trainer/register', component: TrainerRegisterComponent },
  { path: 'trainer/login', component: TrainerLoginComponent },
  { path: 'trainer/profile', component: TrainerProfileComponent, canActivate:[TrainerAuthGuard] },
  { path: 'trainer/dashboard', component: TrainerDashboardComponent, canActivate:[TrainerAuthGuard]  }
  
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,    
    NavigationComponent,
    TrainerLoginComponent,
    TrainerRegisterComponent,
    TrainerProfileComponent,
    TrainerDashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    FlashMessagesModule
  ],
  providers: [
    TrainerAuthService,
    TrainerAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
