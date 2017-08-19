import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerAuthService } from '../../services/trainerAuth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: TrainerAuthService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessage.show('You are now logged out.', { cssClass: 'alert-success', timeout: 3000 });
    this.router.navigate(['/trainer/login']);
    return false;
  }
}
