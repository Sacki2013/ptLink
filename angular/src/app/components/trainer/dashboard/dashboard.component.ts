import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerAuthService } from '../../../services/trainerAuth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class TrainerDashboardComponent implements OnInit {
  trainer: Object;

  constructor(
    private authService: TrainerAuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(data => {
      this.trainer = data.trainer;
    },
    err => {
      console.log(err);
      return false;
      // TODO: Find out what these errors are and if user sppecific
    });
  }
}