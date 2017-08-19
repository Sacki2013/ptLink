import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { TrainerAuthService } from '../services/trainerAuth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class TrainerAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: TrainerAuthService,
    private flashMessage: FlashMessagesService
  ) { }

  canActivate(){
    if(this.authService.loggedIn()){
      return true;
    } else {
      this.flashMessage.show('You need to be logged in to view that page', { cssClass: 'alert-danger',timeout: 3000 });
      this.router.navigate(['/trainer/login']);
      return false;
    }
  }
}